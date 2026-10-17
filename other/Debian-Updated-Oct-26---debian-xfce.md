# Deploy Debian [Updated Oct '26] on Railway

Debian: Real XFCE desktop in your browser, not a web terminal

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-xfce)

## About

This isn't a web terminal with a shell prompt — it's a real XFCE desktop, file manager, taskbar, Chromium and all, streamed to your browser over WebRTC. It runs on the official [`linuxserver/webtop:debian-xfce`](https://github.com/linuxserver/docker-webtop) image (GPL-3.0), powered by [Selkies](https://github.com/selkies-project/selkies) for low-latency remote streaming. This template fixes one concrete, confirmed issue in the official reference template, and is honest about what wasn't broken.

The reference template is already a careful piece of engineering — its start command patches the webtop image's nginx config at boot to inject a dedicated, unauthenticated healthcheck location, works around a desktop-background config quirk on first boot, and includes a defensive check that fails loudly if the upstream image's nginx config format ever changes underneath it. None of that needed fixing.

One thing did: the healthcheck path itself. `/railway-healthz` — the exact value the reference template sets — contains a hyphen. Tested this directly against Railway's own live service-configuration API (the same call that applies when you set a healthcheck path on any service) and it's rejected outright: `Error in healthcheckPath - Invalid input`. Railway's current validation only permits letters, numbers, `/`, and `_` in a healthcheck path — no hyphens. The identical call with an underscore, `/railway_healthz`, succeeds immediately.

This template uses the underscore path throughout: in the Composer's healthcheck field, and in the nginx location block the start command injects at boot, so the two stay consistent. Confirmed live afterward: `GET /railway_healthz` returns `200` with zero authentication required, exactly as designed.

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

- **Start command:** `/bin/sh -c 'XD=/config/.config/xfce4/xfconf/xfce-perchannel-xml; if [ ! -f $XD/xfce4-desktop.xml ]; then mkdir -p $XD; printf %s "<?xml version=\"1.0\" encoding=\"UTF-8\"?><channel name=\"xfce4-desktop\" version=\"1.0\"><property name=\"backdrop\" type=\"empty\"><property name=\"screen0\" type=\"empty\"><property name=\"monitorselkies-primary\" type=\"empty\"><property name=\"workspace0\" type=\"empty\"><property name=\"color-style\" type=\"int\" value=\"2\"/><property name=\"image-style\" type=\"int\" value=\"0\"/><property name=\"rgba1\" type=\"array\"><value type=\"double\" value=\"0.070588\"/><value type=\"double\" value=\"0.070588\"/><value type=\"double\" value=\"0.086275\"/><value type=\"double\" value=\"1.000000\"/></property><property name=\"rgba2\" type=\"array\"><value type=\"double\" value=\"0.235294\"/><value type=\"double\" value=\"0.039216\"/><value type=\"double\" value=\"0.149020\"/><value type=\"double\" value=\"1.000000\"/></property></property></property></property></property></channel>" > $XD/xfce4-desktop.xml; chown -R 1000:1000 /config/.config; fi; sed -i "s|listen \[::\]:3000 default_server;|listen [::]:3000 default_server;\n  location = /railway_healthz { auth_basic off; return 200; }|" /defaults/default.conf; grep -q railway_healthz /defaults/default.conf || { echo "FATAL: webtop nginx config changed upstream, healthcheck patch failed" >&2; exit 1; }; exec /init'`
- **Healthcheck:** `/railway_healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/debian-xfce)
