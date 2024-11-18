# BotBrowser

There wasn't a browser on the market that did what I wanted, so I wrote my own.

For bot - I don't recommend writing direct solver code for antibots. Because the antibot system is updated very quickly, the algorithms change frequently, and they have a lot of developers, you can get bogged down by them.

So, it's best to find the fingerprints collected by the antibot, modify Chromium to make a generic fingerprint browser, and then use CDP ([playwright](demo/playwright) / [puppeteer](demo/puppeteer)) to control this browser to implement the corresponding logic.

## Usage

1. BotBrowser will keep up with the latest stable version of Chrome in order to deal with antibots checks on browser capabilities.
2. Find the installer from [Releases](https://github.com/MiddleSchoolStudent/BotBrowser/releases), although it only supports Windows / MacOS / Ubuntu at the moment, but will be available for more systems in the future.
3. We provide some [Profiles](profiles) for Demo.
4. Use `--bot-profile` to pass profile information to the browser at startup, for example:

   ```bash
   chromium-browser --bot-profile="{path_of_}/chrome130-macarm.enc"
   ```

   Or you can refer to the [demo](Demo) to write the corresponding code with the help of CDP.

5. I don't provide the private key to generate the Profile, if you need more Profiles, please contact me, I have over 200k browser fingerprints of real users: middleschoolstudent@mail.ru

## More information

1. if you're interested in exactly what BotBrowser can do, check [here](profiles#features).
2. if you want to compile your own Chrome, check out the steps [here](build).
3. Even with CDP, and with a large number of parallel requests on the same host, still able to bypass antibots and achieved more than 98% success rate, including well-known large companies, some small experimental projects and some sites with their own developed antibots.
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
  - adscore
  - fingerprintjs
  - creepjs
  - BrowserScan
  - fv.pro
  - pixelscan
  - Tiktok
  - yandex
  - Temu
  - Linkedin
  - Ticketmaster
  - Shein
  - Facebook
  - bet365

---

Ці antibots роблять світ гіршим.
