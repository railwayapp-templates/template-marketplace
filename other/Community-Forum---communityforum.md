# Deploy Community Forum on Railway

One click Deploy Flarum,Unlimited extensions,Completly Free

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/communityforum)

## About

Flarum is a modern, open-source community forum platform designed for fast, engaging discussions. Built with PHP and a single-page application frontend, it delivers a responsive user experience while supporting a rich extension ecosystem for authentication, file uploads, moderation, SEO, and community management. It is lightweight, highly customizable, and suitable for communities of all sizes.

Hosting Flarum on Railway provides a production-ready environment for running your own community forum without managing servers or web infrastructure. This template deploys the Flarum application alongside a MySQL database for persistent forum data and a Railway Volume for uploads, extensions, and application storage. Railway automatically provisions HTTPS, private networking, and environment variable management, allowing Flarum and MySQL to communicate securely. Whether you're building a customer support forum, an internal discussion platform, or a public online community, Railway simplifies deployment while making it easy to scale resources as your community grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Community Forum | `crazymax/flarum:latest` | Web service |

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
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Community Forum | 8000 | HTTP listening port |
| `DB_HOST` | Community Forum | - | MySQL server hostname. |
| `DB_NAME` | Community Forum | - | MySQL database name. |
| `DB_PORT` | Community Forum | - | MySQL server port. |
| `DB_USER` | Community Forum | (secret) | MySQL database user. |
| `DB_PASSWORD` | Community Forum | (secret) | MySQL database password. |
| `FLARUM_DEBUG` | Community Forum | false | Enable debug mode. |
| `MEMORY_LIMIT` | Community Forum | 256M | PHP memory limit. |
| `REAL_IP_FROM` | Community Forum | 0.0.0.0/0 | Trusted proxy CIDR range |
| `REAL_IP_HEADER` | Community Forum | X-Forwarded-For | Header for client IP |
| `FLARUM_BASE_URL` | Community Forum | - | Public forum URL |
| `UPLOAD_MAX_SIZE` | Community Forum | 50M | Max file to upload size |
| `OPCACHE_MEM_SIZE` | Community Forum | 128 | OPcache memory limit in MB |
| `FLARUM_FORUM_TITLE` | Community Forum | Flarum Forum | Forum title (first install only) |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/communityforum)
