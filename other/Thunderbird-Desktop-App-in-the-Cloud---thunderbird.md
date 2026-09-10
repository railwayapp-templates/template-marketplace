# Deploy Thunderbird | Desktop App in the Cloud on Railway

Desktop Thunderbird streamed to any device. Password-gated, persistent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/thunderbird)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/thunderbird?utm_medium=integration&utm_source=button&utm_campaign=thunderbird)

This template runs the full desktop [Thunderbird](https://www.thunderbird.net/) application in the cloud, streamed to any device through the [linuxserver.io](https://docs.linuxserver.io/images/docker-thunderbird/) Selkies web interface. Open your Railway domain, log in, and Thunderbird is running on the server with its files, settings and plugins persisted between visits.

Thunderbird is the open-source mail, calendar and contacts client from Mozilla. The service streams a GPU-less desktop session over WebSockets with the linuxserver.io Selkies stack. Access is gated by HTTP basic auth (`CUSTOM_USER` / generated `PASSWORD`), and the application data persists on a volume at `/config`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| thunderbird | [nomideusz/thunderbird-railway](https://github.com/nomideusz/thunderbird-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the desktop session. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `PASSWORD` | (secret) | Login password for the desktop session. Keep it strong - this gates who can use your cloud Thunderbird. |
| `CUSTOM_USER` | (secret) | Login username for the desktop session. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/thunderbird)
