# Deploy Tronbyt Server | (Just Updated) Tidbyt Smart Display Server, Claimed On First Boot on Railway

Self-hosted Tidbyt display server, your account seeded before first boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tronbyt-server-or-just-updated-tidbyt-sm)

## About

Tronbyt Server is the self-hosted brain for a Tidbyt or Tronbyt smart display: it renders the
apps, holds the schedule, and serves each device the next frame. This template runs it as one
service on a persistent volume, and — unlike a stock deploy — the instance already belongs to
you the first time its public URL answers a request.

Tronbyt ships as a single static Go binary with an embedded Pixlet renderer and a SQLite
database, so hosting it is mostly about two things: keeping the database and the rendered
frames on storage that survives a redeploy, and making sure nobody else claims the account
system before you do.

Both are handled here. The volume mounts at `/app/data`, where the SQLite database, the
system apps checkout and the per-device WebP frames all live. The image is
`ghcr.io/bon5co/tronbyt-railway`, built from the pinned upstream release, and its entrypoint
registers your account against a loopback-only server *before* the public port is ever
served — so the window where a stranger could register first does not exist. The same
credential is re-applied from the environment on every boot, which also gives you a way back
in if you lose it, since upstream exposes no password reset in the UI.

A healthcheck on `/health` keeps Railway from routing traffic during first boot, when the
server clones roughly 200 MB of community apps into the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tronbyt | `ghcr.io/bon5co/tronbyt-railway:2.3.4` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TRONBYT_ADMIN_SECRET` | (secret) |
| `TRONBYT_ADMIN_USERNAME` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tronbyt-server-or-just-updated-tidbyt-sm)
