# Deploy Movary Movie Diary on Railway

Track, rate, and review watched movies with a persistent SQLite library.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/movary-movie-diary)

## About

Track, rate, and review watched movies with a persistent SQLite library.

| Service | Access | Persistent storage |
| --- | --- | --- |
| movary | Public HTTPS with owner authentication | None |
| app | Private Railway network | /app/storage (SQLite, cached posters, and application storage) |

Railway terminates public TLS. Keep the application at one replica because it uses local persistent storage. Only the gateway has a public service domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| movary | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | movary | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | movary | true | Owner auth for movary. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | movary | all | Owner scope for movary. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | movary | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | movary | 8080 | Upstream port for movary. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | movary | (secret) | Generated access password. Keep private and preserve with backups. |
| `TIMEZONE` | app | UTC | Timezone for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TMDB_API_KEY` | app | (secret) | Required TMDB API key from themoviedb.org/settings/api. Movie lookup needs your own key; this template does not supply one. |
| `DATABASE_MODE` | app | sqlite | Database mode for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPLICATION_URL` | app | - | Application url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DATABASE_SQLITE` | app | /app/storage/movary.sqlite | Database sqlite for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ENABLE_REGISTRATION` | app | 0 | Enable registration for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LOG_ENABLE_FILE_LOGGING` | app | 0 | Log enable file logging for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TMDB_ENABLE_IMAGE_CACHING` | app | 1 | Tmdb enable image caching for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/movary-movie-diary)
