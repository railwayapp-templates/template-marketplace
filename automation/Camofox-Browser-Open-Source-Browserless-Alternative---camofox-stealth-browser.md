# Deploy Camofox Browser | Open Source Browserless Alternative on Railway

Stealth Firefox browser API for AI agents, locked down by default

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/camofox-stealth-browser)

## About

Camofox Browser is a stealth headless browser served over HTTP: your agent or scraper drives a real Firefox through a small REST API instead of shipping Playwright, a browser binary and 400 MB of Chromium dependencies inside its own container. It is built on Camoufox, a Firefox fork whose anti-detection work happens in the C++ layer rather than in injected JavaScript, so the usual `navigator.webdriver` and WebGL tells are simply not there to find.

This template runs the project's own published image — `ghcr.io/jo-inc/camofox-browser:1.14.0`, pinned, with Camoufox 135.0.1 already baked in — as a single service with a volume. There is no database and nothing to build: the deploy is one container pull, and the browser is warm within about a minute.

Two decisions here are worth knowing about before you deploy, because they are the ones that differ from the obvious setup.

**The API is closed.** The server has three separate keys, and only one of them is the master gate: `CAMOFOX_ACCESS_KEY`. It is generated for you and required on every route except `/health`. This matters more than it sounds — the API includes `/tabs/{id}/evaluate`, which runs arbitrary JavaScript in a browser that sits inside your private Railway network. A deployment of this server without that key set is a public remote-code-execution surface with a side of SSRF, not merely an open scraper. `CAMOFOX_API_KEY` (cookie import) and `CAMOFOX_ADMIN_KEY` (`POST /stop`) are generated separately so you can hand one out without handing out everything.

**Everything durable is on the volume.** Browser profiles, imported cookies, upload staging and Playwright traces all live under `/data`. Upstream defaults them to `~/.camofox`, which on Railway is the ephemeral layer — the practical effect of leaving that alone is that a logged-in session you spent effort establishing quietly disappears on your next redeploy.

Crash telemetry is off. Upstream ships anonymized crash and hang reporting turned **on**, and it files those reports as public GitHub issues against `jo-inc/camofox-browser`. That is a reasonable default for a project collecting its own field data and a surprising one for someone who clicked Deploy, so this template sets `CAMOFOX_CRASH_REPORT_ENABLED=false`. Set it to `true` if you would like to help, or point `CAMOFOX_CRASH_REPORT_URL` at an endpoint of your own.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Camofox | `ghcr.io/jo-inc/camofox-browser:1.14.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9377 | The port the server listens on. The image bakes CAMOFOX_PORT=9377 and prefers it over Railway's injected PORT, so this must stay 9377 or the platform routes traffic to a port nothing is listening on. |
| `CAMOFOX_API_KEY` | (secret) | Gates cookie and auth-session import (POST /sessions/:userId/cookies), which is how you hand the browser a logged-in session. Separate from the access key so you can share it with a narrower caller. |
| `CAMOFOX_ADMIN_KEY` | - | Gates POST /stop, which shuts the browser down. Kept separate so an operator can stop the browser without holding the access key. |
| `CAMOFOX_ACCESS_KEY` | - | The master key. Every route except /health requires 'Authorization: Bearer <this>'. Without it the browser API would be open to anyone who finds the URL, including /evaluate, which runs arbitrary JavaScript. Do not clear it. |
| `CAMOFOX_TRACES_DIR` | /data/traces | Playwright traces, when a session is created with trace enabled. Capped at 50 MB and 24 hours by default. |
| `MAX_OLD_SPACE_SIZE` | 192 | Node heap limit in MB for the API server. The browser is a separate process and is not bounded by this; raise it only if you see the server itself running out of heap on large page snapshots. |
| `CAMOFOX_COOKIES_DIR` | /data/cookies | Imported Netscape cookie files. On the volume so they are not lost on redeploy. |
| `CAMOFOX_INTERACTIVE` | off | Remote desktop / noVNC access to the browser. Kept off: on a public domain it would be a second way in. Values: off, desktop, novnc, auto. |
| `CAMOFOX_PROFILE_DIR` | /data/profiles | Per-user browser profiles (cookies + localStorage + IndexedDB) on the volume. This is what makes a logged-in session survive a redeploy. |
| `CAMOFOX_UPLOADS_DIR` | /data/uploads | Files available to the browser's file-upload endpoint. On the volume. |
| `BROWSER_IDLE_TIMEOUT_MS` | 300000 | Close the browser after this long with no sessions. This is the main cost control: an idle deployment drops from roughly 900 MB to under 200 MB. Set higher to trade money for a warm first request. |
| `CAMOFOX_CRASH_REPORT_ENABLED` | false | Upstream ships anonymized crash/hang telemetry ON, and it files reports as public GitHub issues on jo-inc/camofox-browser. Turned off here. Set to true to help the project, or point CAMOFOX_CRASH_REPORT_URL at your own endpoint. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/camofox-stealth-browser)
