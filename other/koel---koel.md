# Deploy koel on Railway

Personal music streaming server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/koel)

## About

Koel is a personal music streaming server. Upload or sync a library, browse
artists/albums/playlists, and stream from the web UI (and companion apps).

This template runs Koel with PostgreSQL. Only the app is public; the database
stays on private networking. A single volume at `/data` holds the music
library, artwork, search indexes, and the persisted `APP_KEY` (Railway allows
one volume per service). First boot runs `koel:init` / migrations and may take
a minute before `/sw.js` is ready.

Default admin after first boot: `admin@koel.dev` / `KoelIsCool` — change it
immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [osbytes/template-koel](https://github.com/osbytes/template-koel) (root: /services/app) | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | app | production | Laravel environment |
| `APP_KEY` | app | - | Optional; empty auto-generates on first boot and persists under the /data volume — do not rotate after first deploy if set |
| `APP_URL` | app | - | Public HTTPS origin Koel should generate links for |
| `DB_HOST` | app | - | Postgres private DNS — not the public URL |
| `DB_PORT` | app | 5432 | Postgres port |
| `APP_NAME` | app | Koel | Display name |
| `APP_DEBUG` | app | false | Keep false on public Internet |
| `MEDIA_PATH` | app | /data/music | Music library path inside the consolidated /data volume |
| `DB_DATABASE` | app | - | Database name from postgres service |
| `DB_PASSWORD` | app | (secret) | Database password from postgres service |
| `DB_USERNAME` | app | (secret) | Database user from postgres service |
| `FORCE_HTTPS` | app | true | Trust Railway TLS termination |
| `MEMORY_LIMIT` | app | - | Optional scan memory limit in MB; leave empty for PHP default |
| `DB_CONNECTION` | app | pgsql | Must be pgsql for this template's Postgres service |
| `LASTFM_API_KEY` | app | (secret) | Optional Last.fm API key |
| `STREAMING_METHOD` | app | x-sendfile | Apache x-sendfile; keep for efficient streaming |
| `LASTFM_API_SECRET` | app | (secret) | Optional Last.fm API secret |
| `SPOTIFY_CLIENT_ID` | app | - | Optional Spotify client id for artwork |
| `SPOTIFY_CLIENT_SECRET` | app | (secret) | Optional Spotify client secret |
| `POSTGRES_DB` | postgres | koel | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/sw.js`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/koel)
