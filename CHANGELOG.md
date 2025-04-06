# CHANGELOG

## [Unreleased]
- Chromium Extension fingerprint spoofing. [#3](https://github.com/MiddleSchoolStudent/BotBrowser/issues/3)

---

## [2025-04-06]

### Improved
- **Upgraded to Chromium 135**
  - Synchronized BotBrowser with the latest **Chromium 135**, ensuring full compatibility with the most recent Chrome version.
  - This upgrade improves stealth, fingerprint parity, and long-term maintenance as Chrome evolves.


---

## [2025-03-31]

### Improved
- **Faster Profile Loading**
  - Optimized the profile loading logic to significantly reduce load time and improve overall performance.

- **JavaScript Stack Limit Alignment**
  - Adjusted JavaScript stack limit to match official Chrome behavior exactly, improving parity and reducing detection risk.

- **Unified NaN Conversion Logic Across Architectures**
  - Ensured consistent `NaN` bit-level structure across both **x86** and **ARM**, avoiding architecture-specific fingerprint leaks.
  - Prevents antifraud systems from detecting x86-based emulation of ARM devices.

### Added
- **Notification API Normalization Across Platforms**
  - Standardized the behavior of the `Notification` API on different operating systems, closing a detection vector used by **DataDome**.

- **Chromium 134: `CustomizableSelect` Runtime Feature Support**
  - Added OS-specific behavior simulation for the experimental `CustomizableSelect` runtime feature, collected from profiles.

- **Advanced matchMedia Fingerprint Control (hCaptcha / DataDome Bypass)**
  - Introduced fine-grained, profile-based control of `matchMedia()` output.
  - Successfully bypasses **hCaptcha** and **DataDome** fingerprint checks that rely on subtle media query inconsistencies.

- **New GPU Fingerprint Fields**
  - Added support for new `GPUAdapter` and `GPUDevice` fingerprint fields to enhance hardware-level spoofing accuracy.

### Removed
- **Scrollbar Width Spoofing**
  - Removed static 17px scrollbar width simulation, which proved unnecessary after extensive testing.
  - Thanks to community feedback for identifying its low fingerprinting value.

### Fixed
- **mimeTypes Fingerprint Handling**
  - Fixed a long-standing issue where important `mimeTypes` were missed during processing, improving detection resistance.


---


## [2025-03-20]

### Improved
- **Upgraded to Chromium 134.0.6998.95**
  - Synced to the latest **Chromium 134.0.6998.95**, improving stealth and compatibility with modern web environments.
  - Enhances detection resistance by aligning with the newest Chrome updates.

### Fixed
- **Stability Improvements & Bug Fixes**
  - Resolved several critical bugs to prevent unexpected browser crashes.
  - Improved overall performance and reliability.

---

## [2025-03-10]

### Improved
- **Bypassing the Latest Kasada Detection**
  - Updated core logic to successfully evade the latest **Kasada** detection techniques, ensuring uninterrupted automation.

---

## [2025-03-04]

### Improved
- **GPU Emulation Performance Optimization**
  - Improved GPU simulation to run smoother in headless mode, reducing stutters and ensuring more stable performance.

- **Large Window Simulation on Small Screens**
  - Enabled simulation of larger browser windows on smaller screens, allowing mouse actions to interact with elements beyond the physical screen boundaries.

- **Removed CrashReporter**
  - Disabled Chromium's **CrashReporter** to prevent potential data leakage and improve performance.

### Fixed
- **Enhanced device_scale_factor Handling**
  - Fixed issues with incorrect `device_scale_factor` handling, preventing antifraud systems from detecting Retina screen anomalies through ultra-thin (0.5px) line rendering.


---

## [2025-02-23]

### Added
- **GPU Simulation Toggle for Headless Devices**
  - Introduced a new **toggle** that determines whether to simulate **GPU** based on the presence of a graphical interface, preventing failures on devices without GPU support.

- **CSS Fingerprint Protection**
  - Added fingerprint support for `CSSValueID::kSelecteditem` and `CSSValueID::kSelecteditemtext` to enhance detection evasion.

- **Blocked Local Port Scanning via WebSocket & Image Requests**
  - Prevented websites from scanning **local ports** using **WebSocket** or **Image requests** to detect automation-related services.
  - Blocked common ports associated with debugging and remote access:
    - `7070, 7071` (Remote debugging)
    - `3389` (RDP)
    - `5938, 5939` (TeamViewer)
    - `9222` (Chrome DevTools)
    - `6139, 6239, 6339` (Remote access)
    - `9839, 9939` (Remote debugging)
    - `5900, 5901` (VNC)

### Fixed
- **Prevent Local Video File Leaks**
  - Modified **FileVideoCaptureDevice** to ensure that opening local video files does not expose detectable traces to websites.

- **Mitigated Accept-Language Header Leaks in Automation Frameworks**
  - Addressed a leakage issue where automation frameworks like **Playwright** set a default **Accept-Language** header, which could be detected by **Adscore**.
  - **CDP-based fingerprint modification is now restricted** to ensure stable antibot evasion when using **BotBrowser** with **CDP**.

### Improved
- **Enhanced 2D Canvas Fingerprint Evasion**
  - Implemented a **new Skia-based anti-aliasing technique**, modifying the rendering algorithm at the lowest level to make detection nearly impossible.

- **Advanced Audio Fingerprinting Protection**
  - Redesigned **audio noise injection** for **RealtimeAnalyser** and **ChannelData**, using a more stealthy approach to prevent **browserscan** from detecting noise leaks.


---

## [2025-02-04]

### Improved
- **Enhanced Fingerprint Protection in AnalyserNode**
  - Added **noise injection** to **AnalyserNode**, making it significantly harder for detection systems to identify synthetic audio processing behavior.
  - This improvement further strengthens **Web Audio API** fingerprint obfuscation against targeted detection techniques.


---

## [2025-02-02]

### Major Upgrade
- **Canvas Noise Algorithm Overhaul:**
  Completely reworked the **Canvas noise algorithm** by integrating noise injection into **Skia's anti-aliasing process**, significantly reducing the likelihood of detection by advanced antibot systems.

### Fixed
- **WebGL Context readPixels Bug Fix:**
  Optimized **readPixels** in **WebGL Context** to prevent incorrect noise injection on solid-color images, ensuring accurate rendering.

### Added
- **Chrome 132 Test Profiles for Windows & macOS:**
  Released **test profiles** for **Chrome 132** on **Windows** and **macOS**, improving compatibility with the latest browser updates.


---

## [2025-01-24]

### Major Update
- **GPU Emulation on Headless Servers:** Introduced full emulation of GPU-related fingerprints on devices without dedicated GPUs. This allows **VPS servers (Linux, Windows)** without GPUs to perfectly mimic GPU information, including `navigator.gpu`, `GPUAdapter`, `GPUAdapterInfo`, `GPUDevice`, `WebGLRenderingContext`, and `WebGL2RenderingContext`. This significantly reduces GPU rental costs while bypassing GPU-sensitive antifraud systems, such as the latest **hCaptcha** updates, which began detecting `navigator.gpu`.

### Added
- **GPUAdapterInfo and WGSLLanguageFeatures Fingerprinting:** Added support for fingerprinting **GPUAdapterInfo** and **WGSLLanguageFeatures**, ensuring comprehensive GPU-related data coverage.


---

## [2025-01-22]

### Improved
- **MimeTypes Fingerprinting:** Optimized **mimeTypes** fingerprinting by converting them to **ContentType**, followed by parsing `type` and `codecs` separately. This enhancement strengthens mimeTypes matching and reduces detection risks from antifraud techniques, such as those used by **Incapsula**.
- **Font Matching Accuracy:** Improved font matching logic to avoid unnecessary matches, significantly enhancing font accuracy and reducing false positives.

### Major Update
- **Windows Binary Release:** Reintroduced public release of **Windows binaries** with support for **Windows 11** and **Windows 10**. Future updates will include support for **Windows 7** and **Windows 8**.


---

## [2025-01-17]

### Improved
- **System Colors Configuration:** Added support for configuring system colors with **RGBA**, enabling more flexible and realistic color rendering.

### Fixed
- **Stability Bug Fix:** Resolved a crash issue by enabling **MDNS** (`enable_mdns`), ensuring improved stability on certain websites.

### Major Update
- **Version Release - 132.0.6834.84:** Updated to align with the latest **Chrome version**, ensuring compatibility with the most recent features and security updates.


---

## [2025-01-12]

### Fixed
- **Mimetypes, MediaRecorder, and MediaSource Fingerprints:** Fixed issues where fingerprints were not correctly recognized under certain conditions. Optimized handling to ignore spaces after `;` in mimetypes, addressing antifraud tricks that exploit this discrepancy.
  [Issue Reference: #8](https://github.com/MiddleSchoolStudent/BotBrowser/issues/8)

### Improved
- **Removed RLZ Support:** RLZ support has been removed as it is unnecessary for our product and caused issues in some scenarios.
- **AdInterest Group Support:** Enhanced support for **AdInterest**, specifically `getInterestGroupAdAuctionData` in Chrome, which now functions seamlessly in **BotBrowser**, improving resistance to antibot detection.
- **Fingerprint Caching:** Introduced caching for specific fingerprints to improve overall performance.

### Added
- **Bluetooth Support:** Added support for **Bluetooth emulation**, enabling realistic behavior even on Linux data center servers.
- **HarfBuzz Modification:** Made significant modifications to Chromium's **HarfBuzz** text shaping library, introducing factors that make fingerprint measurements more challenging to detect. This enhancement ensures diversity and undetectability for **canvas text fingerprints**, **DOM rects**, **SVG rects**, **emojis**, and **text metrics** through a single configuration.
  [Issue Reference: #6](https://github.com/MiddleSchoolStudent/BotBrowser/issues/6)
  [Reference Documentation](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/ui/text_rendering/render_text_overview.md#text-shaping)


---

## [2025-01-03]

### Improved
- **SwiftShader Parameter Adjustment:** Enhanced **SwiftShader** parameters on **Linux**, providing broader support and improved **EGL compatibility**.
- **Background Networking Control:** Replaced the `disable-background-networking` flag with a custom `botbrowser-disable-background-networking` flag to prevent **CDP** from interfering with **CDM downloads**.
- **PDF Embedding Behavior:** Disabled **PdfOopif** to ensure PDF embedding behaves similarly to standard browsers, reducing detection risks.

### Fixed
- **Document Client Rects Noise:** Resolved an issue where unnecessary noise was added to **Document client rects**, preventing detection by certain antibot systems.

### Added
- **TextMetrics Algorithm Enhancement:** Introduced a new **TextMetrics** algorithm that hashes text and the provided **factor** instead of relying on simple cumulative factors. This improvement reduces detection risks from advanced antibot systems like **F5 Shape**.


---

## [2024-12-29]

### Fixed
- **Pixelscan PDF Viewer Detection Bypass:** Successfully bypassed PDF viewer leakage detection in **Pixelscan**. This issue was categorized as **P0 severity**.  [#11](https://github.com/MiddleSchoolStudent/BotBrowser/issues/11)

### Changed
- **WebPreferences Update:** Updated **WebPreferences** based on the `ostype` specified in the profile, replacing the previous `BUILDFLAG()` logic for improved flexibility and accuracy.

### Added
- **SelectionDirection Simulation:** Implemented **SelectionDirection** simulation to prevent detection by antibot systems.
 [#9](https://github.com/MiddleSchoolStudent/BotBrowser/issues/9)
- **GPU Optimization:** Updated compilation parameters for better **GPU** performance and enhanced compatibility.
- **BarcodeDetector Simulation:** Simulated **BarcodeDetector** behavior to mimic macOS characteristics, even when running on **Windows** or **Ubuntu**, as long as the profile specifies `macOS` as the `ostype`.  [#10](https://github.com/MiddleSchoolStudent/BotBrowser/issues/10)
- **Runtime Feature Simulation:** Added simulation support for the following **Runtime Features**, allowing their activation via profile configuration:
   - `CookieDeprecationFacilitatedTesting`
   - `AdInterestGroupAPI`
   - `FetchLaterAPI`


---

## [2024-12-26]

### Added
- **Enhanced GPU Fingerprinting:** Further improved support for **GPUSupportedLimits**, ensuring clear differentiation between **GPUDevice** and **GPUAdapter** data.

### Fixed
- **CDM Component Download:** Ensured CDM components are downloaded **bypassing proxy settings**, guaranteeing successful downloads regardless of network configuration.
- **CDM Key System Handling:** Ensured **CDM Key system requests** complete loading before returning results to JavaScript, effectively preventing leakage detection.


---

## [2024-12-25]

### Added
- **GPU Fingerprinting Simulation:** Implemented support for simulating **GPUAdapter**, **GPUSupportedFeatures**, and **GPULimits** fingerprints.
- **WebGL Extension Support:** Added fingerprint support for the **MaxDrawBuffers** WebGL extension.

### Changed
- **args.gn Adjustments:** Modified `args.gn` to allow access to `navigator.getInterestGroupAdAuctionData` and `navigator.cookieDeprecationLabel`, aligning behavior with standard browser environments.
  [Commit Reference](https://github.com/MiddleSchoolStudent/BotBrowser/commit/e17e1746439d6ddc3d07e621d90aaf78ea847a2d)

### Fixed
- **WebGL2 Renderer and Vendor Bug:** Fixed an issue where `renderer` and `vendor` could not be retrieved under **WebGL2** environments.

### Improved
- **WebGL Parameters Simulation:** Inspired by **FakeVision**, refined WebGL parameters simulation to minimize detection risks through more cautious handling.
  [FakeVision Decompiled Source Code](https://github.com/MiddleSchoolStudent/FakeVision-Reverse)


---

## [2024-12-24]
### Fixed
- Resolved **CDM issue**, enhancing browser environment security.

### Added
- Successfully bypassed **[Fake Vision](https://fv.pro)** detection mechanisms, improving undetectable browsing capabilities. [Test Code](tests/tests/antibots/fvpro.spec.ts), [▶️ Test Result (fv.pro)](https://middleschoolstudent.github.io/BotBrowser/video_player/index.html?video=https://raw.githubusercontent.com/MiddleSchoolStudent/BotBrowser/main/tests/test-results/fvpro-test-fv-pro-BotBrowser-antibots/video.webm)
