# Deploy Evolution API | (Just Updated) WhatsApp REST API, No Upstream Telemetry on Railway

Every route you call is reported upstream by default. Not on this one.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-or-just-updated-whatsapp-r)

## About

Evolution API is the open-source WhatsApp REST gateway. Connect a number by scanning a QR code, then send and receive messages, media, and groups over plain HTTP — no Meta Business API approval, no per-conversation fees. This template deploys Evolution API with PostgreSQL 17 and Redis 8, each on its own persistent volume, **with the upstream telemetry call turned off**.

That last part is the reason this template exists. Deploy it and it asks you for nothing.

Evolution ships an Express middleware that fires on every request. For each call except `GET /`, it POSTs the route path, the API version, and a timestamp to `https://log.evolution-api.com/telemetry` — fire-and-forget, with failures swallowed. It is not message content, but it is a running record of which endpoints your gateway serves and when, sent off your infrastructure to a third party. The switch is `TELEMETRY_ENABLED`, and it defaults to on: the config reads it as "on unless explicitly set to something other than `true`", and the upstream image bakes `TELEMETRY_ENABLED=true` into its own `/evolution/.env`, which dotenv loads before anything else. So leaving the variable unset does not turn it off — it turns it on. No competing listing in this category sets it. The image this template deploys bakes it off.

The rest is the platform work Evolution needs on Railway and nobody in the category does. The API service has a **healthcheck**, so a boot that dies still fails the deploy instead of being reported as a successful one. The image is **pinned to a fixed upstream version**, which matters on an app that runs Prisma migrations forward on boot — a floating tag makes every redeploy an unrequested upgrade. Instance auth files live on a volume at `/evolution/instances`, so you scan each QR code once rather than after every deploy. Redis runs with append-only persistence on its own volume instead of as a disposable cache. PostgreSQL mounts its volume at `/var/lib/postgresql` and keeps `PGDATA` at the default subdirectory, which is what stops the ext4 `lost+found` from landing inside the data directory and blocking initialization.

Everything the platform needs is baked into the image (`ghcr.io/bon5co/evolution-api-railway`) rather than shipped as template variables you have to fill in, so the deploy form is empty. The API key is generated for you at 48 characters and the database and cache URIs wire themselves to the private services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-trixie` | Database |
| redis | `redis:8.8.1-trixie` | Database |
| evolution-api | `ghcr.io/bon5co/evolution-api-railway:v2.3.7` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found && chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --appendfsync everysec --dir /data'`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/evolution-api-or-just-updated-whatsapp-r)
