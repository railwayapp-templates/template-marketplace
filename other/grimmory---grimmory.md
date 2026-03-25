# Deploy grimmory on Railway

Grimmory is a self-hosted digital library for comics and books

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grimmory)

## About

[Grimmory](https://github.com/grimmory-tools/grimmory) is a self-hosted digital library and book manager for EPUB, PDF, comics, and audiobooks. It is the community successor to BookLore and keeps the same general runtime shape: one web application plus one MariaDB database on private networking.

This Railway template mirrors the working `grimmory` deployment closely, but fixes the database side for Railway portability. The app service runs from the official `grimmory/grimmory:v2.3.0` image on port `6060`, uses `GET /api/v1/healthcheck` for health checks, and stores runtime data on a persistent volume mounted at `/app/data`. The database runs as a private `mariadb:11.4` sidecar with its data volume mounted at `/var/lib/mysql`.

Use `template_env_grimmory.json` for the app service variables and `template_env_mariadb.json` for the database bootstrap variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11.4` | Database |
| grimmory | `grimmory/grimmory:v2.3.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `TZ` | mariadb | Etc/UTC |
| `PGID` | mariadb | 1000 |
| `PUID` | mariadb | 1000 |
| `MYSQL_USER` | mariadb | (secret) |
| `MYSQL_DATABASE` | mariadb | grimmory |
| `MYSQL_PASSWORD` | mariadb | (secret) |
| `MYSQL_ROOT_PASSWORD` | mariadb | (secret) |
| `TZ` | grimmory | Etc/UTC |
| `PORT` | grimmory | 6060 |
| `USER_ID` | grimmory | 1000 |
| `GROUP_ID` | grimmory | 1000 |
| `DISK_TYPE` | grimmory | LOCAL |
| `BOOKLORE_PORT` | grimmory | 6060 |
| `DATABASE_PASSWORD` | grimmory | (secret) |
| `DATABASE_USERNAME` | grimmory | (secret) |

## Configuration

- **Volume:** `/config`
- **Healthcheck:** `/api/v1/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/grimmory)
