# Deploy OpenCart on Railway

Open-source shopping cart for running an online store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencart-shop)

## About

OpenCart is an open-source shopping cart written in PHP that has powered independent online stores since 2009. It gives you a storefront, a catalogue with options and downloadable goods, customer accounts, a multi-currency checkout, and an admin panel for orders and reports. It is deliberately lightweight — one PHP application over MySQL, no build step and no framework to learn — which is why small merchants and agencies pick it over Magento. Self-host OpenCart and your catalogue, customers and order history stay in a database you control.

This template runs OpenCart 4.1.0.4 across five Railway services. `opencart` is the PHP and Apache container serving the storefront and `/admin`, with a volume holding product images, downloads, customer uploads and backups. `MySQL` holds every catalogue, order, customer and session row, and `Redis` is wired up as the cache engine. `opencart-cron` is a second container from the same image running OpenCart's scheduled tasks on an interval instead of a crontab. `mailpit` is a capture-only mailbox on the private network, so order and account mail is visible immediately; swap it for a real relay when you go live. The store installs itself on first boot from the variables you fill in before deploying.

![Diagram of the OpenCart, cron, MySQL, Redis and Mailpit services](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789234980/opencart-architecture.webp)

OpenCart is a classic LAMP application: PHP renders every page, MySQL stores everything, and there is no Node build, no queue broker and no search cluster to operate. That makes it one of the cheapest serious carts to run, and popular with agencies managing many small stores.

Key features:

- Unlimited products, categories, manufacturers and downloadable goods
- Multi-store: several storefronts, each with its own domain and theme
- Multi-currency, multi-language, and tax rules by geo zone
- Customer groups, discounts, coupons, reward points and affiliate tracking

`opencart` is the only service on the public internet and holds the volume; OpenCart's storage directory sits outside the web root on it, so uploads and logs are never directly reachable. `MySQL` carries sessions as well as data, so a redeploy never signs anyone out. `opencart-cron` has no volume and waits for the schema before its first run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| MySQL | `mysql:9.4` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| opencart | [gridalpha/opencart-railway](https://github.com/gridalpha/opencart-railway) | Web service |
| opencart-cron | [gridalpha/opencart-railway](https://github.com/gridalpha/opencart-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |
| `PORT` | mailpit | 8025 | Web inbox listening port |
| `MP_UI_AUTH` | mailpit | - | Web inbox credentials |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | SMTP credentials accepted |
| `SMTP_PASSWORD` | mailpit | (secret) | SMTP password shared with OpenCart |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow AUTH LOGIN on the plain listener |
| `PORT` | opencart | 8080 | Apache listening port |
| `REDIS_URL` | opencart | - | Cache engine connection |
| `MYSQL_ADMIN_URL` | opencart | - | Administrative MySQL connection |
| `OPENCART_DB_NAME` | opencart | opencart | Database the store is created in |
| `OPENCART_DB_USER` | opencart | (secret) | Least-privilege role the store uses |
| `OPENCART_DATA_DIR` | opencart | /data | Volume mount path |
| `OPENCART_LANGUAGE` | opencart | en-gb | Install language |
| `OPENCART_DB_PREFIX` | opencart | oc_ | Table prefix |
| `OPENCART_SMTP_HOST` | opencart | - | Mail relay host |
| `OPENCART_SMTP_PORT` | opencart | 1025 | Mail relay port |
| `OPENCART_STORE_NAME` | opencart | OpenCart Store | Store name seeded at install |
| `OPENCART_ADMIN_EMAIL` | opencart | admin@example.com | Administrator and store contact address |
| `OPENCART_DB_PASSWORD` | opencart | (secret) | Password for that role |
| `OPENCART_SMTP_PASSWORD` | opencart | (secret) | SMTP password, defined on mailpit |
| `OPENCART_SMTP_USERNAME` | opencart | (secret) | SMTP user, required by OpenCart |
| `OPENCART_ADMIN_PASSWORD` | opencart | (secret) | First administrator password, 5-20 characters |
| `OPENCART_ADMIN_USERNAME` | opencart | (secret) | First administrator, 3-20 characters |
| `OPENCART_ADMIN_DIRECTORY` | opencart | admin | URL segment of the admin panel |
| `OPENCART_SMTP_HOST_DEFAULT` | opencart | mailpit.railway.internal | Fallback on the first deploy |
| `REDIS_URL` | opencart-cron | - | Cache engine connection |
| `OPENCART_ROLE` | opencart-cron | cron | Runs scheduled tasks, never installs |
| `MYSQL_ADMIN_URL` | opencart-cron | - | Administrative MySQL connection |
| `OPENCART_DB_NAME` | opencart-cron | - | Same database as the store |
| `OPENCART_DB_USER` | opencart-cron | (secret) | Same role as the store |
| `OPENCART_DATA_DIR` | opencart-cron | /srv/opencart-data | Scratch directory, no volume |
| `OPENCART_DB_PREFIX` | opencart-cron | - | Same table prefix |
| `OPENCART_PUBLIC_URL` | opencart-cron | - | Store base URL |
| `OPENCART_DB_PASSWORD` | opencart-cron | (secret) | Same password as the store |
| `OPENCART_CRON_INTERVAL` | opencart-cron | 3600 | Seconds between cron cycles |
| `OPENCART_ADMIN_DIRECTORY` | opencart-cron | - | Same admin segment |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencart-shop)
