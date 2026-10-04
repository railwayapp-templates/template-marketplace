# Deploy Ubuntu Desktop (Browser) on Railway

Ubuntu 24.04 XFCE desktop in your browser with Firefox; Hobby recommended

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-desktop)

## About

![Ubuntu 24.04 XFCE desktop in a browser tab: Firefox on Wikipedia beside a terminal, with the dock and top panel](https://bogusz.co/external/ubuntu-desktop-banner-v1.png)

A full Ubuntu 24.04 desktop with Firefox in a browser tab — no VNC client — and a home directory on a volume, so bookmarks, logins and files survive redeploys.

**Get started**

1. **Deploy.** Nothing to fill in. Hobby is the plan for this template: the idle desktop uses about 195 MB, and Firefox with a few tabs takes it to 1–1.5 GB. On Free (0.5 GB) the desktop runs but Firefox cannot open; Trial (1 GB) fits a few tabs.
2. **Sign in.** Open the service URL. Username `dev`; the password is `PASSWORD` in the service's **Variables** tab.
3. **Browse.** Firefox, Terminal and Files are in the bottom dock; the side panel has clipboard and full-screen controls.

A complete Ubuntu 24.04 LTS desktop (XFCE) that runs in your browser tab — no VNC client, no plugin — with Firefox, a terminal, a file manager and a text editor, streamed by KasmVNC over HTTPS. Resize the browser window and the desktop follows. The service runs `Xvnc` (KasmVNC's X server, which also serves its own web client) on loopback, an XFCE session as user `dev`, and `nginx` on the public HTTPS domain adding basic auth in front of everything. KasmVNC streams the screen as video-rate WebP/JPEG over a WebSocket, so it feels far closer to a remote desktop than classic VNC-in-a-browser. The healthcheck `/healthz` passes only once Xvnc is serving. `/home/dev` is a Railway volume. There is no GPU and no audio; this is a work desktop, not a media box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu | `ghcr.io/will-bogusz/railway-ubuntu-desktop:24.04-20261003@sha256:65b8a64c9d0b5939ab8954dd0bb7f2e72a55449256e2dfea39c271de04d85930` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | - | Optional - Timezone name such as Europe/Berlin or America/New_York. Default UTC. |
| `PORT` | 8080 | Port the desktop listens on. Railway's domain and healthcheck target it. Leave it as is. |
| `PASSWORD` | (secret) | Password for the desktop (user dev). Generated on deploy; read it here in the Variables tab. Change it and redeploy to rotate. |
| `RESOLUTION` | 1440x900 | Desktop size as WIDTHxHEIGHT. The viewer scales to your window; raise it for a sharper picture at the cost of bandwidth. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/dev`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ubuntu-desktop)
