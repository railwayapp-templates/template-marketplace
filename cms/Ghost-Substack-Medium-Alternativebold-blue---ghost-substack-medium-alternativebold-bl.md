# Deploy Ghost (Substack / Medium Alternative)bold-blue on Railway

Self-hosted publishing & newsletter platform. Own your audience.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-substack-medium-alternativebold-bl)

## About

Ghost is a powerful open-source publishing and newsletter platform — a self-hosted alternative to Substack, Medium, and Mailchimp. It combines a professional blog, membership site, and email newsletter system in one, giving you full ownership of your content, audience, and revenue with no per-subscriber fees. This template deploys the official Ghost image backed by a managed MySQL 8 database, wired for private networking with a persistent volume so your posts, members, and settings survive every redeploy. [Updated August '26]

Ghost requires MySQL in production (SQLite is not supported), plus a persistent volume for uploaded images and themes at /var/lib/ghost/content. This template provisions both automatically: a dedicated MySQL 8.4 service reachable over Railway's private network, and a volume on the Ghost service. The public URL is injected on first boot so links, admin, and outbound email all resolve correctly with zero manual configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:8.4` | Database |
| ghost:5.130.6 | `ghost:5.130.6` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `url` | ghost:5.130.6 | - | Public URL of your Ghost site (links, admin, email). |
| `NODE_ENV` | ghost:5.130.6 | production | Run Ghost in production mode (required for MySQL). |
| `database__client` | ghost:5.130.6 | mysql | Use MySQL; Ghost 5 does not support SQLite in production. |
| `database__connection__host` | ghost:5.130.6 | - | Private hostname of the MySQL service. |
| `database__connection__port` | ghost:5.130.6 | - | MySQL port. |
| `database__connection__user` | ghost:5.130.6 | (secret) | MySQL user. |
| `database__connection__database` | ghost:5.130.6 | - | MySQL database name. |
| `database__connection__password` | ghost:5.130.6 | (secret) | MySQL password. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/ghost-substack-medium-alternativebold-bl)
