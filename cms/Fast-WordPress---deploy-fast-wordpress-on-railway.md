# Deploy Fast WordPress on Railway

WordPress with object cache, OPcache and tuned MariaDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-fast-wordpress-on-railway)

## About

This template deploys WordPress 7.1.3 on PHP 8.4 with OPcache, a persistent Valkey object cache and a tuned MariaDB 12.3.3, all wired together across three Railway services with no deploy-time input. It is for anyone who wants self hosted WordPress that is fast out of the box.

You own everything that matters: the MariaDB volume at /var/lib/mysql, uploads, themes, plugins. Nothing to configure at deploy time. Railway adds the public domain, TLS and health checks, so you skip the server patching and the installer is the only step left.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey:9.1.2-alpine@sha256:48332870af354a799964c0012ae1194a0bf2bf894eb508f945810596dc2d8d11` | Database |
| WordPress | `ghcr.io/onepush-dev/wordpress:7.1.3-php8.4@sha256:1cb7b95a5ce4ed01189fb44773773ea38ec5c5c56b0ca534f98435bda1725067` | Web service |
| MariaDB | `mariadb:12.3.3@sha256:99c125f103f5d081ebbc9ffe064e63daf7f688ac33a5f7f29af2d7260a96debf` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VALKEY_URL` | Valkey | - | Full redis:// connection URL for other services. |
| `VALKEY_PASSWORD` | Valkey | (secret) | Password Valkey requires from clients, generated per deploy. |
| `VALKEY_MAXMEMORY` | Valkey | 256mb | Memory cap for the cache; least-recently-used keys are evicted beyond it. |
| `PORT` | WordPress | 80 | Port Apache listens on; the public domain routes here. |
| `WP_HOME` | WordPress | - | Site address, defaults to the Railway domain over HTTPS. Set to https://your-domain after adding a custom domain. |
| `WP_REDIS_HOST` | WordPress | - | Valkey host for the persistent object cache (private network). |
| `WP_REDIS_PORT` | WordPress | 6379 | Valkey port for the object cache. |
| `PHP_MEMORY_LIMIT` | WordPress | 512M | PHP memory limit per request (also WordPress's admin memory limit). |
| `PHP_UPLOAD_LIMIT` | WordPress | 256M | Largest file upload / POST size. |
| `WORDPRESS_DB_HOST` | WordPress | - | MariaDB host:port on the private network. |
| `WORDPRESS_DB_NAME` | WordPress | - | Database name, taken from the MariaDB service. |
| `WORDPRESS_DB_USER` | WordPress | (secret) | Database user, taken from the MariaDB service. |
| `WP_REDIS_DISABLED` | WordPress | false | Set true to switch the object cache off; WordPress then reads everything from MariaDB. |
| `WP_REDIS_PASSWORD` | WordPress | (secret) | Valkey password, taken from the Valkey service. |
| `PHP_OPCACHE_MEMORY` | WordPress | 256 | OPcache size in MB for compiled PHP code. |
| `WORDPRESS_AUTH_KEY` | WordPress | (secret) | Login cookie key, generated per deploy. |
| `WORDPRESS_AUTH_SALT` | WordPress | - | Salt for the login cookie, generated per deploy. |
| `WORDPRESS_NONCE_KEY` | WordPress | - | Nonce (form token) key, generated per deploy. |
| `WORDPRESS_NONCE_SALT` | WordPress | - | Salt for nonces, generated per deploy. |
| `WORDPRESS_DB_PASSWORD` | WordPress | (secret) | Database password, taken from the MariaDB service. |
| `PHP_MAX_EXECUTION_TIME` | WordPress | 300 | Longest a PHP request may run, in seconds (imports, backups). |
| `WORDPRESS_TABLE_PREFIX` | WordPress | wp_ | Prefix for WordPress database tables. |
| `WORDPRESS_LOGGED_IN_KEY` | WordPress | - | Logged-in cookie key, generated per deploy. |
| `WORDPRESS_LOGGED_IN_SALT` | WordPress | - | Salt for the logged-in cookie, generated per deploy. |
| `WORDPRESS_SECURE_AUTH_KEY` | WordPress | (secret) | HTTPS login cookie key, generated per deploy. |
| `WORDPRESS_SECURE_AUTH_SALT` | WordPress | - | Salt for the HTTPS login cookie, generated per deploy. |
| `MARIADB_USER` | MariaDB | (secret) | Database user created on first boot for WordPress. |
| `MARIADB_DATABASE` | MariaDB | wordpress | Database created on first boot for WordPress. |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Password of the WordPress database user, generated per deploy. |
| `MARIADB_AUTO_UPGRADE` | MariaDB | 1 | Runs mariadb-upgrade automatically when the image version changes. |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB root password, generated per deploy. |
| `MARIADB_INNODB_BUFFER_POOL_SIZE` | MariaDB | 256M | InnoDB buffer pool (RAM for cached data and indexes); raise on bigger plans. |

## Configuration

- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh valkey-server --requirepass "$VALKEY_PASSWORD" --maxmemory "${VALKEY_MAXMEMORY:-256mb}" --maxmemory-policy allkeys-lru --save "" --appendonly no'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh mariadbd --innodb-buffer-pool-size="${MARIADB_INNODB_BUFFER_POOL_SIZE:-256M}" --max-allowed-packet=64M --skip-name-resolve'`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/deploy-fast-wordpress-on-railway)
