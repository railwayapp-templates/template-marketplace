# Deploy Saleor | Most Advanced Open Ecommerce Platform on Railway

Self Host Saleor. Headless commerce with dashboard, GraphQL, API & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/saleor)

## About

Saleor is an open-source headless e-commerce platform built on Python, Django, and GraphQL. It handles products, orders, payments, and multi-channel selling through a composable API-first architecture.

Deploy Saleor on Railway to self-host a production-ready commerce backend. This template pre-configures Saleor-API (GraphQL backend with migrations and admin bootstrap), Saleor-Worker (Celery background tasks), Saleor-Scheduler (Celery Beat periodic jobs), Saleor-Dashboard (admin UI), PostgreSQL, and Redis.

![Saleor Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777814185/2d007dfd-054b-408d-bc41-bd4e1268ae90.png)

Saleor is a headless commerce engine -- the API and admin dashboard are decoupled from the storefront. With 21k+ GitHub stars and SOC 2 / GDPR / PCI-DSS compliance, it powers stores at international scale.

- **GraphQL-native API** -- every feature through a single endpoint
- **Multi-channel selling** -- web, mobile, retail, and marketplace from one backend
- **Extensible apps system** -- webhooks, callbacks, and dashboard iframes
- **Multi-currency and multi-language** -- built-in internationalization
- **Granular permissions** -- RBAC with per-channel access control
- **Payment integrations** -- Stripe, Adyen, Mollie, and custom gateways

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Saleor-API | `ghcr.io/saleor/saleor:3.23` | Web service |
| Saleor-Scheduler | `ghcr.io/saleor/saleor:3.23` | Worker |
| Saleor-Dashboard | `ghcr.io/saleor/saleor-dashboard:3.23` | Web service |
| Saleor-Worker | `ghcr.io/saleor/saleor:3.23` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Saleor-API | 8000 | HTTP server listening port |
| `DEBUG` | Saleor-API | False | Django production mode |
| `CACHE_URL` | Saleor-API | - | Django cache backend URL |
| `PUBLIC_URL` | Saleor-API | - | Public-facing API URL |
| `SECRET_KEY` | Saleor-API | (secret) | Django secret signing key |
| `DATABASE_URL` | Saleor-API | - | Postgres connection string |
| `ALLOWED_HOSTS` | Saleor-API | - | Permitted HTTP host headers |
| `DASHBOARD_URL` | Saleor-API | - | Dashboard URL for emails |
| `DEFAULT_COUNTRY` | Saleor-API | US | Store default country code |
| `RSA_PRIVATE_KEY` | Saleor-API | - | JWT signing key — generate manually from any website like - https://cryptotools.net/rsagen (make sure the length is 2048) |
| `DEFAULT_CURRENCY` | Saleor-API | USD | Store default currency code |
| `CELERY_BROKER_URL` | Saleor-API | - | Celery task broker URL |
| `DEFAULT_FROM_EMAIL` | Saleor-API | noreply@yourdomain.com | Email sender address |
| `PLAYGROUND_ENABLED` | Saleor-API | False | Disable GraphQL playground |
| `ALLOWED_CLIENT_HOSTS` | Saleor-API | - | Allowed dashboard origin hosts |
| `DEFAULT_CHANNEL_SLUG` | Saleor-API | default-channel | Default sales channel slug |
| `DJANGO_SUPERUSER_EMAIL` | Saleor-API | - | Admin email for bootstrap |
| `HTTP_IP_FILTER_ENABLED` | Saleor-API | True | Enable IP address filtering |
| `ALLOWED_GRAPHQL_ORIGINS` | Saleor-API | * | CORS origins for GraphQL |
| `CREATE_IMAGES_ON_DEMAND` | Saleor-API | True | Generate thumbnails on request |
| `DJANGO_SUPERUSER_PASSWORD` | Saleor-API | (secret) | Admin password for bootstrap |
| `HTTP_IP_FILTER_ALLOW_LOOPBACK_IPS` | Saleor-API | False | Block loopback IP addresses |
| `ENABLE_ACCOUNT_CONFIRMATION_BY_EMAIL` | Saleor-API | False | Disable email confirmation flow |
| `DEBUG` | Saleor-Scheduler | False | Django production mode |
| `CACHE_URL` | Saleor-Scheduler | - | Django cache backend URL |
| `SECRET_KEY` | Saleor-Scheduler | (secret) | Shared Django secret key |
| `DATABASE_URL` | Saleor-Scheduler | - | Postgres connection string |
| `ALLOWED_HOSTS` | Saleor-Scheduler | - | Required when DEBUG is False |
| `DEFAULT_COUNTRY` | Saleor-Scheduler | US | Store default country code |
| `RSA_PRIVATE_KEY` | Saleor-Scheduler | - | Shared JWT signing key |
| `DEFAULT_CURRENCY` | Saleor-Scheduler | USD | Store default currency code |
| `CELERY_BROKER_URL` | Saleor-Scheduler | - | Celery task broker URL |
| `DEFAULT_FROM_EMAIL` | Saleor-Scheduler | - | Shared email sender address |
| `ALLOWED_CLIENT_HOSTS` | Saleor-Scheduler | - | Required when DEBUG is False |
| `DEFAULT_CHANNEL_SLUG` | Saleor-Scheduler | default-channel | Default sales channel slug |
| `PORT` | Saleor-Dashboard | 80 | HTTP server listening port |
| `API_URL` | Saleor-Dashboard | - | GraphQL API endpoint URL |
| `DEBUG` | Saleor-Worker | False | Django production mode |
| `CACHE_URL` | Saleor-Worker | - | Django cache backend URL |
| `SECRET_KEY` | Saleor-Worker | (secret) | Shared Django secret key |
| `DATABASE_URL` | Saleor-Worker | - | Postgres connection string |
| `ALLOWED_HOSTS` | Saleor-Worker | - | Required when DEBUG is False |
| `DEFAULT_COUNTRY` | Saleor-Worker | US | Store default country code |
| `RSA_PRIVATE_KEY` | Saleor-Worker | - | Shared JWT signing key |
| `DEFAULT_CURRENCY` | Saleor-Worker | USD | Store default currency code |
| `CELERY_BROKER_URL` | Saleor-Worker | - | Celery task broker URL |
| `DEFAULT_FROM_EMAIL` | Saleor-Worker | - | Shared email sender address |
| `ALLOWED_CLIENT_HOSTS` | Saleor-Worker | - | Required when DEBUG is False |
| `DEFAULT_CHANNEL_SLUG` | Saleor-Worker | default-channel | Default sales channel slug |
| `CREATE_IMAGES_ON_DEMAND` | Saleor-Worker | True | Generate thumbnails on request |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |

## Configuration

- **Start command:** `/bin/sh -c 'python3 manage.py migrate --noinput && python3 manage.py createsuperuser --noinput 2>/dev/null || true && uvicorn saleor.asgi:application --host 0.0.0.0 --port 8000 --workers 2 --lifespan on --ws none --no-server-header --no-access-log --timeout-keep-alive 35'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/media`
- **Start command:** `celery --app saleor.celeryconf:app beat --scheduler saleor.schedulers.schedulers.DatabaseScheduler`
- **Start command:** `celery --app saleor.celeryconf:app worker -E --loglevel=info`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/saleor)
