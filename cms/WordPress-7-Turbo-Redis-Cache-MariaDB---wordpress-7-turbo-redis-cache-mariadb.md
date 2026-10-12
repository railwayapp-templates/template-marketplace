# Deploy WordPress 7 Turbo (Redis Cache + MariaDB) on Railway

Fast, persistent WordPress with object caching, tuned PHP and real cron.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-7-turbo-redis-cache-mariadb)

## About

Run a production-ready WordPress site on Railway with MariaDB, a Redis object cache, tuned PHP and a real cron schedule. The site installs itself on first boot with a generated admin password, keeps plugins, themes and uploads on a persistent volume, and avoids the Apache "More than one MPM loaded" crash. Community template.

WordPress is a PHP application that needs a MySQL-compatible database, a web server and somewhere durable to keep uploads, plugins and themes. A default container install works, but it leaves performance and reliability on the table: every page load rebuilds options from the database, scheduled tasks only run when someone visits, and PHP limits are too small for real media libraries. This template packages the official WordPress image with Apache prefork, PHP 8.3 and OPcache tuning, the native `phpredis` extension and the Redis Object Cache plugin, a MariaDB LTS database on Railway's private network, and a Railway cron service that triggers `wp-cron.php` every five minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:12.3.3` | Database |
| Redis | `redis:8.2` | Database |
| WordPress | [baranberkay96/wordpress-turbo-railway](https://github.com/baranberkay96/wordpress-turbo-railway) (branch: main) (root: /services/wordpress) | Web service |
| WP Cron | `curlimages/curl:8.22.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MariaDB | - | Private host (also used by Railway's Data panel). |
| `MYSQLPORT` | MariaDB | 3306 | MariaDB port. |
| `MYSQLUSER` | MariaDB | - | User for Railway's Data panel. |
| `MYSQL_URL` | MariaDB | - | Private connection URL (MySQL protocol). |
| `MARIADB_USER` | MariaDB | (secret) | Application user created on first start. |
| `MYSQLDATABASE` | MariaDB | - | Database for Railway's Data panel. |
| `MYSQLPASSWORD` | MariaDB | (secret) | Password for Railway's Data panel. |
| `MARIADB_DATABASE` | MariaDB | wordpress | Database created on first start. |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Application user password (generated). |
| `MARIADB_AUTO_UPGRADE` | MariaDB | 1 | Run mariadb-upgrade automatically after the image version changes. |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Root password (generated). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | WordPress | 80 | Port Apache listens on; the public domain targets it. |
| `WP_LOCALE` | WordPress | en_US | Language installed and activated on first install (e.g. de_DE, tr_TR). |
| `WP_ADMIN_USER` | WordPress | (secret) | Username of the first administrator, created on first boot. |
| `WP_PUBLIC_URL` | WordPress | - | Canonical site URL (WP_HOME/WP_SITEURL). Change to https://your-domain when you add a custom domain. |
| `WP_REDIS_HOST` | WordPress | - | Redis host for the object cache (private network). |
| `WP_REDIS_PORT` | WordPress | - | Redis port. |
| `WP_SITE_TITLE` | WordPress | My WordPress Site | Site title used for the initial install. |
| `WP_ADMIN_EMAIL` | WordPress | - | Email for the first administrator account (used for password resets and admin notices). |
| `WP_MEMORY_LIMIT` | WordPress | 256M | WordPress front-end memory limit. |
| `WP_REDIS_MAXTTL` | WordPress | 604800 | Maximum lifetime in seconds for cached objects (7 days) so Redis memory stays bounded. |
| `WP_REDIS_PREFIX` | WordPress | wp: | Key prefix for object cache entries (lets several sites share one Redis). |
| `PHP_MEMORY_LIMIT` | WordPress | 256M | PHP memory_limit per request. |
| `PHP_POST_MAX_SIZE` | WordPress | 64M | Maximum POST body size (keep >= upload size). |
| `WORDPRESS_DB_HOST` | WordPress | - | MariaDB host:port on the private network. |
| `WORDPRESS_DB_NAME` | WordPress | - | WordPress database name. |
| `WORDPRESS_DB_USER` | WordPress | (secret) | WordPress database user. |
| `WP_ADMIN_PASSWORD` | WordPress | (secret) | Password of the first administrator (generated). Only used for the initial install; change it in WordPress afterwards. |
| `WP_REDIS_PASSWORD` | WordPress | (secret) | Redis password. |
| `PHP_OPCACHE_MEMORY` | WordPress | 192 | OPcache shared memory in MB. |
| `WORDPRESS_AUTH_KEY` | WordPress | (secret) | WordPress AUTH_KEY (random, generated once). |
| `WORDPRESS_AUTH_SALT` | WordPress | - | WordPress AUTH_SALT (random, generated once). |
| `WORDPRESS_NONCE_KEY` | WordPress | - | WordPress NONCE_KEY (random, generated once). |
| `WP_MAX_MEMORY_LIMIT` | WordPress | 512M | WordPress admin memory limit (image processing, imports). |
| `WP_REDIS_AUTOENABLE` | WordPress | true | Install/activate Redis Object Cache and enable its drop-in on every boot. Set false to manage caching yourself. |
| `WORDPRESS_NONCE_SALT` | WordPress | - | WordPress NONCE_SALT (random, generated once). |
| `WP_LOCK_CORE_UPDATES` | WordPress | true | Hide the one-click core update: core comes from the image and would revert on redeploy. |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) | WordPress database password. |
| `WP_DISALLOW_FILE_EDIT` | WordPress | true | Hide the in-dashboard theme/plugin code editor (security hardening). |
| `PHP_MAX_EXECUTION_TIME` | WordPress | 120 | PHP max_execution_time / max_input_time in seconds. |
| `WORDPRESS_CONFIG_EXTRA` | WordPress | - | Optional raw PHP appended to wp-config.php (evaluated before the template defaults, so it can override them). |
| `WORDPRESS_TABLE_PREFIX` | WordPress | wp_ | Database table prefix. Do not change after installation. |
| `PHP_UPLOAD_MAX_FILESIZE` | WordPress | 64M | Maximum upload size per file. |
| `WORDPRESS_LOGGED_IN_KEY` | WordPress | - | WordPress LOGGED_IN_KEY (random, generated once). |
| `WORDPRESS_LOGGED_IN_SALT` | WordPress | - | WordPress LOGGED_IN_SALT (random, generated once). |
| `WP_DISABLE_PAGELOAD_CRON` | WordPress | true | Disable WP-Cron on page loads; the WP Cron service runs it every 5 minutes instead. |
| `WORDPRESS_SECURE_AUTH_KEY` | WordPress | (secret) | WordPress SECURE_AUTH_KEY (random, generated once). |
| `APACHE_MAX_REQUEST_WORKERS` | WordPress | 20 | Max concurrent PHP workers (prefork). Peak RAM is roughly workers x 60 MB. |
| `REDIS_CACHE_PLUGIN_VERSION` | WordPress | 3.0.0 | Redis Object Cache plugin version installed on first boot (later updates happen in the dashboard). |
| `WORDPRESS_SECURE_AUTH_SALT` | WordPress | - | WordPress SECURE_AUTH_SALT (random, generated once). |
| `WP_CRON_URL` | WP Cron | - | wp-cron.php on the WordPress service, reached over the private network. |

## Configuration

- **Start command:** `docker-entrypoint.sh mariadbd --innodb-buffer-pool-size=256M --max-allowed-packet=64M --max-connections=100`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/wp-content`
- **Start command:** `/bin/sh -c 'curl -fsS --max-time 290 --retry 3 --retry-delay 10 --retry-connrefused -o /dev/null -w "wp-cron.php HTTP %{http_code} in %{time_total}s\n" "$WP_CRON_URL"'`

**Category:** CMS · **Tags:** wordpress, cms, php, mariadb, redis · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/wordpress-7-turbo-redis-cache-mariadb)
