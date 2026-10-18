# PAC-Like Request Callback

> Use standard PAC routing plus BotBrowser's trusted request callback for enterprise network policy workflows.

---

<a id="prerequisites"></a>

## Prerequisites

- **BotBrowser ENT Tier3 license** for trusted request callback workflows.
- **BotBrowser binary** with a valid profile loaded via `--bot-profile`.
- **A trusted PAC source** that you control, such as a local file or controlled loopback service.

---

<a id="quick-start"></a>

## Quick Start

Configure PAC through the standard `--proxy-pac-url` flag:

```bash
chromium-browser \
  --bot-profile="/path/to/profile.enc" \
  --proxy-pac-url=file:///absolute/path/to/proxy.pac \
  --user-data-dir="$(mktemp -d)"
```

For local development, a controlled loopback PAC server is also supported:

```bash
chromium-browser \
  --bot-profile="/path/to/profile.enc" \
  --proxy-pac-url=http://127.0.0.1:8080/proxy.pac \
  --user-data-dir="$(mktemp -d)"
```

---

<a id="standard-pac-routing"></a>

## Standard PAC Routing

Standard PAC scripts continue to use the normal `FindProxyForURL(url, host)` function:

```javascript
function FindProxyForURL(url, host) {
  if (dnsDomainIs(host, "example.internal")) {
    return "DIRECT";
  }
  return "SOCKS5 proxy.example.com:1080";
}
```

Use standard PAC routing when you only need proxy selection by URL or hostname.

---

<a id="botbrowser-request-callback"></a>

## BotBrowser Request Callback

Approved ENT Tier3 profiles can also define a BotBrowser callback in the same trusted PAC script:

```javascript
function BotBrowserFindProxyForRequest(url, host, method, headersB64, bodyB64, bodyState) {
  if (method === "POST" && dnsDomainIs(host, "api.example.test")) {
    return "CAPTURE; CAPTURE_FILE /var/botbrowser/captures/api.jsonl; CAPTURE_TAG api-post; CONTINUE";
  }
  if (shExpMatch(url, "https://media.example.test/*")) {
    return "SOCKS5 media-user:media-pass@media-proxy.example.net:1080";
  }
  if (dnsDomainIs(host, "static.example.test")) {
    return "HTTPS static-proxy.example.net:8443";
  }
  return "CONTINUE";
}
```

This callback is BotBrowser-specific. It does not replace standard PAC routing. `FindProxyForURL(url, host)` continues to handle normal proxy selection. When the BotBrowser callback returns `CONTINUE` or no valid routing result, routing falls back to standard PAC behavior. A valid standard PAC route or synthetic response applies to the current request.

Use this workflow when request policy should stay in the browser network path. CDP-level request interception can interrupt HTTP/2 connection and stream continuity in some automation workflows. A trusted PAC callback keeps policy decisions with PAC routing, helping selected requests continue, stop, capture, or use different PAC routes without pausing every request in the automation layer.

| Parameter | Meaning |
|-----------|---------|
| `url` | Full request URL. |
| `host` | Hostname for the request. |
| `method` | HTTP method such as `GET` or `POST`. |
| `headersB64` | Base64-encoded request headers record. |
| `bodyB64` | Base64-encoded request body when `bodyState` is `bytes`. Empty for other body states. |
| `bodyState` | One of `none`, `bytes`, `file`, `stream`, `too_large`, or `unsupported`. |

Return values can be combined with semicolons:

| Return value | Behavior |
|--------------|----------|
| `CONTINUE` | Continue request handling and use standard PAC routing when no route is returned by the callback. |
| `BLOCK` | Stop the request. |
| `CAPTURE` | Enable capture for this request when paired with `CAPTURE_FILE <path>`. |
| `CAPTURE_TAG <tag>` | Attach a short tag to the capture record. |
| `CAPTURE_FILE <path>` | Write capture records to an approved absolute path when paired with `CAPTURE`. |
| `RESPONSE <raw_http_response_b64>` | Complete the request with a base64-encoded raw HTTP response. |
| `RESPONSE_FILE <path>` | Complete the request with a raw HTTP response read from an approved local file. |
| Standard PAC result | Route the current request with `DIRECT`, `PROXY`, `HTTPS`, `SOCKS`, `SOCKS4`, or `SOCKS5`. |

Capture records are written only when `CAPTURE` and `CAPTURE_FILE <path>` are returned together. `CAPTURE_FILE <path>` without `CAPTURE` does not write a capture record. `BLOCK` can be used by itself. `CAPTURE; CAPTURE_FILE <path>; BLOCK` writes the capture record and then blocks the request.

Standard PAC routes may include proxy credentials, for example `SOCKS5 user:pass@proxy.example.com:1080`. Credentials remain part of the proxy route and are not sent to the destination server.

When commands are combined, capture is written first. `RESPONSE` or `RESPONSE_FILE` then completes the request and takes priority over `BLOCK` and proxy routing. Without a response, `BLOCK` takes priority over a proxy result. Invalid response input fails closed and is not sent to the destination or proxy.

<a id="synthetic-responses"></a>

## Synthetic Responses

`RESPONSE` accepts a complete raw HTTP response encoded as base64. The response must include a status line, headers, a blank line, and an optional body. This is useful for controlled health endpoints, local fixtures, and request policy workflows that should remain inside the browser network path.

```javascript
function BotBrowserFindProxyForRequest(url, host, method, headersB64, bodyB64, bodyState) {
  if (shExpMatch(url, "https://status.example.test/browser-ready")) {
    return "RESPONSE SFRUUC8xLjEgMjAwIE9LDQpDb250ZW50LVR5cGU6IHRleHQvcGxhaW4NCg0Kb2s=";
  }
  return "CONTINUE";
}
```

`RESPONSE_FILE` reads the same raw HTTP response format from an approved absolute local path:

```javascript
function BotBrowserFindProxyForRequest(url, host, method, headersB64, bodyB64, bodyState) {
  if (shExpMatch(url, "https://fixtures.example.test/*")) {
    return "RESPONSE_FILE /var/botbrowser/responses/fixture.http";
  }
  return "CONTINUE";
}
```

Synthetic responses are restricted to approved profiles using `file:` or `data:` PAC sources. HTTP(S) PAC sources can continue to route, capture, and block requests, but cannot return `RESPONSE` or `RESPONSE_FILE`. Malformed, oversized, unsafe, redirect, or otherwise unsupported response inputs fail closed. `RESPONSE_FILE` requires an approved absolute local path.

---

<a id="trusted-sources"></a>

## Trusted Sources

The request callback is available only for approved profiles and explicit PAC sources:

- `file://` PAC files.
- `data:` PAC URLs.
- Loopback HTTP(S) PAC services.
- Explicit remote HTTP(S) PAC services that your team controls.

PAC auto-detect and WPAD should be used only for standard PAC routing. They do not receive the BotBrowser request callback.

Synthetic responses have a narrower source policy than the callback itself: use `file:` or `data:` PAC sources for `RESPONSE` and `RESPONSE_FILE`.

---

<a id="enterprise-request-policy"></a>

## Enterprise Request Policy

ENT Tier3 profiles can enable trusted request callback workflows for approved deployments. Standard PAC routing remains unchanged; the BotBrowser callback adds request-aware policy handling for explicit PAC sources.

Recommended operating model:

- Use only PAC files or PAC services that your team controls.
- Prefer `file://` or loopback PAC URLs for local automation workers.
- Use HTTPS when the PAC source is remote.
- Keep PAC deployment tied to the same profile, proxy, and user data directory policy as the browser session.
- Avoid PAC auto-detect/WPAD for request callback workflows.

For setup templates and profile enablement, use the enterprise support channel.

---

<a id="common-scenarios"></a>

## Common Scenarios

### Keep a fixed proxy for most traffic

```javascript
function FindProxyForURL(url, host) {
  return "SOCKS5 proxy.example.com:1080";
}
```

### Bypass known internal hosts

```javascript
function FindProxyForURL(url, host) {
  if (shExpMatch(host, "*.internal.example")) {
    return "DIRECT";
  }
  return "HTTPS proxy.example.com:8443";
}
```

### Route selected requests by URL

```javascript
function FindProxyForURL(url, host) {
  return "SOCKS5 default-proxy.example.net:1080";
}

function BotBrowserFindProxyForRequest(url, host, method, headersB64, bodyB64, bodyState) {
  if (shExpMatch(url, "https://media.example.test/*")) {
    return "SOCKS5 media-user:media-pass@media-proxy.example.net:1080";
  }
  if (dnsDomainIs(host, "static.example.test")) {
    return "HTTPS static-user:static-pass@static-proxy.example.net:8443";
  }
  return "CONTINUE";
}
```

`CONTINUE` keeps the default `FindProxyForURL` route. Returning a standard PAC route from the BotBrowser callback applies that route only to the current request.

<a id="return-response-by-url"></a>

### Return a controlled response by URL

```javascript
function FindProxyForURL(url, host) {
  return "SOCKS5 default-user:default-pass@proxy.example.net:1080";
}

function BotBrowserFindProxyForRequest(url, host, method, headersB64, bodyB64, bodyState) {
  if (shExpMatch(url, "https://status.example.test/browser-ready")) {
    return "RESPONSE SFRUUC8xLjEgMjAwIE9LDQpDb250ZW50LVR5cGU6IHRleHQvcGxhaW4NCg0Kb2s=";
  }
  if (shExpMatch(url, "https://fixtures.example.test/*")) {
    return "RESPONSE_FILE /var/botbrowser/responses/fixture.http";
  }
  return "CONTINUE";
}
```

### Combine PAC with SOCKS5 UDP policy

PAC can select SOCKS5 routes for TCP traffic. QUIC/STUN UDP behavior still follows BotBrowser's UDP-over-SOCKS5 support and standard browser flags. If the deployment should avoid QUIC/HTTP/3, add `--disable-quic`:

```bash
--proxy-pac-url=file:///absolute/path/to/proxy.pac
--disable-quic
```

---

<a id="troubleshooting"></a>

## Troubleshooting / FAQ

| Problem | Solution |
|---------|----------|
| PAC file is ignored | Use an absolute `file://` URL or a reachable HTTP(S) URL. Confirm the flag is passed to the browser process. |
| Proxy auth fails | Return credentials with the PAC route, for example `SOCKS5 user:pass@proxy.example.com:1080`, and confirm the proxy accepts that credential format. |
| Request callback is unavailable | Confirm the profile has ENT Tier3 request callback enablement and the PAC source is explicit and trusted. |
| Synthetic response is rejected | Confirm the raw response has a valid status line and header separator. For `RESPONSE_FILE`, use an approved absolute local path. Invalid response input is rejected instead of continuing to the network. |
| QUIC still appears | Add `--disable-quic` when the workload should stay on TCP protocols. |
| Per-context behavior differs | Treat the request callback as an enterprise PAC workflow tied to the trusted PAC source. Use the same profile and proxy setup rules for each context. |

---

<a id="next-steps"></a>

## Next Steps

- [Proxy Configuration](PROXY_CONFIGURATION.md). Basic proxy setup and supported protocols.
- [UDP over SOCKS5](UDP_OVER_SOCKS5.md). QUIC/STUN tunneling behavior and `--disable-quic`.
- [Proxy Selective Routing](PROXY_SELECTIVE_ROUTING.md). Regex-based bypass rules.
- [Per-Context Proxy](PER_CONTEXT_PROXY.md). Assign different proxies to different contexts.
- [CLI Flags Reference](../../../CLI_FLAGS.md). Complete list of all available flags.

---

**Related documentation:** [Advanced Features: Network Fingerprint Control](../../../ADVANCED_FEATURES.md#network-fingerprint-control)

---

**[Legal Disclaimer & Terms of Use](https://github.com/botswin/BotBrowser/blob/main/DISCLAIMER.md) | [Responsible Use Guidelines](https://github.com/botswin/BotBrowser/blob/main/RESPONSIBLE_USE.md)**. BotBrowser is for authorized fingerprint protection and privacy research only.

---

**Related BotBrowser blog:** [Proxy Configuration](https://botbrowser.io/en/blog/proxy-configuration/)
