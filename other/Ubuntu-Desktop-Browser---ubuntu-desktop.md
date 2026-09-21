# Deploy Ubuntu Desktop (Browser) on Railway

Ubuntu 24.04 XFCE desktop in your browser via KasmVNC, with Firefox

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-desktop)

## About

A complete Ubuntu 24.04 LTS desktop (XFCE) that runs in your browser tab — no VNC client, no plugin. Open the service's URL, enter the generated password, and you get a real Linux desktop with Firefox, a terminal, a file manager and a text editor, streamed by KasmVNC over HTTPS. Your home directory is on a **volume**, so bookmarks, downloads, settings and files survive redeploys. One click, **no inputs**: the password is generated for you. Resize the browser window and the desktop follows.

**Plan requirements.** With the desktop showing and nothing open, the service uses about **195 MB** of RAM (measured on this image after five idle minutes; 200 MB peak at boot). Firefox with a few tabs adds roughly 400–700 MB, so plan for **1–1.5 GB in use**. That is over the Free and Trial memory limits; **Hobby (8 GB) is the plan for this template**. Only the CPU and RAM you actually use are billed — a desktop that sits idle costs a few dollars a month. The image is pinned by digest.

The service runs `Xvnc` (KasmVNC's X server, which also serves its own web client) on loopback, an XFCE session as user `dev`, and `nginx` on the public HTTPS domain adding basic auth in front of everything. KasmVNC streams the screen as video-rate WebP/JPEG over a WebSocket, so it feels far closer to a remote desktop than classic VNC-in-a-browser. The healthcheck `/healthz` passes only once Xvnc is serving. `/home/dev` is a Railway volume. There is no GPU and no audio; this is a work desktop, not a media box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu | `ghcr.io/will-bogusz/railway-ubuntu-desktop:24.04-20260920@sha256:2dfa08b98bf85aec27625fe09310e1a3172d84e25ea582ea2f6042d94174d19c` | Web service |

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
