# 📚 BotBrowser Profile Configuration Guide

This document explains how to configure custom browser properties inside a **BotBrowser profile**, without relying on CDP.

---

## ⚠️ How to Apply Configuration

All configurations are embedded in the `configs` field inside your profile JSON structure. None of the fields in configs are required. Set only the properties you need for your use case.  

> 💡 **Important Note:** BotBrowser only accepts profile input as a file. While you may want to pass a profile via shell command (e.g., `--bot-profile=<(echo '{"x": 1}')`), this is **not** supported due to CLI argument length and file descriptor limitations.  
> ✅ **Best practice:** Build your profile JSON dynamically in your code, write it to a temporary file (e.g., `/tmp/myprofile.json`), and pass the path to `--bot-profile`. The file can be deleted afterward.  


---

## 🛠️ Configurable Fields

### General Settings

| Field                           | Description                                                                               | Default     |
| ------------------------------- | ----------------------------------------------------------------------------------------- | ----------- |
| `locale`                        | Browser locale (e.g., `"en-US"`, `"ru-RU"`).                                              | `"en-US"`   |
| `languages`                     | HTTP `Accept-Language` header values and `navigator.languages`.                           | `["en-US"]` |
| `colorScheme`                   | Preferred color scheme: `'light'` or `'dark'`.                                            | `"light"`   |
| `disableDeviceScaleFactorOnGUI` | If `true`, ignore device scale factor for GUI elements (disable DPI-based UI scaling).    | `false`     |
| `timezone`                      | `"auto"` = IP-based; `"real"` = system timezone; any other string = custom timezone name. | `"auto"`    |
| `location`                      | `"auto"` = IP-based; `"real"` = system (GPS); object = custom coordinates (`lat`, `lon`). | `"auto"`    |

### Proxy Settings

| Field            | Description                               | Default |
| ---------------- | ----------------------------------------- | ------- |
| `proxy.server`   | Proxy server address (`scheme://hostname:port`).   | `""`    |
| `proxy.username` | Proxy username for basic auth (optional). | `""`    |
| `proxy.password` | Proxy password for basic auth (optional). | `""`    |

> 💡 **Tip:** If you prefer not to embed proxy settings in your profile, you can use BotBrowser’s CLI parameters instead:
>
> ```bash
> --proxy-server <hostname:port>
> --proxy-username <user>
> --proxy-password <pass>
> ```


### Window & Screen Settings

| Field    | Description                                                                                              | Default     |
| -------- | -------------------------------------------------------------------------------------------------------- | ----------- |
| `window` | `"profile"` = use profile’s dimensions;`"real"` = use system window size;object = custom dims.           | `"profile"` |
| `screen` | `"profile"` = use profile’s screen metrics;`"real"` = use system screen metrics;object = custom metrics. | `"profile"` |

### Engine & Device Simulation

| Field          | Description                                                                              | Default     |
| -------------- | ---------------------------------------------------------------------------------------- | ----------- |
| `webrtc`       | `"profile"` = profile’s WebRTC config;`"real"` = native WebRTC;`"disabled"` = no WebRTC. | `"profile"` |
| `fonts`        | `"profile"` = profile’s embedded font list;`"real"` = system-installed fonts.            | `"profile"` |
| `webgl`        | `"profile"` = profile’s WebGL parameters;`"real"` = system WebGL;`"disabled"` = off.     | `"profile"` |
| `webgpu`       | Same semantics as `webgl`.                                                               | `"profile"` |
| `mediaDevices` | `"profile"` = fake camera/mic devices;`"real"` = actual system devices.                  | `"profile"` |
| `speechVoices` | `"profile"` = profile’s TTS voices;`"real"` = system voices.                             | `"profile"` |

### Noise Toggles

| Field               | Description                             | Default |
| ------------------- | --------------------------------------- | ------- |
| `noiseCanvas`       | Add subtle noise to Canvas fingerprint. | `true`  |
| `noiseWebglImage`   | Add noise to WebGL image fingerprint.   | `true`  |
| `noiseAudioContext` | Add noise to AudioContext fingerprint.  | `true`  |
| `noiseClientRects`  | Add noise to client rects fingerprint.  | `false` |
| `noiseTextRects`    | Add noise to TextRects fingerprint.     | `true`  |

---

## ✨ Example Profile `configs` Block

```json5
{
  "configs": {
    // Browser locale
    "locale": "en-US",

    // Accept-Language header values
    "languages": ["en-US"],

    // Color scheme: 'light' or 'dark'
    "colorScheme": "light",

    // Proxy settings: hostname:port, with optional basic auth
    "proxy": {
      "server": "1.2.3.4:8080",
      "username": "",
      "password": ""
    },

    // Disable GUI scaling based on device scale factor (ignore DevicePixelRatio for UI scaling)
    "disableDeviceScaleFactorOnGUI": false,

    // timezone: 'auto' = based on IP; 'real' = system timezone; any other string = custom
    "timezone": "auto",

    // location: 'auto' = based on IP; 'real' = system (GPS) location;
    // object = custom coordinates
    "location": "auto", // or "real" or { latitude: 48.8566, longitude: 2.3522 }

    // window: 'profile' = use profile’s dimensions;
    // 'real' = use system window size;
    // object = custom dimensions
    "window": "profile", // or "real" or { innerWidth: 1280, innerHeight: 720, outerWidth: 1280, outerHeight: 760, screenX: 100, screenY: 50, devicePixelRatio: 1 }

    // screen: 'profile' = use profile’s screen metrics;
    // 'real' = use system screen metrics;
    // object = custom metrics
    "screen": "profile", // or "real" or { width: 1280, height: 720, colorDepth: 24, pixelDepth: 24 }

    // WebRTC: 'profile' = profile’s settings; 'real' = native; 'disabled' = no WebRTC
    "webrtc": "profile",

    // Fonts: 'profile' = profile’s embedded list; 'real' = system-installed fonts
    "fonts": "profile",

    // WebGL: 'profile' = profile’s parameters; 'real' = system implementation; 'disabled' = off
    "webgl": "profile",

    // WebGPU: same semantics as WebGL
    "webgpu": "profile",

    // Media devices: 'profile' = fake camera/mic devices; 'real' = actual system devices
    "mediaDevices": "profile",

    // Speech voices: 'profile' = profile’s synthetic voices; 'real' = system voices
    "speechVoices": "profile",

    // noiseCanvas: true adds subtle noise to Canvas fingerprint; false disables it
    "noiseCanvas": true,

    // noiseWebglImage: true adds noise to WebGL image fingerprint; false disables it
    "noiseWebglImage": true,

    // noiseAudioContext: true adds noise to AudioContext fingerprint; false disables it
    "noiseAudioContext": true,

    // noiseClientRects: true adds noise to clientRects fingerprint; false disables it
    "noiseClientRects": false,

    // noiseTextRects: true adds noise to TextRects fingerprint; false disables it
    "noiseTextRects": true
  }
}


```

⚠️ Open the `.enc` file and place the `configs` block before the `key` block, keeping the entire .enc file in JSON format:

<img width="758" alt="image" src="https://github.com/user-attachments/assets/e34b1557-d7cd-4257-b709-b76ec1b0409b" />

---

⚠️ Eventually, your modified `.enc` profile should have this structure:

```json5
{
  "configs": {
    // ...
  },
  "key": {
    // ...
  },
  "version": {
    // ...
  },
  "profile": {
    // ...
  }
}
```



---

## 📌 Notes
- All string fields support multi-purpose values: string literal (`"auto"`, `"real"`, or custom), or object schema when more parameters are needed.
- If a field is omitted, BotBrowser uses profile defaults where appropriate.
- Values in the `configs` block **override** equivalent command-line arguments like `--window-size`, `--window-position`, etc.

---

## 🔥 Best Practice
- Always adjust **window size** and **screen size** together to avoid suspicious fingerprint gaps.
- Match `timezone` and `location` to your proxy’s region to avoid fingerprint inconsistencies.
- Set a realistic **devicePixelRatio** based on the system being emulated (e.g., 2 for macOS Retina, 1 for standard monitors).
- Always define proxy credentials if using authenticated proxies to avoid connection leaks.
- 🗂️ If you're generating a profile in code, **save it as a temporary file** (e.g., `/tmp/myprofile.json`) and pass the file path via `--bot-profile`. Avoid piping large JSON blobs via `echo`, as this is unsupported and unstable.
