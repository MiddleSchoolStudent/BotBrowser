# BotBrowser

Use this command get BotBrowser to execute using this profile.

```bash
chromium-browser --bot-profile="{path_of_}/chrome128-macarm.enc"
```

This command use to generate the encrypted Profile.

```bash
node encryptProfile.js
```

------

**Friendly reminder: these public profiles are just for demo, everyone has used them many times, it's fine to use them for testing, but don't use them in your business, otherwise your account will be definitely banned.**

We do not provide the private key required to generate new profiles. If you need additional profiles, please contact us directly. We have a repository of over 300,000 real user browser fingerprints available.


  **Contact us:**

  middleschoolstudent@mail.ru

  https://t.me/middle_student

## Features

### Unique capabilities

- [x] bypass Incognito mode checks
- [x] Avoid CDP leaks and bypass all detection
- [x] Customize page history to ensure fingerprint diversity
- [x] Keeps the page Active, even if it loses focus. Ensure that multiple pages remain active
- [x] Setting Proxy host, username, password without using CDP
- [x] Customizable language / time zone based on Proxy's IP
- [x] Handle WebRTC leaks
- [x] Noise on 2d canvas / webgl
- [x] Audio fingerprinting Noise
- [x] Scroll bar width
- [x] CDM detection bypass

### Fingerprints covered

- [x] Browser version
- [x] OS
- [x] userAgentData
- [x] webgl
- [x] webgl2
- [x] navigator
- [x] window
- [x] voices
- [x] permissions
- [x] featurePolicy
- [x] gpu
- [x] emoji
- [x] unicode
- [x] mediaDevices
- [x] mimeTypes
- [x] systemFonts
- [x] cpu
- [x] screen
- [x] battery
- [x] keyboard
- [x] system colors
