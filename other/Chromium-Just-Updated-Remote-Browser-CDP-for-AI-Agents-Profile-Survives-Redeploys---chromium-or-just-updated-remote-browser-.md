# Deploy Chromium | (Just Updated) Remote Browser + CDP for AI Agents, Profile Survives Redeploys on Railway

Remote Chromium desktop with CDP endpoint for AI agents; profile persists

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chromium-or-just-updated-remote-browser-)

## About

A full **Chromium** desktop in your browser, plus a Chrome DevTools Protocol (CDP) endpoint that an AI agent in the same Railway project can drive with Playwright or Puppeteer. A login gates the web desktop, the browser profile lives on a Railway volume, and the whole thing deploys with no manual step.

This template runs one container: the [jlesage/chromium](https://github.com/jlesage/docker-chromium) web desktop (pinned by digest, Chromium 152) wrapped for Railway ([bon5co/chromium-railway](https://github.com/bon5co/chromium-railway)). The web desktop is served over noVNC at the public URL behind HTTP-layer authentication: user `admin`, password in `WEB_AUTHENTICATION_PASSWORD`, generated at deploy time and stable across redeploys. The browser profile (logins, cookies, extensions, downloads) lives on a volume at `/config`, so it survives a redeploy.

CDP listens on port 9222 on the **private network only**; no public domain targets it. Stock Chromium refuses CDP clients that dial a hostname (`Host header is specified and is not an IP address or localhost`); the wrapper adds a small proxy that fixes the Host header and the websocket URL, so `chromium.railway.internal:9222` works from Playwright and Puppeteer. Verified: connect by hostname, open a page, evaluate JavaScript.

Agent contract:

- Web desktop URL variable: `CHROMIUM_URL` (login `admin` / `WEB_AUTHENTICATION_PASSWORD`)
- CDP URL variable: `CHROMIUM_CDP_URL` (private network, no auth, port 9222)
- Version probe: `GET $CHROMIUM_CDP_URL/json/version`
- Profile volume: `/config`
- Healthcheck: none (every public path answers 302 to the login page by design)

```python
from playwright.sync_api import sync_playwright
import os
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp(os.environ["CHROMIUM_CDP_URL"])
    page = b.contexts[0].new_page()
    page.goto("https://example.com")
    print(page.title())
```

Full agent guide: [AGENTS.md](https://github.com/bon5co/chromium-railway/blob/main/AGENTS.md). Reuse `contexts[0]` (the persistent profile) and close pages, not the browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chromium | `ghcr.io/bon5co/chromium-railway:152.0.7977.82` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `VNC_PASSWORD` | (secret) |
| `WEB_AUTHENTICATION_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/chromium-or-just-updated-remote-browser-)
