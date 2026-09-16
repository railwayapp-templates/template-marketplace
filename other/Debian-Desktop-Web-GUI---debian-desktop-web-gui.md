# Deploy Debian Desktop (Web GUI) on Railway

A real XFCE Debian desktop in the browser, not just a web terminal.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-desktop-web-gui)

## About

![Debian 13 XFCE desktop in the browser](https://vaze.up.railway.app/api/hosting/railway-templates/debian-desktop-web-gui/debian-desktop.png)

![Debian desktop with a terminal and Chromium open](https://vaze.up.railway.app/api/hosting/railway-templates/debian-desktop-web-gui/debian-desktop-terminal-chromium.png)

Debian Desktop is a full XFCE graphical desktop that runs in your browser, not a
terminal. It gives you a real Debian 13 (trixie) GUI with a file manager, a
browser, audio and a shared clipboard, reachable from any device at a URL, with
no VNC client, SSH key or local VM.

Deploying runs a single container built from `linuxserver/webtop:debian-xfce`,
which serves the entire desktop over one HTTP port through its bundled nginx.
Deploys complete in under a minute. The one thing worth planning for is cost: a
desktop is not a terminal, and it idles near 800 MB of RAM with a session
attached, against roughly 64 MB for a ttyd shell. Enabling Railway's app sleep is
strongly recommended so it suspends when you close the tab and you pay for the
hours you actually use it.

The deploy is gated on a healthcheck at `/railway-healthz`. That path needs
creating, because the image's nginx puts HTTP basic auth at the server level, so
every path including `/` answers 401 and an unauthenticated Railway probe could
never pass. The start command adds one exempt location; everything else stays
behind auth.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| desktop | `linuxserver/webtop:debian-xfce` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Timezone for the desktop clock, e.g. Europe/Amsterdam. |
| `PGID` | 1000 | Group ID owning /config. Leave at 1000 unless you wipe the volume. |
| `PORT` | 3000 | Port Railway routes to. Must stay 3000, the port the image binds. |
| `PUID` | 1000 | User ID owning /config. Leave at 1000 unless you wipe the volume. |
| `TITLE` | Debian Desktop | Browser tab title shown for the desktop. |
| `PASSWORD` | (secret) | Password for the desktop's browser login. |
| `CUSTOM_USER` | (secret) | Username for the desktop's browser login. |

## Configuration

- **Start command:** `/bin/sh -c 'XD=/config/.config/xfce4/xfconf/xfce-perchannel-xml; if [ ! -f $XD/xfce4-desktop.xml ]; then mkdir -p $XD; printf %s "<?xml version=\"1.0\" encoding=\"UTF-8\"?><channel name=\"xfce4-desktop\" version=\"1.0\"><property name=\"backdrop\" type=\"empty\"><property name=\"screen0\" type=\"empty\"><property name=\"monitorselkies-primary\" type=\"empty\"><property name=\"workspace0\" type=\"empty\"><property name=\"color-style\" type=\"int\" value=\"2\"/><property name=\"image-style\" type=\"int\" value=\"0\"/><property name=\"rgba1\" type=\"array\"><value type=\"double\" value=\"0.070588\"/><value type=\"double\" value=\"0.070588\"/><value type=\"double\" value=\"0.086275\"/><value type=\"double\" value=\"1.000000\"/></property><property name=\"rgba2\" type=\"array\"><value type=\"double\" value=\"0.235294\"/><value type=\"double\" value=\"0.039216\"/><value type=\"double\" value=\"0.149020\"/><value type=\"double\" value=\"1.000000\"/></property></property></property></property></property></channel>" > $XD/xfce4-desktop.xml; chown -R 1000:1000 /config/.config; fi; sed -i "s|listen \\[::\\]:3000 default_server;|listen [::]:3000 default_server;\\n  location = /railway-healthz { auth_basic off; return 200; }|" /defaults/default.conf; grep -q railway-healthz /defaults/default.conf || { echo "FATAL: webtop nginx config changed upstream, healthcheck patch failed" >&2; exit 1; }; exec /init'`
- **Healthcheck:** `/railway-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/debian-desktop-web-gui)
