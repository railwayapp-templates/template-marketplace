# Deploy Jellyfin | (Just Updated) Media Server That Keeps Your Library on Railway

Your library, users, plugins and watch history survive every redeploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jellyfin-or-just-updated-media-server-th)

## About

Jellyfin is the free, open-source media server: it indexes your movies, shows and music,
adds artwork and metadata, and streams them to a browser, phone, TV or Kodi client with
no subscription, no account and no telemetry. This template runs Jellyfin 10.11.11 as a
single service with one volume, an administrator seeded before the URL is ever reachable,
and the listen port wired to the one Railway actually routes.

Jellyfin was written for a machine that stays where you left it, which is the opposite of
how a platform deploy behaves, and the difference is where every self-hosted Jellyfin
template goes wrong.

Three things need handling. Jellyfin keeps its database, users, metadata, artwork and
plugins under `/config` and `/cache` — two separate paths, both declared as volumes in
the upstream image — while a Railway template mounts exactly one volume, so unless the
whole tree is relocated onto that mount, the library is written to the container's
disposable layer and vanishes at the next deploy. Jellyfin does not read `$PORT` either:
its listen port lives in `network.xml`, a file the image does not ship, so the port has
to be written before the server starts. And the setup wizard — the screens that create
the first administrator — authenticates nobody until it has been completed, so a fresh
instance on a public URL belongs to whoever loads it first.

This image handles all three. Everything durable is relocated onto the single volume,
`network.xml` is written from the injected port on every boot, and the wizard is completed
against a loopback port the platform does not route, before the public port is bound.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jellyfin | `ghcr.io/bon5co/jellyfin-railway:10.11.11` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JELLYFIN_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/jellyfin-or-just-updated-media-server-th)
