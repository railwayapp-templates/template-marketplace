# Deploy Discourse on Railway

Have meaningful conversations and collaborate anytime, anywhere

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discourse)

## About

Discourse is an open-source discussion platform designed for modern web communities. It provides a rich set of features including real-time discussions, user notifications, and a powerful API, making it an ideal choice for building engaging online forums and communities.

Hosting Discourse involves setting up a server environment utilizing a bash script to create the relevant Docker configurations. Discourse typically requires a complex setup and configuration to get up and running. You'll need to setup web certificates to serve your requests over HTTPS, and secure your server properly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `railwayapp/redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Discourse | `bitnamilegacy/discourse:3.5.0-debian-12-r0` | Web service |
| Sidekiq | `bitnamilegacy/discourse:3.5.0-debian-12-r0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Discourse | 3000 | - |
| `DISCOURSE_PASSWORD` | Discourse | (secret) | The password of the superuser. |
| `DISCOURSE_USERNAME` | Discourse | (secret) | The username of the superuser. |
| `DISCOURSE_SITE_NAME` | Discourse | Railway Forums | The name of your forum. |
| `DISCOURSE_DATABASE_USER` | Discourse | (secret) | - |
| `DISCOURSE_REDIS_PASSWORD` | Discourse | (secret) | - |
| `DISCOURSE_REDIS_USERNAME` | Discourse | (secret) | - |
| `DISCOURSE_DATABASE_PASSWORD` | Discourse | (secret) | - |
| `DISCOURSE_PASSWORD` | Sidekiq | (secret) | - |
| `DISCOURSE_USERNAME` | Sidekiq | (secret) | - |
| `DISCOURSE_DATABASE_USER` | Sidekiq | (secret) | - |
| `DISCOURSE_REDIS_PASSWORD` | Sidekiq | (secret) | - |
| `DISCOURSE_REDIS_USERNAME` | Sidekiq | (secret) | - |
| `DISCOURSE_DATABASE_PASSWORD` | Sidekiq | (secret) | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/srv/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami/discourse`
- **Start command:** `/opt/bitnami/scripts/discourse/entrypoint.sh /opt/bitnami/scripts/discourse-sidekiq/run.sh`

**Category:** Other

[View on Railway →](https://railway.com/deploy/discourse)
