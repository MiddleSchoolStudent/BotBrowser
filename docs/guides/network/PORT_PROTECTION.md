# Port Protection

> Block remote pages from scanning localhost and internal service ports during browser sessions.

---

<a id="prerequisites"></a>

## Prerequisites

- **BotBrowser PRO license** or higher.
- **BotBrowser binary** with a valid profile loaded via `--bot-profile`.

---

<a id="quick-start"></a>

## Quick Start

Enable port protection with a single flag:

```javascript
import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    `--bot-profile=${process.env.BOT_PROFILE_PATH}`,
    "--bot-port-protection",
  ],
});

const page = await browser.newPage();
await page.goto("https://example.com");
await browser.close();
```

You can also enable it via profile JSON by setting `configs.portProtection` to `true`.

---

<a id="how-it-works"></a>

## How It Works

When port protection is enabled, BotBrowser prevents remote pages from detecting which services are running on localhost. Connection attempts to commonly-probed ports behave consistently across all loopback addresses, protecting your local environment from being profiled by remote pages.

---

<a id="common-scenarios"></a>

## Common Scenarios

### Enabling via CLI flag

```bash
--bot-port-protection
```

### Enabling via profile configuration

Set in your profile JSON:

```json
{
  "configs": {
    "portProtection": true
  }
}
```

### Combined with proxy

```bash
chromium-browser \
  --bot-profile="/path/to/profile.enc" \
  --bot-port-protection \
  --proxy-server=socks5://user:pass@proxy.example.com:1080
```

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---------|----------|
| Port protection not working | Verify the flag is included in launch args, or check that `configs.portProtection` is set in the profile. |
| Local development tools cannot connect | Port protection only affects connections initiated by web pages. Local tools connecting directly are not affected. |
| Specific port not protected | The feature covers the most commonly-probed ports. If you need additional coverage, contact support. |

---

<a id="next-steps"></a>

## Next Steps

- [WebRTC Leak Prevention](WEBRTC_LEAK_PREVENTION.md). Prevent real IP disclosure through WebRTC.
- [DNS Leak Prevention](DNS_LEAK_PREVENTION.md). Prevent DNS queries from leaking outside the proxy tunnel.
- [Proxy Configuration](PROXY_CONFIGURATION.md). Basic proxy setup and supported protocols.
- [CLI Flags Reference](../../../CLI_FLAGS.md). Complete list of all available flags.

---

**Related documentation:** [Advanced Features: Port Protection](../../../ADVANCED_FEATURES.md#port-protection)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) • [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [Proxy Configuration](https://botbrowser.io/en/blog/proxy-configuration/)
