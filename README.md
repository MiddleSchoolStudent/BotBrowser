# BotBrowser

**The Ultimate Solution for Undetectable Automated Browsing**

## Introduction

BotBrowser is a Chromium-based browser designed to bypass advanced antibot systems by emulating genuine browser fingerprints. Unlike traditional solvers that quickly become obsolete due to frequent algorithm updates, BotBrowser provides a generic fingerprint solution that seamlessly blends with regular user traffic.

By customizing Chromium and using the Chrome DevTools Protocol (CDP) with tools like [Playwright](demo/playwright) or [Puppeteer](demo/puppeteer), BotBrowser enables undetectable automated browsing.

We also provide a GUI tool, [BotBrowserConsole](https://github.com/MiddleSchoolStudent/BotBrowser-Console), which allows you to easily launch multiple browser instances for multi-account management.

## Features

- **Realistic Fingerprints**: Mimics genuine user behavior using authentic browser fingerprints for undetectable automation.
- **Cross-System Compatibility**: Seamlessly use profiles across platforms - Ubuntu binaries with macOS/Windows profiles and vice versa.
- **Wide Platform Support**: Available for Windows, macOS, and Ubuntu, with more platforms coming soon.
- **Latest Chromium Base**: Always up-to-date with the latest stable Chrome version, ensuring compatibility with cutting-edge antibot defenses.
- **Programmatic Control**: Leverages CDP for advanced automation through tools like [Playwright](demo/playwright) and [Puppeteer](demo/puppeteer).
- **Exceptional Success Rate**: Bypasses even the most advanced antibots with a success rate over 98%, even under high loads.

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
  - FingerprintJS
  - CreepJS
  - BrowserScan
  - fv.pro
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

## Installation

1. **Download**: Get the installer for your operating system from our [Releases](https://github.com/MiddleSchoolStudent/BotBrowser/releases) page.
2. **Profiles**: We provide sample [Profiles](profiles) for demonstration purposes.

## Usage

1. **Launching BotBrowser**: Use the `--bot-profile` flag to pass profile information at startup:

   ```bash
   chromium-browser --bot-profile="{path_of_}/chrome130-macarm.enc"
   ```

    **Tip**: You can use profiles generated for macOS, Windows, or Ubuntu binaries interchangeably, enabling seamless cross-system fingerprint emulation. For example, use a macOS profile on Ubuntu or a Windows profile on macOS without compatibility issues.

    You can also refer to our [Demo](demo) scripts for guidance on integrating BotBrowser with CDP.

2. **Profile Generation**: We do not provide the private key required to generate new profiles. If you need additional profiles, please contact us directly. We have a repository of over 200,000 real user browser fingerprints available.

    **Contact**: middleschoolstudent@mail.ru

## Additional Resources

- **Capabilities**: To explore what BotBrowser can do, visit our [Features](profiles#features) page.
- **Building from Source**: If you wish to compile your own version of Chromium with our modifications, follow the instructions [here](build).

## Disclaimer

BotBrowser is intended for legitimate use cases that comply with all applicable laws and regulations. Misuse of this tool to violate the terms of service of websites or engage in illegal activities is strictly prohibited.

---

Ці antibots роблять світ гіршим.
