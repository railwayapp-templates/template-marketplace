# Deploy Yamtrack on Railway

Media tracker for movies, TV shows, anime, manga, video games, and books.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-TD4-4)

## About

Yamtrack is a self-hosted media tracker for movies, TV shows, anime, manga, video games, and books. It directly integrates with Jellyfin to automatically track new watched media and can import from other services such as Trakt, Simkl, MyAnimeList, AniList, and Kitsu.

* [GitHub](https://github.com/FuzzyGrim/Yamtrack)

**Tips**

* By default, the template has `REGISTRATION=True` to allow for initial setup. Once you have created your account, consider setting this variable to `False` to disable open registration.
* A complete list of supported environment variables can be found [here](https://github.com/FuzzyGrim/Yamtrack/wiki/Environment-Variables). These can be added to the Yamtrack service to enable higher rate limits with various providers and further customize the installation.
* Changing the Railway-provided domain or adding a custom domain may require redeploying the Yamtrack service in order for POST requests to work.
* The port for custom domains should be `8000`.
* [Volumes on Railway](https://docs.railway.com/reference/volumes) have limited options to access or [backup](https://docs.railway.com/reference/backups) the persistent data. Connecting to Postgres and [performing a full database dump](https://blog.railway.com/p/postgre-backup) is probably the best option for migrating data between instances.
* Communication with Postgres is done exclusively over the private network and the database is not exposed externally by default. If you want to enable external access, go to the database settings and enable [TCP proxying](https://docs.railway.com/reference/tcp-proxy) on port `5432`. This can be disabled at any time.

_Note: This is a community-made template and therefore not supported by the Yamtrack team. Please direct help requests to the [Railway thread](https://station.railway.com/templates/yamtrack-cc099ce3) for the template._

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |
| Yamtrack | `ghcr.io/fuzzygrim/yamtrack:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `CSRF` | Yamtrack | - | Comma-separated list of trusted origins for POST requests when using reverse proxies (e.g., https://yamtrack.mydomain.com) |
| `PORT` | Yamtrack | 8000 | - |
| `SECRET` | Yamtrack | (secret) | Secret key used for cryptographic signing. Should be a random string. |
| `DB_USER` | Yamtrack | (secret) | - |
| `DB_PASSWORD` | Yamtrack | (secret) | - |
| `REGISTRATION` | Yamtrack | True | Enable new user registration. Disable after initial setup. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/-TD4-4)
