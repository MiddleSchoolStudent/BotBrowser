# Widevine DRM Setup

> Configure DRM content playback with Widevine CDM and keep DRM capability signals consistent with the profile's platform identity.

---

<a id="prerequisites"></a>

## Prerequisites

- **BotBrowser binary** installed. See [INSTALLATION.md](../../../INSTALLATION.md).
- **A profile file** (`.enc` or `.json`).
- **Widevine CDM** obtained through official channels. BotBrowser does not distribute proprietary modules.
- **ENT Tier2 license** for Widevine CDM integration.

---

<a id="overview"></a>

## Overview

Widevine is Google's Digital Rights Management (DRM) system used by streaming services and other sites to protect video content. When a site requires DRM playback, the browser must have a Widevine Content Decryption Module (CDM) installed. Without it, the site may show errors, refuse to play content, or detect that DRM is unavailable.

DRM capability reporting varies across platforms. The order of `MediaKeySystemAccess` results and the specific configurations supported differ by OS. BotBrowser ensures that DRM capability results are consistent with the profile's platform identity.

### License-challenge policy

Use `--bot-widevine` when a BrowserContext needs an explicit policy for Widevine license challenges:

```bash
--bot-widevine=stub     # Profile-backed default policy
--bot-widevine=send     # Allow the normal challenge when supported
--bot-widevine=block    # Suppress license requests
--bot-widevine=no-cdm   # Disable CDM exposure for the context
```

The policy is entitlement and profile dependent. Apply it before the first page or worker starts. `stub` is the default when the profile enables the Widevine capability.

---

<a id="how-it-works"></a>

## How It Works

### What Widevine CDM Does

The Widevine CDM handles:
- Encrypted Media Extensions (EME) API responses
- License request and response negotiation
- Decryption of protected video streams
- DRM capability reporting

### DRM Capability Consistency

BotBrowser ensures that DRM capability result ordering and reporting are consistent with the profile's platform. A Windows profile reports Windows-appropriate DRM capabilities, an Android profile reports Android-appropriate capabilities.

### Platform Consistency

| Platform | DRM Behavior |
|----------|-------------|
| Windows | Widevine CDM loaded from standard location. License negotiation follows Windows patterns. |
| macOS | Widevine CDM loaded from macOS-specific path. |
| Android | Hardware-backed DRM support reported when profile specifies it. |
| Linux | Widevine CDM path follows Linux conventions. |

---

<a id="quick-start"></a>

## Quick Start

### Ensuring Widevine CDM Availability

1. **Obtain the Widevine CDM** from official sources. BotBrowser does not bundle or distribute the CDM.

2. **Place the CDM** in the expected location for your platform:
   - **Windows:** The CDM is typically located in the BotBrowser installation directory or the user data directory.
   - **macOS:** The CDM follows macOS library conventions.
   - **Linux:** Place the CDM in the standard library path.

3. **Launch BotBrowser** with your profile. BotBrowser detects the installed CDM automatically:

```javascript
import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    "--bot-profile=/path/to/profile.enc",
  ],
});

const page = await browser.newPage();

// Navigate to a DRM-protected streaming site to verify playback works
await page.goto("https://streaming-service.example.com");

await browser.close();
```

---

<a id="common-scenarios"></a>

## Common Scenarios

### Testing DRM-protected content playback

```javascript
const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    "--bot-profile=/path/to/profile.enc",
    "--proxy-server=socks5://user:pass@proxy.example.com:1080",
  ],
});

const page = await browser.newPage();
await page.goto("https://streaming-service.example.com");

// The site should detect DRM support and offer content playback
```

### Verifying DRM capability consistency

To verify DRM protection is working correctly:

1. Launch BotBrowser with a profile and navigate to a DRM-protected streaming service.
2. Confirm that content plays back without errors.
3. Verify on a fingerprint testing site that DRM capability reporting matches the profile's target platform.

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---------|----------|
| Widevine not detected | Ensure the CDM is installed in the correct location for your platform. BotBrowser does not bundle the CDM. |
| DRM playback fails | Verify the CDM version is compatible with the BotBrowser version. |
| DRM capability order differs from expected | The profile defines the expected DRM capability order. Ensure the profile matches the target platform. |
| "Unsupported platform" from streaming site | Check that the profile's platform identity matches a platform the site supports (e.g., Windows, macOS). |

---

<a id="next-steps"></a>

## Next Steps

- [Cross-Platform Profiles](CROSS_PLATFORM_PROFILES.md). Profile portability across operating systems.
- [Advanced Features](../../../ADVANCED_FEATURES.md#chrome-behavior-emulation). Widevine CDM integration details.
- [Device Emulation](DEVICE_EMULATION.md). Control device metrics for platform consistency.

---

**Related documentation:** [Advanced Features](../../../ADVANCED_FEATURES.md) | [Profile Configuration](../../../profiles/PROFILE_CONFIGS.md)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) • [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [Cross Platform Browser Profiles](https://botbrowser.io/docs/platform/cross-platform-profiles/)
