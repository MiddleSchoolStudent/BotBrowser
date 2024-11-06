# BotBrowser

There wasn't a browser on the market that did what I wanted, so I wrote my own.

For bot - I don't recommend writing direct solver code for antibots. Because the antibot system is updated very quickly, the algorithms change frequently, and they have a lot of developers, you can get bogged down by them.

So, it's best to find the fingerprints collected by the antibot, modify Chromium to make a generic fingerprint browser, and then use CDP ([playwright](demo/playwright) / [puppeteer](demo/puppeteer)) to control this browser to implement the corresponding logic.

## Usage

1. Find the installer from [Releases](https://github.com/MiddleSchoolStudent/BotBrowser/releases), although it only supports MacOS / Ubuntu at the moment, but will be available for more systems in the future.
2. Although BotBrowser was compiled based on Chromium 130.0.6723.92, don't worry because we have different [Profiles](profiles) and we can change the version number in the fingerprint.
3. Use `--bot-profile` to pass profile information to the browser at startup, for example:

   ```bash
   chromium-browser --no-sandbox --bot-profile="{path_of_}/chrome128-macarm.enc"
   ```

   Or you can refer to the [demo](demo) to write the corresponding code with the help of CDP.

4. I don't provide the private key to generate the Profile, if you need more Profiles, please contact me, I have over 200k browser fingerprints of real users: middleschoolstudent@mail.ru

## More information

1. if you're interested in exactly what BotBrowser can do, check [here](profiles#features).
2. if you want to compile your own Chrome, check out the steps [here](build).

---

Ці antibots роблять світ гіршим.
