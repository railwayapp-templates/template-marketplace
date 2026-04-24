# Deploy Wallabag | Open Source Pocket Alternative on Railway

Self Host Wallabag. Your Read-It-Later App. Save web articles & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wallabag-pocket-alternative)

## About

Deploy Wallabag on Railway to run your own read-it-later service with full control over your data. Wallabag is an open-source alternative to Pocket and Instapaper that lets you save web articles, strip away clutter, and read them later in a clean interface — from any device.

This Railway template pre-configures Wallabag (`wallabag/wallabag:latest`) with a PostgreSQL database for persistent article storage and Redis for caching. Public domain, environment variables, and volume mounts are wired up so you can self-host Wallabag and start saving articles within minutes.

Wallabag is a self-hostable PHP application built on the Symfony framework. It saves full article content — not just bookmarks — so articles remain readable even if the original site goes down.

- **Full-text article extraction** — strips ads, navigation, and tracking from saved pages
- **Multi-format export** — download articles as EPUB, MOBI, PDF, CSV, or plain text
- **Tagging and filtering** — organize articles with tags, starred favorites, and archive status
- **REST API** — full API with Pocket-compatible endpoints for easy migration
- **Browser extensions** — save articles from Firefox, Chrome, Edge, and Safari
- **Mobile apps** — native Android and iOS clients with offline reading support
- **RSS feeds** — expose unread, starred, and archived articles as RSS feeds
- **Import from Pocket, Instapaper, Pinboard** — bulk import your existing reading list

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Wallabag | `wallabag/wallabag:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `PORT` | Wallabag | 80 | HTTP listening port |
| `POSTGRES_USER` | Wallabag | (secret) | Superuser for DB creation |
| `POPULATE_DATABASE` | Wallabag | True | Initialize DB on first boot |
| `POSTGRES_PASSWORD` | Wallabag | (secret) | Superuser password |
| `SYMFONY__ENV__LOCALE` | Wallabag | en | Default language |
| `SYMFONY__ENV__SECRET` | Wallabag | (secret) | Symfony application secret |
| `SYMFONY__ENV__FROM_EMAIL` | Wallabag | wallabag@example.com | Sender email address |
| `SYMFONY__ENV__MAILER_DSN` | Wallabag | smtp://127.0.0.1 | Mail server DSN |
| `SYMFONY__ENV__REDIS_HOST` | Wallabag | - | Redis hostname |
| `SYMFONY__ENV__REDIS_PORT` | Wallabag | - | Redis port |
| `SYMFONY__ENV__DOMAIN_NAME` | Wallabag | - | Public instance URL |
| `SYMFONY__ENV__SERVER_NAME` | Wallabag | Wallabag | 2FA issuer name |
| `SYMFONY__ENV__REDIS_SCHEME` | Wallabag | tcp | Redis connection scheme |
| `SYMFONY__ENV__DATABASE_HOST` | Wallabag | - | Database hostname |
| `SYMFONY__ENV__DATABASE_NAME` | Wallabag | - | Database name |
| `SYMFONY__ENV__DATABASE_PORT` | Wallabag | - | Database port |
| `SYMFONY__ENV__DATABASE_USER` | Wallabag | (secret) | Database username |
| `SYMFONY__ENV__REDIS_PASSWORD` | Wallabag | (secret) | Redis auth password |
| `SYMFONY__ENV__DATABASE_DRIVER` | Wallabag | pdo_pgsql | PostgreSQL database driver |
| `SYMFONY__ENV__DATABASE_CHARSET` | Wallabag | utf8 | Database character encoding |
| `SYMFONY__ENV__DATABASE_PASSWORD` | Wallabag | (secret) | Database password |
| `SYMFONY__ENV__FOSUSER_CONFIRMATION` | Wallabag | true | Require email confirmation |
| `SYMFONY__ENV__FOSUSER_REGISTRATION` | Wallabag | false | Disable public registration |
| `SYMFONY__ENV__DATABASE_TABLE_PREFIX` | Wallabag | wallabag_ | Table name prefix |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/wallabag/web/assets/images`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wallabag-pocket-alternative)
