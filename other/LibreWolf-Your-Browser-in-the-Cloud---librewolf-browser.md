# Deploy LibreWolf | Your Browser in the Cloud on Railway

Desktop LibreWolf streamed to any device. Password-gated, persistent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librewolf-browser)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/librewolf-browser?utm_medium=integration&utm_source=button&utm_campaign=librewolf-browser)

This template runs a full desktop [LibreWolf](https://librewolf.net/) browser in the cloud, streamed to any device through the [linuxserver.io](https://docs.linuxserver.io/images/docker-librewolf/) Selkies web interface. Open your Railway domain, log in, and you're inside a real browser running on the server — bookmarks, extensions, downloads, and sessions persist between visits.

The service streams a GPU-less desktop LibreWolf over WebSockets with the linuxserver.io Selkies stack. Access is gated by HTTP basic auth (`CUSTOM_USER` / generated `PASSWORD`), and the browser profile persists on a volume at `/config`. Set `LIBREWOLF_CLI` to a URL to open it at launch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| librewolf | [nomideusz/librewolf-railway](https://github.com/nomideusz/librewolf-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the browser session. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `PASSWORD` | (secret) | Login password for the browser session. Keep it strong - this gates who can use your cloud LibreWolf. |
| `CUSTOM_USER` | (secret) | Login username for the browser session. |
| `LIBREWOLF_CLI` | - | Optional launch arguments (e.g. a URL to open). |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/librewolf-browser)
