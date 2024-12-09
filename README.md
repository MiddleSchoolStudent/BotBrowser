# BotBrowser

**The Ultimate Solution for Undetectable Automated Browsing**

## Introduction

BotBrowser is built by directly modifying Chromium's native C++ source code, creating a genuine browser environment that is nearly impossible for advanced antibot systems to detect. This deep-level modification far outperforms traditional JavaScript or Python-based solutions, delivering unmatched robustness and long-term reliability.

To simplify operations, we provide [BotBrowserConsole](https://github.com/MiddleSchoolStudent/BotBrowser-Console), a user-friendly GUI tool that streamlines multi-account management by easily launching multiple browser instances.

<img width="800" alt="image" src="https://github.com/user-attachments/assets/e9c0b656-83b0-4be5-986e-d4bc3c04b4b5">


## Installation

1. **Download**: Get the installer for your OS from our [Releases](https://github.com/MiddleSchoolStudent/BotBrowser/releases) page.
2. **Profiles**: We provide sample [Profiles](profiles) for demonstration purposes.

## Usage

1. **Launching BotBrowser**: Use the `--bot-profile` flag to pass profile information at startup:

   ```bash
   chromium-browser --bot-profile="{path_of_}/chrome130-macarm.enc"
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

- **Antibot Services:**
  - Cloudflare
  - hCaptcha
  - nuCAPTCHA
  - Kasada
  - Cloudfront Bot Management (AWS)
  - PerimeterX
  - reCAPTCHA
  - Akamai Bot Manager
  - DataDome
  - Imperva (Incapsula)
  - F5 Shape Security
  - Adscore
  - ProtectedMedia
  - FingerprintJS
  - CreepJS
  - BrowserScan
  - Pixelscan
- **Major Platforms and Websites:**
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

  middleschoolstudent@mail.ru

  https://t.me/middle_student

- **Capabilities**: To explore what BotBrowser can do, visit our [Features](profiles#features) page.
- **Building from Source**: If you wish to compile your own version of Chromium with our modifications, follow the instructions [here](build).

## Disclaimer

BotBrowser is intended for legitimate use cases that comply with all applicable laws and regulations. Misuse of this tool to violate the terms of service of websites or engage in illegal activities is strictly prohibited.

---

Antibots are making the world worse.
