# Deploy VSCodium | Desktop App in the Cloud on Railway

Desktop VSCodium streamed to any device. Password-gated, persistent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vscodium)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/vscodium?utm_medium=integration&utm_source=button&utm_campaign=vscodium)

This template runs the full desktop [VSCodium](https://vscodium.com/) application in the cloud, streamed to any device through the [linuxserver.io](https://docs.linuxserver.io/images/docker-vscodium/) Selkies web interface. Open your Railway domain, log in, and VSCodium is running on the server with its files, settings and plugins persisted between visits.

VSCodium is the telemetry-free community build of the VS Code editor, running as a real desktop app. The service streams a GPU-less desktop session over WebSockets with the linuxserver.io Selkies stack. Access is gated by HTTP basic auth (`CUSTOM_USER` / generated `PASSWORD`), and the application data persists on a volume at `/config`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vscodium | [nomideusz/vscodium-railway](https://github.com/nomideusz/vscodium-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the desktop session. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `PASSWORD` | (secret) | Login password for the desktop session. Keep it strong - this gates who can use your cloud VSCodium. |
| `CUSTOM_USER` | (secret) | Login username for the desktop session. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/vscodium)
