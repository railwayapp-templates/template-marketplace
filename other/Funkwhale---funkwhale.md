# Deploy Funkwhale on Railway

Federated music server — stream your library, playlists, podcasts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/funkwhale)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/funkwhale?utm_medium=integration&utm_source=button&utm_campaign=funkwhale)

[Funkwhale](https://funkwhale.audio/) is a self-hosted, federated audio platform: upload your music library, stream it from any device (web, Subsonic apps), create playlists and radios, publish podcasts and channels, and optionally federate with other Funkwhale pods over ActivityPub.

This template runs Funkwhale as three Railway services. The main service is a combined container (Django API via gunicorn, celery worker with beat for imports and federation, and nginx serving the web frontend and media) — one container, one volume, no shared-storage juggling. PostgreSQL and Redis run as separate services. On first boot it runs migrations, collects static files, and creates your admin account from the `FUNKWHALE_ADMIN_PASSWORD` variable (username `fwadmin`). Music, media, and static files persist on the volume at `/srv/funkwhale/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7-alpine` | Database |
| postgres | `postgres:17-alpine` | Database |
| funkwhale | [nomideusz/funkwhale-railway](https://github.com/nomideusz/funkwhale-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | funkwhale | Don't change. |
| `POSTGRES_USER` | postgres | (secret) | Don't change. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Database password. Auto generated. |
| `PORT` | funkwhale | 80 | Port for Railway healthcheck probing. Do not change. |
| `CACHE_URL` | funkwhale | - | Wired automatically to the redis service. Don't change. |
| `DATABASE_URL` | funkwhale | - | Wired automatically to the postgres service. Don't change. |
| `DJANGO_SECRET_KEY` | funkwhale | (secret) | Django secret key. Auto generated. |
| `FUNKWHALE_HOSTNAME` | funkwhale | - | Pod hostname — your federated identity. Wired automatically. |
| `FUNKWHALE_PROTOCOL` | funkwhale | https | Don't change. |
| `FUNKWHALE_ADMIN_EMAIL` | funkwhale | - | Admin account email. |
| `FUNKWHALE_ADMIN_PASSWORD` | funkwhale | (secret) | Sign-in password for the admin account. Auto generated. |
| `FUNKWHALE_ADMIN_USERNAME` | funkwhale | (secret) | Admin username ('admin' and 'root' are reserved by Funkwhale). |

## Configuration

- **Start command:** `docker-entrypoint.sh redis-server --save '' --appendonly no`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/funkwhale/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/funkwhale)
