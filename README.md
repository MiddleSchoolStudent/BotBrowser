# BotBrowser

There wasn't a browser on the market that did what I wanted, so I wrote my own.

For bot - I don't recommend writing direct solver code for antibots. Because the antibot system is updated very quickly, the algorithms change frequently, and they have a lot of developers, you can get bogged down by them.

So, it's best to find the fingerprints collected by the antibot, modify Chromium to make a generic fingerprint browser, and then use CDP (playwright / puppeteer) to control this browser to implement the corresponding logic.


## Usage

1. Find the installer from [this folder](binary), although it only supports Ubuntu at the moment, but will be available for more systems in the future.
2. Although BotBrowser was compiled based on Chromium 130.0.6699.0, don't worry because we have a different [Profiles](profiles) and we can change the version number in the fingerprint.
3. Use this command to install BotBrowser on your system
    ```bash
    dpkg -i chromium-browser-stable_amd64.deb
    ```
4. Use `--bot-profile` to pass profile information to the browser at startup, for example:
    ```bash
    chromium-browser --no-sandbox --bot-profile="{path_of_}/chrome128_macarm.enc"
    ```

5. Profile has an expiration time. Please contact me if you need the new profile: middleschoolstudent@mail.ru


## More information

1. if you're interested in exactly what BotBrowser can do, check [here](profiles#Features).
2. if you want to compile your own Chrome, check out the steps [here](build).


---------------


Ці antibots роблять світ гіршим.