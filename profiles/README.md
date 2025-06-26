# BotBrowser Profiles

> 📢 In BotBrowser, everything starts with a profile. Your stealth, reliability, and success depend on it.

Profiles in BotBrowser are encrypted files that define the complete environment a browser instance should emulate.  
They not only include detailed **browser fingerprint** information (like user agent, WebGL, screen size, and more), but also extend to **system-level settings** such as proxy configuration, timezone, language preferences, window size, screen properties, device memory, CPU architecture, and even platform-specific features like Android behavior simulation.  

By using a profile, BotBrowser can launch sessions that mimic real human devices and browsing patterns across different operating systems and devices, achieving maximum stealth against even the most sophisticated antifraud and antibot detection systems.

👉 **In short: A profile = a complete, customizable virtual browser identity.**

### ⚠️ Important Notice About Profiles

#### 🚨 Demo Profile Warning
> **Note**: Public demo profiles are for limited-time testing only. To prevent abuse they can't be used in headless mode, and can't load extensions.  
> ⚠️ Using them in production environments **will result in immediate account bans**, as they’re widely circulated and easily flagged.  
>  🔒 Protect your operations by using **Premium Profiles**, authentic profiles with proper access controls.  

#### 🌟 Premium Profile Service
> Access our exclusive pool of **300,000+ authentic browser fingerprints** sourced from real users (not algorithm-generated). Each profile is:
> - ✅ Unique and never reused
> - 🔒 Private and secure
> - 👤 Based on genuine device/browser data
> - 🛡️ Safe for production and scalable automation

#### 📬 How to Get Premium Profiles
| 📧 Email | [middleschoolstudent@mail.ru](mailto:middleschoolstudent@mail.ru) |
|----------|-----------------------------------------------------------|
| 📱 Telegram | [middle_student](https://t.me/middle_student) |

*We ensure fast delivery, confidentiality, and professional support for all clients.*

---

### 📚 How to Use Profiles

#### 1. CLI

Launch BotBrowser with a profile:

```bash
chromium --bot-profile="/absolute/path/to/chrome135_win11_x64.enc"
```

#### 2. [Playwright](demo/playwright) / [Puppeteer](demo/puppeteer) Demos

```javascript
const browser = await chromium.launch({
  headless: true,
  executablePath: BOTBROWSER_EXEC_PATH, // Absolute path to the BotBrowser executable
  args: [`--bot-profile=${BOT_PROFILE_PATH}`], // Absolute path to the bot profile
});

const page = await browser.newPage();

// Remove Playwright's bindings to avoid detection.
await page.addInitScript(() => {
  delete window.__playwright__binding__;
  delete window.__pwInitScripts;
});
await page.goto("https://abrahamjuliot.github.io/creepjs/");
```


---

### 📖 Important: Customize Your Profile Configurations

Starting from 2025, BotBrowser now supports **full environment customization directly inside profiles** — including proxy, timezone, screen size, device pixel ratio, and more.

👉 **Please read** [`profile-configs.md`](https://github.com/MiddleSchoolStudent/BotBrowser/blob/main/profiles/profile-configs.md) **for full configuration options.**

You no longer need CDP to set these fields manually!

---

### ✨ Major Features (Updated 2025)

#### 🛠️ Unique Capabilities

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

#### 🧐 Fingerprints Covered

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

### 📌 Best Practices

- Use **Premium Profiles** for any production traffic.
- Set realistic **screen size, devicePixelRatio, proxy settings** inside your profile.
- Use updated **Android profiles** for mobile-specific operations.
- Regularly update your profiles to stay synchronized with Chrome’s latest versions.
