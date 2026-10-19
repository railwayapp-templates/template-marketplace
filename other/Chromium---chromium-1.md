# Deploy Chromium on Railway

Chromium browser Pro Stack: private remote browser with persistent profile.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chromium-1)

## About

Deploy a **private remote Chromium browser** with a persistent profile, generated password, XFCE desktop, noVNC access and daily plus weekly volume backup schedules. Open your browser in the cloud from any normal web browser; no API key or external database is required.

Chromium is the open-source web browser behind Google Chrome. This template runs the maintained Debian security package in a private graphical desktop, with noVNC providing remote keyboard, pointer, resize and clipboard text over Railway HTTPS/WebSockets. It is a visible browser workspace, not a headless automation endpoint.

### First connection

1. Deploy and wait for the real desktop healthcheck to pass.
2. Open the generated HTTPS domain.
3. Sign in with `CUSTOM_USER` (default `admin`) and the generated `PASSWORD` in Railway Variables.
4. noVNC connects automatically to your remote browser. Chromium starts with an example page.

No browser debugging port, VNC port or second streaming domain needs to be exposed. Keep the generated strong password or set one with at least 16 characters in Railway Variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chromium | [XavTo/Railway-Desktop-Pro](https://github.com/XavTo/Railway-Desktop-Pro) (root: /chromium) | Web service |

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

[View on Railway →](https://railway.com/deploy/chromium-1)
