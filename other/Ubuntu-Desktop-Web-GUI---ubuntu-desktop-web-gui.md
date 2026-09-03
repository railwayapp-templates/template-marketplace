# Deploy Ubuntu Desktop (Web GUI) on Railway

A real XFCE Ubuntu desktop in the browser, not just a web terminal.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-desktop-web-gui)

## About

Ubuntu Desktop is a full XFCE graphical desktop that runs in your browser, not a
terminal. It gives you a real Linux GUI with a file manager, a browser, audio and
a shared clipboard, reachable from any device at a URL, with no VNC client, SSH
key or local VM.

Deploying runs a single container built from `linuxserver/webtop:ubuntu-xfce`,
which serves the entire desktop over one HTTP port through its bundled nginx.
One thing is worth knowing before your first deploy. **The desktop
costs meaningfully more than a terminal template: it idles near 800 MB of RAM with
a session attached, against roughly 64 MB for a ttyd shell. Enabling serverless is strongly recommended so it suspends when you close the tab**.

The service intentionally has no healthcheck. HTTP basic auth covers every path
including `/`, so Railway's unauthenticated probe is answered with 401 and the
deploy would never go healthy; an always-on restart policy covers crashes instead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| desktop | `linuxserver/webtop:ubuntu-xfce` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Timezone for the desktop clock, e.g. Europe/Amsterdam. |
| `PGID` | 1000 | Group ID owning /config. Leave at 1000 unless you wipe the volume. |
| `PORT` | 3000 | Port Railway routes to. Must stay 3000, the port the image binds. |
| `PUID` | 1000 | User ID owning /config. Leave at 1000 unless you wipe the volume. |
| `TITLE` | Ubuntu Desktop | Browser tab title shown for the desktop. |
| `PASSWORD` | (secret) | Password for the desktop's browser login |
| `CUSTOM_USER` | (secret) | Username for the desktop's browser login. |

## Configuration

- **Start command:** `/bin/sh -c 'rm -f /etc/apt/apt.conf.d/20packagekit; exec /init'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ubuntu-desktop-web-gui)
