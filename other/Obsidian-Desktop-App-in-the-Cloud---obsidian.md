# Deploy Obsidian | Desktop App in the Cloud on Railway

Desktop Obsidian streamed to any device. Password-gated, persistent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/obsidian)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/obsidian?utm_medium=integration&utm_source=button&utm_campaign=obsidian)

This template runs the full desktop [Obsidian](https://obsidian.md/) application in the cloud, streamed to any device through the [linuxserver.io](https://docs.linuxserver.io/images/docker-obsidian/) Selkies web interface. Open your Railway domain, log in, and Obsidian is running on the server with its files, settings and plugins persisted between visits.

Obsidian is the local-first Markdown knowledge base with graph view, plugins and canvas. The service streams a GPU-less desktop session over WebSockets with the linuxserver.io Selkies stack. Access is gated by HTTP basic auth (`CUSTOM_USER` / generated `PASSWORD`), and the application data persists on a volume at `/config`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| obsidian | [nomideusz/obsidian-railway](https://github.com/nomideusz/obsidian-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the desktop session. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `PASSWORD` | (secret) | Login password for the desktop session. Keep it strong - this gates who can use your cloud Obsidian. |
| `CUSTOM_USER` | (secret) | Login username for the desktop session. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/obsidian)
