# Deploy Mediawiki on Railway

Wiki software for building a linked, versioned knowledge base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mediawiki-wiki)

## About

Self-host MediaWiki, the wiki engine that runs Wikipedia, Wiktionary and thousands of company handbooks, game wikis and research archives. MediaWiki turns plain wikitext into a linked, versioned, searchable knowledge base: every page keeps its full revision history, every change is attributable and revertible, and templates, categories and Lua modules let a handful of editors keep tens of thousands of pages consistent. GPL-licensed and in development since 2002, it is the safest choice when the content itself — not a vendor's workspace — is the long-term asset.

This template runs MediaWiki 1.46 in the shape a real wiki needs, not the smallest one that boots. A **mediawiki** web tier on Apache and PHP 8.3 serves readers and editors; a dedicated **mediawiki-jobs** runner drains the background queue; **MySQL** stores pages, revisions and users; **Redis** holds the shared object cache and login sessions; and a **Mailpit** inbox captures outgoing mail. Page saves queue background work the runner picks up out of band, so nobody's page load pays for someone else's link update. Uploads live on a persistent volume and survive every redeploy.

![MediaWiki, job runner, MySQL, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787632754/mediawiki-architecture.png)

MediaWiki is a PHP application backed by a relational database, built for wikis that grow past what one editor can hold in their head. Teams self-host it for full control of their content, unlimited editors with no per-seat pricing, and an extensible codebase.

- Full revision history on every page, with diffs, rollback and page protection
- VisualEditor alongside the classic wikitext editor, both included
- Templates, parser functions and Lua modules via Scribunto
- Categories, redirects, watchlists, talk pages and full-text search
- Uploads with thumbnailing for images, SVG and PDF
- User groups, permissions, two-factor authentication
- Spam controls: AbuseFilter, SpamBlacklist, TitleBlacklist, CAPTCHA

Splitting the job runner out keeps the wiki fast at busy moments; sessions in Redis let the web tier grow past a single replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mediawiki | [gridalpha/mediawiki-railway](https://github.com/gridalpha/mediawiki-railway) | Web service |
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2` | Database |
| mediawiki-jobs | [gridalpha/mediawiki-railway](https://github.com/gridalpha/mediawiki-railway) | Worker |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mediawiki | 8080 | HTTP port Apache listens on |
| `MW_ROLE` | mediawiki | web | Run the Apache web tier |
| `MYSQL_URL` | mediawiki | - | Admin URL, used to provision the wiki role |
| `MW_DB_HOST` | mediawiki | - | Private MySQL hostname |
| `MW_DB_NAME` | mediawiki | mediawiki | Wiki database, created at boot |
| `MW_DB_PORT` | mediawiki | - | MySQL port |
| `MW_DB_USER` | mediawiki | (secret) | Scoped role, created at boot |
| `MW_LANGUAGE` | mediawiki | en | Content language code |
| `MW_SITENAME` | mediawiki | MediaWiki | Wiki name and project namespace |
| `MW_TIMEZONE` | mediawiki | UTC | Local time zone for timestamps |
| `MW_SMTP_HOST` | mediawiki | - | Private SMTP hostname |
| `MW_SMTP_PORT` | mediawiki | 1025 | Mailpit SMTP listener port |
| `MW_ADMIN_USER` | mediawiki | (secret) | First administrator, created once |
| `MW_REDIS_HOST` | mediawiki | - | Private Redis hostname |
| `MW_REDIS_PORT` | mediawiki | - | Redis port |
| `MW_SECRET_KEY` | mediawiki | (secret) | Signs sessions and reset tokens |
| `MW_DB_PASSWORD` | mediawiki | (secret) | Password for that scoped role |
| `MW_UPGRADE_KEY` | mediawiki | - | Guards the web updater |
| `MW_ADMIN_PASSWORD` | mediawiki | (secret) | First administrator's password |
| `MW_REDIS_PASSWORD` | mediawiki | (secret) | Redis auth password |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | mediawiki-jobs | 8080 | Port for the heartbeat health endpoint |
| `MW_ROLE` | mediawiki-jobs | jobs | Drain the job queue, serve no traffic |
| `MW_SERVER` | mediawiki-jobs | - | Base URL used in notification mail |
| `MW_DB_HOST` | mediawiki-jobs | - | Private MySQL hostname |
| `MW_DB_NAME` | mediawiki-jobs | - | Wiki database |
| `MW_DB_PORT` | mediawiki-jobs | - | MySQL port |
| `MW_DB_USER` | mediawiki-jobs | (secret) | Scoped role |
| `MW_LANGUAGE` | mediawiki-jobs | - | Content language code |
| `MW_SITENAME` | mediawiki-jobs | - | Wiki name used in notification mail |
| `MW_TIMEZONE` | mediawiki-jobs | - | Local time zone for timestamps |
| `MW_SMTP_HOST` | mediawiki-jobs | - | Private SMTP hostname |
| `MW_SMTP_PORT` | mediawiki-jobs | 1025 | Mailpit SMTP listener port |
| `MW_REDIS_HOST` | mediawiki-jobs | - | Private Redis hostname |
| `MW_REDIS_PORT` | mediawiki-jobs | - | Redis port |
| `MW_SECRET_KEY` | mediawiki-jobs | (secret) | Must match the web tier |
| `MW_DB_PASSWORD` | mediawiki-jobs | (secret) | Password for that scoped role |
| `MW_UPGRADE_KEY` | mediawiki-jobs | - | Must match the web tier |
| `MW_REDIS_PASSWORD` | mediawiki-jobs | (secret) | Redis auth password |
| `PORT` | mailpit | 8025 | Web inbox port, matches the public domain |
| `MP_UI_AUTH` | mailpit | - | Credentials guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web inbox listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | 0.0.0.0:1025 | SMTP listen address |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/images`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`

**Category:** CMS · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mediawiki-wiki)
