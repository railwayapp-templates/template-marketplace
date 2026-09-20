# Deploy Jellystat on Railway

Jellyfin viewing statistics with PostgreSQL and persistent backup storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jellystat)

## About

Jellyfin viewing statistics with PostgreSQL and persistent backup storage.

| Service | Access | Persistent storage |
| --- | --- | --- |
| jellystat | Public HTTPS | /app/backend/backup-data |
| postgres | Private | /var/lib/postgresql/data |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jellystat | `cyfershepard/jellystat:1.1.12@sha256:e61c759ec706da378bc8374e797da1dfd298ab30f804cefd82d192c301a888c7` | Web service |
| postgres | `postgres:17@sha256:f4c66b820c6f974249089d3d16d86a3698eae11e8746eb6644b2271031e91232` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | jellystat | Etc/UTC | Tz for jellystat. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | jellystat | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `JS_USER` | jellystat | (secret) | Js user for jellystat. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `JWT_SECRET` | jellystat | (secret) | Generated jwt secret. Keep private and preserve with backups. |
| `JS_PASSWORD` | jellystat | (secret) | Generated js password. Keep private and preserve with backups. |
| `POSTGRES_DB` | jellystat | jfstat | Initial PostgreSQL database name, or the matching database selected by the application. |
| `POSTGRES_IP` | jellystat | - | Postgres ip resolved automatically from the linked service. Keep this reference when using the included topology. |
| `JS_LISTEN_IP` | jellystat | :: | Js listen ip for jellystat. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRES_PORT` | jellystat | 5432 | Private PostgreSQL TCP port. Keep 5432. |
| `POSTGRES_USER` | jellystat | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | jellystat | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `POSTGRES_DB` | postgres | jfstat | Initial PostgreSQL database name, or the matching database selected by the application. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |

## Configuration

- **Healthcheck:** `/auth/isConfigured`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/backup-data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/jellystat)
