# Deploy OpenReplay | Open-Source Session Replay, FullStory and LogRocket Alternative on Railway

Self-hosted session replay, product analytics and DevTools for your web app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openreplay)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/openreplay?utm_medium=integration&utm_source=button&utm_campaign=openreplay)

[OpenReplay](https://openreplay.com/) is open-source session replay: watch exactly what a user did in your web app, with the console, network requests, errors and performance data playing alongside. It also does product analytics (funnels, journeys, heatmaps, dashboards). This template runs OpenReplay v1.28.0 on your own Railway project, so recordings never leave your infrastructure.

- **Session replay without a third party.** Recordings, user data and analytics live in your own Postgres, ClickHouse and object storage on Railway's private network. Only the dashboard and the tracker ingest endpoint are public.
- **One public URL.** A gateway serves the dashboard, takes tracker data at `/ingest`, proxies the tracker script at `/script` and hands out signed recording downloads, all on the same domain.
- **Upstream's own pipeline.** Ingest, sink, storage, ender, db, assets, canvases and the Go API run as in OpenReplay's docker-compose install, with Redis streams as the queue. There is no Kafka to run.
- **Pinned and self-migrating.** Every image is pinned to v1.28.0. The Postgres schema, ClickHouse schema and storage buckets are created on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.10.2-alpine` | Database |
| OpenReplay | [nomideusz/openreplay-railway](https://github.com/nomideusz/openreplay-railway) (root: /gateway) | Web service |
| API | [nomideusz/openreplay-railway](https://github.com/nomideusz/openreplay-railway) (root: /chalice) | Worker |
| ClickHouse | [nomideusz/openreplay-railway](https://github.com/nomideusz/openreplay-railway) (root: /clickhouse) | Database |
| Storage | [nomideusz/openreplay-railway](https://github.com/nomideusz/openreplay-railway) (root: /storage) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Backend | [nomideusz/openreplay-railway](https://github.com/nomideusz/openreplay-railway) (root: /backend) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | OpenReplay | 8080 | Port the gateway listens on - leave as is |
| `BACKEND_HOST` | OpenReplay | - | Go services (ingest, Go API, canvases) on the private network |
| `CHALICE_HOST` | OpenReplay | - | Python API on the private network |
| `STORAGE_HOST` | OpenReplay | - | Object storage on the private network, for signed recording downloads |
| `S3_KEY` | API | - | Object storage access key |
| `S3_HOST` | API | - | Public URL that signed recording links point at - routed to object storage by the gateway |
| `ch_host` | API | - | ClickHouse on the private network |
| `ch_user` | API | (secret) | ClickHouse user |
| `pg_host` | API | - | Postgres on the private network |
| `pg_user` | API | (secret) | Postgres user |
| `SITE_URL` | API | - | Public dashboard URL, used in emails and links - set it to your custom domain after adding one |
| `S3_SECRET` | API | (secret) | Object storage secret key |
| `pg_dbname` | API | - | Postgres database |
| `ASSIST_KEY` | API | - | Same key as the Backend service |
| `EMAIL_HOST` | API | - | SMTP host for invitations and password resets (Railway allows outbound SMTP on Pro only) |
| `EMAIL_USER` | API | (secret) | SMTP user |
| `JWT_SECRET` | API | (secret) | Same secret as the Backend service |
| `ch_password` | API | (secret) | ClickHouse password |
| `pg_password` | API | (secret) | Postgres password |
| `REDIS_STRING` | API | - | Redis on the private network |
| `EMAIL_PASSWORD` | API | (secret) | SMTP password |
| `JWT_SPOT_SECRET` | API | (secret) | Same secret as the Backend service |
| `ASSIST_JWT_SECRET` | API | (secret) | Same secret as the Backend service |
| `JWT_REFRESH_SECRET` | API | (secret) | Signs refresh tokens |
| `JWT_SPOT_REFRESH_SECRET` | API | (secret) | Signs Spot refresh tokens |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Auto-generated ClickHouse password |
| `RUSTFS_ACCESS_KEY` | Storage | - | Auto-generated S3 access key |
| `RUSTFS_SECRET_KEY` | Storage | (secret) | Auto-generated S3 secret key |
| `POSTGRES_DB` | Postgres | openreplay | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user - a superuser, which the schema needs for the pg_trgm and pgcrypto extensions |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `S3_PUBLIC` | Backend | - | Public URL that signed download links point at - the gateway routes them to object storage |
| `ASSIST_KEY` | Backend | - | Assist key - shared with the API service |
| `JWT_SECRET` | Backend | (secret) | Signs dashboard sessions - shared with the API service |
| `CH_PASSWORD` | Backend | (secret) | ClickHouse password (legacy name some services read) |
| `CH_USERNAME` | Backend | (secret) | ClickHouse user (legacy name some services read) |
| `S3_INTERNAL` | Backend | - | Object storage on the private network - recordings are uploaded here |
| `pg_password` | Backend | (secret) | Postgres password (read separately by some services) |
| `REDIS_STRING` | Backend | - | Redis on the private network - carries the ingest queues as Redis streams |
| `TOKEN_SECRET` | Backend | (secret) | Signs tracker session tokens |
| `ASSETS_ORIGIN` | Backend | - | Public URL of the cached page assets (CSS, fonts, images) the player loads |
| `JWT_SPOT_SECRET` | Backend | (secret) | Signs Spot sessions - shared with the API service |
| `POSTGRES_STRING` | Backend | - | Postgres on the private network |
| `ASSIST_JWT_SECRET` | Backend | (secret) | Assist token secret - shared with the API service |
| `AWS_ACCESS_KEY_ID` | Backend | - | Object storage access key |
| `CLICKHOUSE_STRING` | Backend | - | ClickHouse native protocol on the private network |
| `CLICKHOUSE_PASSWORD` | Backend | (secret) | ClickHouse password |
| `CLICKHOUSE_USERNAME` | Backend | (secret) | ClickHouse user |
| `AWS_SECRET_ACCESS_KEY` | Backend | (secret) | Object storage secret key |
| `CLICKHOUSE_HTTP_STRING` | Backend | - | ClickHouse HTTP interface on the private network |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf /data/lost+found && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --maxmemory-policy noeviction --appendonly yes --dir /data"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/mnt/efs`

**Category:** Observability · **Languages:** PLpgSQL, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openreplay)
