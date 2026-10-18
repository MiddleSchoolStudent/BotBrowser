# History Seeding

> Inject browsing history for authentic session state and consistent browser behavior.

---

<a id="prerequisites"></a>

## Prerequisites

- **BotBrowser binary** installed. See [INSTALLATION.md](../../../INSTALLATION.md).
- **A profile file** (`.enc` or `.json`).
- **PRO license** for the `--bot-inject-random-history` flag.

---

<a id="overview"></a>

## Overview

A browser with no browsing history lacks the session state of a normally used browser. Real browsers accumulate history over days and weeks of usage. Populating history brings session state in line with authentic browsing patterns.

The `--bot-inject-random-history` flag tells BotBrowser to inject synthetic browsing history entries at startup. This populates `window.history.length` and related navigation state with realistic values, making the session consistent with a browser that has been in use over time.

The flag supports two modes:
- **Random mode** (`--bot-inject-random-history` or `=true`): Injects a random number of entries (2-7), producing a `history.length` of 3-8.
- **Precise mode** (`--bot-inject-random-history=15`): Injects exactly the specified number of entries, producing a `history.length` of N+1 (e.g., 15 entries = `history.length` of 16).

---

<a id="quick-start"></a>

## Quick Start

```bash
# Random mode (2-7 entries)
chromium-browser \
  --bot-profile="/path/to/profile.enc" \
  --bot-inject-random-history

# Precise mode (exactly 15 entries, history.length = 16)
chromium-browser \
  --bot-profile="/path/to/profile.enc" \
  --bot-inject-random-history=15
```

```javascript
import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    "--bot-profile=/path/to/profile.enc",
    "--bot-inject-random-history=15", // Or omit "=15" for random mode
  ],
});

const page = await browser.newPage();
await page.goto("https://example.com");

const historyLength = await page.evaluate(() => window.history.length);
console.log("History length:", historyLength); // 16 with =15, or 3-8 with random mode

await browser.close();
```

---

<a id="how-it-works"></a>

## How It Works

1. **History generation.** When the flag is enabled, BotBrowser injects a set of synthetic navigation entries into the browser's session history before the first page load.

2. **Realistic values.** The injected history produces a `window.history.length` value consistent with normal browsing patterns. In random mode, `history.length` ranges from 3 to 8. In precise mode, `history.length` equals the specified count plus one.

3. **Session scope.** History injection applies to each new session. The injected entries do not persist beyond the session lifetime.

### Configuration via profile

You can also enable history injection through the profile configuration instead of the CLI flag:

```jsonc
{
  "configs": {
    "injectRandomHistory": true    // Random mode (2-7 entries)
    // "injectRandomHistory": 15   // Precise mode (15 entries)
  }
}
```

The CLI flag `--bot-inject-random-history` overrides the profile setting.

---

<a id="common-scenarios"></a>

## Common Scenarios

### Combined with cookies and bookmarks

For maximum session authenticity, combine history injection with cookie and bookmark injection:

```javascript
const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    "--bot-profile=/path/to/profile.enc",
    "--proxy-server=socks5://user:pass@proxy.example.com:1080",
    "--bot-inject-random-history",
    `--bot-cookies=${JSON.stringify([
      { url: "https://example.com", name: "consent", value: "accepted", domain: ".example.com" },
    ])}`,
    `--bot-bookmarks=${JSON.stringify([
      { title: "Google", type: "url", url: "https://www.google.com" },
    ])}`,
  ],
});
```

### Per-context history (ENT Tier3)

```javascript
// Browser-level CDP session (required for BotBrowser.* commands)
const client = await browser.newBrowserCDPSession();

const { browserContextIds: before } = await client.send("Target.getBrowserContexts");
const ctx = await browser.newContext();
const { browserContextIds: after } = await client.send("Target.getBrowserContexts");
const ctxId = after.filter((id) => !before.includes(id))[0];

await client.send("BotBrowser.setBrowserContextFlags", {
  browserContextId: ctxId,
  botbrowserFlags: [
    "--bot-profile=/path/to/profile.enc",
    "--bot-inject-random-history",
  ],
});

const page = await ctx.newPage();
await page.goto("https://example.com");
```

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---------|----------|
| `window.history.length` is still 1 | Ensure `--bot-inject-random-history` is in the `args` array, not as a separate option. |
| History not injected with PRO license | Verify your license is active. Check the BotBrowser console output for license errors. |
| Precise count not working | Use `=` syntax: `--bot-inject-random-history=15`. The value must be between 1 and 25. |

---

<a id="next-steps"></a>

## Next Steps

- [Cookie Management](COOKIE_MANAGEMENT.md). Inject cookies for pre-authenticated sessions.
- [Bookmark Seeding](BOOKMARK_SEEDING.md). Populate the bookmarks bar.
- [`--bot-inject-random-history`](../../../CLI_FLAGS.md#flag-bot-inject-random-history). CLI values and availability.

---

**Related documentation:** [CLI Flags Reference](../../../CLI_FLAGS.md) | [Profile Configuration](../../../profiles/PROFILE_CONFIGS.md)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) • [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [Profile Management](https://botbrowser.io/en/blog/profile-management/)
