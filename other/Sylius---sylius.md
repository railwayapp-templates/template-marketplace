# Deploy Sylius on Railway

Open-source eCommerce platform for building custom online stores

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sylius)

## About

Sylius is an open-source eCommerce platform built on Symfony and API Platform. It gives developers a real commerce domain model — channels, catalogues, promotions, taxes, shipping, payments and orders — as an application you own outright rather than a product you rent. Agencies and in-house teams pick it when a store needs behaviour a SaaS checkout will not bend to: multi-channel pricing, B2B rules, custom fulfilment, or a headless front end on the bundled REST API. Deploy Sylius on Railway and you get the storefront, the admin panel and the API on one domain, with persistence and background processing already wired up.

This template runs Sylius the way its own documentation describes for production. The `sylius` service serves the storefront and admin through nginx and PHP-FPM. A separate `worker` service consumes the Symfony Messenger queues, so catalogue promotions and other deferred work never block a shopper's request. A `scheduler` service runs Sylius' recurring maintenance commands. `MySQL` stores the catalogue and orders, `Redis` holds the application cache and shopper sessions, and `mailpit` captures every outgoing email so you can read order confirmations before wiring a real SMTP relay.

![Sylius web, worker and scheduler over MySQL, Redis and Mailpit](https://res.cloudinary.com/rroe4rtk/image/upload/v1788452735/sylius-architecture.png)

Sylius is a framework as much as a product. The order state machine, the pricing engine and the admin grids are all Symfony services you can decorate or replace, which is why teams choose it over a plugin-driven platform when requirements are unusual. Self-hosting is the point: your catalogue, customer data and payment configuration stay in a database you control, with no per-order fee between you and your revenue.

Key capabilities:

- Multi-channel, multi-currency selling with per-channel catalogues and pricing
- A promotions engine covering catalogue promotions and coupon rules
- A REST API with JWT auth, for headless storefronts and mobile apps
- Taxation, shipping and payment methods configured per channel and zone
- An admin panel built on Symfony UX, Live Components and Twig
- First-party Stripe, PayPal, Adyen and Mollie payment plugins

The Railway architecture splits Sylius into the roles its production guide recommends. The web role handles HTTP. The worker runs `messenger:consume` on the `main` and `catalog_promotion_removal` transports, which recalculates prices when a catalogue promotion changes. The scheduler cancels unpaid orders and clears abandoned carts hourly, work that would normally be a cron entry. All three run the same image over MySQL and Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | [gridalpha/sylius-railway](https://github.com/gridalpha/sylius-railway) | Worker |
| scheduler | [gridalpha/sylius-railway](https://github.com/gridalpha/sylius-railway) | Worker |
| Redis | `redis:8.2` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| MySQL | `mysql:9.4` | Database |
| sylius | [gridalpha/sylius-railway](https://github.com/gridalpha/sylius-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | worker | prod | Symfony environment |
| `APP_DEBUG` | worker | 0 | Disable the Symfony debug toolbar |
| `REDIS_URL` | worker | - | Cache pool shared with the web service |
| `APP_SECRET` | worker | (secret) | Must match the web service |
| `MAILER_DSN` | worker | - | Outgoing mail endpoint |
| `DEFAULT_URI` | worker | - | Base URL for links in emails |
| `SYLIUS_ROLE` | worker | worker | Runs the Symfony Messenger consumer |
| `DATABASE_URL` | worker | - | MySQL connection string |
| `JWT_PASSPHRASE` | worker | - | Must match the web service |
| `TRUSTED_PROXIES` | worker | 100.64.0.0/10,fd00::/8,152.233.0.0/17 | Railway edge ranges Symfony trusts |
| `PHP_DATE_TIMEZONE` | worker | UTC | PHP default timezone |
| `APP_ENV` | scheduler | prod | Symfony environment |
| `APP_DEBUG` | scheduler | 0 | Disable the Symfony debug toolbar |
| `REDIS_URL` | scheduler | - | Cache pool shared with the web service |
| `APP_SECRET` | scheduler | (secret) | Must match the web service |
| `MAILER_DSN` | scheduler | - | Outgoing mail endpoint |
| `DEFAULT_URI` | scheduler | - | Base URL for links in emails |
| `SYLIUS_ROLE` | scheduler | scheduler | Runs recurring maintenance commands |
| `DATABASE_URL` | scheduler | - | MySQL connection string |
| `JWT_PASSPHRASE` | scheduler | - | Must match the web service |
| `TRUSTED_PROXIES` | scheduler | 100.64.0.0/10,fd00::/8,152.233.0.0/17 | Railway edge ranges Symfony trusts |
| `PHP_DATE_TIMEZONE` | scheduler | UTC | PHP default timezone |
| `SYLIUS_SCHEDULER_INTERVAL` | scheduler | 3600 | Seconds between maintenance passes |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |
| `PORT` | sylius | 8080 | HTTP port nginx listens on |
| `APP_ENV` | sylius | prod | Symfony environment |
| `APP_DEBUG` | sylius | 0 | Disable the Symfony debug toolbar |
| `REDIS_URL` | sylius | - | Cache pool and session store |
| `APP_SECRET` | sylius | (secret) | Symfony signing secret, keep stable |
| `MAILER_DSN` | sylius | - | Outgoing mail endpoint |
| `DEFAULT_URI` | sylius | - | Base URL for links in emails |
| `SYLIUS_ROLE` | sylius | web | Runs nginx, PHP-FPM and first-boot setup |
| `DATABASE_URL` | sylius | - | MySQL connection string |
| `JWT_PASSPHRASE` | sylius | - | Protects the generated API keypair |
| `TRUSTED_PROXIES` | sylius | 100.64.0.0/10,fd00::/8,152.233.0.0/17 | Railway edge ranges Symfony trusts |
| `PHP_DATE_TIMEZONE` | sylius | UTC | PHP default timezone |
| `SYLIUS_ADMIN_EMAIL` | sylius | admin@example.com | First administrator's email |
| `SYLIUS_SAMPLE_DATA` | sylius | true | Load the demo catalogue on first boot |
| `SYLIUS_ADMIN_PASSWORD` | sylius | (secret) | First administrator's password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/sylius)
