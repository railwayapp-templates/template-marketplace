# Deploy Teable on Railway

No-code database with a spreadsheet interface and REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable-database)

## About

Teable is an open-source no-code database that looks like a spreadsheet and behaves like a real relational database. Every table is stored in PostgreSQL and exposed as a REST API, so a team captures structured data in a familiar grid while developers query the same rows programmatically. Teams reach for it when Airtable's row caps, per-seat pricing, or data-residency rules stop working.

Deploy Teable on Railway and everything is wired together already: the application, a managed PostgreSQL database holding both metadata and your table data, a managed Redis instance backing the cache and realtime layer, and a volume for attachments. You can self-host Teable without writing a compose file, and it ships with a public HTTPS URL and generated secrets rather than the image's placeholder keys.

![Diagram of the Teable, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787657702/teable-architecture.png)

Teable stores your tables as real PostgreSQL tables rather than opaque blobs, so you can point BI tools or your own SQL at the same data the grid edits. Self-hosting suits row volumes that get expensive on a hosted plan, or data that cannot leave your infrastructure.

- Spreadsheet grid with formulas, links between tables, rollups and lookups
- Grid, Kanban, calendar and form views over the same records
- Generated REST API for every table, plus API tokens
- Realtime collaboration with undo/redo and role-based access control
- File attachments, plus CSV and Airtable imports

The `teable` container serves the web UI and API on port 3000 and is the only service with a public domain. PostgreSQL holds instance metadata and the user-created tables. Redis backs the cache and the pub/sub channel pushing live updates between clients — the app will not start without it. Attachments live on a volume at `/app/.assets`, served through the app with signed URLs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| teable | `ghcr.io/teableio/teable:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `TZ` | teable | UTC | Container timezone |
| `PORT` | teable | 3000 | HTTP listening port |
| `SECRET_KEY` | teable | (secret) | Signs JWTs and sessions |
| `PUBLIC_ORIGIN` | teable | - | Public-facing app URL |
| `BACKEND_LOG_LEVEL` | teable | info | Application log verbosity |
| `BACKEND_TRUST_PROXY` | teable | true | Read client IP from X-Forwarded-For |
| `PRISMA_DATABASE_URL` | teable | - | Postgres connection string |
| `BACKEND_CACHE_PROVIDER` | teable | redis | Cache backend selector |
| `BACKEND_CACHE_REDIS_URI` | teable | - | Redis connection string |
| `BACKEND_STORAGE_PROVIDER` | teable | local | Attachments stored on the volume |
| `BACKEND_STORAGE_ENCRYPTION_IV` | teable | - | Attachment AES-128 IV, 16 chars |
| `BACKEND_STORAGE_ENCRYPTION_KEY` | teable | - | Attachment AES-128 key, 16 chars |
| `BACKEND_ACCESS_TOKEN_ENCRYPTION_IV` | teable | (secret) | API token AES-128 IV, 16 chars |
| `BACKEND_ACCESS_TOKEN_ENCRYPTION_KEY` | teable | (secret) | API token AES-128 key, 16 chars |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.assets`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/teable-database)
