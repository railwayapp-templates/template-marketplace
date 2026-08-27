# Deploy Saleor on Railway

Open-source commerce backend for building your own online store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/saleor-store)

## About

Saleor is an open-source, GraphQL-native commerce platform for teams whose storefront, mobile app and internal tools should share one API rather than one theme engine. Catalogue, channels, stock, checkout, orders, promotions and payment orchestration sit behind one typed GraphQL endpoint, and the admin dashboard is just another client of it. It suits anyone building a custom storefront in Next.js, Astro or Swift.

Deploy Saleor on Railway and you get the production shape, not a single container: a uvicorn API, a Celery worker for webhooks, exports and mail, a beat scheduler, the React dashboard, Postgres, Redis, object storage for media, and a capture-only inbox for reading what the store sends before you wire a real relay. Media uploads go straight to the bucket and are served through signed URLs, so nothing depends on local disk. Self-host Saleor this way and all that is left to build is the storefront.

![Diagram of the Saleor API, worker, beat, dashboard and datastores on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787696537/saleor-architecture.png)

Saleor is API-only by design: you model the catalogue and the commercial rules in Saleor, and your frontend talks GraphQL to it. Extensions are external apps that receive webhooks and call back in, so a misbehaving integration cannot take the core down with it.

- **Native multi-channel** — per-channel currency, pricing, stock, availability and tax
- **Flexible order model** — split payments, partial fulfilment, multi-warehouse stock, returns
- **Promotion engine** — catalogue and order discounts, vouchers, gift cards
- **Payment orchestration** — a transaction API any gateway implements
- **Typed, introspectable API** — subscription webhook payloads and a built-in playground

Self-hosting means four moving parts. The API answers GraphQL and serves thumbnails. The Celery worker does what must not block a request: webhooks, exports, invoices, mail, price recalculation. Beat fires recurring jobs — expiring checkouts, releasing reservations, refreshing search vectors. Postgres holds every record, Redis is both cache and broker, and the bucket holds media so the API and worker share it with no shared disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| saleor-api | [gridalpha/saleor-railway](https://github.com/gridalpha/saleor-railway) | Web service |
| Redis | `redis:8.2` | Database |
| saleor-dashboard | `ghcr.io/saleor/saleor-dashboard:3.23` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| saleor-beat | [gridalpha/saleor-railway](https://github.com/gridalpha/saleor-railway) | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| saleor-worker | [gridalpha/saleor-railway](https://github.com/gridalpha/saleor-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | saleor-api | 8000 | HTTP port uvicorn binds |
| `DEBUG` | saleor-api | False | Production mode |
| `CACHE_URL` | saleor-api | - | Cache on Redis database 0 |
| `EMAIL_URL` | saleor-api | - | Outbound SMTP endpoint |
| `PUBLIC_URL` | saleor-api | - | Base URL for generated links |
| `SECRET_KEY` | saleor-api | (secret) | Django signing key |
| `SALEOR_ROLE` | saleor-api | api | Selects the API process |
| `DATABASE_URL` | saleor-api | - | Postgres connection string |
| `ALLOWED_HOSTS` | saleor-api | * | Host header allow-list |
| `UVICORN_WORKERS` | saleor-api | 2 | HTTP worker processes |
| `AWS_ACCESS_KEY_ID` | saleor-api | - | Bucket access key |
| `CELERY_BROKER_URL` | saleor-api | - | Task broker on Redis database 1 |
| `AWS_S3_REGION_NAME` | saleor-api | - | Bucket region |
| `DEFAULT_FROM_EMAIL` | saleor-api | - | Sender address on store mail |
| `OTEL_LOGS_EXPORTER` | saleor-api | none | Disable log export by default |
| `SALEOR_ADMIN_EMAIL` | saleor-api | admin@example.com | First staff account email |
| `AWS_S3_ENDPOINT_URL` | saleor-api | - | S3-compatible endpoint |
| `ALLOWED_CLIENT_HOSTS` | saleor-api | - | Valid redirect target hosts |
| `AWS_QUERYSTRING_AUTH` | saleor-api | True | Sign every media URL |
| `OTEL_TRACES_EXPORTER` | saleor-api | none | Disable trace export by default |
| `AWS_MEDIA_BUCKET_NAME` | saleor-api | - | Bucket holding product media |
| `AWS_SECRET_ACCESS_KEY` | saleor-api | (secret) | Bucket secret key |
| `OTEL_METRICS_EXPORTER` | saleor-api | none | Disable metric export by default |
| `SALEOR_ADMIN_PASSWORD` | saleor-api | (secret) | First staff account password |
| `ALLOWED_GRAPHQL_ORIGINS` | saleor-api | - | Browser origins allowed to call the API |
| `AWS_MEDIA_PRIVATE_BUCKET_NAME` | saleor-api | - | Bucket holding generated exports |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | saleor-dashboard | 80 | nginx listening port |
| `API_URL` | saleor-dashboard | - | GraphQL endpoint the admin calls |
| `LOCALE_CODE` | saleor-dashboard | EN | Default admin interface language |
| `APP_MOUNT_URI` | saleor-dashboard | /dashboard/ | Path the admin is served from |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | saleor-dashboard | 1 | Size nginx workers to the container |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | saleor-beat | 8080 | Health endpoint port |
| `DEBUG` | saleor-beat | False | Production mode |
| `CACHE_URL` | saleor-beat | - | Cache on Redis database 0 |
| `EMAIL_URL` | saleor-beat | - | Outbound SMTP endpoint |
| `PUBLIC_URL` | saleor-beat | - | Base URL for generated links |
| `SECRET_KEY` | saleor-beat | (secret) | Must match the API |
| `SALEOR_ROLE` | saleor-beat | beat | Selects the Celery beat scheduler |
| `DATABASE_URL` | saleor-beat | - | Postgres connection string |
| `ALLOWED_HOSTS` | saleor-beat | * | Host header allow-list |
| `AWS_ACCESS_KEY_ID` | saleor-beat | - | Bucket access key |
| `CELERY_BROKER_URL` | saleor-beat | - | Task broker on Redis database 1 |
| `AWS_S3_REGION_NAME` | saleor-beat | - | Bucket region |
| `DEFAULT_FROM_EMAIL` | saleor-beat | - | Sender address on store mail |
| `OTEL_LOGS_EXPORTER` | saleor-beat | none | Disable log export by default |
| `AWS_S3_ENDPOINT_URL` | saleor-beat | - | S3-compatible endpoint |
| `ALLOWED_CLIENT_HOSTS` | saleor-beat | - | Valid redirect target hosts |
| `AWS_QUERYSTRING_AUTH` | saleor-beat | True | Sign every media URL |
| `OTEL_TRACES_EXPORTER` | saleor-beat | none | Disable trace export by default |
| `AWS_MEDIA_BUCKET_NAME` | saleor-beat | - | Bucket holding product media |
| `AWS_SECRET_ACCESS_KEY` | saleor-beat | (secret) | Bucket secret key |
| `OTEL_METRICS_EXPORTER` | saleor-beat | none | Disable metric export by default |
| `ALLOWED_GRAPHQL_ORIGINS` | saleor-beat | - | Browser origins allowed to call the API |
| `AWS_MEDIA_PRIVATE_BUCKET_NAME` | saleor-beat | - | Bucket holding generated exports |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web listener, dual-stack |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener, dual-stack |
| `PORT` | saleor-worker | 8080 | Health endpoint port |
| `DEBUG` | saleor-worker | False | Production mode |
| `CACHE_URL` | saleor-worker | - | Cache on Redis database 0 |
| `EMAIL_URL` | saleor-worker | - | Outbound SMTP endpoint |
| `PUBLIC_URL` | saleor-worker | - | Base URL for generated links |
| `SECRET_KEY` | saleor-worker | (secret) | Must match the API |
| `SALEOR_ROLE` | saleor-worker | worker | Selects the Celery worker process |
| `DATABASE_URL` | saleor-worker | - | Postgres connection string |
| `ALLOWED_HOSTS` | saleor-worker | * | Host header allow-list |
| `AWS_ACCESS_KEY_ID` | saleor-worker | - | Bucket access key |
| `CELERY_BROKER_URL` | saleor-worker | - | Task broker on Redis database 1 |
| `AWS_S3_REGION_NAME` | saleor-worker | - | Bucket region |
| `CELERY_CONCURRENCY` | saleor-worker | 4 | Prefork pool size |
| `DEFAULT_FROM_EMAIL` | saleor-worker | - | Sender address on store mail |
| `OTEL_LOGS_EXPORTER` | saleor-worker | none | Disable log export by default |
| `AWS_S3_ENDPOINT_URL` | saleor-worker | - | S3-compatible endpoint |
| `ALLOWED_CLIENT_HOSTS` | saleor-worker | - | Valid redirect target hosts |
| `AWS_QUERYSTRING_AUTH` | saleor-worker | True | Sign every media URL |
| `OTEL_TRACES_EXPORTER` | saleor-worker | none | Disable trace export by default |
| `AWS_MEDIA_BUCKET_NAME` | saleor-worker | - | Bucket holding product media |
| `AWS_SECRET_ACCESS_KEY` | saleor-worker | (secret) | Bucket secret key |
| `OTEL_METRICS_EXPORTER` | saleor-worker | none | Disable metric export by default |
| `ALLOWED_GRAPHQL_ORIGINS` | saleor-worker | - | Browser origins allowed to call the API |
| `AWS_MEDIA_PRIVATE_BUCKET_NAME` | saleor-worker | - | Bucket holding generated exports |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/beat`
- **Healthcheck:** `/livez`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/saleor-store)
