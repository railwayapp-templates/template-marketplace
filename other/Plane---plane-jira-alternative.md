# Deploy Plane on Railway

Jira, Linear Alternative: Modern project management platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plane-jira-alternative)

## About

Deploy Plane on Railway to self-host an open-source alternative to Jira, Linear, Asana and ClickUp. Plane is an AGPL-3.0 project management platform built on work items, cycles, modules, views, wikis and analytics, with List, Kanban, Calendar, Spreadsheet and Gantt layouts on every project. Teams self-host Plane when issue data must stay on infrastructure they control, or when per-seat pricing stops adding up.

Run Plane on Railway as the community edition pinned to **v1.4.0**, using upstream's service split:

- `web` — the main application UI
- `space` — public, read-only shared views
- `admin` — the God Mode instance console
- `live` — collaborative editing server
- `api` — Django REST backend
- `worker` — Celery background tasks
- `beat-worker` — Celery scheduler
- `minio` — S3-compatible file storage
- `rabbitmq` — Celery message broker
- `Postgres` — Railway-managed, the system of record
- `Redis` — Railway-managed cache, sessions and live pub/sub

Plane splits its frontends by URL path while Railway's edge routes by domain, so a Caddy `proxy` is the only public service: it answers the Railway domain on port 8080 and forwards each path to the right backend over private networking.

![Plane Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786133059/0dd96746-caa0-4c0d-a546-25285da09d27.png)

Plane collapses the "tracker plus wiki plus spreadsheet" sprawl into one workspace. Self-hosting is first-class upstream, which is why God Mode exists: one administrator sets instance-wide email, auth and workspace policy.

- Work items with epics, sub-items, custom states, estimates and relations
- Five layouts per project: List, Kanban, Calendar, Spreadsheet and Gantt
- Cycles and modules for sprints and milestones, with burn-down analytics
- Collaborative Pages, a REST API, webhooks, OAuth apps and an MCP server

Each service has a distinct job. `api` owns the schema and serves every REST call; its entrypoint waits on migrations, so it never serves a half-migrated database. `worker` consumes Celery jobs from RabbitMQ; `beat-worker` is the scheduler and must stay at one replica or every periodic job fires twice. `live` syncs Pages over WebSockets via Redis pub/sub. `minio` and `rabbitmq` each hold a volume, so attachments and queued messages survive redeploys.

| Path | Routed to |
|---|---|
| `/spaces/*` | `space` |
| `/god-mode/*` | `admin` |
| `/live/*` | `live` |
| `/api/*`, `/auth/*`, `/static/*` | `api` |
| `/uploads`, `/uploads/*` | `minio` |
| everything else | `web` |

`USE_MINIO=1` signs upload URLs against the app's own host, so uploads stay same-origin HTTPS with no CORS setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | `makeplane/plane-backend:v1.4.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| space | `makeplane/plane-space:v1.4.0` | Worker |
| beat-worker | `makeplane/plane-backend:v1.4.0` | Worker |
| rabbitmq | `rabbitmq:3.13.6-management-alpine` | Database |
| web | `makeplane/plane-frontend:v1.4.0` | Worker |
| Redis | `redis:8.2.1` | Database |
| minio | `minio/minio:RELEASE.2025-04-22T22-12-26Z` | Database |
| worker | `makeplane/plane-backend:v1.4.0` | Worker |
| live | `makeplane/plane-live:v1.4.0` | Worker |
| admin | `makeplane/plane-admin:v1.4.0` | Worker |
| proxy | `caddy:2.11.3-alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | api | 8000 | Gunicorn listening port |
| `DEBUG` | api | 0 | Disable Django debug mode |
| `WEB_URL` | api | - | Public instance URL |
| `AMQP_URL` | api | - | Celery broker URL |
| `REDIS_URL` | api | - | Cache and session store |
| `USE_MINIO` | api | 1 | Sign upload URLs against app host |
| `AWS_REGION` | api | us-east-1 | S3 region label for MinIO |
| `SECRET_KEY` | api | (secret) | Django signing key |
| `DATABASE_URL` | api | - | PostgreSQL connection string |
| `FILE_SIZE_LIMIT` | api | 5242880 | Max upload size, bytes |
| `GUNICORN_WORKERS` | api | 2 | Gunicorn worker processes |
| `AWS_ACCESS_KEY_ID` | api | - | MinIO access key |
| `API_KEY_RATE_LIMIT` | api | (secret) | API key request throttle |
| `AWS_S3_BUCKET_NAME` | api | uploads | Bucket created on first boot |
| `MINIO_ENDPOINT_SSL` | api | 1 | Use https in presigned URLs |
| `AWS_S3_ENDPOINT_URL` | api | - | Private storage endpoint |
| `CORS_ALLOWED_ORIGINS` | api | - | CORS and CSRF trusted origins |
| `AWS_SECRET_ACCESS_KEY` | api | (secret) | MinIO secret key |
| `LIVE_SERVER_SECRET_KEY` | api | (secret) | Shared secret with live server |
| `AUTHENTICATION_RATE_LIMIT` | api | 10/minute | Login request throttle |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | space | 3000 | HTTP listening port |
| `DEBUG` | beat-worker | 0 | Disable Django debug mode |
| `WEB_URL` | beat-worker | - | Public instance URL |
| `AMQP_URL` | beat-worker | - | Celery broker URL |
| `REDIS_URL` | beat-worker | - | Cache and session store |
| `USE_MINIO` | beat-worker | 1 | Sign upload URLs against app host |
| `AWS_REGION` | beat-worker | us-east-1 | S3 region label for MinIO |
| `SECRET_KEY` | beat-worker | (secret) | Django signing key from API |
| `DATABASE_URL` | beat-worker | - | PostgreSQL connection string |
| `FILE_SIZE_LIMIT` | beat-worker | 5242880 | Max upload size, bytes |
| `GUNICORN_WORKERS` | beat-worker | 1 | Process count for entrypoint |
| `AWS_ACCESS_KEY_ID` | beat-worker | - | MinIO access key |
| `API_KEY_RATE_LIMIT` | beat-worker | (secret) | API key request throttle |
| `AWS_S3_BUCKET_NAME` | beat-worker | uploads | Bucket used for exports |
| `MINIO_ENDPOINT_SSL` | beat-worker | 1 | Use https in presigned URLs |
| `AWS_S3_ENDPOINT_URL` | beat-worker | - | Private storage endpoint |
| `CORS_ALLOWED_ORIGINS` | beat-worker | - | CORS and CSRF trusted origins |
| `AWS_SECRET_ACCESS_KEY` | beat-worker | (secret) | MinIO secret key |
| `LIVE_SERVER_SECRET_KEY` | beat-worker | (secret) | Shared secret with live server |
| `AUTHENTICATION_RATE_LIMIT` | beat-worker | 10/minute | Login request throttle |
| `RABBITMQ_NODENAME` | rabbitmq | rabbit@localhost | Stable node name for the volume |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq | - | Broker password |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | Broker username |
| `RABBITMQ_DEFAULT_VHOST` | rabbitmq | plane | Broker virtual host |
| `RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS` | rabbitmq | +S 2:2 +SDio 2 | Cap Erlang schedulers to the CPU quota |
| `PORT` | web | 3000 | HTTP listening port |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `MINIO_BROWSER` | minio | off | Disable the MinIO web console |
| `MINIO_ROOT_USER` | minio | (secret) | Object storage access key |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Object storage secret key |
| `DEBUG` | worker | 0 | Disable Django debug mode |
| `WEB_URL` | worker | - | Public instance URL |
| `AMQP_URL` | worker | - | Celery broker URL |
| `REDIS_URL` | worker | - | Cache and session store |
| `USE_MINIO` | worker | 1 | Sign upload URLs against app host |
| `AWS_REGION` | worker | us-east-1 | S3 region label for MinIO |
| `SECRET_KEY` | worker | (secret) | Django signing key from API |
| `DATABASE_URL` | worker | - | PostgreSQL connection string |
| `FILE_SIZE_LIMIT` | worker | 5242880 | Max upload size, bytes |
| `GUNICORN_WORKERS` | worker | 1 | Process count for entrypoint |
| `AWS_ACCESS_KEY_ID` | worker | - | MinIO access key |
| `API_KEY_RATE_LIMIT` | worker | (secret) | API key request throttle |
| `AWS_S3_BUCKET_NAME` | worker | uploads | Bucket used for attachments |
| `MINIO_ENDPOINT_SSL` | worker | 1 | Use https in presigned URLs |
| `AWS_S3_ENDPOINT_URL` | worker | - | Private storage endpoint |
| `CORS_ALLOWED_ORIGINS` | worker | - | CORS and CSRF trusted origins |
| `AWS_SECRET_ACCESS_KEY` | worker | (secret) | MinIO secret key |
| `LIVE_SERVER_SECRET_KEY` | worker | (secret) | Shared secret with live server |
| `AUTHENTICATION_RATE_LIMIT` | worker | 10/minute | Login request throttle |
| `PORT` | live | 3000 | HTTP listening port |
| `REDIS_URL` | live | - | Pub/sub for collaborative editing |
| `API_BASE_URL` | live | - | Private backend endpoint |
| `LIVE_BASE_PATH` | live | /live | Base path behind the proxy |
| `LIVE_SERVER_SECRET_KEY` | live | (secret) | Shared secret with API |
| `PORT` | admin | 3000 | HTTP listening port |
| `PORT` | proxy | 8080 | Public listener, matches domain target port |
| `CADDYFILE` | proxy | - | Written to disk at boot |
| `BUCKET_NAME` | proxy | uploads | Upload path segment proxied to MinIO |
| `FILE_SIZE_LIMIT` | proxy | 5242880 | Max request body size, bytes |

## Configuration

- **Healthcheck:** `/api/instances/`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `./bin/docker-entrypoint-beat.sh`
- **Volume:** `/var/lib/rabbitmq`
- **Start command:** `/bin/sh -c 'sed -i "s/^worker_processes.*/worker_processes 2;/" /etc/nginx/nginx.conf; nginx -t; exec nginx -g "daemon off;"'`
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/usr/bin/docker-entrypoint.sh minio server /export --address ":9000" --console-address ":9090"`
- **Volume:** `/export`
- **Start command:** `./bin/docker-entrypoint-worker.sh`
- **Start command:** `/bin/sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile; caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile; exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/plane-jira-alternative)
