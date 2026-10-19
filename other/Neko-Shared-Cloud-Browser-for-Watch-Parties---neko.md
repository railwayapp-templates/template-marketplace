# Deploy Neko | Shared Cloud Browser for Watch Parties on Railway

Self-hosted shared browser: watch together, co-browse, with audio. WebRTC.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/neko)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/neko?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=neko)

[Neko](https://github.com/m1k1o/neko) is a self-hosted virtual browser that several people use at once. It runs Firefox (or Chromium, Brave, Edge, Tor Browser, a full desktop…) in a container and streams it to everyone's browser over WebRTC, with sound. One person drives while everyone else watches in sync. Control passes around with a click, and there's a built-in chat. It's the open-source replacement for Rabb.it-style watch parties: movie nights, co-browsing, demos, pair research.

It's one service and a TCP proxy. There's no database and no volume.

- **WebRTC that works on Railway.** Railway has no public UDP, so this template carries the media over ICE-TCP through a Railway TCP proxy. On boot it looks up the proxy's public address and port and tells Neko to advertise them. Nothing to configure, and no TURN server to run.
- **Password-gated from the first second.** Viewers log in with a generated password. A second, separate admin password lets you take control back, kick people and lock the room. Both are in the Variables tab.
- **Pick your app.** Firefox is the default. To stream a different browser or a whole desktop, set `NEKO_IMAGE` to another [Neko image](https://neko.m1k1o.net/docs/v3/installation/docker-images) and redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| neko | [two-workspaces/neko](https://github.com/two-workspaces/neko) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port of the neko web client behind the Railway domain - leave as is. |
| `NEKO_IMAGE` | ghcr.io/m1k1o/neko/firefox:3.1.6 | The app to stream. Swap firefox for chromium, brave, google-chrome, microsoft-edge, vivaldi, tor-browser, xfce, kde or vlc and redeploy. |
| `NEKO_DESKTOP_SCREEN` | 1280x720@30 | Stream resolution and frame rate. 1920x1080@30 looks sharper but costs more CPU and bandwidth. |
| `NEKO_MEMBER_PROVIDER` | multiuser | Login mode: one shared viewer password plus one admin password. Leave as is. |
| `NEKO_MEMBER_MULTIUSER_USER_PASSWORD` | (secret) | Password for viewers. Share it with the people you watch with - they join with any display name. |
| `NEKO_MEMBER_MULTIUSER_ADMIN_PASSWORD` | (secret) | Admin password: same login, but can take control from anyone, kick and lock the room. Keep it to yourself. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 59000

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/neko)
