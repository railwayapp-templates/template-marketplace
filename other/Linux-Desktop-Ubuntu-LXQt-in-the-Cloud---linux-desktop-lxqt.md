# Deploy Linux Desktop | Ubuntu LXQt in the Cloud on Railway

Ubuntu LXQt desktop in your browser. Password-gated, persistent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linux-desktop-lxqt)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/linux-desktop-lxqt?utm_medium=integration&utm_source=button&utm_campaign=linux-desktop-lxqt)

This template runs a full Ubuntu desktop with the LXQt environment in the cloud, streamed to any device through the [linuxserver.io Webtop](https://docs.linuxserver.io/images/docker-webtop/) Selkies web interface. Open your Railway domain, log in, and you have a real Linux desktop with a terminal, file manager, browser and `sudo`. Installed packages, files and settings under the home directory persist between visits.

The service streams a GPU-less LXQt desktop over WebSockets with the linuxserver.io Selkies stack. Access is gated by HTTP basic auth (`CUSTOM_USER` / generated `PASSWORD`), and the user's home persists on a volume at `/config`. Set `TITLE` to change the browser tab name.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| linux-desktop-lxqt | [nomideusz/webtop-lxqt-railway](https://github.com/nomideusz/webtop-lxqt-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the desktop. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `TITLE` | Linux Desktop (Ubuntu LXQt) | Browser tab title for the desktop. |
| `PASSWORD` | (secret) | Login password for the desktop session. This gates a full Linux desktop with sudo - keep it strong. |
| `CUSTOM_USER` | (secret) | Login username for the desktop session. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/linux-desktop-lxqt)
