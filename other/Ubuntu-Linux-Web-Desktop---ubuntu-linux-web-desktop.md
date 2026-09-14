# Deploy Ubuntu Linux (Web Desktop) on Railway

A real XFCE Ubuntu desktop in the browser, not just a web terminal.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-linux-web-desktop)

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

- **Start command:** `/bin/sh -c 'rm -f /etc/apt/apt.conf.d/20packagekit; sed -i "s|listen \[::\]:3000 default_server;|listen [::]:3000 default_server;\n  location = /railway-healthz { auth_basic off; return 200; }|" /defaults/default.conf; grep -q railway-healthz /defaults/default.conf || { echo "FATAL: webtop nginx config changed upstream, healthcheck patch failed" >&2; exit 1; }; exec /init'`
- **Healthcheck:** `/railway-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ubuntu-linux-web-desktop)
