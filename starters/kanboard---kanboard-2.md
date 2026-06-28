# Deploy kanboard on Railway

Open-source Kanban with SQLite. Single-container, zero telemetry.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kanboard-2)

## About

Deploy Kanboard to Railway with one click. The repo's Dockerfile builds
a 7MB Alpine-based image; Railway provides HTTPS, persistent disk
volumes, and zero-config builds. Pricing fits within Railway's free
tier for solo and small-team use, and the SQLite backend keeps the
running cost predictable as your data grows.

Railway is the runtime that hosts this template. Each push to `main`
(or a click of Deploy in the dashboard) triggers Railway's build →
push → run cycle. Key hosting features this template relies on:

- **HTTPS at the edge** — Kanboard serves plain HTTP on a private
  port; Railway's reverse proxy terminates TLS in front of the app.
- **Persistent disk volume** — `/var/www/app/data` holds Kanboard's
  SQLite database and uploaded attachments across deploys.
- **Health checks at `/healthcheck.php`** — Railway restarts the
  service if the endpoint stops returning 200.
- **Free-tier compatible** — the 7MB image and SQLite backend fit
  comfortably within Railway's Hobby plan allotment.
- **GitHub-driven deploys** — push to `main` and Railway rebuilds;
  no CI glue required to keep the demo fresh.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kanboard | [INAPP-Mobile/railway-kanboard](https://github.com/INAPP-Mobile/railway-kanboard) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kanboard-2)
