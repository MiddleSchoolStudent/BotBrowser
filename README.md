<h1 align="center">BotBrowser</h1>

<h4 align="center">The Ultimate Solution for Undetectable Automated Browsing 🚀</h4>

<p align="center">
  <a href="https://github.com/MiddleSchoolStudent/BotBrowser/releases">
    <img src="https://img.shields.io/github/v/release/MiddleSchoolStudent/BotBrowser?style=flat-square" alt="Latest Release">
  </a>
  <a href="https://github.com/MiddleSchoolStudent/BotBrowser/issues">
    <img src="https://img.shields.io/github/issues/MiddleSchoolStudent/BotBrowser?style=flat-square" alt="Issues">
  </a>
</p>

---

## Introduction

BotBrowser is a robust, cross-platform browser automation tool that modifies Chromium's native C++ source code, bypassing even the most advanced antibot systems. Unlike traditional JavaScript-based CDP ([Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)) automation, BotBrowser provides unparalleled stealth and performance.

To simplify operations, we also provide [BotBrowserConsole](console), a free and open-source GUI tool that easily launches multiple browser instances in different environments for seamless multi-account management.

---

<img width="800" alt="BotBrowser GUI" src="https://github.com/user-attachments/assets/e9c0b656-83b0-4be5-986e-d4bc3c04b4b5">

---

## Features

### Core Features

- **Cross-Platform Compatibility**: Fully supports Windows, macOS, and Ubuntu, enabling seamless cross-platform use of profiles. Start on one system and continue effortlessly on another. More platforms coming soon.
- **Latest Chromium Base**: Stays updated with the latest stable Chrome/Chromium versions to ensure compatibility with advanced antibot defenses.
- **Programmatic Control**: Leverages CDP for advanced automation through tools like [Playwright](demo/playwright) and [Puppeteer](demo/puppeteer).
- **Exceptional Success Rate**: Achieves a **98%+ success rate**, even against the most advanced antibots under high loads.
- **Proven Results**: Backed by real client success stories, enabling the registration of over **350,000 accounts daily** with unmatched efficiency.

### Advanced Capabilities

#### Stealth and Detection Evasion
- **Bypass incognito mode checks**: Ensures undetectable automation even in headless or incognito modes.
- **Prevent CDP leaks**: Eliminates detection of Chrome DevTools Protocol (CDP) communication.
- **Customizable browsing history**: Enables realistic, dynamic histories for diverse fingerprinting scenarios.
- **Noise injection**: Randomizes 2D canvas, WebGL, and audio fingerprints to avoid detection.
- **Simulated OS-specific properties**: Adjusts scrollbar width, BarcodeDetector, and system-specific settings for enhanced authenticity.

#### Comprehensive Proxy and Network Control
- **Proxy integration**: Easily configure proxy host, username, and password without relying on CDP.
- **Dynamic language and timezone settings**: Automatically adapt browser environment based on proxy IP for realistic geolocation.

#### Additional Security and Customization
- **WebRTC leak protection**: Prevents exposure of real IPs during WebRTC communication.
- **Content Decryption Module (CDM) bypass**: Avoids detection by DRM systems.

### Fingerprint Spoofing Capabilities

BotBrowser provides extensive fingerprint emulation for:

- Browser: Version, OS, userAgentData
- Graphics: WebGL, WebGL2, GPU
- Hardware: Screen, Battery, Keyboard, CPU
- Environment: Permissions, FeaturePolicy, SystemFonts, MediaDevices, MimeTypes
- Visuals: Emoji, Unicode, System Colors
- Others: Navigator, Window, and more

---

## Usage

1. **Download**: Get the installer for your OS from [Releases](https://github.com/MiddleSchoolStudent/BotBrowser/releases) page.
2. **Profiles**: We provide sample [Profiles](profiles) for demonstration purposes.
3. **Launching BotBrowser**: Use the `--bot-profile` flag to pass profile information at startup:

   ```bash
   chromium --bot-profile="{path_of_}/chrome131_win11_x64.enc"
   ```

    **Tip**: Profiles generated for macOS, Windows, and Ubuntu binaries are **cross-compatible**, enabling seamless fingerprint emulation across systems. For example, you can use a macOS profile on Ubuntu or a Windows profile on macOS **without any compatibility issues**.

    You can also refer to our [Demo](demo) ([Playwright](demo/playwright), [Puppeteer](demo/puppeteer)) or [tests](tests) for guidance on integrating BotBrowser with CDP.

4. **Demo Integrations**

    Explore BotBrowser's integration examples with popular automation tools:

  - **[Playwright Demo](demo/playwright)**: Quickly get started with Playwright to automate repetitive browser tasks using BotBrowser.
  - **[Puppeteer Demo](demo/puppeteer)**: Seamlessly integrate Puppeteer for advanced browser automation and testing.
  - **[Tests](tests)**: Use our detailed test scripts to explore real-world use cases and implementation examples.

---

## Proven Effectiveness

### Code and Video Test Results

BotBrowser has been extensively tested against leading antibot systems. Below are detailed test results and video demonstrations:

| Service & Scripts                                         | Test Results                                                                                                                                                                                                                                                                       |
|-----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **[Cloudflare](tests/tests/antibots/cloudflare.spec.ts)** | [▶️ Turnstile Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=cloudflare-test-Cloudflare-turnstile), [▶️ Challenge Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=cloudflare-test-Cloudflare-challenge), [▶️ taxslayer.com Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=cloudflare-test-taxslayer) |
| **[Akamai Bot Manager](tests/tests/antibots/akamai.spec.ts)** | [▶️ Playstation.com Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=akamai-test-playstation-com), [▶️ Wizzair.com Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=kasada-test-Kasada-wizzair-com-) |
| **[Kasada](tests/tests/antibots/kasada.spec.ts)**          | [▶️ Kick.com Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=kasada-test-Kasada), [▶️ Playstation.com Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=akamai-test-playstation-com), [▶️ Wizzair.com Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=kasada-test-Kasada-wizzair-com-) |
| **[F5 Shape Security](tests/tests/antibots/shape.spec.ts)** | [▶️ Southwest.com Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=shape-test-Shape-southwest-com-)                                                                                     |
| **[reCAPTCHA](tests/tests/antibots/recaptcha.spec.ts)**    | [▶️ Test Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=recaptcha-test-reCAPTCHA-v3-on-antcpt)                                                                                 |
| **[PerimeterX](tests/tests/antibots/perimeterx.spec.ts)**  | [▶️ Textnow.com Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=perimeterx-test-PerimeterX)                                                                                     |
| **[Imperva (Incapsula)](tests/tests/antibots/incapsula.spec.ts)** | [▶️ Copaair.com Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=incapsula-test-Incapsula-copaair-com-)                                                                       |
| **Cloudfront Bot Management (AWS)**    | 🚧 Coming Soon                                                                                                                                                                                                                                                                            |
| **hCaptcha**                           | 🚧 Coming Soon                                                                                                                                                                                                                                                                            |
| **nuCAPTCHA**                          | 🚧 Coming Soon                                                                                                                                                                                                                                                                            |
| **DataDome**                           | 🚧 Coming Soon                                                                                                                                                                                                                                                                            |
| **Adscore**                            | 🚧 Coming Soon                                                                                                                                                                                                                                                                            |
| **ProtectedMedia**                     | 🚧 Coming Soon                                                                                                                                                                                                                                                                            |
| **[Fake Vision](tests/tests/antibots/fvpro.spec.ts)**       | [▶️ fv.pro Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=fvpro-test-fv-pro-BotBrowser-antibots)                                                                                           |
| **[FingerprintJS](tests/tests/antibots/fingerprintjs.spec.ts)** | [▶️ Bot Detection Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=fingerprintjs-test-fingerprintjs-bot-detection-BotBrowser-antibots)                                                         |
| **[CreepJS](tests/tests/antibots/creepjs.spec.ts)**         | [▶️ Test Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=creepjs-test-creepjs-BotBrowser-antibots)                                                                                            |
| **[BrowserScan](tests/tests/antibots/browserscan.spec.ts)** | [▶️ Test Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=browserscan-test-browserscan-BotBrowser-antibots)                                                                                     |
| **[Pixelscan](tests/tests/antibots/pixelscan.spec.ts)**     | [▶️ Test Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=pixelscan-test-pixelscan-BotBrowser-antibots)                                                                                         |
| **[iphey](tests/tests/antibots/iphey.spec.ts)**             | [▶️ Test Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=iphey-test-iphey-BotBrowser-antibots)                                                                                               |
| **[brotector](tests/tests/antibots/brotector.spec.ts)**     | [▶️ Test Video](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=brotector-test-Brotector-BotBrowser-antibots)                                                                                       |

### Top Platforms and Websites

The following platforms have been tested:

- **TikTok**
- **Yandex**
- **Temu**
- **LinkedIn**
- **Ticketmaster**
- **Shein**
- **Facebook**
- **Bet365**
- ...and many more



## Additional Resources

### Profile Generation

We do not provide the private key required to generate new profiles. If you need additional profiles, please contact us directly. We maintain a repository of over **300,000 real user browser fingerprints** to support your needs.

👉 **Contact us today**:

| Method      | Details                                          |
|-------------|--------------------------------------------------|
| 📧 Email    | [middleschoolstudent@mail.ru](mailto:middleschoolstudent@mail.ru) |
| 📱 Telegram | [middle_student](https://t.me/middle_student)   |

---

### Building from Source

If you wish to compile your own version of Chromium with our modifications, follow the instructions provided [here](build).

## Disclaimer

BotBrowser is intended for legitimate use cases that comply with all applicable laws and regulations. Misuse of this tool to violate the terms of service of websites or engage in illegal activities is strictly prohibited.

---

Antibots are making the world worse.

---

<p align="center">
  <a href="https://github.com/MiddleSchoolStudent/BotBrowser">
    <img src="https://img.shields.io/github/stars/MiddleSchoolStudent/BotBrowser?style=social" alt="GitHub Stars">
  </a>
  <a href="https://github.com/MiddleSchoolStudent/BotBrowser/fork">
    <img src="https://img.shields.io/github/forks/MiddleSchoolStudent/BotBrowser?style=social" alt="GitHub Forks">
  </a>
</p>
