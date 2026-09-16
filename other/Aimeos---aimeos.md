# Deploy Aimeos on Railway

Laravel e-commerce platform for online shops and marketplaces

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aimeos)

## About

Aimeos is an open-source e-commerce platform built on Laravel, running everything from single-brand shops to multi-vendor marketplaces with millions of products. It gives you a complete storefront — catalogue, faceted search, basket, checkout, coupons, subscriptions and orders — plus a Vue.js admin backend, a JSON:API for headless frontends and a GraphQL admin API. Teams choose it when a hosted store is too restrictive and they want the shop inside their own Laravel codebase, where any controller, template or pricing rule can be overridden.

Deploy Aimeos on Railway and the whole stack arrives wired together: an `aimeos` service running the shop on FrankenPHP, a `Postgres` database holding products, orders and customers, a `Redis` instance backing Laravel's cache and sessions, and a `mailpit` service catching every order, account and password-reset e-mail until you connect a real SMTP relay. The shop container also runs the Aimeos maintenance jobs on a schedule, which is what sends order e-mails, rebuilds the product index and generates sitemaps. Self-host Aimeos this way and the only thing left to choose is a payment provider.

![Aimeos shop with Postgres, Redis and Mailpit on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789482629/aimeos-architecture.webp)

Aimeos is an e-commerce framework that ships as a ready-made Laravel application. The catalogue, basket, checkout and order pipeline are composer packages you can extend or replace, and the same core runs inside TYPO3 and Symfony too. That suits a team that already writes PHP and wants the shop inside the application rather than beside it.

Key features:

- Categories, variants, bundles, vouchers, tier pricing, supplier data
- Faceted search on a dedicated product index, built for very large catalogues
- Basket rules, coupons, subscriptions, recurring payments
- 100+ payment gateways through Omnipay, plus delivery providers
- Multi-vendor, multi-channel and multi-warehouse modes behind single variables
- JSON:API storefront API and a GraphQL admin API for headless builds
- Admin backend in 30+ languages, with full RTL support

The Railway architecture is four services. `aimeos` serves HTTP through FrankenPHP and keeps uploaded media and CSV import/export files on its volume. `Postgres` stores the shop data. `Redis` holds the cache and sessions, which keeps a basket alive between requests. `mailpit` takes SMTP on the private network and gives you a web inbox.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:v1.31` | Web service |
| Redis | `redis:8.2` | Database |
| aimeos | [gridalpha/aimeos-railway](https://github.com/gridalpha/aimeos-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | mailpit | 8025 | Port Railway probes for the inbox UI |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before the oldest are dropped |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | aimeos | 8080 | Port Railway probes and Caddy serves |
| `APP_ENV` | aimeos | production | Laravel environment |
| `APP_URL` | aimeos | - | Public shop URL |
| `DB_HOST` | aimeos | - | Private database host |
| `DB_PORT` | aimeos | - | Database port |
| `APP_NAME` | aimeos | Aimeos | Shop name used in titles and mail |
| `APP_DEBUG` | aimeos | false | Never expose stack traces publicly |
| `LOG_LEVEL` | aimeos | info | Log verbosity |
| `MAIL_HOST` | aimeos | - | SMTP host, defaults to Mailpit |
| `MAIL_PORT` | aimeos | 1025 | SMTP port |
| `REDIS_URL` | aimeos | - | Private Redis connection string |
| `APP_SECRET` | aimeos | (secret) | Laravel APP_KEY is derived from this at boot |
| `APP_VERSION` | aimeos | 1 | Cache-busting version for shop assets |
| `DB_DATABASE` | aimeos | - | Database name |
| `DB_PASSWORD` | aimeos | (secret) | Database password |
| `DB_USERNAME` | aimeos | (secret) | Database user |
| `LOG_CHANNEL` | aimeos | stderr | Send application logs to the deploy log |
| `MAIL_MAILER` | aimeos | smtp | Outgoing mail transport |
| `CACHE_DRIVER` | aimeos | redis | Laravel cache store |
| `REDIS_CLIENT` | aimeos | phpredis | Redis extension used by Laravel |
| `DB_CONNECTION` | aimeos | pgsql | Database driver |
| `MAIL_FROM_NAME` | aimeos | Aimeos | Sender name for shop mail |
| `SESSION_DRIVER` | aimeos | redis | Shopper sessions and baskets |
| `SHOP_MULTISHOP` | aimeos | false | Multi-vendor marketplace mode |
| `MAIL_ENCRYPTION` | aimeos | null | Plain SMTP on the private network |
| `SHOP_MULTIROUTE` | aimeos | false | Top-level product and category URLs |
| `SHOP_PERMISSION` | aimeos | admin | Backend role given to new vendors |
| `AIMEOS_DEMO_DATA` | aimeos | 1 | Install the demo catalogue once |
| `BROADCAST_DRIVER` | aimeos | log | No broadcasting backend needed |
| `PHP_MEMORY_LIMIT` | aimeos | 512M | PHP memory limit |
| `QUEUE_CONNECTION` | aimeos | sync | Aimeos uses its own database queue |
| `SESSION_LIFETIME` | aimeos | 120 | Session lifetime in minutes |
| `SHOP_MULTILOCALE` | aimeos | false | Add the language to shop URLs |
| `MAIL_FROM_ADDRESS` | aimeos | - | Sender address for shop mail |
| `SHOP_REGISTRATION` | aimeos | false | Allow vendors to register themselves |
| `AIMEOS_ADMIN_EMAIL` | aimeos | admin@example.com | First administrator, change before deploying |
| `PHP_OPCACHE_ENABLE` | aimeos | 1 | Compile cache for PHP |
| `AIMEOS_JOBS_ENABLED` | aimeos | 1 | Run maintenance jobs in this container |
| `AIMEOS_JOBS_INTERVAL` | aimeos | 60 | Seconds between frequent job runs |
| `AIMEOS_ADMIN_PASSWORD` | aimeos | (secret) | Password for that administrator |
| `SESSION_SECURE_COOKIE` | aimeos | true | Cookies only over HTTPS |
| `PHP_MAX_EXECUTION_TIME` | aimeos | 120 | Seconds before a request is killed |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/ready`
- **Volume:** `/var/www/data`

**Category:** Other · **Languages:** Shell, Dockerfile, PHP

[View on Railway →](https://railway.com/deploy/aimeos)
