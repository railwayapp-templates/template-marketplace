# Deploy Saleor Backend with Storefront on Railway

Saleor backend services - API, Dashboard, Worker & Scheduler with Store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/saleor-backend-with-storefront)

## About

**What is Saleor Backend with Storefront?**
Saleor is an open-source, headless commerce platform (Django + GraphQL). This template deploys the core API plus Celery worker/scheduler, the Saleor Dashboard (admin), and the classic Saleor Storefront—wired to Postgres and Redis—so you get a full, production-style stack in minutes.

A typical Saleor deployment consists of multiple services: the API (Django/GraphQL), a Celery worker for background jobs, a Celery beat/scheduler, Redis for queues/cache, Postgres for data, the Dashboard for admin, and a Storefront for a ready-to-use web shop. You’ll configure environment variables, attach persistent storage for Postgres, and (for production) connect object storage for media and an SMTP service for email. Domains/HTTPS, SSO, and observability can be added later as you grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| saleor-api | `ghcr.io/saleor/saleor:3.21` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| saleor-dashboard | `ghcr.io/saleor/saleor-dashboard:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| saleor-worker | `ghcr.io/saleor/saleor:3.21` | Web service |
| saleor-scheduler | `ghcr.io/saleor/saleor:3.21` | Web service |
| storefront | [saleor/storefront](https://github.com/saleor/storefront) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PUBLIC_URL` | saleor-api | - | Specifies the base URL at which Saleor is hosted |
| `SECRET_KEY` | saleor-api | (secret) | Controls Django's secret key setting. |
| `ALLOWED_HOSTS` | saleor-api | - | This variable controls Django's allowed hosts setting. It defaults to localhost. |
| `AWS_ACCESS_KEY_ID` | saleor-api | - | Your AWS/R2 access key. |
| `CELERY_BROKER_URL` | saleor-api | - | Default task broker URL. You can read more about configuring this at Celery Documentation. |
| `ALLOWED_CLIENT_HOSTS` | saleor-api | - | A list of strings representing host/domain names of client applications (storefront or dashboard) that use this Saleor instance as a backend. |
| `AWS_MEDIA_BUCKET_NAME` | saleor-api | - | The S3/R2 bucket name to use for the media files. |
| `AWS_SECRET_ACCESS_KEY` | saleor-api | (secret) | Your AWS/R2 secret access key. |
| `AWS_MEDIA_CUSTOM_DOMAIN` | saleor-api | - | The custom domain to use for the media bucket. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `API_URL` | saleor-dashboard | - | URI of Saleor GraphQL API instance. If you are running Saleor locally with the default settings, set API_URL to: "http://localhost:8000/graphql/". Make sure you have "/" at the end of API_URL. |
| `APP_MOUNT_URI` | saleor-dashboard | / | URI at which the Dashboard app will be mounted. E.g., if you set APP_MOUNT_URI to "/dashboard/", your app will be mounted at "http://localhost:9000/dashboard/". |
| `EXTENSIONS_API_URL` | saleor-dashboard | - | URI of Marketplace API to fetch list of Extensions in JSON. |
| `APPS_MARKETPLACE_API_URL` | saleor-dashboard | - | URI of Marketplace API to fetch list of Apps in JSON. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PUBLIC_URL` | saleor-worker | - | Specifies the base URL at which Saleor is hosted |
| `SECRET_KEY` | saleor-worker | (secret) | Controls Django's secret key setting. |
| `ALLOWED_HOSTS` | saleor-worker | - | This variable controls Django's allowed hosts setting. It defaults to localhost. |
| `AWS_ACCESS_KEY_ID` | saleor-worker | - | Your AWS/R2 access key. |
| `CELERY_BROKER_URL` | saleor-worker | - | Default task broker URL. You can read more about configuring this at Celery Documentation. |
| `ALLOWED_CLIENT_HOSTS` | saleor-worker | - | A list of strings representing host/domain names of client applications (storefront or dashboard) that use this Saleor instance as a backend. |
| `AWS_MEDIA_BUCKET_NAME` | saleor-worker | - | The S3/R2 bucket name to use for the media files. |
| `AWS_SECRET_ACCESS_KEY` | saleor-worker | (secret) | Your AWS/R2 secret access key. |
| `AWS_MEDIA_CUSTOM_DOMAIN` | saleor-worker | - | The custom domain to use for the media bucket. |
| `PUBLIC_URL` | saleor-scheduler | - | Specifies the base URL at which Saleor is hosted |
| `SECRET_KEY` | saleor-scheduler | (secret) | Controls Django's secret key setting. |
| `ALLOWED_HOSTS` | saleor-scheduler | - | This variable controls Django's allowed hosts setting. It defaults to localhost. |
| `AWS_ACCESS_KEY_ID` | saleor-scheduler | - | Your AWS/R2 access key. |
| `CELERY_BROKER_URL` | saleor-scheduler | - | Default task broker URL. You can read more about configuring this at Celery Documentation. |
| `ALLOWED_CLIENT_HOSTS` | saleor-scheduler | - | A list of strings representing host/domain names of client applications (storefront or dashboard) that use this Saleor instance as a backend. |
| `AWS_MEDIA_BUCKET_NAME` | saleor-scheduler | - | The S3/R2 bucket name to use for the media files. |
| `AWS_SECRET_ACCESS_KEY` | saleor-scheduler | (secret) | Your AWS/R2 secret access key. |
| `AWS_MEDIA_CUSTOM_DOMAIN` | saleor-scheduler | - | The custom domain to use for the media bucket. |
| `SALEOR_APP_TOKEN` | storefront | (secret) | Token used for fetching channels |
| `NEXT_PUBLIC_SALEOR_API_URL` | storefront | - | Replace URL with your Saleor backend. Make sure to keep the slash at the end. |
| `NEXT_PUBLIC_STOREFRONT_URL` | storefront | - | Make sure to add it on production for correct canonical URLs |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `celery --app saleor.celeryconf:app worker -E --loglevel=info --concurrency=2 --max-tasks-per-child=100`
- **Start command:** `celery --app saleor.celeryconf:app beat --scheduler saleor.schedulers.schedulers.DatabaseScheduler`

**Category:** Other · **Languages:** TypeScript, Dockerfile, JavaScript, CSS, Shell

[View on Railway →](https://railway.com/deploy/saleor-backend-with-storefront)
