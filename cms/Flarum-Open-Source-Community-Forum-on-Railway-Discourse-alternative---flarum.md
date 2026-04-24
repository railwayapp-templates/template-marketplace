# Deploy Flarum | Open-Source Community Forum on Railway, Discourse alternative on Railway

Self host Flarum. Lightweight, modern PHP forum with 1600+ extensions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flarum)

## About

Deploy Flarum on Railway to run a modern, fast, and elegantly designed community forum with zero server management. Self-host Flarum with full control over your data, extensions, and user experience — backed by 16k+ GitHub stars and 1,600+ community extensions.

This Railway template pre-configures Flarum with a MySQL database, persistent storage for extensions and uploads, and a production-ready Nginx/PHP-FPM stack. One click gets you a live forum at a public HTTPS URL with admin access ready to go.

Flarum is an open-source forum platform built on PHP (Laravel) with a Mithril.js single-page application frontend. It was designed as a modern successor to esoTalk and FluxBB, focusing on speed, simplicity, and extensibility.

- **Single-page application** — real-time updates, infinite scrolling, and fluid navigation without page reloads
- **Mobile-first responsive design** — full-featured experience on phones and tablets
- **"Everything is an extension" architecture** — 1,600+ community extensions covering tags, mentions, SSO, OAuth, file uploads, SEO, analytics, and more
- **JSON:API compliant REST API** — build custom integrations, bots, and mobile apps
- **Composer-based package management** — install and update extensions via CLI or the built-in Extension Manager
- **Lightweight core** — minimal resource footprint compared to Discourse or phpBB

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flarum | `crazymax/flarum:latest` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Flarum | 8000 | HTTP listening port |
| `DB_HOST` | Flarum | - | MySQL server hostname |
| `DB_NAME` | Flarum | - | MySQL database name |
| `DB_PORT` | Flarum | - | MySQL server port |
| `DB_USER` | Flarum | (secret) | MySQL database user |
| `DB_PASSWORD` | Flarum | (secret) | MySQL database password |
| `FLARUM_DEBUG` | Flarum | false | Enable debug mode |
| `MEMORY_LIMIT` | Flarum | 256M | PHP memory limit |
| `REAL_IP_FROM` | Flarum | 0.0.0.0/0 | Trusted proxy CIDR range |
| `REAL_IP_HEADER` | Flarum | X-Forwarded-For | Header for client IP |
| `FLARUM_BASE_URL` | Flarum | - | Public forum URL |
| `UPLOAD_MAX_SIZE` | Flarum | 50M | Max file upload size |
| `OPCACHE_MEM_SIZE` | Flarum | 128 | OPcache memory in MB |
| `FLARUM_FORUM_TITLE` | Flarum | Flarum Forum | Forum title (first install only) |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/flarum)
