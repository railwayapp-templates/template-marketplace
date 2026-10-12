# Deploy Apache Superset 6 BI Dashboards on Railway

BI dashboards on Postgres, MySQL, ClickHouse and more. Async workers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-superset-6-bi-dashboards)

## About

Apache Superset is an open-source business intelligence platform for exploring data, writing SQL and building interactive dashboards. This community template runs Superset 6 on Railway with a Postgres metadata database, Redis caching, Celery workers for asynchronous queries and scheduled reports, and drivers for Postgres, MySQL and ClickHouse.

A production Superset setup is more than the web app. Superset keeps its own metadata (users, charts, dashboards, saved queries) in a SQL database, uses Redis for caching and as the Celery broker, runs Celery workers for asynchronous SQL Lab queries, thumbnails and Alerts & Reports, and needs a single Celery beat process to trigger scheduled reports. This template wires those pieces together on Railway's private network. A one-shot init service migrates the metadata database, creates an admin with a generated password and sets up roles. The image extends the official lean image with database drivers and a configuration file driven entirely by Railway variables, and runs as a non-root user.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| superset | [baranberkay96/superset-railway](https://github.com/baranberkay96/superset-railway) (branch: main) (root: /services/superset) | Web service |
| Redis | `redis:8.2` | Database |
| superset-init | [baranberkay96/superset-railway](https://github.com/baranberkay96/superset-railway) (branch: main) (root: /services/superset) | Worker |
| superset-worker | [baranberkay96/superset-railway](https://github.com/baranberkay96/superset-railway) (branch: main) (root: /services/superset) | Worker |
| superset-beat | [baranberkay96/superset-railway](https://github.com/baranberkay96/superset-railway) (branch: main) (root: /services/superset) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | superset | 8088 | Gunicorn port (Railway healthcheck + domain). |
| `SUPERSET_ENV` | superset | production | Production mode (enables rate limiting). |
| `SUPERSET_PORT` | superset | 8088 | Port read by the image's run-server.sh. |
| `GUNICORN_TIMEOUT` | superset | 120 | Request timeout (s); keep >= SUPERSET_WEBSERVER_TIMEOUT. |
| `SUPERSET_REDIS_URL` | superset | - | Redis for Celery broker/results, caches and rate limiting (DBs 0-8). |
| `SUPERSET_PUBLIC_URL` | superset | - | Public URL used in report/alert links. |
| `SUPERSET_SECRET_KEY` | superset | (secret) | Flask secret key; encrypts stored DB passwords. Shared by all Superset services. Never change after first boot. |
| `SERVER_WORKER_AMOUNT` | superset | 2 | Gunicorn worker processes. |
| `SUPERSET_ADMIN_EMAIL` | superset | admin@example.com | Admin email. |
| `SERVER_THREADS_AMOUNT` | superset | 20 | Threads per gunicorn worker. |
| `SUPERSET_DATABASE_URL` | superset | - | Superset metadata database (Railway Postgres). |
| `SUPERSET_ADMIN_PASSWORD` | superset | (secret) | Admin password (generated). Only applied when the admin is first created. |
| `SUPERSET_ADMIN_USERNAME` | superset | (secret) | Admin login created by superset-init. |
| `SUPERSET_WEBSERVER_TIMEOUT` | superset | 120 | Superset query timeout for synchronous requests (s). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `SUPERSET_ENV` | superset-init | production | Production mode (enables rate limiting). |
| `SUPERSET_REDIS_URL` | superset-init | - | Redis for Celery broker/results, caches and rate limiting (DBs 0-8). |
| `SUPERSET_SECRET_KEY` | superset-init | (secret) | Same value as on superset. |
| `SUPERSET_ADMIN_EMAIL` | superset-init | - | Same value as on superset. |
| `SUPERSET_DATABASE_URL` | superset-init | - | Superset metadata database (Railway Postgres). |
| `SUPERSET_ADMIN_PASSWORD` | superset-init | (secret) | Same value as on superset. |
| `SUPERSET_ADMIN_USERNAME` | superset-init | (secret) | Same value as on superset. |
| `SUPERSET_ENV` | superset-worker | production | Production mode (enables rate limiting). |
| `SUPERSET_REDIS_URL` | superset-worker | - | Redis for Celery broker/results, caches and rate limiting (DBs 0-8). |
| `SUPERSET_PUBLIC_URL` | superset-worker | - | Same value as on superset. |
| `SUPERSET_SECRET_KEY` | superset-worker | (secret) | Same value as on superset. |
| `SUPERSET_DATABASE_URL` | superset-worker | - | Superset metadata database (Railway Postgres). |
| `SUPERSET_INSTALL_BROWSER` | superset-worker | true | Build ARG: install Playwright + Chromium in this service's image (report screenshots). |
| `SUPERSET_WEBDRIVER_BASEURL` | superset-worker | - | Where the worker's headless browser loads dashboards (private network). |
| `SUPERSET_CELERY_CONCURRENCY` | superset-worker | 4 | Celery processes per worker replica. |
| `SUPERSET_ENV` | superset-beat | production | Production mode (enables rate limiting). |
| `SUPERSET_REDIS_URL` | superset-beat | - | Redis for Celery broker/results, caches and rate limiting (DBs 0-8). |
| `SUPERSET_SECRET_KEY` | superset-beat | (secret) | Same value as on superset. |
| `SUPERSET_DATABASE_URL` | superset-beat | - | Superset metadata database (Railway Postgres). |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/local/bin/superset-railway web`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/usr/local/bin/superset-railway init`
- **Start command:** `/usr/local/bin/superset-railway worker`
- **Start command:** `/usr/local/bin/superset-railway beat`

**Category:** Analytics · **Tags:** superset, bi, dashboards, analytics, sql · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/apache-superset-6-bi-dashboards)
