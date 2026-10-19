# Deploy Ubuntu on Railway

Ubuntu desktop Pro Stack: Ubuntu Linux, private XFCE, files and backups.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2)

## About

Deploy a **private Ubuntu 24.04 XFCE desktop in your browser**. This Ubuntu template includes a persistent home volume, generated login, HTTPS through Railway, native noVNC access, a file download folder, and daily plus weekly volume backup schedules. No GPU, external database or API key is required.

Ubuntu is a Linux distribution suitable for command-line tools and desktop applications. This template runs an Ubuntu container with the XFCE desktop and TigerVNC/noVNC, so you can open a Linux workstation from an ordinary web browser. This is an Ubuntu desktop container, not a full virtual machine or a systemd host.

### First connection

1. Deploy the template and wait for the real desktop healthcheck to pass.
2. Open the generated HTTPS domain.
3. Sign in with `CUSTOM_USER` (default `admin`) and the generated `PASSWORD` in Railway Variables.
4. Your Ubuntu desktop connects automatically. The home directory is `/config`.

The web password is required and generated automatically; no manual signup or third-party credentials are needed. Set a strong replacement of at least 16 characters in Railway Variables if desired. Do not expose the internal VNC or WebSocket ports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu Desktop | [XavTo/Railway-Desktop-Pro](https://github.com/XavTo/Railway-Desktop-Pro) (root: /ubuntu) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PORT` | 3000 |
| `PASSWORD` | (secret) |
| `CUSTOM_USER` | (secret) |
| `VNC_RESOLUTION` | 1440x900 |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-2)
