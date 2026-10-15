# Deploy Yamtrack on Railway

Media tracker for movies, TV shows, anime, video games, books, and more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-TD4-4)

## About

Yamtrack is a comprehensive self-hosted media tracker for movies, TV shows, anime, manga, video games, books, comics, and board games. It features multi-user support, automatic scrobbling and history sync with media servers like Jellyfin, Plex, and Emby, and seamless data imports from Trakt, Simkl, MyAnimeList, AniList, and Kitsu.

* [GitHub](https://github.com/FuzzyGrim/Yamtrack)
* [Documentation](https://fuzzygrim.github.io/Yamtrack/)
* [Demo](https://yamtrack.fuzzygrim.com/)

This template deploys a complete production-ready stack for Yamtrack: the core Python/Django application container (`ghcr.io/fuzzygrim/yamtrack:latest`), a managed PostgreSQL database (`ghcr.io/railwayapp-templates/postgres-ssl:16`) for reliable relational storage, and a Redis instance (`bitnami/redis:7.2.5`) for session management and background tasks. Communication between the application, Redis, and PostgreSQL occurs securely over Railway's internal private network.

### Deployment Tips & Configuration

- **Initial Registration:** By default, the template sets `REGISTRATION=True` to allow you to create your initial administrator account. Once registered, set this variable to `False` to disable open registration.
- **Backups:** Because Railway volumes have specific snapshot tools, the most robust way to backup or migrate your Yamtrack instance is performing a database dump via PostgreSQL tools (`pg_dump`) alongside periodic CSV data exports from the application.
- **Advanced Configuration:** A complete list of supported environment variables can be found in the [Yamtrack documentation](https://fuzzygrim.github.io/Yamtrack/release/env-variables/). You can add custom API keys (for TMDB, IGDB, etc.) or configure [OpenID Connect (OIDC) / social authentication](https://fuzzygrim.github.io/Yamtrack/release/social-auth/) for enterprise or household SSO.

*Note: This is a community-made template and therefore not officially supported by the Yamtrack team. Please direct template-specific help requests to the [Railway thread for the template](https://station.railway.com/templates/yamtrack-cc099ce3).*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `redis:8` | Database |
| Yamtrack | `ghcr.io/fuzzygrim/yamtrack:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | Yamtrack | 8000 | Port the Yamtrack web server listens on inside the container |
| `URLS` | Yamtrack | - | Shortcut to set both CSRF trusted origins and ALLOWED_HOSTS for the public domain |
| `SECRET` | Yamtrack | (secret) | Secret key used for cryptographic signing (auto-generated) |
| `DB_HOST` | Yamtrack | - | Postgres host linked over the private network |
| `DB_NAME` | Yamtrack | - | Postgres database name |
| `DB_PORT` | Yamtrack | - | Postgres port |
| `DB_USER` | Yamtrack | (secret) | Postgres connection user |
| `REDIS_URL` | Yamtrack | - | Redis connection URL for background tasks and sessions |
| `DB_PASSWORD` | Yamtrack | (secret) | Postgres connection password (auto-generated) |
| `REGISTRATION` | Yamtrack | True | Allow new user registrations (set to False after creating your admin account) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec redis-server --requirepass $REDIS_PASSWORD --save 60 1"`
- **Volume:** `/data`
- **Healthcheck:** `/health/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/-TD4-4)
