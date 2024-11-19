# BotBrowser

**The Ultimate Solution for Undetectable Automated Browsing**

## Introduction

BotBrowser is a customized Chromium-based browser engineered to bypass advanced antibot systems effectively. Traditional methods of writing direct solver code for antibots are often short-lived due to rapid updates and frequent algorithm changes by antibot developers. Instead of constantly playing catch-up, BotBrowser focuses on emulating genuine browser fingerprints, providing a generic fingerprint browser that seamlessly blends in with regular user traffic.

By modifying Chromium and leveraging the Chrome DevTools Protocol (CDP) through tools like [Playwright](demo/playwright) or [Puppeteer](demo/puppeteer), BotBrowser allows you to automate browsing tasks while avoiding detection by sophisticated antibot mechanisms.

## Features

- **Up-to-Date Chromium Base**: BotBrowser stays current with the latest stable version of Chrome to ensure compatibility and effectiveness against the newest antibot checks.
- **Authentic Browser Fingerprints**: Utilize real browser fingerprints to mimic genuine user behavior accurately.
- **CDP Integration**: Control the browser programmatically using CDP, enabling complex automation scripts and logic implementation.
- **High Success Rate**: Achieve over 98% success in bypassing antibots, even with a high volume of parallel requests from the same host.
- **Cross-Platform Support**: Available for Windows, macOS, and Ubuntu, with more systems planned for future releases.

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
