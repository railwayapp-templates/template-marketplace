# Deploy Evolution API | WhatsApp REST API, Saves Full Chat History, Zero Config on Railway

WhatsApp REST API that actually saves your chat history. Zero config.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-or-whatsapp-rest-api-saves)

## About

Evolution API is the open-source WhatsApp REST gateway. Connect a number by scanning a QR code, then send and receive messages, media, and groups over plain HTTP — no Meta Business API approval, no per-conversation fees. This template deploys Evolution API v2.3.7 with PostgreSQL 17 and Redis 8, each on its own persistent volume, **with full message history turned on**.

That last part is the reason this template exists. Deploy it and it asks you for nothing.

Evolution decides what to persist from seven separate `DATABASE_SAVE_*` environment variables, and it reads each one as a strict `=== "true"` with no default. An unset flag is a false flag. A deployment that wires up PostgreSQL correctly but leaves those variables alone still records instances and nothing else — no messages, no contacts, no chats, no labels, no history sync. The database is attached, connected, healthy, and empty, and you find out weeks later when you go looking for a conversation.

This template sets all seven. It also mounts a volume at `/evolution/instances`, so the WhatsApp auth files survive a redeploy and you scan each QR code once rather than after every version bump. Redis runs with append-only persistence on its own volume instead of as a disposable cache, so live session state survives a restart. PostgreSQL mounts its volume at `/var/lib/postgresql` and keeps `PGDATA` at the default subdirectory, which is what stops the ext4 `lost+found` from landing inside the data directory and blocking initialization.

Everything the platform needs is baked into the image (`ghcr.io/bon5co/evolution-api-railway`) rather than shipped as template variables you have to fill in, so the deploy form is empty. The API key is generated for you at 48 characters, the database and cache URIs wire themselves to the private services, and telemetry is off.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-trixie` | Database |
| redis | `redis:8.8.1-trixie` | Database |
| evolution-api | `ghcr.io/bon5co/evolution-api-railway:latest` | Web service |

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

[View on Railway →](https://railway.com/deploy/evolution-api-or-whatsapp-rest-api-saves)
