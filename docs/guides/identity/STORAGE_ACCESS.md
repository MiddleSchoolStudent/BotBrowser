# Plaintext Storage Access

> Read browser storage data (cookies, passwords, credit cards, LocalStorage) directly from disk after a BotBrowser session.

---

<a id="prerequisites"></a>

## Prerequisites

- **BotBrowser ENT Tier1** or higher. Plaintext storage mode is only available on ENT Tier1+.
- **A profile file** (`.enc`) loaded via `--bot-profile`.
- **Node.js** with `better-sqlite3` and `level` packages installed.

```bash
npm install better-sqlite3 level
```

---

<a id="quick-start"></a>

## Quick Start

Run a BotBrowser session with a known `--user-data-dir`, then read the stored data after the browser closes:

```bash
# 1. Launch BotBrowser with a known user data directory
chromium-browser \
    --bot-profile="/path/to/profile.enc" \
    --user-data-dir="/tmp/bb-session" \
    "https://example.com"

# 2. After the session, read cookies
node read_cookies.js "/tmp/bb-session" ".example.com"

# 3. Read saved passwords
node read_passwords.js "/tmp/bb-session"
```

Example scripts are available in [examples/storage-access/](../../../examples/storage-access/).

---

<a id="how-it-works"></a>

## How It Works

Standard Chromium encrypts browser storage (cookies, passwords, credit cards) using OS-level credential managers (DPAPI on Windows, Keychain on macOS, Secret Service on Linux). This makes it impossible to read storage data programmatically from disk.

ENT Tier1 profiles enable plaintext storage mode. Data is stored with a `v00` prefix followed by the raw value, allowing direct programmatic access without decryption:

```
v00<actual_value>
```

### Storage locations

| Data Type | File Path | Format |
|-----------|-----------|--------|
| Cookies | `User Data/Default/Cookies` | SQLite |
| Passwords | `User Data/Default/Login Data` | SQLite |
| Credit Cards | `User Data/Default/Web Data` | SQLite |
| LocalStorage | `User Data/Default/Local Storage/leveldb/` | LevelDB |
| IndexedDB | `User Data/Default/IndexedDB/` | LevelDB |

---

<a id="common-scenarios"></a>

## Common Scenarios

### Extract session cookies for API replay

```javascript
const puppeteer = require("puppeteer-core");
const { readCookies, toHeaderString } = require("./read_cookies");

const userDataDir = "/tmp/bb-session";

const browser = await puppeteer.launch({
    executablePath: process.env.BOTBROWSER_EXEC_PATH,
    args: [
        `--bot-profile=${process.env.BOT_PROFILE_PATH}`,
        `--user-data-dir=${userDataDir}`,
    ],
});

const page = await browser.newPage();
await page.goto("https://example.com/login");
// ... perform login flow
await browser.close();

// Read cookies from disk after browser closes
const cookies = readCookies(userDataDir, ".example.com");
const cookieHeader = toHeaderString(cookies, "example.com");
console.log("Cookie:", cookieHeader);
```

### Filter cookies by domain

```bash
# All cookies
node read_cookies.js "/tmp/bb-session"

# Only .github.com cookies
node read_cookies.js "/tmp/bb-session" ".github.com"
```

### Read saved credentials

```bash
node read_passwords.js "/tmp/bb-session"
```

### Read LocalStorage for a specific origin

```bash
node read_localstorage.js "/tmp/bb-session" "https://example.com"
```

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---------|----------|
| Cookie values are encrypted (not `v00` prefix) | Verify your license is ENT Tier1 or above. Plaintext storage is only available on ENT Tier1+. |
| `SQLITE_BUSY` or locked database | Ensure the browser is fully closed before reading. Chromium holds a lock on SQLite databases while running. |
| `better-sqlite3` installation fails | The package requires native compilation. Install build tools: `apt install build-essential` (Linux) or Xcode Command Line Tools (macOS). |
| LocalStorage empty for expected origin | LocalStorage uses LevelDB, which may compact data. Check that the origin matches exactly (including protocol). |

---

<a id="security-notes"></a>

## Security Notes

Handle extracted data responsibly:

- Store credentials securely and never commit them to version control
- Use for authorized testing and debugging only
- Delete extracted data when no longer needed
- Add user data directories to `.gitignore`

---

<a id="next-steps"></a>

## Next Steps

- [Cookie Management](COOKIE_MANAGEMENT.md). Inject cookies at launch with `--bot-cookies`.
- [Automation Consistency Practices](../getting-started/AUTOMATION_CONSISTENCY.md). Reduce framework-related inconsistency signals.
- [Storage Access Examples](../../../examples/storage-access/). Complete example scripts for cookies, passwords, credit cards, and LocalStorage.
- [CLI Flags Reference](../../../CLI_FLAGS.md). Complete list of all available flags.

---

**Related documentation:** [Storage Access Examples](../../../examples/storage-access/) | [`--bot-cookies`](../../../CLI_FLAGS.md#flag-bot-cookies)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) • [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [Profile Management](https://botbrowser.io/en/blog/profile-management/)
