# Deploy AFFiNE | Open-Source Notion & Miro Alternative with Postgres on Railway

Docs, whiteboards and databases in one workspace, self-hosted

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/affine-production?utm_medium=integration&utm_source=button&utm_campaign=affine-production)

[AFFiNE](https://affine.pro/) is the open-source Notion and Miro alternative: docs, an infinite edgeless whiteboard and databases in one workspace, with real-time collaboration, sharing, version history and desktop and mobile apps that sync to your own server. This template runs the official AFFiNE server with Postgres (with pgvector) and Redis, and keeps uploads and the server's signing key on a volume.

The stack is three services: AFFiNE, Postgres and Redis.

- **Upstream's own image, pinned.** AFFiNE runs from the official `ghcr.io/toeverything/affine` image at a fixed release tag (0.27.4), not the moving `stable` tag, so a redeploy never surprises you with an untested version.
- **Migrations on every boot.** The start command runs AFFiNE's own self-host pre-deploy script (Prisma migrations plus data migrations) before starting the server, and Railway's health check on `/info` only switches traffic once they finish. Upgrading is bumping the image tag.
- **A signing key that is yours.** On first boot the pre-deploy script generates the server's private key into `/root/.affine/config/private.key` on the volume. It signs sessions and tokens, is unique to your deployment and survives redeploys.
- **Uploads on a volume.** Images, attachments and other blobs are stored under `/root/.affine/storage` on the same persistent volume.
- **Postgres with pgvector.** AFFiNE's AI features store embeddings with pgvector, so the database runs the official `pgvector/pgvector` Postgres 17 image. Redis keeps an append-only file on its own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:0.8.7-pg17` | Database |
| Redis | `redis:8.10.2-alpine` | Database |
| AFFiNE | `ghcr.io/toeverything/affine:0.27.4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | affine | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | AFFiNE | 3010 | Port Railway routes to - leave as is |
| `LISTEN_ADDR` | AFFiNE | :: | Listen on IPv6 and IPv4 so Railway's private network can reach it |
| `MAILER_HOST` | AFFiNE | - | Optional SMTP server for invitations, sign-in links and password resets (Railway allows outbound SMTP on Pro only) |
| `MAILER_PORT` | AFFiNE | 465 | SMTP port |
| `MAILER_USER` | AFFiNE | (secret) | SMTP username |
| `DATABASE_URL` | AFFiNE | - | Postgres (with pgvector) on the private network |
| `MAILER_SENDER` | AFFiNE | - | Sender, e.g. AFFiNE <noreply@example.com> |
| `MAILER_PASSWORD` | AFFiNE | (secret) | SMTP password |
| `REDIS_SERVER_HOST` | AFFiNE | - | Redis on the private network |
| `REDIS_SERVER_PORT` | AFFiNE | 6379 | Redis port |
| `AFFINE_SERVER_PORT` | AFFiNE | 3010 | Port AFFiNE listens on - must match PORT |
| `REDIS_SERVER_PASSWORD` | AFFiNE | (secret) | Redis password |
| `AFFINE_INDEXER_ENABLED` | AFFiNE | false | Full-text indexer needs a separate Manticore/Elasticsearch service; off like upstream's self-host compose |
| `AFFINE_SERVER_EXTERNAL_URL` | AFFiNE | - | Public URL of AFFiNE (invite links, OAuth callbacks, desktop app sign-in) - set it to your custom domain after adding one |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "node ./scripts/self-host-predeploy.js && exec node ./dist/main.js"`
- **Healthcheck:** `/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine`

**Category:** Other

[View on Railway →](https://railway.com/deploy/affine-production)
