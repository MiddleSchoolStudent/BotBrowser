# Noise Seed Reproducibility

> Deterministic noise generation with seed control for reproducible fingerprint protection across sessions.

---

## Prerequisites

- **BotBrowser** installed. See [Installation Guide](../../../INSTALLATION.md).
- **A profile file** (`.enc` for production).


<a id="overview"></a>

## Quick Start

```bash
chromium-browser \
  --bot-profile="/path/to/profile.enc"
```

Start with this launch to establish a clean baseline before adding extra overrides.

## How It Works

BotBrowser applies controlled noise to fingerprint surfaces like Canvas, WebGL, AudioContext, and text measurements to prevent cross-session correlation. The `--bot-noise-seed` flag (ENT Tier2) gives you deterministic control over this noise: the same seed always produces the same fingerprint, while different seeds produce distinct identities.

---

<a id="what-is-noise-seed"></a>

## What Is a Noise Seed?

A noise seed is an integer value that initializes BotBrowser's deterministic random number generator. This generator controls the variance applied to fingerprint-sensitive APIs. Because the RNG is seeded, the output is reproducible: identical inputs with the same seed always produce identical outputs.

```bash
# Set a noise seed for deterministic fingerprinting
chromium-browser \
  --bot-profile="/path/to/profile.enc" \
  --bot-noise-seed=42
```

**Key properties:**

- **Same seed = same fingerprint.** A session launched with `--bot-noise-seed=42` produces identical Canvas hashes, WebGL readbacks, and audio fingerprints every time.
- **Different seed = different fingerprint.** Changing the seed to `43` produces a completely different but equally stable identity.
- **Seed value `0`** keeps noise active using profile defaults (no deterministic seeding).

---

<a id="seed-range"></a>

## Seed Range

The `--bot-noise-seed` flag accepts integer values from `1` to `UINT32_MAX` (4,294,967,295). Each value produces a unique, stable noise pattern.

---

<a id="affected-surfaces"></a>

## Affected Fingerprint Surfaces

The noise seed controls variance across all major fingerprint surfaces:

The seed controls noise across Canvas 2D, WebGL, WebGPU, AudioContext, ClientRects, and TextRects. All rendering and measurement output from these surfaces remains consistent per seed across sessions and restarts.

---

<a id="per-context-noise"></a>

## Per-Context Noise Seed

When using per-context fingerprinting (ENT Tier3), each `BrowserContext` can have its own noise seed. This allows multiple isolated identities within a single browser process, each with deterministic and independent noise.

```javascript
// Puppeteer
// Browser-level CDP session (required for BotBrowser.* commands)
const client = await browser.target().createCDPSession();

// Create a new browser context BEFORE setting flags
const context = await browser.createBrowserContext();

// Set per-context flags BEFORE creating any page
await client.send("BotBrowser.setBrowserContextFlags", {
  browserContextId: context._contextId,
  botbrowserFlags: [
    "--bot-profile=/path/to/profile-a.enc",
    "--bot-noise-seed=100",
  ],
});

// NOW create a page. The renderer will start with the correct flags.
const page = await context.newPage();
```

A second context with `--bot-noise-seed=200` produces an entirely different fingerprint while both remain reproducible across restarts.

---

<a id="use-cases"></a>

## Use Cases

### Multi-Tenant Isolation

Assign a unique seed per tenant or account. Each seed produces a distinct fingerprint identity that remains stable over time.

### Reproducible Testing

Use a fixed seed during development and testing to get consistent fingerprint hashes. This simplifies debugging and regression testing.

### Session Persistence

Relaunch sessions with the same seed to maintain fingerprint continuity across restarts, without needing to preserve browser state.

---

<a id="example"></a>

## Complete Example

```javascript
import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: process.env.BOTBROWSER_EXEC_PATH,
  headless: true,
  args: [
    `--bot-profile=${process.env.BOT_PROFILE_PATH}`,
    "--bot-noise-seed=42",
    "--proxy-server=socks5://user:pass@proxy.example.com:1080",
  ],
});

const page = await browser.newPage();
await page.goto("https://example.com");

// ... use the page as needed ...

await browser.close();
```

To verify noise seed reproducibility:

1. Launch BotBrowser with a profile and `--bot-noise-seed=42`, then visit a fingerprint testing site such as [BrowserLeaks](https://browserleaks.com/) or [CreepJS](https://abrahamjuliot.github.io/creepjs/).
2. Record the reported Canvas, WebGL, and AudioContext fingerprint values.
3. Launch a second session with the same profile and seed, and confirm the values are identical.
4. Change the seed to a different value (e.g., `--bot-noise-seed=43`) and confirm the fingerprint values differ.

---

<a id="common-scenarios"></a>

## Common Scenarios

- Capture a baseline result using the Quick Start setup.
- Change one relevant setting at a time and compare the new output.
- Keep your final launch command documented so future checks are reproducible.

## Troubleshooting / FAQ

| Problem | Solution |
|---|---|
| Observed value does not match the profile expectation | Verify profile path, active overrides, and any framework-injected settings. |
| Same setup behaves differently on another machine | Compare BotBrowser build, profile version, host OS target, and full launch args. |
| Test results fluctuate between runs | Keep proxy, locale/timezone, and runtime load stable during comparison tests. |

<a id="next-steps"></a>

## Next Steps

- [CLI Flags Reference](../../../CLI_FLAGS.md). Complete list of all available flags, including `--bot-noise-seed`.
- [Advanced Features](../../../ADVANCED_FEATURES.md). Multi-layer fingerprint noise architecture.

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) • [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [Noise Seed Reproducibility for Repeatable Fingerprint Runs](https://botbrowser.io/en/blog/noise-seed-reproducibility/)
