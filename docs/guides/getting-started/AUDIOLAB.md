# AudioLab: Web Audio Forensics and Tracking Analysis

> Record Web Audio API calls to study audio fingerprint collection techniques and verify privacy protection.

---

<a id="prerequisites"></a>

## Prerequisites

- **BotBrowser** installed and running. See [Installation Guide](../../../INSTALLATION.md).
- **A profile file** (`.enc` for production).

---

<a id="quick-start"></a>

## Quick Start

Record all Web Audio API calls to a JSONL file:

```bash
chromium-browser \
    --bot-profile="/path/to/profile.enc" \
    --bot-audio-record-file=/tmp/audiolab.jsonl \
    --user-data-dir="$(mktemp -d)" \
    "https://example.com"
```

After the session, `/tmp/audiolab.jsonl` contains every Web Audio API call the page made. Open it in the [Audio Viewer](https://botswin.github.io/BotBrowser/tools/audiolab/audio_viewer.html) to inspect events interactively.

---

<a id="how-it-works"></a>

## How It Works

When `--bot-audio-record-file` is set, BotBrowser intercepts every Web Audio API call at the browser engine level and writes it to a JSONL file. Each line is a JSON object representing one API call, including:

- **Event type**: `context_create`, `node_create`, `param_set`, `connect`, `start`, `start_rendering`, `read_channel_data`, `analyser_read`, `codec_check`, and more
- **Full parameters**: all arguments serialized (node types, parameter values, timing, sample previews)
- **Audio graph topology**: which nodes connect to which, showing the complete signal routing
- **Data extraction**: sample previews (first 10 + last 10 values), sums, frequency data, codec results
- **Execution context**: sequence number, timestamp, process/thread ID, source URL

---

<a id="common-scenarios"></a>

## Common Scenarios

### Record and analyze with Playwright

```javascript
import { chromium } from "playwright-core";

const browser = await chromium.launch({
    executablePath: process.env.BOTBROWSER_EXEC_PATH,
    headless: true,
    args: [
        `--bot-profile=${process.env.BOT_PROFILE_PATH}`,
        "--bot-audio-record-file=/tmp/audiolab.jsonl",
    ],
});

const page = await browser.newPage();
await page.goto("https://example.com");
// Let the page run its audio fingerprinting
await page.waitForTimeout(5000);
await browser.close();

// Now inspect /tmp/audiolab.jsonl
```

### View recordings in the Audio Viewer

Open the HTML-based viewer to inspect recordings interactively:

1. Navigate to the [Audio Viewer](https://botswin.github.io/BotBrowser/tools/audiolab/audio_viewer.html)
2. Load your `.jsonl` file
3. Browse events, view the audio graph topology, and inspect extracted data

### Identify which fingerprinting recipe a site uses

The Audio Viewer automatically detects known recipes:

```bash
# Record a site's audio fingerprinting
chromium-browser \
    --bot-profile="/path/to/profile.enc" \
    --bot-audio-record-file=/tmp/audiolab.jsonl \
    --user-data-dir="$(mktemp -d)" \
    "https://target-site.com"

# Quick check: what context parameters were used?
cat /tmp/audiolab.jsonl | jq 'select(.type == "context_create")'
# The viewer auto-detects common patterns from context parameters
```

### Inspect extracted audio data

```bash
# See what data the tracker extracted
cat /tmp/audiolab.jsonl | jq 'select(.type == "read_channel_data")'

# Check codec probing
cat /tmp/audiolab.jsonl | jq 'select(.type == "codec_check")'
```

### Cross-platform protection validation

Record the same page on multiple platforms and compare the JSONL output to verify that BotBrowser's noise produces consistent protection:

```bash
# Record on Linux host
chromium-browser \
    --bot-profile="/path/to/win-profile.enc" \
    --bot-audio-record-file=/tmp/audiolab-linux.jsonl \
    --user-data-dir="$(mktemp -d)" \
    "https://example.com"

# Compare with recording from macOS host
diff /tmp/audiolab-linux.jsonl /tmp/audiolab-macos.jsonl
```

### Record audio and canvas simultaneously

```bash
chromium-browser \
    --bot-profile="/path/to/profile.enc" \
    --bot-audio-record-file=/tmp/audiolab.jsonl \
    --bot-canvas-record-file=/tmp/canvaslab.jsonl \
    --user-data-dir="$(mktemp -d)" \
    "https://example.com"
```

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---------|----------|
| JSONL file is empty | Ensure the page actually uses Web Audio APIs. Try a known fingerprint test site like [CreepJS](https://abrahamjuliot.github.io/creepjs/). |
| File path not writable | Use an absolute path and ensure the directory exists. BotBrowser does not create parent directories. |
| Only codec_check events appear | The page may only test codec support (canPlayType/isTypeSupported) without rendering audio. This is normal for some tracking systems. |
| Missing analyser_read events | Not all fingerprinting patterns use AnalyserNode. Some recipes only read channel data. |

---

<a id="next-steps"></a>

## Next Steps

- [AudioLab Documentation](../../../tools/audiolab/). Complete reference including recording format, event types, and viewer usage.
- [Audio Fingerprinting](../fingerprint/AUDIO.md). Configure audio noise and rendering consistency.
- [CanvasLab](CANVASLAB.md). Similar forensics tool for Canvas 2D, WebGL, and WebGL2.

---

**Related documentation:** [AudioLab Tool](../../../tools/audiolab/)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) - [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [V8Log Forensics: Runtime Evidence for Privacy Validation](https://botbrowser.io/en/blog/v8log-diagnostics/)
