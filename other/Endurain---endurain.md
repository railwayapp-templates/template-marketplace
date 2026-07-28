# Deploy Endurain on Railway

Self-hosted fitness tracking with PostgreSQL and persistent activity data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/endurain)

## About

This template runs Endurain v0.17.7 with PostgreSQL 17.4. Railway provides the
public HTTPS endpoint for Endurain while PostgreSQL remains on private
networking. Endurain applies Alembic and application migrations during startup.
A persistent application volume stores activity files, imported media, and
custom user and server images; PostgreSQL uses its own persistent volume. All
portable required settings use safe defaults, generated secrets, or Railway
service references, so the base deployment needs no external credentials.
Optional SMTP, Strava, Garmin Connect, and geocoding credentials are omitted.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.4@sha256:4aed4b0525233308fc5de1b8d47f92326460d598dc5f004d14b41f183360b4e9` | Database |
| Endurain | `ghcr.io/endurain-project/endurain:v0.17.7@sha256:af3d2b50667c081211e9af6b3590f6cbfbaacb73f63910902574f9d65c24b346` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | endurain | Creates the dedicated application database. |
| `POSTGRES_USER` | Postgres | (secret) | Creates the dedicated application role. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Authoritative generated DB password referenced by Endurain. |
| `TZ` | Endurain | Etc/UTC | Deterministic timezone for activities without coordinates. |
| `PORT` | Endurain | 8080 | Railway routing port; the image starts Uvicorn on 8080. |
| `DB_HOST` | Endurain | - | PostgreSQL hostname on Railway private networking. |
| `DB_PORT` | Endurain | 5432 | PostgreSQL listener port. |
| `DB_USER` | Endurain | (secret) | References the authoritative PostgreSQL username. |
| `LOG_LEVEL` | Endurain | info | Conservative supported runtime logging level. |
| `FERNET_KEY` | Endurain | - | Fresh URL-safe base64 Fernet key encoding 32 bytes. |
| `SECRET_KEY` | Endurain | (secret) | Fresh 64-character hexadecimal JWT signing key. |
| `DB_DATABASE` | Endurain | - | References the authoritative PostgreSQL database name. |
| `DB_PASSWORD` | Endurain | (secret) | References the one generated database password without copying it. |
| `ENVIRONMENT` | Endurain | production | Uses production CORS and session behavior. |
| `BEHIND_PROXY` | Endurain | true | Enables Uvicorn proxy-header processing behind Railway HTTPS. |
| `ENDURAIN_HOST` | Endurain | - | Canonical public origin for frontend runtime configuration and redirects. |
| `FRONTEND_PROTOCOL` | Endurain | https | Enables the Secure flag on authentication cookies. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/about`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/endurain)
