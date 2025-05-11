# 🛠️ BotBrowser Patch Examples

> 🚧 These patches are just a tiny glimpse under the hood. BotBrowser’s full core remains proprietary and battle-tested against real-world antibots.

BotBrowser is 100% our own IP-every line of core C++ comes from scratch, with **no borrowed open-source or closed-source code**. We’ve open-sourced only the GUI [BotBrowserConsole](https://github.com/MiddleSchoolStudent/BotBrowser/tree/main/console) to let you launch and manage sessions safely. All core engine patches shown here are a minimal subset, published solely to illustrate key techniques without exposing our full toolbox.

---

## 🔍 What’s Inside

- **Proprietary Foundation**  
  BotBrowser’s engine is entirely homegrown—no forks, no references to external projects.

- **Selective Open-Source**  
  We publish only a handful of patches in this folder. The rest stay private to prevent antibots from zeroing in on every leak point.

- **Comprehensive Leak Coverage**  
  Our patches plug gaps at every conceivable fingerprinting surface. Crafted through:
  1. Hands-on reverse engineering of antibot defenses  
  2. V8-level analysis of how antibots collect and validate fingerprints  
  3. Real-world automation experience at scale

- **Get the Full Engine**  
  Interested in the complete core source? Reach out for licensing or private review:

  | 📧 Email    | [middleschoolstudent@mail.ru](mailto:middleschoolstudent@mail.ru) |
  |------------|--------------------------------------------------------------|
  | 📱 Telegram | [@middle_student](https://t.me/middle_student)               |

---

## 📂 Directory Tree

Below is the structure patches-showing which Chromium source files we’ve tweaked:

```
Directory tree for patches_v2/136.0.7103.49:
|-- base
|   |-- android
|   |   |-- java
|   |       |-- src
|   |           |-- org
|   |               |-- chromium
|   |                   |-- base
|   |                       |-- process_launcher
|   |-- version_info
|-- botbrowser
|-- build
|   |-- linux
|       |-- sysroot_scripts
|-- chrome
|   |-- android
|   |   |-- java
|   |-- app
|   |-- browser
|   |   |-- ash
|   |   |   |-- login
|   |   |-- devtools
|   |   |-- ui
|   |       |-- startup
|   |-- common
|   |-- installer
|   |   |-- linux
|   |       |-- debian
|   |-- renderer
|-- chromecast
|   |-- browser
|-- components
|   |-- component_updater
|   |-- crash
|   |   |-- core
|   |       |-- app
|   |-- embedder_support
|   |-- gwp_asan
|   |   |-- client
|   |-- language
|   |   |-- core
|   |       |-- browser
|   |-- nacl
|   |   |-- zygote
|   |-- password_manager
|   |   |-- core
|   |       |-- browser
|   |-- payments
|   |   |-- core
|   |-- policy
|   |   |-- core
|   |       |-- common
|   |           |-- cloud
|   |-- prefs
|   |-- update_client
|   |   |-- net
|   |-- version_info
|-- content
|   |-- app
|   |-- browser
|   |   |-- bluetooth
|   |   |-- client_hints
|   |   |-- devtools
|   |   |   |-- protocol
|   |   |-- gpu
|   |   |-- quota
|   |   |-- renderer_host
|   |   |-- speech
|   |   |-- web_contents
|   |-- child
|   |-- gpu
|   |-- public
|   |   |-- browser
|   |-- shell
|   |   |-- browser
|   |-- zygote
|-- gpu
|   |-- command_buffer
|   |   |-- client
|   |-- config
|-- media
|   |-- capture
|       |-- video
|-- pdf
|-- services
|   |-- network
|   |   |-- p2p
|   |-- passage_embeddings
|-- third_party
|   |-- blink
|   |   |-- common
|   |   |   |-- device_memory
|   |   |   |-- web_preferences
|   |   |-- public
|   |   |   |-- common
|   |   |       |-- web_preferences
|   |   |-- renderer
|   |       |-- core
|   |       |   |-- css
|   |       |   |-- dom
|   |       |   |-- events
|   |       |   |-- execution_context
|   |       |   |-- exported
|   |       |   |-- frame
|   |       |   |-- html
|   |       |   |-- inspector
|   |       |   |-- layout
|   |       |   |-- loader
|   |       |   |-- permissions_policy
|   |       |   |-- timezone
|   |       |   |-- timing
|   |       |-- modules
|   |       |   |-- battery
|   |       |   |-- canvas
|   |       |   |-- encoding
|   |       |   |-- encryptedmedia
|   |       |   |-- keyboard
|   |       |   |-- mediarecorder
|   |       |   |-- mediasource
|   |       |   |-- mediastream
|   |       |   |-- peerconnection
|   |       |   |-- plugins
|   |       |   |-- quota
|   |       |   |-- webaudio
|   |       |   |-- webgl
|   |       |   |-- webgpu
|   |       |-- platform
|   |           |-- fonts
|   |           |-- media
|   |-- crashpad
|   |   |-- crashpad
|   |       |-- client
|   |-- harfbuzz-ng
|       |-- src
|           |-- src
|-- tools
|   |-- gritsettings
|-- ui
|   |-- base
|   |   |-- l10n
|   |-- resources
|       |-- fonts
|-- v8
    |-- src
        |-- execution
        |-- heap
        |-- inspector
        |-- numbers
```


---

## ⚠️ DISCLAIMER

The code snippets and patches provided here are for **demonstration purposes only**. They come **as-is**, without any warranty-explicit or implied. BotBrowser and its authors are **not responsible** for any misuse, data loss, or legal claims arising from the application of these examples. Unauthorized distribution or modification of our private core beyond this showcase is strictly prohibited.
