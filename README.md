<h1 align="center">🤖 BotBrowser</h1>

<h4 align="center">The Ultimate Solution for Undetectable Automated Browsing 🚀</h4>

<p align="center">
  <a href="https://github.com/MiddleSchoolStudent/BotBrowser/releases">
    <img src="https://img.shields.io/github/v/release/MiddleSchoolStudent/BotBrowser?style=flat-square" alt="Latest Release">
  </a>
  <a href="https://github.com/MiddleSchoolStudent/BotBrowser/commits/main/">
    <img src="https://img.shields.io/github/commit-activity/m/MiddleSchoolStudent/BotBrowser?style=flat-square" alt="Commit Activity">
  </a>
  <a href="https://github.com/MiddleSchoolStudent/BotBrowser/issues">
    <img src="https://img.shields.io/github/issues/MiddleSchoolStudent/BotBrowser?style=flat-square" alt="Issues">
  </a>
  <a href="https://github.com/MiddleSchoolStudent/BotBrowser/fork">
    <img src="https://img.shields.io/github/forks/MiddleSchoolStudent/BotBrowser?style=flat-square" alt="GitHub Forks">
  </a>
  <a href="https://github.com/MiddleSchoolStudent/BotBrowser">
    <img src="https://img.shields.io/github/stars/MiddleSchoolStudent/BotBrowser" alt="GitHub Stars">
  </a>
</p>

<div align="center">
  <img width="600" alt="BotBrowser GUI - Your Command Center" src="https://github.com/user-attachments/assets/e9c0b656-83b0-4be5-986e-d4bc3c04b4b5">
</div>

---

## What is BotBrowser?

BotBrowser is a cross-platform stealth browser designed to defeat modern antibot systems. By directly modifying Chromium's C++ source code, BotBrowser eliminates the fingerprint leaks and automation traces left behind by [CDP](https://chromedevtools.github.io/devtools-protocol/)-based solutions, enabling true undetectable browsing and automation.

## Simplified Management

Streamline your automation with [BotBrowserConsole](console), a free and open-source GUI tool designed to:
- Easily launch multiple browser instances
- Seamlessly manage different environments
- Efficiently handle multiple accounts


---

## 🚀 Core Features

 **Cross-Platform OS Simulation**
  > Use distinct cross-platform profiles to emulate Windows, macOS, Ubuntu, or Android on any host-undetectable even in **headless** mode.

 **Latest Chromium Base**
  > Always aligned with the newest stable Chromium release, ensuring cutting‑edge compatibility with today's most advanced antibot defenses.

 **Unlimited Android Chrome Emulation**
  > Emulate Android devices (metrics, UA, touch & sensors, etc.) flawlessly and undetectably. [▶️ creepjs test](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-creepjs-creepjs-Android), [▶️ iphey test](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-iphey-iphey-Android), [▶️ pixelscan test](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-pixelscan-pixelscan-Android)

 **Advanced Programmatic Control**
  > Harness CDP through [Playwright](demo/playwright) and [Puppeteer](demo/puppeteer) alongside deep C++ modifications that block CDP leak detection, delivering both powerful automation and rock‑solid stealth.

 **Success & Performance**
  > Proven **98%+ success** against sophisticated antibot measures, powering over 350,000 daily account registrations with exceptional stability and speed under heavy loads.

## 🛡️ Advanced Capabilities

- [x] **Bypass headless and incognito checks**: Enables undetectable automation by seamlessly evading detection in both headless and incognito modes.

- [x] **Noise injection**: Randomizes 2D canvas, WebGL, emoji, fonts, text metrics, and audio fingerprints.

- [x] **Simulated OS-specific properties**: Adjusts scrollbar width, BarcodeDetector, and system-specific settings for enhanced authenticity.

- [x] **Chrome feature masking**: Removes Chromium-specific traits, simulating native Chrome with features like ADInterest and CDM for enhanced detection evasion.

- [x] **WebRTC leak protection**: Prevents exposure of real IPs during WebRTC communication.

- [x] **Comprehensive fingerprints spoofing**:

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

## 🚀 Getting Started

### Download & Installation

1. **Download Installer**
  Get the BotBrowser installer for your OS from the [Releases](https://github.com/MiddleSchoolStudent/BotBrowser/releases) page.

2. **macOS**
- Open the downloaded `.dmg` file.
- Drag `Chromium.app` into your Applications folder or any desired location.
- If you see the error:
   ```
   "Chromium" is damaged and can't be opened
   ```
   Run:
   ```bash
   xattr -rd com.apple.quarantine /Applications/Chromium.app
   ```

3. **Windows**
- Extract the downloaded `.7z` archive.
- Run `chrome.exe` from the extracted folder.
- If you encounter `STATUS_ACCESS_VIOLATION`, launch with [--no-sandbox](https://peter.sh/experiments/chromium-command-line-switches/#no-sandbox).

4. **Ubuntu**
- Install via `dpkg`:
   ```bash
   sudo dpkg -i botbrowser_<version>_amd64.deb
   ```
- If dependencies are missing, run:
   ```bash
   sudo apt-get install -f
   ```

### Profiles Configuration

- **Demo Profiles**: located in the [profiles](profiles) directory of the repository.
- **Cross-Platform**:

  🔥 A *macOS profile* works on Ubuntu; a *Windows profile* works on macOS; an *Android profile* can be fully emulated on macOS, Windows, and Ubuntu.
- **Usage Tips**:
  - Ensure your profile file is readable (check permissions).
  - For more configuration options, see the [profile-configs guide](https://github.com/MiddleSchoolStudent/BotBrowser/blob/main/profiles/profile-configs.md).

### Quick Start Examples

#### 1. CLI

Launch BotBrowser with a profile:

```bash
chromium --bot-profile="/path/to/chrome135_win11_x64.enc"
```

#### 2. [Playwright](demo/playwright) / [Puppeteer](demo/puppeteer) Demos

```javascript
const browser = await chromium.launch({
  headless: true,
  executablePath: BOTBROWSER_EXEC_PATH, // Absolute path to the BotBrowser executable
  args: [`--bot-profile=${BOT_PROFILE_PATH}`], // Absolute or relative path to the bot profile
});

const page = await browser.newPage();

// Remove Playwright's bindings to avoid detection.
await page.addInitScript(() => {
  delete window.__playwright__binding__;
  delete window.__pwInitScripts;
});
await page.goto("https://abrahamjuliot.github.io/creepjs/");
```

#### 3. [BotBrowserConsole](console) (GUI)

Use the open-source GUI to select your profile and start browsing without code.

### 🐞 Debugging & FAQs

| Issue                             | Solution                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| "Chromium" is damaged             | Run `xattr -rd com.apple.quarantine /Applications/Chromium.app`                                  |
| STATUS_ACCESS_VIOLATION           | Add `--no-sandbox` flag when launching                                                           |
| Profile file permission errors    | Ensure `.enc` file has read permissions (`chmod 644`)                                            |
| BotBrowser won’t start or crashes | Check that your OS and Chromium version match the build; update BotBrowser to the latest release |


---

## 🎯 Proven Effectiveness

Use our detailed test scripts to explore real-world use cases and implementation examples: **[Tests](tests)**.


⚠️ **DISCLAIMER**

These test scripts are provided for **educational purposes** and to demonstrate the capabilities of BotBrowser. They are intended solely for **legal use cases** that comply with all applicable laws and regulations.  **Any misuse**-such as violating website terms of service or engaging in unlawful activities-**is strictly prohibited.**



| Service & Scripts                                                  | Test Results                                                                                                                                                                                                                                                                       |
|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **[Cloudflare](tests/tests/antibots/cloudflare.spec.ts)**          | [▶️ Turnstile](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-cloudflare-turnstile), [▶️ Challenge](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-cloudflare-challenge), [▶️ TaxSlayer](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-cloudflare-taxslayer), [▶️ Chegg](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-cloudflare-chegg) |
| **[Akamai](tests/tests/antibots/akamai.spec.ts)**                  | [▶️ PlayStation](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-akamai-playstation), [▶️ WizzAir](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-kasada-wizzair), [▶️ StubHub](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-akamai-stubhub)             |
| **[Kasada](tests/tests/antibots/kasada.spec.ts)**                  | [▶️ Kick](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-kasada-kick), [▶️ PlayStation](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-akamai-playstation), [▶️ Twitch](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-kasada-twitch), [▶️ WizzAir](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-kasada-wizzair) |
| **[F5 Shape](tests/tests/antibots/shape.spec.ts)**                 | [▶️ Southwest](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-shape-southwest), [▶️ Target](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-shape-target)                                                                                     |
| **[reCAPTCHA](tests/tests/antibots/recaptcha.spec.ts)**            | [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-recaptcha-v3)                                                                                 |
| **[PerimeterX](tests/tests/antibots/perimeterx.spec.ts)**          | [▶️ TextNow](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-perimeterx-textnow), [▶️ Grubhub](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-perimeterx-grubhub), [▶️ Zillow](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-perimeterx-zillow)                                                                                    |
| **[Imperva (Incapsula)](tests/tests/antibots/incapsula.spec.ts)**  | [▶️ CopaAir](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-incapsula-copaair)                                                                       |
| **[DataDome](tests/tests/antibots/datadome.spec.ts)**              | [▶️ ShutterStock](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-datadome-shutterstock), [▶️ SeatGeek](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-datadome-seatgeek), [▶️ Hermes](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-datadome-hermes), [▶️ SoundCloud](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-datadome-soundcloud)                                                                           |
| **[hCaptcha](tests/tests/antibots/hcaptcha.spec.ts)**              | [▶️ EpicGames](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-hcaptcha-epicgames), [▶️ Discord](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-hcaptcha-discord), [▶️ Steam](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-hcaptcha-steam), [▶️ RiotGames](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-hcaptcha-riotgames)                                                                       |
| **[FunCaptcha](tests/tests/antibots/funcaptcha.spec.ts)**          | [▶️ Blizzard](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-funcaptcha-blizzard), [▶️ Roblox](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-funcaptcha-roblox), [▶️ Hotmail](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-funcaptcha-hotmail)                                                                       |
| **[Accertify](tests/tests/antibots/accertify.spec.ts)**            | [▶️ Grubhub](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-perimeterx-grubhub)                                                                       |
| **[Forter](tests/tests/antibots/forter.spec.ts)**                  | [▶️ Grubhub](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-perimeterx-grubhub)                                                                       |
| **[Adscore](tests/tests/antibots/adscore.spec.ts)**                | [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-adscore-adscore)                                                                                          |
| **ThreatMetrix**                                                   | 🚧 Coming Soon                                                                                                                                                                                                                                                                            |
| **ProtectedMedia**                                                 | 🚧 Coming Soon                                                                                                                                                                                                                                                                            |
| **[Fake Vision](tests/tests/antibots/fvpro.spec.ts)**              | [▶️ FakeVision](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-fvpro-fvpro)                                                                                           |
| **[FingerprintJS](tests/tests/antibots/fingerprintjs.spec.ts)**    | [▶️ BotDetection](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-fingerprintjs-botdetection)                                                         |
| **[CreepJS](tests/tests/antibots/creepjs.spec.ts)**                | [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-creepjs-creepjs), [▶️ Android Profile](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-creepjs-creepjs-Android)                                                                                            |
| **[BrowserScan](tests/tests/antibots/browserscan.spec.ts)**        | [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-browserscan-browserscan)                                                                                     |
| **[Pixelscan](tests/tests/antibots/pixelscan.spec.ts)**            | [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-pixelscan-pixelscan), [▶️ Android Profile](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-pixelscan-pixelscan-Android)                                                                                         |
| **[iphey](tests/tests/antibots/iphey.spec.ts)**                    | [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-iphey-iphey), [▶️ Android Profile](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-iphey-iphey-Android)                                                                                               |
| **[device&browserinfo](tests/tests/antibots/deviceandbrowserinfo.spec.ts)**     | [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-deviceandbrowserinfo-deviceandbrowserinfo)                                                                                               |
| **[brotector](tests/tests/antibots/brotector.spec.ts)**            | [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=antibots-brotector-brotector)                                                                                       |



| Service & Scripts | Anti-bot Services | Test Results |
|------------------|-------------------|--------------|
| **[Nike](tests/tests/websites/nike.spec.ts)** | F5 Shape Security | ✅ Success  [▶️ Checkout Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=websites-nike-checkout)  |
| **TikTok** | Generic Antibot | ✅ Success |
| **[Walmart](tests/tests/websites/walmart.spec.ts)** | PerimeterX | ✅ Success [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=websites-walmart-walmart) |
| **[Temu](tests/tests/websites/temu.spec.ts)** | F5 Shape Security | ✅ Success [▶️ Test Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=websites-temu-temu) |
| **LinkedIn** | Generic Antibot | ✅ Success |
| **[TicketMaster](tests/tests/websites/ticketmaster.spec.ts)** | PerimeterX, FingerprintJS, reCAPTCHA | ✅ Success  [▶️ Checkout Video](//middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=websites-ticketmaster-checkout) |
| **Shein** | F5 Shape Security, FingerprintJS, Forter | ✅ Success |
| **Facebook** | FunCaptcha, reCAPTCHA    | ✅ Success |
| **Bet365** | Generic Antibot | ✅ Success |

...and many more


---


## 📚 Additional Resources

### Profile Generation

We do not provide the private key required to generate new profiles. If you need additional profiles, please contact us directly. We maintain over **300,000 real user browser fingerprints** to support your needs.


| 📧 Email    | [middleschoolstudent@mail.ru](mailto:middleschoolstudent@mail.ru) |
|-------------|--------------------------------------------------|
| 📱 Telegram | [middle_student](https://t.me/middle_student)   |


### Building from Source

If you wish to compile your own version of Chromium with our modifications, follow the instructions provided [here](build).


---

## ⚠️ DISCLAIMER

**BotBrowser** is intended for **legitimate use cases** that comply with all applicable **laws and regulations**. **Misuse** of this tool to violate the **terms of service** of websites or engage in **illegal activities** is strictly prohibited.
