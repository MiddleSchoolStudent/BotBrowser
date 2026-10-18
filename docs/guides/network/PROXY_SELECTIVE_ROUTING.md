# Proxy Selective Routing

> Control selective proxy routing with regex rules for direct and proxied request paths.

---

<a id="prerequisites"></a>

## Prerequisites

- **BotBrowser PRO license** or higher.
- **BotBrowser binary** with a valid profile loaded via `--bot-profile`.
- **A proxy server** configured via `--proxy-server`.

---

<a id="quick-start"></a>

## Quick Start

Use `--proxy-bypass-rgx` to define URL patterns that should connect directly, without going through the proxy:

```bash
# All .js files connect directly
--proxy-bypass-rgx="\.js(\?|$)"
```

Full launch example:

```javascript
import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    `--bot-profile=${process.env.BOT_PROFILE_PATH}`,
    "--proxy-server=socks5://user:pass@proxy.example.com:1080",
    "--proxy-bypass-rgx=\\.(js|css|png|svg)(\\?|$)",
  ],
});

const page = await browser.newPage();
await page.goto("https://example.com");
await browser.close();
```

---

<a id="how-it-works"></a>

## How It Works

The `--proxy-bypass-rgx` flag accepts a regular expression pattern using RE2 syntax. BotBrowser matches this pattern against both the hostname and the full URL path (including HTTPS URLs) for every outgoing request. Matching requests connect directly, while non-matching requests go through the configured proxy.

### Syntax

- Uses **RE2 regex syntax** (similar to standard regex, but no backreferences or lookaheads).
- Matches against the full URL, including hostname and path.
- Use `|` to combine multiple patterns.
- Escape dots with `\.` to match literal periods.

### CLI vs JavaScript Quoting

In shell (Bash), use quotes around the value:

```bash
--proxy-bypass-rgx="\.js(\?|$)"
```

In JavaScript, do not add extra quotes inside the value. Remember that backslashes need to be doubled in JavaScript strings:

```javascript
// Wrong - quotes become part of the regex
args.push('--proxy-bypass-rgx="\\.js$"');

// Correct
args.push("--proxy-bypass-rgx=\\.js($|\\?)");
```

---

<a id="common-scenarios"></a>

## Common Scenarios

### Routing static assets directly

Send static resources (JavaScript, CSS, images) directly to save proxy bandwidth:

```bash
--proxy-bypass-rgx="\.(js|css|png|jpg|jpeg|gif|svg|woff2?)(\?|$)"
```

### Routing specific domains directly

Connect to CDN or known-safe domains without the proxy:

```bash
--proxy-bypass-rgx="cdn\.|\.googleapis\.com$|\.gstatic\.com$"
```

### Routing specific paths directly

Send API health checks or public endpoints directly:

```bash
--proxy-bypass-rgx="/api/public/|/static/|/health"
```

### Combining multiple patterns

Use `|` (pipe) to combine patterns in a single flag:

```bash
--proxy-bypass-rgx="cdn\.|\.google\.com$|\.(js|css|png)(\?|$)"
```

### Per-context proxy bypass

Apply bypass rules to specific BrowserContexts:

```javascript
// Puppeteer
const client = await browser.target().createCDPSession();

const ctx = await browser.createBrowserContext();
await client.send("BotBrowser.setBrowserContextFlags", {
  browserContextId: ctx._contextId,
  botbrowserFlags: [
    "--bot-profile=/path/to/profile.enc",
    "--proxy-server=socks5://user:pass@proxy.example.com:1080",
    "--proxy-bypass-rgx=\\.static\\.example\\.com$",
  ],
});

const page = await ctx.newPage();
await page.goto("https://example.com");
```

### Dynamic proxy switching with bypass rules

When switching proxies at runtime (ENT Tier3), you can include bypass rules:

```javascript
await client.send("BotBrowser.setBrowserContextProxy", {
  browserContextId: ctx._contextId,
  proxyServer: "socks5://user:pass@proxy.example.com:1080",
  proxyBypassRgx: "cdn\\.example\\.com|/static/",
});
```

### Standard bypass list

In addition to regex-based rules, you can use the standard bypass list syntax with `--proxy-bypass-list`:

```bash
--proxy-bypass-list="localhost;127.0.0.1;*.internal.com"
```

This uses semicolon-separated patterns with wildcard support. It is simpler than regex but less flexible.

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---------|----------|
| Regex not matching expected URLs | Test your pattern against full URLs including protocol (e.g., `https://cdn.example.com/file.js`). |
| JavaScript quoting issues | Do not add shell-style quotes in JavaScript. Double all backslashes. |
| All requests going direct | Check for an overly broad pattern that matches everything. |
| Pattern not applied per-context | Include `--proxy-bypass-rgx` in the `botbrowserFlags` array for the specific context. |
| Need to match HTTPS URLs | The regex matches against the full URL path including HTTPS. No special handling needed. |

---

<a id="next-steps"></a>

## Next Steps

- [Proxy Configuration](PROXY_CONFIGURATION.md). Basic proxy setup and supported protocols.
- [Per-Context Proxy](PER_CONTEXT_PROXY.md). Assign different proxies to different contexts.
- [Dynamic Proxy Switching](DYNAMIC_PROXY_SWITCHING.md). Change proxy at runtime with bypass rules.
- [Proxy and Geolocation](PROXY_GEOLOCATION_ALIGNMENT.md). How geo signals are derived from the proxy IP.
- [CLI Flags Reference](../../../CLI_FLAGS.md). Complete list of all available flags.

---

**Related documentation:** [Advanced Features](../../../ADVANCED_FEATURES.md) | [Dynamic Proxy Switching](../../../ADVANCED_FEATURES.md#dynamic-proxy-switching)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) • [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [Proxy Configuration](https://botbrowser.io/en/blog/proxy-configuration/)
