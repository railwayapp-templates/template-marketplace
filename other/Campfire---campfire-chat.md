# Deploy Campfire on Railway

Group chat for teams, with rooms, direct messages and file sharing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/campfire-chat)

## About

Campfire is 37signals' group chat app — the chat product that grew up inside Basecamp, released as open source under the MIT licence. Deploy Campfire when you want Slack-shaped team chat without per-seat billing, without a history cap, and without your conversations on someone else's infrastructure. It has open and closed rooms, direct messages, attachments with previews, full-text search, @mentions, push notifications, and a bot API.

Self-host Campfire on Railway and its small footprint becomes the advantage. This template runs one service, **campfire**, built from [gridalpha/campfire-railway](https://github.com/gridalpha/campfire-railway), which wraps the official `ghcr.io/basecamp/once-campfire:latest` image. Inside it a supervisor runs Thruster (an HTTP proxy with asset caching) in front of Puma, a Resque worker pool, and a loopback Redis backing the queue, the cache and the live-updating chat channels. Railway's edge terminates TLS and forwards to Thruster on port 8080. All state — the SQLite database, uploaded files and the signing keys — lives on a volume at `/rails/storage`.

![Campfire service and its storage volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789539647/campfire-architecture.webp)

Campfire is single-tenant chat for one organisation. Open rooms are visible to every member, closed rooms are invite-only, and direct messages ("Pings") stay private. Teams self-host it to stop paying per seat, to keep history under their own retention policy, or because a contract requires chat data on infrastructure they control.

- Open, closed and direct rooms with per-room membership
- Attachments with image and video previews, via libvips and ffmpeg
- Full-text search across every message you can reach
- @mentions with browser push notifications over the Web Push standard
- A bot API — each bot gets a key and posts to rooms over HTTP
- Custom styles, a custom logo, and an installable web app

One Railway service is upstream's design, not a simplification: the web tier and the workers share the same SQLite file and attachments directory, so they share one container and one volume, with Redis beside them on loopback.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| campfire | [gridalpha/campfire-railway](https://github.com/gridalpha/campfire-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Thruster HTTP listener port |
| `SKIP_TELEMETRY` | true | Disables Sentry error reporting |
| `RAILS_LOG_LEVEL` | info | Application log verbosity |
| `SECRET_KEY_BASE` | (secret) | Rails session and cookie signing key |
| `CAMPFIRE_ADMIN_NAME` | Administrator | First admin's display name |
| `CAMPFIRE_ADMIN_EMAIL` | - | First admin's email; blank derives one from the domain |
| `CAMPFIRE_ADMIN_PASSWORD` | (secret) | First admin's password; change after signing in |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`

**Category:** Other · **Languages:** Shell, Ruby, Dockerfile

[View on Railway →](https://railway.com/deploy/campfire-chat)
