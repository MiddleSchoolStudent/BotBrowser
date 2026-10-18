# Custom HTTP Headers

> Configure custom browser request headers for all outgoing traffic while keeping header profiles consistent across sessions.

---

<a id="prerequisites"></a>

## Prerequisites

- **BotBrowser PRO license** or higher.
- **BotBrowser binary** with a valid profile loaded via `--bot-profile`.

---

<a id="quick-start"></a>

## Quick Start

### Via CLI flag

Pass custom headers as a JSON object at launch:

```bash
--bot-custom-headers='{"X-Custom-Header":"value","X-Another":"value2"}'
```

### Via Playwright

```javascript
import { chromium } from "playwright-core";

const customHeaders = { "X-Requested-With": "com.example.app" };

const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    `--bot-profile=${process.env.BOT_PROFILE_PATH}`,
    "--bot-custom-headers=" + JSON.stringify(customHeaders),
  ],
});

const page = await browser.newPage();
await page.goto("https://example.com");
await browser.close();
```

> **Important:** In JavaScript, do not wrap the JSON value in extra quotes. The shell-style single quotes shown in CLI examples are for Bash only.

```javascript
// Wrong - single quotes become part of the value
args.push(`--bot-custom-headers='${JSON.stringify(customHeaders)}'`);

// Correct
args.push("--bot-custom-headers=" + JSON.stringify(customHeaders));
```

---

<a id="how-it-works"></a>

## How It Works

Custom headers are applied to all HTTP and HTTPS requests. They can override existing headers or add new ones.

### Configuration Methods

There are three ways to configure custom headers, listed by priority:

1. **CDP commands** (runtime, highest flexibility). Modify headers without restarting the browser.
2. **CLI flag** (`--bot-custom-headers`). Set at launch time.
3. **Profile JSON** (`configs.customHeaders`). Stored in the profile file.

### CORS Preflight Consideration

Adding non-standard headers to requests may trigger CORS preflight requests on some websites. This is standard browser behavior. The preflight request (OPTIONS method) checks whether the server allows the custom header. If the server does not include the header name in `Access-Control-Allow-Headers`, the request may fail.

---

<a id="common-scenarios"></a>

## Common Scenarios

### Managing headers at runtime with CDP

Use CDP commands to add, modify, or remove headers without restarting the browser. These commands must be sent to the **browser-level** CDP session.

**Playwright:**

```javascript
const cdpSession = await browser.newBrowserCDPSession();

// Set all custom headers (replaces any existing ones)
await cdpSession.send("BotBrowser.setCustomHeaders", {
  headers: { "X-Requested-With": "com.example.app", "X-Session-Id": "abc123" },
});

// Get current custom headers
const result = await cdpSession.send("BotBrowser.getCustomHeaders");
console.log(result.headers);

// Add or update a single header
await cdpSession.send("BotBrowser.addCustomHeader", {
  name: "X-New-Header",
  value: "new-value",
});

// Remove a single header
await cdpSession.send("BotBrowser.removeCustomHeader", {
  name: "X-Session-Id",
});

// Clear all custom headers
await cdpSession.send("BotBrowser.clearCustomHeaders");
```

**Puppeteer:**

```javascript
const cdpSession = await browser.target().createCDPSession();

// Set all custom headers
await cdpSession.send("BotBrowser.setCustomHeaders", {
  headers: { "X-Requested-With": "com.example.app" },
});

// Add a single header
await cdpSession.send("BotBrowser.addCustomHeader", {
  name: "X-Token",
  value: "my-token",
});

// Remove a single header
await cdpSession.send("BotBrowser.removeCustomHeader", {
  name: "X-Token",
});
```

> **Note:** CDP header commands must be sent to the browser-level session. Sending them to a page-level session will return `ProtocolError: 'BotBrowser.setCustomHeaders' wasn't found`.

### Per-context custom headers

Assign different headers to different BrowserContexts using `botbrowserFlags`:

```javascript
// Puppeteer
const client = await browser.target().createCDPSession();

// Context 1: App A headers
const ctx1 = await browser.createBrowserContext();
await client.send("BotBrowser.setBrowserContextFlags", {
  browserContextId: ctx1._contextId,
  botbrowserFlags: [
    "--bot-profile=/path/to/profile.enc",
    '--bot-custom-headers={"X-Requested-With":"com.app.one"}',
  ],
});

// Context 2: App B headers
const ctx2 = await browser.createBrowserContext();
await client.send("BotBrowser.setBrowserContextFlags", {
  browserContextId: ctx2._contextId,
  botbrowserFlags: [
    "--bot-profile=/path/to/profile.enc",
    '--bot-custom-headers={"X-Requested-With":"com.app.two"}',
  ],
});
```

### Available CDP commands

| Command | Description |
|---------|-------------|
| `BotBrowser.setCustomHeaders` | Replace all custom headers with the provided set. |
| `BotBrowser.getCustomHeaders` | Retrieve the current custom headers. |
| `BotBrowser.addCustomHeader` | Add or update a single header by name. |
| `BotBrowser.removeCustomHeader` | Remove a single header by name. |
| `BotBrowser.clearCustomHeaders` | Remove all custom headers. |

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---------|----------|
| `setCustomHeaders` not found | Send CDP commands to the browser-level session, not a page-level session. |
| Headers not appearing in requests | Verify JSON format is correct. In JavaScript, do not add extra quotes around the value. |
| CORS errors after adding headers | Non-standard headers may trigger preflight requests. The target server must allow them via `Access-Control-Allow-Headers`. |
| Headers from CLI not applied | Check JSON syntax. The value must be valid JSON with string key-value pairs. |

---

<a id="next-steps"></a>

## Next Steps

- [Proxy Configuration](PROXY_CONFIGURATION.md). Basic proxy setup and supported protocols.
- [Port Protection](PORT_PROTECTION.md). Protect local service ports from being scanned.
- [CLI Flags Reference](../../../CLI_FLAGS.md). Complete list of all available flags.
- [CDP Quick Reference](../../../ADVANCED_FEATURES.md#cdp-quick-reference). All available CDP commands.

---

**Related documentation:** [Advanced Features](../../../ADVANCED_FEATURES.md) | [CDP Quick Reference](../../../ADVANCED_FEATURES.md#cdp-quick-reference)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) • [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [Proxy Configuration](https://botbrowser.io/en/blog/proxy-configuration/)
