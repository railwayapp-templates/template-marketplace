# Deploy Mullvad Browser | Your Browser in the Cloud on Railway

Desktop Mullvad Browser streamed to any device. Password-gated, persistent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mullvad-browser)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/mullvad-browser?utm_medium=integration&utm_source=button&utm_campaign=mullvad-browser)

This template runs a full desktop [Mullvad Browser](https://mullvad.net/en/browser) browser in the cloud, streamed to any device through the [linuxserver.io](https://docs.linuxserver.io/images/docker-mullvad-browser/) Selkies web interface. Open your Railway domain, log in, and you're inside a real browser running on the server — bookmarks, extensions, downloads, and sessions persist between visits.

The service streams a GPU-less desktop Mullvad Browser over WebSockets with the linuxserver.io Selkies stack. Access is gated by HTTP basic auth (`CUSTOM_USER` / generated `PASSWORD`), and the browser profile persists on a volume at `/config`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mullvad | [nomideusz/mullvad-railway](https://github.com/nomideusz/mullvad-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the browser session. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `PASSWORD` | (secret) | Login password for the browser session. Keep it strong - this gates who can use your cloud Mullvad Browser. |
| `CUSTOM_USER` | (secret) | Login username for the browser session. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mullvad-browser)
