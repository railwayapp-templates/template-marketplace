# Deploy bewCloud Personal Cloud on Railway

Personal files, notes, feeds, photos, and expenses with PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bewcloud-personal-cloud)

## About

Personal files, notes, feeds, photos, and expenses with PostgreSQL.

| Service | Access | Persistent storage |
| --- | --- | --- |
| app | Private | /app/data-files |
| postgres | Private | /var/lib/postgresql/data |
| bewcloud | Public HTTPS | None |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |
| postgres | `postgres:17@sha256:f4c66b820c6f974249089d3d16d86a3698eae11e8746eb6644b2271031e91232` | Database |
| bewcloud | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | app | 8000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `JWT_SECRET` | app | (secret) | Generated jwt secret. Keep private and preserve with backups. |
| `PUBLIC_URL` | app | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PASSWORD_SALT` | app | (secret) | Generated password salt. Keep private and preserve with backups. |
| `POSTGRESQL_HOST` | app | - | Postgresql host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRESQL_PORT` | app | 5432 | Postgresql port for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRESQL_USER` | app | (secret) | Postgresql user for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRESQL_DBNAME` | app | bewcloud | Postgresql dbname for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `POSTGRESQL_PASSWORD` | app | (secret) | Postgresql password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_DB` | postgres | bewcloud | Initial PostgreSQL database name, or the matching database selected by the application. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `PORT` | bewcloud | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | bewcloud | true | Require owner authentication for every application route. |
| `OWNER_SCOPE` | bewcloud | all | Protect all application routes. |
| `UPSTREAM_HOST` | bewcloud | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | bewcloud | 8000 | Upstream port for bewcloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | bewcloud | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/app/data-files`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/bewcloud-personal-cloud)
