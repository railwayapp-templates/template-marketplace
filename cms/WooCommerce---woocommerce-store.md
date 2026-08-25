# Deploy WooCommerce on Railway

Online store software for selling products on your own website

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/woocommerce-store)

## About

WooCommerce is the open-source e-commerce platform built on WordPress, and it powers more online stores than anything else on the web — roughly a third of all stores whose platform can be identified. It turns a WordPress site into a full shop: catalogue, cart, checkout, orders, customer accounts, coupons, tax and shipping rules, and transactional email. Because it is a plugin rather than a hosted service, you own the database, the media and the customer records outright.

Deploy WooCommerce on Railway and you get a store already trading, not an installer. The template runs WordPress with WooCommerce activated, a managed MySQL database holding products and orders, a managed Redis object cache, and Mailpit capturing the order email the store sends. On first boot the container installs WordPress, creates a database-scoped MySQL account, seeds a sample catalogue with images, enables a shipping and a payment method, and starts a scheduler loop so background jobs fire without waiting for traffic.

![Diagram of the WooCommerce, MySQL, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787433602/woocommerce-architecture.png)

Hosting WooCommerce yourself means running WordPress with PHP, a MySQL database, persistent storage for media, and something that reliably runs scheduled work. Teams choose it to keep customer data in their own infrastructure, avoid per-transaction fees, or build on WordPress content they already publish.

Key features:

- Simple, variable, grouped, downloadable and virtual products, with stock management
- A block-based cart and checkout that works in any modern WordPress theme
- Orders, refunds, coupons, tax classes, shipping zones and guest checkout
- A REST API and a public Store API for headless frontends

The Railway architecture is four services. **WooCommerce** is the WordPress container serving HTTP, keeping `wp-content` — uploads, plugins, themes — on a persistent volume. **MySQL** stores products, orders, customers and settings. **Redis** backs the object cache, which matters more here than on a content site because WooCommerce is unusually heavy on option and meta queries. **Mailpit** gives the store somewhere to send mail, so order confirmations exist and are readable from day one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| woocommerce | [gridalpha/woocommerce-railway](https://github.com/gridalpha/woocommerce-railway) | Web service |
| Redis | `redis:8.2` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | woocommerce | 80 | Apache listening port |
| `MYSQL_URL` | woocommerce | - | Root URL, used once at boot to provision a scoped account |
| `WP_REDIS_HOST` | woocommerce | - | Object cache host |
| `WP_REDIS_PORT` | woocommerce | - | Object cache port |
| `WORDPRESS_DB_HOST` | woocommerce | - | Private database host and port |
| `WORDPRESS_DB_NAME` | woocommerce | wordpress | Database the store owns |
| `WORDPRESS_DB_USER` | woocommerce | (secret) | Scoped application user, not root |
| `WP_REDIS_PASSWORD` | woocommerce | (secret) | Object cache password |
| `WORDPRESS_AUTH_KEY` | woocommerce | (secret) | Login cookie signing salt |
| `WORDPRESS_AUTH_SALT` | woocommerce | - | Login cookie signing salt |
| `WORDPRESS_MAIL_FROM` | woocommerce | shop@example.dev | Sender address for all mail |
| `WORDPRESS_NONCE_KEY` | woocommerce | - | Form nonce signing salt |
| `WORDPRESS_SMTP_HOST` | woocommerce | - | Outbound mail host |
| `WORDPRESS_SMTP_PORT` | woocommerce | 1025 | Outbound mail port |
| `WOOCOMMERCE_CURRENCY` | woocommerce | USD | Store currency code |
| `WORDPRESS_ADMIN_USER` | woocommerce | (secret) | First administrator, read once at install |
| `WORDPRESS_NONCE_SALT` | woocommerce | - | Form nonce signing salt |
| `WORDPRESS_SITE_TITLE` | woocommerce | My Store | Store name in header and email |
| `WORDPRESS_ADMIN_EMAIL` | woocommerce | admin@example.dev | First administrator email address |
| `WORDPRESS_DB_PASSWORD` | woocommerce | (secret) | Password for the scoped user |
| `WORDPRESS_SMTP_SECURE` | woocommerce | none | Encryption: none, tls or ssl |
| `WOOCOMMERCE_STORE_CITY` | woocommerce | San Francisco | Store city |
| `WORDPRESS_TABLE_PREFIX` | woocommerce | wp_ | WordPress table prefix |
| `WORDPRESS_LOGGED_IN_KEY` | woocommerce | - | Login cookie signing salt |
| `WORDPRESS_ADMIN_PASSWORD` | woocommerce | (secret) | First administrator password, read once at install |
| `WORDPRESS_LOGGED_IN_SALT` | woocommerce | - | Login cookie signing salt |
| `WORDPRESS_MAIL_FROM_NAME` | woocommerce | My Store | Sender display name |
| `WOOCOMMERCE_STORE_ADDRESS` | woocommerce | 1 Market Street | Store street address |
| `WOOCOMMERCE_STORE_COUNTRY` | woocommerce | US:CA | Store country and state code |
| `WORDPRESS_SECURE_AUTH_KEY` | woocommerce | (secret) | Login cookie signing salt |
| `WOOCOMMERCE_STORE_POSTCODE` | woocommerce | 94105 | Store postal code |
| `WORDPRESS_SECURE_AUTH_SALT` | woocommerce | - | Login cookie signing salt |
| `WOOCOMMERCE_SEED_SAMPLE_PRODUCTS` | woocommerce | true | Seed six demo products on first boot |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | mailpit | 8025 | Web inbox listening port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web inbox bind address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Private SMTP listener bind address |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/woocommerce-store)
