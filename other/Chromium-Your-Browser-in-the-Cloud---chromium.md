# Deploy Chromium | Your Browser in the Cloud on Railway

Full desktop Chromium in your browser: private, persistent cloud browsing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chromium)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/chromium?utm_medium=integration&utm_source=button&utm_campaign=chromium)

This template runs a full desktop [Chromium](https://www.chromium.org/) browser in the cloud, streamed to any device through the [linuxserver.io](https://docs.linuxserver.io/images/docker-chromium/) Selkies web interface. Open your Railway domain, log in, and you're inside a real browser running on the server — bookmarks, extensions, downloads, and sessions persist between visits.

The service streams a GPU-less desktop Chromium over WebSockets with the linuxserver.io Selkies stack. Access is gated by HTTP basic auth (`CUSTOM_USER` / generated `PASSWORD`), and the browser profile persists on a volume at `/config`. The `--disable-dev-shm-usage` flag is pre-set so Chromium runs happily within Railway's container shared memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chromium | [nomideusz/chromium-railway](https://github.com/nomideusz/chromium-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the browser session. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `PASSWORD` | (secret) | Login password for the browser session. Keep it strong — this gates who can use your cloud browser. |
| `CHROME_CLI` | --disable-dev-shm-usage | Extra Chromium flags. --disable-dev-shm-usage is required on Railway (small /dev/shm). Append more flags space-separated. |
| `CUSTOM_USER` | (secret) | Login username for the browser session. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/chromium)
