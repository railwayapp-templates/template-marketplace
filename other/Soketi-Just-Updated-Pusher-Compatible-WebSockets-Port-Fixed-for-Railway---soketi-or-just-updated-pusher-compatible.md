# Deploy Soketi | (Just Updated) Pusher-Compatible WebSockets, Port Fixed for Railway on Railway

Self-hosted Pusher-compatible WebSocket server, port wired for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/soketi-or-just-updated-pusher-compatible)

## About

Soketi is an open-source, Pusher-compatible WebSockets server. It lets Laravel Echo, pusher-js and any Pusher SDK
talk to your own server instead of a paid hosted service, with channels, presence, client events and a REST API for
publishing from your backend.

This template runs Soketi 1.6.1 as a single service from a digest-pinned official image, with an app ID, key and secret
generated for you on every deploy.

Soketi needs a little care to work behind Railway's edge:

- **The listening port follows Railway.** Soketi ignores the `PORT` variable Railway injects and listens on 6001, so
  the public domain and the healthcheck would miss it. The start command sets `SOKETI_PORT` from `$PORT`, so the domain
  and the `/ready` healthcheck reach the server.
- **Credentials are generated.** `SOKETI_DEFAULT_APP_ID`, `SOKETI_DEFAULT_APP_KEY` and `SOKETI_DEFAULT_APP_SECRET` are
  random per deploy, so the well-known `app-id` / `app-key` defaults are never live on a public URL.
- **Stateless by design.** Soketi keeps connection state in memory, so there is no volume to manage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| soketi | `quay.io/soketi/soketi:1.6.1-16-debian@sha256:713223456cf16459833f9cccef5711055e9c546bf88d910bbd817601563ef762` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SOKETI_DEFAULT_APP_SECRET` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'SOKETI_PORT=$PORT exec node /app/bin/server.js start'`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/soketi-or-just-updated-pusher-compatible)
