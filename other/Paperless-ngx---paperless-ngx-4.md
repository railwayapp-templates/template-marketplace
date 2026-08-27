# Deploy Paperless-ngx on Railway

Secure Paperless-ngx with native PostgreSQL, Redis, OCR, and recovery.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-4)

## About

Run Paperless-ngx `v3.0.5` with Railway-native PostgreSQL, authenticated Redis,
a persistent `/paperless` volume, generated administrator credentials, and an
immutable upstream image pin.

Paperless-ngx indexes scanned and digital documents for authenticated search,
classification, metadata, workflows, and export. This template wires the three
required services without exposing the database or Redis publicly. It prepares
the app volume securely and runs the steady-state application as UID/GID 1000.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| paperless-ngx | [l4time/railway-paperless-ngx-template](https://github.com/l4time/railway-paperless-ngx-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Managed PostgreSQL database name. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL assembled from managed values. |
| `POSTGRES_USER` | Postgres | (secret) | Managed PostgreSQL bootstrap username. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL authentication password. |
| `REDISHOST` | Redis | - | Private Railway hostname for the Redis service. |
| `REDISPORT` | Redis | 6379 | Fixed private Redis port. |
| `REDISUSER` | Redis | default | Fixed authenticated Redis username. |
| `REDIS_URL` | Redis | - | Private authenticated Redis connection URL assembled from managed values. |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias referenced by clients. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis authentication password. |
| `PORT` | paperless-ngx | 8000 | Fixed HTTP port used by the Paperless-ngx web service. |
| `PAPERLESS_URL` | paperless-ngx | - | Public Railway domain used as the canonical Paperless-ngx URL. |
| `PAPERLESS_REDIS` | paperless-ngx | - | Private authenticated Redis URL referenced from the Redis service. |
| `PAPERLESS_DBHOST` | paperless-ngx | - | Private PostgreSQL hostname referenced from the Postgres service. |
| `PAPERLESS_DBNAME` | paperless-ngx | - | PostgreSQL database name referenced from the Postgres service. |
| `PAPERLESS_DBPASS` | paperless-ngx | - | PostgreSQL password referenced securely from the Postgres service. |
| `PAPERLESS_DBPORT` | paperless-ngx | - | Private PostgreSQL port referenced from the Postgres service. |
| `PAPERLESS_DBUSER` | paperless-ngx | - | PostgreSQL user referenced from the Postgres service. |
| `PAPERLESS_ADMIN_MAIL` | paperless-ngx | admin@localhost.invalid | Bootstrap administrator email; change it after the first login. |
| `PAPERLESS_ADMIN_USER` | paperless-ngx | (secret) | Fixed bootstrap administrator username for the first login. |
| `PAPERLESS_SECRET_KEY` | paperless-ngx | (secret) | Generated 64-character Paperless-ngx application secret. |
| `PAPERLESS_ADMIN_PASSWORD` | paperless-ngx | (secret) | Generated 32-character bootstrap administrator password. |
| `PAPERLESS_EXPECTED_VERSION` | paperless-ngx | 3.0.5 | Expected immutable Paperless-ngx release enforced at startup. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/accounts/login/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperless`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/paperless-ngx-4)
