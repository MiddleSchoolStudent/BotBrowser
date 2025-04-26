# BotBrowser Profiles

## ⚠️ Important Notice About Profiles

### 🚨 Public Profile Warning
> **Note**: Public demo profiles are suitable for testing only.
> Using them in production environments **will result in immediate account bans** because they are widely circulated and easily flagged.
> Protect your business by using private, authentic profiles.

### 🌟 Premium Profile Service
> Access our exclusive pool of **300,000+ authentic browser fingerprints** sourced from real users (not algorithm-generated). Each profile is:
> - ✅ Unique and never reused
> - 🔒 Private and secure
> - 👤 Based on genuine device/browser data
> - 🛡️ Safe for production and scalable automation

### 📬 How to Get Premium Profiles
| 📧 Email | [middleschoolstudent@mail.ru](mailto:middleschoolstudent@mail.ru) |
|----------|-----------------------------------------------------------|
| 📱 Telegram | [middle_student](https://t.me/middle_student) |

*We ensure fast delivery, confidentiality, and professional support for all clients.*

---

## 📚 How to Use Profiles

**Launch BotBrowser with a Profile:**

```bash
chromium --bot-profile="{absolute_path_of_}/chrome135_win11_x64.enc"
```

---

## 📖 Important: Customize Your Profile Configurations

Starting from 2025, BotBrowser now supports **full environment customization directly inside profiles** — including proxy, timezone, screen size, device pixel ratio, and more.

👉 **Please read** [`profile-configs.md`](https://github.com/MiddleSchoolStudent/BotBrowser/blob/main/profiles/profile-configs.md) **for full configuration options.**

You no longer need CDP to set these fields manually!

---

## ✨ Major Features (Updated 2025)

### 🛠️ Unique Capabilities

- [x] **Bypass Incognito mode checks**
- [x] **Avoid CDP leaks** — native CDP fingerprint protection
- [x] **Custom page history** — enhance fingerprint realism
- [x] **Keep pages active** even when they lose focus
- [x] **Set proxy (host, username, password) directly via profile**
- [x] **Set language and timezone** based on proxy or manually
- [x] **WebRTC leak protection**
- [x] **Canvas / WebGL noise injection**
- [x] **Audio fingerprinting noise** (enhanced to bypass FunCaptcha)
- [x] **Control scroll bar width**
- [x] **Bypass CDM (Content Decryption Module) detection**
- [x] **Customizable remote-debugging-address** (bind to 0.0.0.0 for Scraping APIs)
- [x] **Full window/screen size control via profile**
- [x] **Advanced matchMedia simulation** — bypass complex CSS feature detection
- [x] **Android fingerprint simulation** — real mobile device behavior emulation
- [x] **Precision GPU and WebGL parameter spoofing**

---

### 🧐 Fingerprints Covered

| Category        | Details |
|-----------------|---------|
| **Browser**     | Version, userAgentData, userAgent |
| **OS**          | Windows, macOS, Ubuntu, Android simulation |
| **Navigator**   | Languages, Plugins, Permissions, Battery, Keyboard |
| **Graphics**    | WebGL, WebGL2, GPUAdapter, GPUDevice |
| **Hardware**    | Screen, CPU, System Fonts, System Colors |
| **Media**       | MediaDevices, MimeTypes, AudioContext |
| **Other**       | Emoji, Unicode, matchMedia control |

---

## 📌 Best Practices

- Use **private profiles** for any production traffic.
- Set realistic **screen size, devicePixelRatio, proxy settings** inside your profile.
- Use updated **Android profiles** for mobile-specific operations.
- Regularly update your profiles to stay synchronized with Chrome’s latest versions.

---

BotBrowser profiles — giving you total control over your fingerprint. 🚀
