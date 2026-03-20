# Deploy Seerr on Railway

Open-source media request and discovery manager.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seerr)

## About

Seerr is a free and open source media request management application. It integrates with Jellyfin, Plex, and Emby media servers, along with Sonarr and Radarr for automated media management. Users can request movies and TV shows through an intuitive web interface.

Hosting Seerr on Railway gives you a fully managed media request platform with PostgreSQL persistence. Railway handles container orchestration, networking between Seerr and its database, automatic restarts, and public domain provisioning. The template uses the official `seerr/seerr` Docker image for reliable, up-to-date deployments. After deploying, complete the setup wizard at your Railway-assigned URL to connect your media server (Jellyfin, Plex, or Emby) and configure Sonarr/Radarr integrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| seerr | `seerr/seerr:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | seerr | Etc/UTC | Timezone for the container (e.g., America/New_York) |
| `PORT` | seerr | 5055 | Port Seerr listens on |
| `DB_HOST` | seerr | - | PostgreSQL host address from Railway Postgres service |
| `DB_NAME` | seerr | - | PostgreSQL database name from Railway Postgres service |
| `DB_PASS` | seerr | - | PostgreSQL password from Railway Postgres service |
| `DB_PORT` | seerr | - | PostgreSQL port from Railway Postgres service |
| `DB_TYPE` | seerr | postgres | Database engine: "sqlite" or "postgres" |
| `DB_USER` | seerr | (secret) | PostgreSQL username from Railway Postgres service |
| `DB_USE_SSL` | seerr | false | Whether to enable SSL for the database connection |
| `DB_LOG_QUERIES` | seerr | false | Whether to log database queries for debugging |
| `POSTGRES_DB` | Postgres | seerr | Name of the default database to create |
| `DATABASE_URL` | Postgres | - | Internal PostgreSQL connection string |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL superuser password (auto-generated) |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL connection string |

## Configuration

- **Healthcheck:** `/api/v1/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/seerr)
