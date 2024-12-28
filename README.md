# BotBrowser

**The Ultimate Solution for Undetectable Automated Browsing**

## Introduction

BotBrowser is built by directly modifying Chromium's native C++ source code to create a true browser environment, making it impossible for advanced antibot systems to detect anomalies. This deep modification is far beyond traditional JavaScript or Python solutions to control browsers via [CDP](https://chromedevtools.github.io/devtools-protocol/), providing exceptional robustness and long-term reliability.

To simplify operations, we also provide [BotBrowserConsole](https://github.com/MiddleSchoolStudent/BotBrowser-Console), a free and open-source GUI tool that easily launches multiple instances of browsers in different environments to simplify multi account management.

<img width="800" alt="image" src="https://github.com/user-attachments/assets/e9c0b656-83b0-4be5-986e-d4bc3c04b4b5">


## Usage

1. **Download**: Get the installer for your OS from [Releases](https://github.com/MiddleSchoolStudent/BotBrowser/releases) page.
2. **Profiles**: We provide sample [Profiles](profiles) for demonstration purposes.
3. **Launching BotBrowser**: Use the `--bot-profile` flag to pass profile information at startup:

   ```bash
   chromium --bot-profile="{path_of_}/chrome131_win11_x64.enc"
   ```

    **Tip**: You can use profiles generated for macOS, Windows, or Ubuntu binaries interchangeably, enabling seamless cross-system fingerprint emulation. For example, use a macOS profile on Ubuntu or a Windows profile on macOS without compatibility issues.

    You can also refer to our [Demo](demo) ([Playwright](demo/playwright) or [Puppeteer](demo/puppeteer)) for guidance on integrating BotBrowser with CDP.


## Features

- **Cross-Platform Compatibility**: Fully supports Windows, macOS, and Ubuntu, enabling seamless cross-platform use of profiles. Start on one system and continue effortlessly on another. More platforms coming soon.
- **Latest Chromium Base**: Stays updated with the latest stable Chrome/Chromium versions to ensure compatibility with advanced antibot defenses.
- **Programmatic Control**: Leverages CDP for advanced automation through tools like [Playwright](demo/playwright) and [Puppeteer](demo/puppeteer).
- **Exceptional Success Rate**: Achieves a **98%+ success rate**, even against the most advanced antibots under high loads.
- **Proven Results**: Backed by real client success stories, enabling the registration of over **350,000 accounts daily** with unmatched efficiency.

## Proven Effectiveness Against

- **Leading Antibot Services:**
  - **[Cloudflare](tests/tests/antibots/cloudflare.spec.ts)** - [▶️ Test Result (Turnstile)](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/cloudflare-test-Cloudflare-turnstile-BotBrowser-antibots/video.webm), [▶️ Test Result (Challenge)](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/cloudflare-test-Cloudflare-challenge-BotBrowser-antibots/video.webm)
  - **[Akamai Bot Manager](tests/tests/antibots/akamai.spec.ts)** - [▶️ Test Result (playstation.com)](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/akamai-test-playstation-com-BotBrowser-antibots/video.webm)
  - **[Kasada](tests/tests/antibots/kasada.spec.ts)** -  [▶️ Test Result (kick.com)](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/kasada-test-Kasada-BotBrowser-antibots/video.webm), [▶️ Test Result (playstation.com)](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/akamai-test-playstation-com-BotBrowser-antibots/video.webm)
  - **[reCAPTCHA](tests/tests/antibots/recaptcha.spec.ts)** - [▶️ Test Result](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/recaptcha-test-reCAPTCHA-v3-on-antcpt-BotBrowser-antibots/video.webm)
  - **[PerimeterX](tests/tests/antibots/perimeterx.spec.ts)** - [▶️ Test Result (textnow.com)](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/perimeterx-test-PerimeterX-BotBrowser-antibots/video.webm)
  - Cloudfront Bot Management (AWS)
  - hCaptcha
  - nuCAPTCHA
  - DataDome
  - Imperva (Incapsula)
  - F5 Shape Security
  - Adscore
  - ProtectedMedia
  - **[Fake Vision](tests/tests/antibots/fvpro.spec.ts)** - [▶️ Test Result (fv.pro)](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/fvpro-test-fv-pro-BotBrowser-antibots/video.webm)
  - **[FingerprintJS](tests/tests/antibots/fingerprintjs.spec.ts)** - [▶️ Test Result (Bot Detection)](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/fingerprintjs-test-fingerprintjs-bot-detection-BotBrowser-antibots/video.webm)
  - **[CreepJS](tests/tests/antibots/creepjs.spec.ts)** - [▶️ Test Result](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/creepjs-test-creepjs-BotBrowser-antibots/video.webm)
  - **[BrowserScan](tests/tests/antibots/browserscan.spec.ts)** - [▶️ Test Result](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/browserscan-test-browserscan-BotBrowser-antibots/video.webm)
  - **[Pixelscan](tests/tests/antibots/pixelscan.spec.ts)** - [▶️ Test Result](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/pixelscan-test-pixelscan-BotBrowser-antibots/video.webm)
  - botchecker
  - **[iphey](tests/tests/antibots/iphey.spec.ts)** - [▶️ Test Result](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/iphey-test-iphey-BotBrowser-antibots/video.webm)
  - **[brotector](tests/tests/antibots/brotector.spec.ts)** - [▶️ Test Result](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/brotector-test-Brotector-BotBrowser-antibots/video.webm)
- **Top Platforms and Websites:**
  - TikTok
  - Yandex
  - Temu
  - LinkedIn
  - Ticketmaster
  - Shein
  - Facebook
  - Bet365
  - ...and many more.


## Additional Resources

- **Profile Generation**: We do not provide the private key required to generate new profiles. If you need additional profiles, please contact us directly. We have a repository of over 200,000 real user browser fingerprints available.

  **Contact us:**

  middleschoolstudent@mail.ru

  https://t.me/middle_student

- **Capabilities**: To explore what BotBrowser can do, visit our [Features](profiles#features) page.
- **Building from Source**: If you wish to compile your own version of Chromium with our modifications, follow the instructions [here](build).

## Disclaimer

BotBrowser is intended for legitimate use cases that comply with all applicable laws and regulations. Misuse of this tool to violate the terms of service of websites or engage in illegal activities is strictly prohibited.

---

Antibots are making the world worse.
