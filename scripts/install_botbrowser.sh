#!/usr/bin/env bash
set -euo pipefail

# BotBrowser Installer for macOS and Linux
# Automatically detects OS and architecture, then installs the latest release.
#
# Usage:
#   ./install_botbrowser.sh              # Install latest version
#   ./install_botbrowser.sh 145          # Install latest Chrome 145 build
#   ./install_botbrowser.sh --download   # Download only, don't install
#   curl -sL https://raw.githubusercontent.com/botswin/BotBrowser/main/scripts/install_botbrowser.sh | bash

REPO="botswin/BotBrowser"
API_BASE="https://api.github.com/repos/${REPO}/releases"
MAJOR_VERSION=""
DOWNLOAD_ONLY=false

# Parse arguments
for arg in "$@"; do
  case "$arg" in
    --download) DOWNLOAD_ONLY=true ;;
    [0-9]*) MAJOR_VERSION="$arg" ;;
    -h|--help)
      echo "Usage: $0 [VERSION] [--download]"
      echo ""
      echo "  VERSION     Chrome major version (e.g., 145). Default: latest."
      echo "  --download  Download only, don't install."
      echo ""
      echo "Examples:"
      echo "  $0          # Install latest version"
      echo "  $0 145      # Install latest Chrome 145 build"
      exit 0
      ;;
    *) echo "Unknown argument: $arg"; exit 1 ;;
  esac
done

# Detect OS and architecture
OS="$(uname -s)"
ARCH="$(uname -m)"

case "$OS" in
  Darwin)
    case "$ARCH" in
      arm64)  ASSET_PATTERN="mac_arm64.dmg" ;;
      x86_64) ASSET_PATTERN="mac_x(86_64|64)\.dmg" ;;
      *) echo "Error: Unsupported architecture: $ARCH"; exit 1 ;;
    esac
    echo "Platform: macOS ${ARCH}"
    ;;
  Linux)
    case "$ARCH" in
      x86_64|amd64)   ASSET_PATTERN="(amd64|x86_64|x64)\.deb" ;;
      aarch64|arm64)  ASSET_PATTERN="_arm64\.deb" ;;
      *) echo "Error: Unsupported architecture: $ARCH"; exit 1 ;;
    esac
    echo "Platform: Linux ${ARCH}"
    ;;
  *)
    echo "Error: Unsupported OS: $OS"
    echo "       For Windows, use install_botbrowser.ps1"
    exit 1
    ;;
esac

# Fetch release
if [ -n "$MAJOR_VERSION" ]; then
  echo "1. Finding latest Chrome ${MAJOR_VERSION} release..."
  ASSET_URL="$(curl -sL "${API_BASE}?per_page=100" \
    | grep "browser_download_url" \
    | grep "/${MAJOR_VERSION}\." \
    | grep -E "$ASSET_PATTERN" \
    | cut -d '"' -f 4 \
    | sort -t_ -k2 -r \
    | head -1)"
else
  echo "1. Fetching latest release info..."
  ASSET_URL="$(curl -sL "${API_BASE}/latest" \
    | grep "browser_download_url" \
    | grep -E "$ASSET_PATTERN" \
    | cut -d '"' -f 4 \
    | sort -t_ -k2 -r \
    | head -1)"
fi

if [ -z "$ASSET_URL" ]; then
  echo "Error: Could not find download URL for ${ASSET_PATTERN}"
  [ -n "$MAJOR_VERSION" ] && echo "       No release found for Chrome ${MAJOR_VERSION}."
  exit 1
fi

FILENAME="$(basename "$ASSET_URL")"
DOWNLOAD_PATH="/tmp/${FILENAME}"

# Extract version from filename: botbrowser_20260210_145.0.7632.46_x86_64.deb
VERSION="$(echo "$FILENAME" | sed -E 's/^botbrowser_[0-9]+_([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)_.+/\1/')"

echo "   Version: $VERSION"
echo "2. Downloading..."
curl -L "$ASSET_URL" -o "$DOWNLOAD_PATH"
echo "   Saved to: $DOWNLOAD_PATH"

if [ "$DOWNLOAD_ONLY" = true ]; then
  echo ""
  echo "Download complete: $DOWNLOAD_PATH"
  exit 0
fi

# --- macOS install ---
if [ "$OS" = "Darwin" ]; then
  APP_NAME="Chromium.app"
  DEST_DIR="/Applications"
  MOUNT_POINT="$(mktemp -d /tmp/botbrowser_mnt.XXXX)"

  echo "3. Mounting..."
  hdiutil attach "$DOWNLOAD_PATH" -mountpoint "$MOUNT_POINT" -nobrowse -quiet

  if [ ! -d "${MOUNT_POINT}/${APP_NAME}" ]; then
    echo "Error: ${APP_NAME} not found in the mounted volume"
    hdiutil detach "$(hdiutil info | grep "${MOUNT_POINT}" -B1 | head -n1 | awk '{print $1}')" -quiet || true
    exit 1
  fi

  echo "4. Installing ${APP_NAME} to ${DEST_DIR}..."
  cp -R "${MOUNT_POINT}/${APP_NAME}" "${DEST_DIR}/"

  echo "5. Removing quarantine attribute..."
  xattr -rd com.apple.quarantine "${DEST_DIR}/${APP_NAME}"

  echo "6. Cleaning up..."
  hdiutil detach "$(hdiutil info | grep "${MOUNT_POINT}" -B1 | head -n1 | awk '{print $1}')" -quiet
  rm -rf "$MOUNT_POINT" "$DOWNLOAD_PATH"

  echo ""
  echo "Installation complete! BotBrowser $VERSION"
  echo "Location: ${DEST_DIR}/${APP_NAME}"
fi

# --- Linux install ---
if [ "$OS" = "Linux" ]; then
  echo "3. Installing..."
  if [ "$(id -u)" -eq 0 ]; then
    dpkg -i "$DOWNLOAD_PATH" || true
    apt-get install -f -y
  else
    sudo dpkg -i "$DOWNLOAD_PATH" || true
    sudo apt-get install -f -y
  fi

  echo "4. Cleaning up..."
  rm -f "$DOWNLOAD_PATH"

  echo ""
  echo "Installation complete! BotBrowser $VERSION"
fi
