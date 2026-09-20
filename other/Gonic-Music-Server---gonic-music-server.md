# Deploy Gonic Music Server on Railway

Subsonic music and podcast server with persistent library storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gonic-music-server)

## About

Subsonic music and podcast server with persistent library storage.

| Service | Access | Persistent storage |
| --- | --- | --- |
| app | Private | /data |
| gonic | Public HTTPS | None |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |
| gonic | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `GONIC_DB_PATH` | app | /data/gonic.db | Gonic db path for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GONIC_CACHE_PATH` | app | /data/cache | Gonic cache path for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GONIC_MUSIC_PATH` | app | /data/music | Gonic music path for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GONIC_LISTEN_ADDR` | app | :4747 | Gonic listen addr for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GONIC_PODCAST_PATH` | app | /data/podcasts | Gonic podcast path for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GONIC_SCAN_INTERVAL` | app | 15 | Gonic scan interval for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GONIC_PLAYLISTS_PATH` | app | /data/playlists | Gonic playlists path for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GONIC_JUKEBOX_ENABLED` | app | false | Gonic jukebox enabled for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | gonic | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | gonic | true | Require owner authentication for every application route. |
| `OWNER_SCOPE` | gonic | all | Protect all application routes. |
| `UPSTREAM_HOST` | gonic | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | gonic | 4747 | Upstream port for gonic. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | gonic | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/gonic-music-server)
