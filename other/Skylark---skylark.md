# Deploy Skylark on Railway

A live website for your Palworld dedicated server. Players install nothing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/skylark)

## About

Skylark is a live website for your Palworld dedicated server: who is online, where they are, what they caught and built, the Palpedia, breeding and the server's progression, read from the server's own interfaces and its world save. Players install nothing.

This template runs the site from its published image and a Postgres database, with a volume for the admin page's backups. After it deploys, open `/admin` on the site's domain and set the admin password, copy the collector secret from the admin Collector page, and run the collector beside your Palworld server (or beside the site for a rented server) with the site's URL and that secret, as the [README](https://github.com/oddessentials/skylark#install) describes. The collector reports the server to the site; the site itself never needs access to the game server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| skylark | `ghcr.io/oddessentials/skylark:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | skylark | 3000 | - |
| `PUBLIC_SITE_NAME` | skylark | Palworld server | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/backups`

**Category:** Other

[View on Railway →](https://railway.com/deploy/skylark)
