# Deploy Ungoogled Chromium | Your Browser in the Cloud on Railway

Ungoogled Chromium streamed to any device. Password-gated, persistent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ungoogled-chromium)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/ungoogled-chromium?utm_medium=integration&utm_source=button&utm_campaign=ungoogled-chromium)

This template runs a full desktop [Ungoogled Chromium](https://github.com/ungoogled-software/ungoogled-chromium) browser in the cloud, streamed to any device through the [linuxserver.io](https://docs.linuxserver.io/images/docker-ungoogled-chromium/) Selkies web interface. Open your Railway domain, log in, and you're inside a real browser running on the server — bookmarks, extensions, downloads, and sessions persist between visits.

The service streams a GPU-less desktop Ungoogled Chromium over WebSockets with the linuxserver.io Selkies stack. Access is gated by HTTP basic auth (`CUSTOM_USER` / generated `PASSWORD`), and the browser profile persists on a volume at `/config`. The `--disable-dev-shm-usage` flag is pre-set in `CHROME_CLI` so Ungoogled Chromium runs happily within Railway's container shared memory; append a URL there to open it at launch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ungoogled-chromium | [nomideusz/ungoogled-chromium-railway](https://github.com/nomideusz/ungoogled-chromium-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the browser session. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `PASSWORD` | (secret) | Login password for the browser session. Keep it strong - this gates who can use your cloud Ungoogled Chromium. |
| `CHROME_CLI` | --disable-dev-shm-usage | Extra flags. --disable-dev-shm-usage is required on Railway (small /dev/shm). Append URLs or more flags space-separated. |
| `CUSTOM_USER` | (secret) | Login username for the browser session. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ungoogled-chromium)
