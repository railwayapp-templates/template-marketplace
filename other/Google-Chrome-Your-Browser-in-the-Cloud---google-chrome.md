# Deploy Google Chrome | Your Browser in the Cloud on Railway

Desktop Google Chrome streamed to any device. Password-gated, persistent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/google-chrome)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/google-chrome?utm_medium=integration&utm_source=button&utm_campaign=google-chrome)

This template runs a full desktop [Google Chrome](https://www.google.com/chrome/) browser in the cloud, streamed to any device through the [linuxserver.io](https://docs.linuxserver.io/images/docker-chrome/) Selkies web interface. Open your Railway domain, log in, and you're inside a real browser running on the server — bookmarks, extensions, downloads, and sessions persist between visits.

The service streams a GPU-less desktop Google Chrome over WebSockets with the linuxserver.io Selkies stack. Access is gated by HTTP basic auth (`CUSTOM_USER` / generated `PASSWORD`), and the browser profile persists on a volume at `/config`. The `--disable-dev-shm-usage` flag is pre-set in `CHROME_CLI` so Google Chrome runs happily within Railway's container shared memory; append a URL there to open it at launch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chrome | [nomideusz/chrome-railway](https://github.com/nomideusz/chrome-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the browser session. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `PASSWORD` | (secret) | Login password for the browser session. Keep it strong - this gates who can use your cloud browser. |
| `CHROME_CLI` | --disable-dev-shm-usage | Extra browser flags. --disable-dev-shm-usage is required on Railway (small /dev/shm). Append URLs or more flags space-separated. |
| `CUSTOM_USER` | (secret) | Login username for the browser session. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/google-chrome)
