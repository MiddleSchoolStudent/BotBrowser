# Cross-Platform Profiles

> Use one BotBrowser profile across different host operating systems while keeping profile identity stable.

---

<a id="prerequisites"></a>

## Prerequisites

- BotBrowser installed on target hosts. See [Installation](../../../INSTALLATION.md).
- Profile file (`.enc` or `.json`).
- ENT Tier1 for Linux/Ubuntu hosts.

---

<a id="quick-start"></a>

## Quick Start

Run the same profile on different hosts. Only the executable path changes:

```bash
# macOS
/Applications/Chromium.app/Contents/MacOS/Chromium --bot-profile="/path/to/profile.enc" --headless

# Linux
chromium-browser --bot-profile="/path/to/profile.enc" --headless

# Windows
chrome.exe --bot-profile="C:\profiles\profile.enc" --headless
```

---

<a id="how-it-works"></a>

## How It Works

Cross-platform profiles are profile-driven, not host-driven:

1. Identity surfaces come from profile data (UA, screen, fonts, GPU, language stack).
2. BotBrowser applies profile values at engine level before page scripts run.
3. Host OS differences are constrained so the profile remains the primary identity source.

Use this guide as the portability overview. For Windows-profile specifics, see [Windows on macOS/Linux](WINDOWS_ON_MAC_LINUX.md).

---

<a id="support-matrix"></a>

## Support Matrix

| Profile Target | Windows Host | macOS Host | Linux Host (ENT Tier1) |
|---|---|---|---|
| Windows profile | Supported | Supported | Supported |
| macOS profile | Supported | Supported | Supported |
| Android profile | Supported | Supported | Supported |

---

<a id="common-scenarios"></a>

## Common Scenarios

### Develop on macOS, deploy on Linux

Keep one profile artifact in source control or secret storage and deploy unchanged.

### Multi-OS validation in CI

Run the same profile on Windows/macOS/Linux runners and compare key outputs (`navigator.platform`, languages, screen values, rendering hashes).

### Fleet migration

Move workloads between cloud hosts without regenerating identity profiles.

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---|---|
| Different output across hosts | Verify same BotBrowser version, same profile file, same launch flags. |
| Linux host unsupported | Linux requires ENT Tier1. |
| CJK rendering differs | See [CJK Font Rendering](CJK_FONT_RENDERING.md). |
| GPU-related differences in headless | Review [Headless Server Setup](../deployment/HEADLESS_SERVER_SETUP.md) and GPU mode consistency. |

---

<a id="next-steps"></a>

## Next Steps

- [Windows on macOS/Linux](WINDOWS_ON_MAC_LINUX.md). Windows-profile focused workflow.
- [Android Emulation](ANDROID_EMULATION.md). Android identity on desktop hosts.
- [CJK Font Rendering](CJK_FONT_RENDERING.md). East Asian typography consistency.
- [Profile Management](../getting-started/PROFILE_MANAGEMENT.md). Profile lifecycle and versioning.

---

**Related documentation:** [Advanced Features](../../../ADVANCED_FEATURES.md) | [Profiles README](../../../profiles/README.md)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) • [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [Cross Platform Browser Profiles](https://botbrowser.io/en/blog/cross-platform-browser-profiles/)
