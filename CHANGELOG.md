# CHANGELOG

## [Unreleased]
- Chromium Extension fingerprint spoofing. [#3](https://github.com/MiddleSchoolStudent/BotBrowser/issues/3)

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
