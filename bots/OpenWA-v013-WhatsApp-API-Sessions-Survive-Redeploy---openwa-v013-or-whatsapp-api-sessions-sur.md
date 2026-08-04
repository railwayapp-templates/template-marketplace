# Deploy OpenWA v0.13 | WhatsApp API, Sessions Survive Redeploy on Railway

Self-hosted WhatsApp REST API. Sessions survive every redeploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openwa-v013-or-whatsapp-api-sessions-sur)

## About

OpenWA is a free, open-source, self-hosted WhatsApp API gateway (MIT). It connects a personal
or business WhatsApp account through a REST API and webhooks — send and receive messages,
manage chats and groups, download media, run multiple sessions — with no Meta Business API
approval and no per-message vendor fee. A dashboard for session QR pairing, API keys and
webhooks is bundled and served on the same port.

OpenWA runs as a single container with a persistent volume mounted at `/app/data`, which holds
the WhatsApp session credentials, the SQLite database, plugins and downloaded media. Lose that
volume and every paired phone must scan a QR code again.

This template runs `ghcr.io/bon5co/openwa-railway`, a thin wrapper over the official upstream
image pinned at **v0.13.0**. It adds no forks and no patches — only the configuration a Railway
deployment needs, including three corrections that are wrong by default on this platform:

**Sessions come back after a redeploy.** Upstream defaults `AUTO_START_SESSIONS` to `false`,
which is right for a VPS you deploy once. On Railway every variable edit, image bump and
platform restart replaces the container, and each one silently leaves every WhatsApp session
**stopped** — the API answers 200, the dashboard loads, the health check passes, and not one
message is delivered until someone opens the UI and presses start on each session. Nothing in
the logs says so. This template turns it on.

**Rate limits that do not throttle your whole deployment at once.** Upstream's throttler guard
says the failure mode outright: with no `TRUSTED_PROXIES` set it keys the rate-limit bucket on
the socket peer, "so all traffic shares ONE bucket and a single abuser rate-limits everyone
(self-DoS)". On Railway the socket peer is always the edge, never your caller — measured on a
live deployment, every request arrives from the CGNAT range `100.64.0.0/10`. So the stock limit
of **10 requests per second** is shared by every client you have, and one bulk send 429s the
rest. Verified by measurement: a 60-request burst returns 10 × `429` at the stock limit and
60 × `200` here. This template sets `TRUSTED_PROXIES` and sizes the three windows for a whole
deployment, under the variable names the application actually reads.

**The session cap is sized to your container.** `MAX_CONCURRENT_SESSIONS` defaults to `0`,
meaning unlimited, while each session drives a full Chromium. On a memory-capped container that
means session N OOM-kills the process and takes every other session down with it. The entrypoint
reads the container's real cgroup memory limit and budgets ~1 GiB per session, so session N+1
gets an honest error instead of a crash. Your own value always wins.

The version is pinned rather than tracking `latest`, because upstream reshapes its schema from
the entity definitions on boot — riding a moving tag on an auto-migrating database is how a live
deployment gets rewritten with no release note in between.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openwa | `ghcr.io/bon5co/openwa-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY_PEPPER` | (secret) |

## Configuration

- **Healthcheck:** `/api/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/openwa-v013-or-whatsapp-api-sessions-sur)
