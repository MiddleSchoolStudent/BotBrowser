# 📚 BotBrowser Profile Configuration Guide

This document explains how to configure custom browser properties inside a **BotBrowser profile**, without relying on CDP.

---

## ⚠️ How to Apply Configuration

All configurations are embedded in the `configs` field inside your profile JSON structure.

> 💡 **Important Note:** BotBrowser only accepts profile input as a file. While you may want to pass a profile via shell command (e.g., `--bot-profile=<(echo '{"x": 1}')`), this is **not** supported due to CLI argument length and file descriptor limitations.
>
> ✅ **Best practice:** Build your profile JSON dynamically in your code, write it to a temporary file (e.g., `/tmp/myprofile.json`), and pass the path to `--bot-profile`. The file can be deleted afterward.


---

## 🛠️ Configurable Fields

### General Settings
| Field | Description | Example |
|:-----|:------------|:--------|
| `locale` | Browser locale setting. | `"en-US"` |
| `autoTimezone` | Enable or disable automatic timezone detection. | `true` |
| `timezone` | Timezone name for the browser session. | `"America/New_York"` |
| `languages` | Array of accepted languages (HTTP Accept-Language and navigator.languages). | `["en-US", "ru-RU"]` |
| `colorScheme` | Preferred color scheme for the browser. Can be set to `'light'` or `'dark'`. | `"light"` |


### Proxy Settings
| Field | Description | Example |
|:-----|:------------|:--------|
| `proxy.server` | Proxy server address (with port). | `"proxy.example.com:8080"` |
| `proxy.username` | Proxy authentication username (optional). | `"user"` |
| `proxy.password` | Proxy authentication password (optional). | `"pass"` |

### Window and Screen Settings
| Field | Description | Example |
|:-----|:------------|:--------|
| `skipWindowAndScreenSizes` | If `true`, BotBrowser ignores window/screen overrides and allows CDP to control them. If `false`, BotBrowser uses profile values. ⚠️ In headful mode, this value defaults to `true`. | `false` |

#### `window` Object
Controls browser window dimensions and positioning.
| Field | Description | Example |
|:-----|:------------|:--------|
| `innerWidth` | `window.innerWidth` | `1203` |
| `innerHeight` | `window.innerHeight` | `743` |
| `outerWidth` | `window.outerWidth` | `1203` |
| `outerHeight` | `window.outerHeight` | `830` |
| `screenX` | Horizontal position relative to screen. | `43` |
| `screenY` | Vertical position relative to screen. | `79` |
| `devicePixelRatio` | Screen pixel density. | `2` |

#### `screen` Object
Controls screen properties exposed by `window.screen`.
| Field | Description | Example |
|:-----|:------------|:--------|
| `availWidth` | `screen.availWidth` | `1512` |
| `availHeight` | `screen.availHeight` | `944` |
| `availLeft` | `screen.availLeft` | `0` |
| `availTop` | `screen.availTop` | `38` |
| `width` | `screen.width` | `1512` |
| `height` | `screen.height` | `982` |
| `colorDepth` | `screen.colorDepth` | `30` |
| `pixelDepth` | `screen.pixelDepth` | `30` |

---

## ✨ Example Profile `configs` Block

```json
"configs": {
  "locale": "en-US",
  "autoTimezone": true,
  "timezone": "America/New_York",
  "languages": ["en-US", "ru-RU"],
  "colorScheme": "light",
  "proxy": {
    "server": "proxy.example.com:8080",
    "username": "user",
    "password": "pass"
  },
  "skipWindowAndScreenSizes": false,
  "window": {
    "innerWidth": 1203,
    "innerHeight": 743,
    "outerWidth": 1203,
    "outerHeight": 830,
    "screenX": 43,
    "screenY": 79,
    "devicePixelRatio": 2
  },
  "screen": {
    "availWidth": 1512,
    "availHeight": 944,
    "availLeft": 0,
    "availTop": 38,
    "width": 1512,
    "height": 982,
    "colorDepth": 30,
    "pixelDepth": 30
  }
}
```

⚠️ Open the `.enc` file and place the `configs` block before the `key` block, keeping the entire .enc file in JSON format:

<img width="758" alt="image" src="https://github.com/user-attachments/assets/e34b1557-d7cd-4257-b709-b76ec1b0409b" />

---

⚠️ Eventually, your modified `.enc` profile should have this structure:

```json
{
  "configs": { ... },
  "key": { ... },
  "version": { ... },
  "profile": { ... }
}
```



---

## 📌 Notes
- Setting `skipWindowAndScreenSizes` to `true` means **you must manually manage window and screen properties via CDP**.
- If omitted, BotBrowser will apply reasonable defaults based on the system and profile.
- Values in the `configs` block **override** equivalent command-line arguments like `--window-size`, `--window-position`, etc.

---

## 🔥 Best Practice
- Always adjust **window size** and **screen size** together to avoid suspicious fingerprint gaps.
- Set a realistic **devicePixelRatio** based on the system being emulated (e.g., 2 for macOS Retina, 1 for standard monitors).
- Always define proxy credentials if using authenticated proxies to avoid connection leaks.
- 🗂️ If you're generating a profile in code, **save it as a temporary file** (e.g., `/tmp/myprofile.json`) and pass the file path via `--bot-profile`. Avoid piping large JSON blobs via `echo`, as this is unsupported and unstable.
