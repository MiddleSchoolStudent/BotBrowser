# Browser Fingerprinting: A Recognized Privacy Threat

This document compiles authoritative references from web standards bodies, major browser vendors, regulatory authorities, and academic research that classify browser fingerprinting as a privacy violation. It also presents empirical data on the scale and prevalence of fingerprint-based tracking across the web.

---

## W3C (World Wide Web Consortium)

**Source:** [Mitigating Browser Fingerprinting in Web Specifications](https://www.w3.org/TR/fingerprinting-guidance/)

The W3C, the organization that sets web standards, has published guidance specifically addressing browser fingerprinting as a privacy concern:

> "Browser fingerprinting allows for tracking of activity without clear or effective user controls: a browser fingerprint typically cannot be cleared or re-set."

> "Browser fingerprinting allows for collection of data about user activity without clear indications that such collection is happening."

> "Different sites may be able to combine information about a single user even where a cookie policy would block accessing of cookies between origins."

**Classification:** Fingerprinting enables invisible, persistent, cross-site tracking that users cannot control or clear.

---

## WebKit-Based Browsers

**Source:** [WebKit Tracking Prevention Policy](https://webkit.org/tracking-prevention-policy/)

Apple's WebKit team explicitly classifies fingerprinting as covert tracking:

> "**Fingerprinting**, or **stateless tracking**, is tracking based on the properties of the user's behavior and computing environment, without the need for explicit client-side storage."

> "**Covert tracking** includes **covert stateful tracking**, **fingerprinting**, and any other methods that are similarly hidden from user visibility and control."

> "WebKit will do its best to **prevent all covert tracking**, and all cross-site tracking (even when it's not covert)."

**Classification:** Fingerprinting is covert tracking that WebKit actively works to prevent.

---

## Mozilla (Firefox)

**Source:** [Anti-Tracking Policy](https://wiki.mozilla.org/Security/Anti_tracking_policy)

Mozilla defines fingerprinting as an unintended identification technique:

> "Fingerprinting is used to identify a user or user agent by the set of properties of the browser, the device, or the network."

> "A party which infers the set of fonts a user has installed on their device and collects this information alongside other device information would be considered to participate in browser fingerprinting."

**Classification:** Firefox treats fingerprinting scripts as tracking and blocks them by default.

---

## Google Chrome

**Source:** [User-Agent Reduction](https://privacysandbox.google.com/protections/user-agent)

Google acknowledges that traditional browser information enables passive fingerprinting:

> "The granularity and abundance of detail can lead to **user identification**."

> "The default availability of this information can lead to **covert tracking**."

> "User-Agent (UA) reduction minimizes the identifying information shared in the User-Agent string, which may be used for **passive fingerprinting**."

Google previously prohibited fingerprinting in its advertising products. In February 2025, Google reversed this policy, prompting regulatory backlash from the UK Information Commissioner's Office (see below).

**Classification:** Google recognizes fingerprinting as a privacy risk and has been reducing fingerprinting surface area through User-Agent Reduction and Privacy Sandbox, despite its recent advertising policy change.

---

## ICO (UK Information Commissioner's Office)

**Source:** [Our Response to Google's Policy Change on Fingerprinting](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2024/12/our-response-to-google-s-policy-change-on-fingerprinting/) (December 2024)

The UK's data protection authority responded to Google's decision to permit fingerprinting in its advertising products:

> "Fingerprinting is **not a fair means** of tracking users online because it is likely to **reduce people's choice and control** over how their information is collected."

> "Fingerprinting relies on signals that cannot be easily wiped, so even if users clear all site data, an organisation using fingerprinting techniques could **immediately identify them again**, which is not transparent and cannot easily be controlled."

The ICO characterized Google's policy reversal as "irresponsible" and confirmed that businesses deploying fingerprinting must demonstrate compliance with data protection law, including obtaining user consent.

**Classification:** Fingerprinting is unfair tracking that undermines user choice. The ICO has committed to publishing binding guidance on fingerprinting and storage-access technologies.

---

## EU Article 29 Working Party

**Source:** [Opinion 9/2014 on Device Fingerprinting (PDF)](https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2014/wp224_en.pdf)

The EU's data protection advisory body ruled that device fingerprinting requires user consent:

> "Device fingerprinting is subject to the **consent requirement** of Article 5(3) of the EU e-Privacy Directive."

> "Consent will be required if device fingerprinting is used for website analytics, user tracking to serve online behavioural advertising."

**Classification:** Under EU law, fingerprinting for tracking purposes requires explicit user consent, the same as cookies.

---

## Electronic Frontier Foundation (EFF)

**Sources:** [GDPR and Browser Fingerprinting](https://www.eff.org/deeplinks/2018/06/gdpr-and-browser-fingerprinting-how-it-changes-game-sneakiest-web-trackers) | [Cover Your Tracks](https://coveryourtracks.eff.org/about)

The EFF, a leading digital rights organization, states:

> "Where the purpose of fingerprinting is tracking people, it will constitute **'personal data processing'** and will be covered by the GDPR."

> "The very purpose of fingerprinting is to **escape user's control**."

> "There's **nothing legitimate** about this method of tracking."

The EFF's research project Panopticlick (now [Cover Your Tracks](https://coveryourtracks.eff.org/)) found that **84% of browsers tested had unique fingerprint configurations**, rising to **94%** when plugin-enabled browsers were included. Only 1% of fingerprints appeared more than twice in their dataset of over 470,000 browsers.

**Classification:** Fingerprinting is designed to circumvent user privacy controls. The vast majority of browsers can be uniquely identified through fingerprint data alone.

---

## CNIL (French Data Protection Authority)

**Source:** [Alternatives to Third-Party Cookies: What Consequences Regarding Consent?](https://www.cnil.fr/en/alternatives-third-party-cookies-what-consequences-regarding-consent)

France's data protection authority explicitly addresses fingerprinting:

> "Fingerprinting aims to uniquely identify a user on a website or mobile application by using the technical characteristics of his/her browser."

> "Tracking for advertising purposes, when based on browser or terminal information, must rely on the informed choice of the user, regardless of the technique used."

- Fingerprinting techniques require the same level of consent as cookies
- The CNIL's guidelines on cookies also apply to fingerprinting
- CNIL has fined ad tech companies for fingerprinting without consent

**Classification:** Fingerprinting without explicit consent violates French and EU data protection law.

---

## Academic Research: Prevalence and Scale

Browser fingerprinting is not a theoretical concern. Peer-reviewed research documents its widespread deployment across the web.

### Princeton Web Census (2016)

**Source:** [Online Tracking: A 1-Million-Site Measurement and Analysis](https://webtransparency.cs.princeton.edu/webcensus/), Englehardt & Narayanan, Princeton University

The largest academic web-tracking study to date crawled the top 1 million websites and found:

- **Canvas fingerprinting** scripts present on **14,371 websites**, loaded from approximately 400 distinct domains
- **AudioContext fingerprinting** detected on 67 websites
- While prominent trackers reduced canvas fingerprinting after public exposure, the total number of domains deploying it **increased considerably** as the technique spread to smaller operators

### KU Leuven & Princeton Joint Study

**Source:** [The Web Never Forgets: Persistent Tracking Mechanisms in the Wild](https://www.esat.kuleuven.be/cosic/news/the-web-never-forgets-persistent-tracking-mechanisms-in-the-wild/)

Researchers found canvas fingerprinting scripts on **5,542 of the top 100,000 websites** (5.5%), with the tracking occurring without any visible indication to users.

### Majestic 10K Fingerprinting Study (2018)

**Source:** [Who Touched My Browser Fingerprint?](https://dl.acm.org/doi/10.1145/3419394.3423614), ACM Internet Measurement Conference

An analysis of the top 10,000 websites found that **6,876 (68.8%) performed some form of browser fingerprinting**, collecting attributes including canvas hashes, WebGL parameters, installed fonts, screen properties, and audio processing characteristics.

### Real-World Interaction Study (2024)

**Source:** [Beyond the Crawl: Unmasking Browser Fingerprinting in Real User Interactions](https://arxiv.org/html/2502.01608v1)

A 10-week study with real users browsing 3,000 top-ranked websites revealed that automated crawlers **undercount fingerprinting prevalence** because many fingerprinting scripts are triggered only by user interactions such as login flows and authentication pages. The actual fingerprinting exposure users face is higher than crawl-based estimates suggest.

---

## What Fingerprinting Collects

Browser fingerprinting combines dozens of browser and device attributes into a composite identifier. Each attribute alone may seem innocuous, but together they form a unique signature:

| Category | Data Points |
|----------|-------------|
| **Graphics** | Canvas 2D rendering output, WebGL renderer/vendor strings, WebGPU adapter info, GPU micro-benchmark timing, shader precision formats |
| **Text & Fonts** | Installed font list, text measurement metrics (ClientRects, TextMetrics), HarfBuzz shaping output, font rendering characteristics |
| **Audio** | AudioContext processing output (OfflineAudioContext hash), audio hardware properties, sample rate, channel count |
| **Hardware** | Screen resolution, device pixel ratio, CPU core count (hardwareConcurrency), device memory, battery status, sensor availability |
| **Browser** | User-Agent string, userAgentData brands, installed plugins, language preferences, timezone, Do Not Track setting, PDF viewer status |
| **Network** | WebRTC local IP addresses, ICE candidates, STUN/TURN responses, connection type |
| **TLS / Protocol** | JA3/JA4 hash, HTTP/2 SETTINGS frame parameters, cipher suite ordering, TLS extension list, ALPN negotiation |
| **CSS & Media Queries** | prefers-color-scheme, prefers-reduced-motion, forced-colors mode, system color values, matchMedia results |
| **JavaScript Engine** | Math function precision (e.g., `Math.tan` output), error stack trace format, `Intl` API locale behavior, Date formatting |
| **Storage & APIs** | localStorage/sessionStorage quota, IndexedDB availability, service worker support, permission states, Notification API status |
| **Behavior** | Keyboard layout, touch support, pointer type, maximum touch points, gamepad API availability |

Unlike cookies, this data cannot be cleared, reset, or blocked through standard browser controls. Users have no visibility into when collection occurs and no mechanism to opt out.

---

## Summary

| Authority | Classification | Action |
|-----------|---------------|--------|
| **W3C** | Privacy threat | Published mitigation guidance for web specs |
| **WebKit-based browsers** | Covert tracking | Actively prevent cross-site tracking |
| **Mozilla** | Tracking technique | Blocks by default in Firefox |
| **Google Chrome** | Passive fingerprinting | Reducing via Privacy Sandbox |
| **ICO (UK)** | Unfair tracking | Called Google's policy reversal "irresponsible"; drafting binding guidance |
| **EU Article 29** | Requires consent | Same rules as cookies |
| **EFF** | Privacy violation | Research shows 84% of browsers uniquely identifiable |
| **CNIL** | Requires consent | Fines for non-compliance |
| **Academic research** | Widespread deployment | 5.5–68.8% of top websites deploy fingerprinting scripts |

---

## Conclusion

The consensus across web standards bodies, all major browser vendors, regulatory authorities, and academic research is clear: **browser fingerprinting is a pervasive privacy threat that operates without user knowledge, consent, or any means of control**.

Academic studies confirm that fingerprinting scripts are deployed on a significant portion of the web's most-visited sites, and that the true exposure users face exceeds what automated measurements can detect. Regulatory bodies across the EU and UK have ruled that fingerprinting requires the same level of consent as cookies, yet the tracking persists largely without it.

Users have the right to protect themselves from this form of tracking.

---

## Related Documentation

- [Legal Disclaimer](DISCLAIMER.md)
- [Responsible Use Guidelines](RESPONSIBLE_USE.md)
- [Main README](README.md)
