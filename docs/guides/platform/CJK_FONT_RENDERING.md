# CJK Font Rendering

> Chinese, Japanese, and Korean font rendering considerations for consistent cross-platform fingerprint protection.

---

<a id="prerequisites"></a>

## Prerequisites

- **BotBrowser binary** installed. See [INSTALLATION.md](../../../INSTALLATION.md).
- **A profile file** (`.enc` or `.json`).

---

## Quick Start

```bash
chromium-browser \
  --bot-profile="/path/to/profile.enc"
```

Use this as a minimal baseline, then apply the cjk font rendering configuration shown below.

<a id="overview"></a>

## Overview

CJK (Chinese, Japanese, Korean) characters present unique challenges for cross-platform consistency. These writing systems use thousands of distinct glyphs with complex shaping rules. Each operating system ships different CJK fonts with different metrics, different fallback chains, and different rendering behaviors. Text measurement results can vary significantly across platforms.

BotBrowser can reduce these differences with profile-backed CJK font bundles and the font-rendering integrations available to the active profile and host. The resulting metrics depend on the profile's target platform, host support, and fallback policy; cross-host parity is a supported goal for eligible configurations, not a guarantee for every profile or rendering surface.

---

<a id="how-it-works"></a>

## How It Works

BotBrowser uses the CJK fonts available in the profile's embedded bundle when the profile and host support that mode. A Windows-target profile does not by itself make every host behave like Windows: cross-platform profile portability for Linux hosts requires ENT Tier1, and Android font support is PRO. Fallback can also change the result: `--bot-fonts=profile` keeps the profile inventory authoritative, `--bot-fonts=expand` permits host-system fallback, and `--bot-fonts=real` uses system fonts without profile font protection.

Supported text-rendering paths integrate platform font fallback and shaping controls, but coverage is not identical across every CJK surface or host. Canvas and DOM measurements should therefore be verified with the exact profile, host, entitlement, and font mode used in production.

---

<a id="common-scenarios"></a>

## Common Scenarios

### Japanese site with Windows profile on Linux

```javascript
import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    "--bot-profile=/path/to/windows-profile.enc",
    "--proxy-server=socks5://user:pass@jp-proxy.example.com:1080",
    "--bot-timezone=Asia/Tokyo",
    "--bot-locale=ja-JP",
    "--bot-languages=ja-JP,en-US,en",
  ],
});

const page = await browser.newPage();
await page.goto("https://example.jp");

// Verify on a fingerprint testing site that text metrics match
// the profile's target platform, not the host OS

await browser.close();
```

### Chinese site with macOS profile

```javascript
const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    "--bot-profile=/path/to/macos-profile.enc",
    "--proxy-server=socks5://user:pass@cn-proxy.example.com:1080",
    "--bot-timezone=Asia/Shanghai",
    "--bot-locale=zh-CN",
    "--bot-languages=zh-CN,zh,en-US,en",
  ],
});
```

### Verifying CJK consistency across platforms

To verify CJK font consistency:

1. Launch BotBrowser with the same profile on different host operating systems (Windows, macOS, Linux).
2. Visit a CJK-heavy site or a fingerprint testing tool such as [BrowserLeaks](https://browserleaks.com/) or [CreepJS](https://abrahamjuliot.github.io/creepjs/).
3. Compare CJK text metrics on the exact hosts and profile modes you plan to use. Treat matching output as configuration-specific evidence; do not assume it generalizes to other hosts, profiles, font modes, or rendering surfaces.

### Measure the glyph metrics instead of eyeballing the page

Rendering that looks identical can still measure differently, and text width is the value a page reads. Compare `measureText` output and a canvas hash across hosts:

```javascript
const sample = "日本語のテキスト幅 中文文本宽度 한국어 텍스트 폭";
const canvas = new OffscreenCanvas(300, 60);
const ctx = canvas.getContext("2d");

ctx.font = '24px "Noto Sans CJK JP", sans-serif';
const width = ctx.measureText(sample).width;
const inkWidth = ctx.measureText(sample).actualBoundingBoxLeft +
  ctx.measureText(sample).actualBoundingBoxRight;

ctx.fillText(sample, 10, 40);
const pixels = ctx.getImageData(0, 0, 300, 60).data;
let checksum = 0;
for (let i = 0; i < pixels.length; i += 97) checksum = (checksum * 31 + pixels[i]) | 0;

console.log({ width, inkWidth, checksum });
```

Run the same snippet with the same profile, `--bot-fonts` mode, and BotBrowser version on each host. Equal `width` and `inkWidth` with a matching `checksum` is the evidence that the font bundle, fallback chain, and shaping path all came from the profile. A width difference of a few tenths of a pixel is normal subpixel positioning; a difference of whole pixels, or a different `checksum`, means one host fell back to a system CJK font.

Two details decide whether this test is meaningful:

- Pin the family name you measure. If you measure `sans-serif` you are measuring the host's fontconfig resolution order, not the profile bundle. Name the family the profile ships.
- Measure on the surfaces you ship. DOM text and canvas text use different shaping paths, so a matching canvas hash does not by itself prove that `getBoundingClientRect()` widths match.

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---------|----------|
| CJK characters render as boxes | The profile may not include CJK font bundles. Use a profile version that includes CJK support. |
| Text width differs across platforms | Verify both hosts use the same BotBrowser version and profile. Font engine updates between versions can affect metrics. |
| Mixed CJK/Latin text inconsistency | This typically involves fallback chain differences. Ensure the profile's font configuration includes appropriate CJK and Latin fonts. |
| Rare Unicode characters render differently | Some rare CJK characters may fall through to system fonts on certain platforms. Report these cases for inclusion in future font bundle updates. |

---

<a id="next-steps"></a>

## Next Steps

- [Font Fingerprinting](../fingerprint/FONT.md). Font protection overview, CLI flags, and noise configuration.
- [Cross-Platform Profiles](CROSS_PLATFORM_PROFILES.md). Full details on profile portability across operating systems.
- [Windows on Mac/Linux](WINDOWS_ON_MAC_LINUX.md). Running Windows profiles on non-Windows hosts.
- [Advanced Features](../../../ADVANCED_FEATURES.md#cross-platform-font-engine). Technical details on the font engine.

---

**Related documentation:** [Advanced Features](../../../ADVANCED_FEATURES.md) | [Profile Configuration](../../../profiles/PROFILE_CONFIGS.md)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) • [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [How CJK Font Rendering Reveals Your Real OS in Browser Fingerprints](https://botbrowser.io/en/blog/cjk-font-rendering/)
