# Deploy WordPress Pro | Redis Cache, Nightly Backups, Secure Setup on Railway

WordPress with Redis object cache, nightly backups and no open installer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-pro)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/wordpress-pro?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=wordpress-pro)

[WordPress](https://wordpress.org/) is the open-source CMS behind over 40% of the web: blogs, company sites, portfolios and, with WooCommerce, online shops, with thousands of themes and plugins. This template runs the official WordPress image the way a managed WordPress host sets it up: MariaDB, a Redis object cache, nightly backups, and no open installer.

The stack is four pieces: WordPress (Apache and PHP 8.3), a private MariaDB, a private Redis, and a Railway bucket for backups.

- **Installed before it goes public.** A fresh WordPress shows its setup page to whoever opens the URL first, and bots scan new domains for exactly that. This template installs WordPress on the first boot, before the site answers, with the login `admin` and a generated password, never `admin`/`admin`. MariaDB and Redis have generated passwords and no public proxy. The security keys and salts are random, written once and kept on the volume, so logins survive redeploys.
- **Redis object cache.** The Redis Object Cache plugin is installed and switched on, so the queries WordPress repeats on every page come from memory. If Redis restarts, pages are served without the cache for those seconds instead of an error screen.
- **Nightly backups.** Every night at 03:00 UTC the database and `wp-content` (themes, plugins, uploads) go to the bundled bucket, one archive per weekday, so the last 7 days are always there. Restoring is one command.
- **Limits for real sites.** 128 MB uploads (the stock image stops at 2 MB), 256 MB of PHP memory and 5-minute requests for imports and big plugin installs. Apache is sized to your plan's memory, pretty permalinks are on, and WP-CLI is built in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WordPress | [nomideusz/wordpress-railway](https://github.com/nomideusz/wordpress-railway) (root: /) | Web service |
| Redis | `redis:8.10.2-alpine` | Database |
| MariaDB | `mariadb:11.8.9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | WordPress | 8080 | Port Apache listens on - leave as is |
| `S3_BUCKET` | WordPress | - | Backup bucket name. Empty = no nightly backups |
| `S3_REGION` | WordPress | - | Backup bucket region |
| `S3_ENDPOINT` | WordPress | - | Nightly backups go to the bundled bucket - leave as is |
| `WP_REDIS_HOST` | WordPress | - | Redis object cache host. Empty = no object cache |
| `WP_REDIS_PORT` | WordPress | 6379 | Redis port |
| `WP_ADMIN_EMAIL` | WordPress | admin@example.com | Admin email, set on first boot only - change it in Settings > General |
| `S3_ACCESS_KEY_ID` | WordPress | - | Backup bucket credentials |
| `WORDPRESS_DB_HOST` | WordPress | - | MariaDB host - private network only, leave as is |
| `WORDPRESS_DB_NAME` | WordPress | - | Database name - wired to the bundled MariaDB, leave as is |
| `WORDPRESS_DB_USER` | WordPress | (secret) | Database user - wired to the bundled MariaDB, leave as is |
| `WP_ADMIN_PASSWORD` | WordPress | (secret) | Password for the 'admin' login, set on first boot only - change it in WordPress afterwards |
| `WP_REDIS_PASSWORD` | WordPress | (secret) | Redis password - wired to the bundled Redis, leave as is |
| `S3_SECRET_ACCESS_KEY` | WordPress | (secret) | Backup bucket credentials |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) | Database password - wired to the bundled MariaDB, leave as is |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `MARIADB_USER` | MariaDB | (secret) | Database user for WordPress |
| `MARIADB_DATABASE` | MariaDB | wordpress | Database name |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Auto-generated database password |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Auto-generated root password |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save '' --appendonly no --maxmemory 128mb --maxmemory-policy allkeys-lru"`
- **Start command:** `docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, Dockerfile, PHP

[View on Railway →](https://railway.com/deploy/wordpress-pro)
