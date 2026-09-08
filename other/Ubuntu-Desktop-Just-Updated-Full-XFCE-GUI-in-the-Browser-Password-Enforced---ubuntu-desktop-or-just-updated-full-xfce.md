# Deploy Ubuntu Desktop | (Just Updated) Full XFCE GUI in the Browser, Password Enforced on Railway

A full Ubuntu XFCE desktop in your browser. Never open without a password.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-desktop-or-just-updated-full-xfce)

## About

A complete Ubuntu XFCE desktop, streamed to your browser over one HTTPS URL. Files
manager, terminal, Firefox, and anything else you `apt install` — no VNC client, no
X server on your machine, no SSH tunnel. Built on the LinuxServer.io webtop image,
pinned by digest, with the desktop's home directory on a Railway volume so it
survives every redeploy.

The desktop runs as a single Railway service. A bundled nginx serves the web client
and the WebSocket that carries your keyboard, mouse and the H.264 video stream, all
on the port Railway injects — there is no second service, no TURN server and no
external relay to configure.

The whole surface sits behind HTTP basic auth as user `admin`. Upstream only enables
that auth when `PASSWORD` is non-empty, which means a blank value does not weaken the
desktop, it publishes it: the client page and the input WebSocket both answer
anonymous callers, and whoever finds the URL gets a root session on your instance.
This template refuses to start on an empty password and generates a strong one for
you by default, so a deploy is never an open desktop. The healthcheck endpoint is the
one route left unauthenticated, and it is patched into the nginx config at image
build time with an assertion, rather than rewritten on every boot.

The user's home directory, `/config`, is mounted on a volume. Packages installed with
`apt` land on the container's own filesystem and are reset by a redeploy; anything
under the home directory is not.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu-desktop | `ghcr.io/bon5co/ubuntu-desktop-railway:2026.09.07` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ubuntu-desktop-or-just-updated-full-xfce)
