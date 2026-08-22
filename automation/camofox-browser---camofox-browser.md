# Deploy camofox-browser on Railway

Anti-detection browser automation powered by Camoufox

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/camofox-browser)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/IrXpSx)

![Camofox Browser](https://raw.githubusercontent.com/INAPP-Mobile/camofox-browser/main/template-icon.svg)

Camofox Browser is a privacy-focused, anti-detection browser automation service powered by Camoufox. Deploy a headless browser with built-in fingerprint randomization, VNC support, and session persistence — ready for scraping, automation, and testing workloads.

This template deploys on Railway with a single service running Camoufox (a patched Firefox). The container uses Xvfb for a virtual display, so the browser renders as if on a real desktop — critical for passing WebGL and canvas fingerprint checks. Each instance uses ~200MB RAM baseline plus ~500MB per active session; size your plan accordingly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| camofox-browser | [INAPP-Mobile/camofox-browser](https://github.com/INAPP-Mobile/camofox-browser) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9377 | Port the Camofox Browser server listens on. Railway injects this automatically. |
| `MAX_SESSIONS` | 10 | Maximum number of concurrent browser sessions. Each session uses significant memory (500MB+). Reduce if memory-constrained. |
| `CAMOFOX_API_KEY` | (secret) | API key for authentication. Auto-generated on deploy. Set to empty string to disable auth (anyone with the URL can use the service). |
| `CAMOFOX_ADMIN_KEY` | - | Admin key for privileged operations (stats, management). Auto-generated on deploy. Set to empty string to disable admin endpoints. |
| `CAMOFOX_INTERACTIVE` | off | Interactive mode: 'off' (headless only), 'desktop' (always interactive), 'novnc' (VNC via browser), 'auto' (detect based on capabilities). |
| `CAMOFOX_PROFILE_DIR` | /data/profiles | Directory for storing browser profiles (cookies, localStorage, IndexedDB). Set to /data/profiles to use a Railway volume for persistence across restarts. |
| `BROWSER_IDLE_TIMEOUT_MS` | 300000 | Browser idle timeout in milliseconds (5 minutes). Browsers with no activity are shut down to save resources. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/profiles`

**Category:** Automation · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/camofox-browser)
