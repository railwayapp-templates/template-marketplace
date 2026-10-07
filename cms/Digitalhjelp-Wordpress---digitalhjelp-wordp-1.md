# Deploy Digitalhjelp Wordpress on Railway

Hardened, immutable WordPress with MySQL on a private network

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/digitalhjelp-wordp-1)

## About

A security-focused WordPress setup: core, config and must-use plugins are baked into a read-only Docker image, MySQL is reachable only on Railway's private network, and every secret is generated per deployment.

WordPress core, wp-config.php and hardening rules are part of the image and can't be changed from wp-admin. Uploads (and optionally plugins/themes) live on a Railway volume at /data. PHP execution is blocked in uploads, XML-RPC and the web installer are disabled, and the site installs itself on first boot. The database gets two least-privilege users, and the MySQL root password is removed from the web server's environment before Apache starts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wordpress | [Digitalhjelp/Wordpress](https://github.com/Digitalhjelp/Wordpress) | Web service |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Wordpress | 8080 | Port Apache listens on. Keep 8080. |
| `DB_HOST` | Wordpress | - | Private MySQL address. Do not change. |
| `DB_NAME` | Wordpress | wordpress | Database name for WordPress. |
| `DB_USER` | Wordpress | (secret) | Database user for the website (data access only). |
| `WP_TITLE` | Wordpress | WordPress | Site title shown in WordPress. |
| `DB_PASSWORD` | Wordpress | (secret) | Password for DB_USER. Generated automatically. |
| `WP_AUTH_KEY` | Wordpress | (secret) | WordPress security key. Generated automatically. |
| `WP_AUTH_SALT` | Wordpress | - | WordPress security salt. Generated automatically. |
| `WP_NONCE_KEY` | Wordpress | - | WordPress security key. Generated automatically. |
| `WP_ADMIN_USER` | Wordpress | (secret) | Username for the first administrator. |
| `WP_NONCE_SALT` | Wordpress | - | WordPress security salt. Generated automatically. |
| `WP_ADMIN_EMAIL` | Wordpress | jarle@digitalhjelp.no | Email address for the first administrator. |
| `DB_MIGRATE_USER` | Wordpress | (secret) | Database user used only at startup for install and upgrades. |
| `WP_TABLE_PREFIX` | Wordpress | - | Random table prefix. Generated automatically. |
| `DB_ROOT_PASSWORD` | Wordpress | (secret) | Used once to create the database users. Delete after first deploy. |
| `WP_LOGGED_IN_KEY` | Wordpress | - | WordPress security key. Generated automatically. |
| `WP_ADMIN_PASSWORD` | Wordpress | (secret) | First admin password. Generated automatically. Copy it, then delete this variable. |
| `WP_LOGGED_IN_SALT` | Wordpress | - | WordPress security salt. Generated automatically. |
| `WP_SECURE_AUTH_KEY` | Wordpress | (secret) | WordPress security key. Generated automatically. |
| `DB_MIGRATE_PASSWORD` | Wordpress | (secret) | Password for DB_MIGRATE_USER. Generated automatically. |
| `WP_SECURE_AUTH_SALT` | Wordpress | - | WordPress security key. Generated automatically. |
| `WP_ALLOW_ADMIN_INSTALL` | Wordpress | 1 | 1 = allow installing plugins and themes from wp-admin. Remove for a fully locked site. |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/digitalhjelp-wordp-1)
