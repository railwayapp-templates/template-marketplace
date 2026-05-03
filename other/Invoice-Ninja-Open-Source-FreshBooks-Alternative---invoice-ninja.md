# Deploy Invoice Ninja | Open Source FreshBooks Alternative on Railway

Self Host Invoice Ninja. Create invoices, accept payments, track expenses

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invoice-ninja)

## About

Invoice Ninja is the leading open-source platform for invoicing, quoting, expense tracking, time billing, and accepting online payments — built for freelancers and small businesses who don't want to hand a percentage of every invoice to a SaaS vendor. Self-host Invoice Ninja on Railway and you keep full control of client data, branded PDFs, and the 50+ supported payment gateways without paying a per-user subscription.

This Railway template deploys the official `invoiceninja/invoiceninja-debian:5` image extended with bundled nginx (single-container) so php-fpm, the queue worker, the scheduler, and the web server all run on a single Railway service. It pairs the app with Railway-managed **MySQL** for transactional data and Railway-managed **Redis** for cache, queues, and sessions, and ships a Laravel-aware nginx config that talks correctly to Railway's TLS-terminating edge proxy.

Invoice Ninja v5 is a full-stack billing platform built on Laravel + a React front-end. It replaces the bookkeeping side of FreshBooks, Wave, Bill.com, or Zoho Invoice for businesses that prefer to own their data and avoid per-user pricing.

- Unlimited clients, invoices, quotes, expenses, projects, and tasks
- 50+ payment gateways (Stripe, PayPal, GoCardless, Square, Authorize.net, Mollie, …)
- Automatic recurring invoices and subscription billing
- Branded client portal with online checkout
- Time tracking and project billing built in
- PDF invoice generation via bundled headless Chrome (snappdf)
- REST + GraphQL APIs and webhook delivery for every business event
- Multi-currency, multi-language, EU/UK e-invoicing (PEPPOL, ZUGFeRD, FacturaE)

The container runs a Laravel application with three background loops (queue worker × 2, scheduler) on supervisord, fronted by an nginx that proxies to local php-fpm and serves static assets from `/var/www/html/public`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2.1` | Database |
| invoice-ninja | [praveen-ks-2001/invoice-ninja-railway](https://github.com/praveen-ks-2001/invoice-ninja-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `PORT` | invoice-ninja | 8080 | Container HTTP listen port |
| `APP_ENV` | invoice-ninja | production | Laravel environment |
| `APP_KEY` | invoice-ninja | base64:CHANGE_ME_TO_OPENSSL_RAND_BASE64_32 | Laravel encryption key (static, never ${{secret()}}) |
| `APP_URL` | invoice-ninja | - | Public-facing app URL |
| `DB_HOST` | invoice-ninja | - | MySQL private hostname |
| `DB_PORT` | invoice-ninja | - | MySQL port (3306) |
| `APP_DEBUG` | invoice-ninja | false | Production: never expose stack traces |
| `IS_DOCKER` | invoice-ninja | true | Tells Invoice Ninja it runs in Docker |
| `REDIS_HOST` | invoice-ninja | - | Redis private hostname |
| `REDIS_PORT` | invoice-ninja | - | Redis port (6379) |
| `DB_DATABASE` | invoice-ninja | - | MySQL database name |
| `DB_PASSWORD` | invoice-ninja | (secret) | MySQL password |
| `DB_USERNAME` | invoice-ninja | (secret) | MySQL user (root) |
| `IN_PASSWORD` | invoice-ninja | (secret) | First-boot admin password (static) |
| `MAIL_MAILER` | invoice-ninja | log | Email transport (set to smtp in prod) |
| `CACHE_DRIVER` | invoice-ninja | redis | Cache backend |
| `SCOUT_DRIVER` | invoice-ninja | null | Disable search index by default |
| `DB_CONNECTION` | invoice-ninja | mysql | Database driver |
| `IN_USER_EMAIL` | invoice-ninja | - | First-boot admin email |
| `PDF_GENERATOR` | invoice-ninja | snappdf | Bundled Chrome PDF renderer |
| `REQUIRE_HTTPS` | invoice-ninja | true | Force HTTPS via Railway edge |
| `MAIL_FROM_NAME` | invoice-ninja | Invoice Ninja | Default sender display name |
| `REDIS_PASSWORD` | invoice-ninja | (secret) | Redis auth password |
| `SESSION_DRIVER` | invoice-ninja | redis | Session backend |
| `TRUSTED_PROXIES` | invoice-ninja | * | Trust Railway's CGNAT proxy |
| `QUEUE_CONNECTION` | invoice-ninja | redis | Queue backend |
| `MAIL_FROM_ADDRESS` | invoice-ninja | noreply@invoiceninja.local | Default sender address |
| `NORDIGEN_SECRET_ID` | invoice-ninja | (secret) | Optional: GoCardless/Nordigen banking |
| `NORDIGEN_SECRET_KEY` | invoice-ninja | (secret) | Optional: GoCardless/Nordigen banking |
| `PHANTOMJS_PDF_GENERATION` | invoice-ninja | false | Disable legacy PDF backend |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/invoice-ninja)
