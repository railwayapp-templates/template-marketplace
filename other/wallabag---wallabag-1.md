# Deploy wallabag on Railway

Read-it-later app: save web articles, read them clean on any device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wallabag-1)

## About

[wallabag](https://github.com/wallabag/wallabag) is a self-hosted read-it-later app. Save any web page and wallabag extracts the article, so you can read it later without ads or clutter. It has apps for Android and iOS, browser extensions, an e-reader integration (KOReader, Kobo), and imports from Pocket, Instapaper, Pinboard and others.

This template runs the official `wallabag/wallabag` image (nginx + PHP-FPM) with Railway Postgres. On every deploy, a pre-deploy step runs the database migrations. On the first deploy it installs wallabag and creates your admin account from `ADMIN_USERNAME`, `ADMIN_EMAIL` and `ADMIN_PASSWORD`. wallabag's well-known default `wallabag`/`wallabag` login is removed. You can log in right away, with no shell. Public sign-up is off.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| wallabag | `wallabag/wallabag:2.6.14` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | wallabag | 80 |
| `ADMIN_PASSWORD` | wallabag | (secret) |
| `ADMIN_USERNAME` | wallabag | (secret) |
| `PHP_MEMORY_LIMIT` | wallabag | 256M |
| `SYMFONY__ENV__SECRET` | wallabag | (secret) |
| `SYMFONY__ENV__FROM_EMAIL` | wallabag | no-reply@wallabag.org |
| `SYMFONY__ENV__MAILER_DSN` | wallabag | null://null |
| `SYMFONY__ENV__SERVER_NAME` | wallabag | wallabag |
| `SYMFONY__ENV__DATABASE_USER` | wallabag | (secret) |
| `SYMFONY__ENV__DATABASE_DRIVER` | wallabag | pdo_pgsql |
| `SYMFONY__ENV__DATABASE_CHARSET` | wallabag | utf8 |
| `SYMFONY__ENV__DATABASE_PASSWORD` | wallabag | (secret) |
| `SYMFONY__ENV__FOSUSER_REGISTRATION` | wallabag | false |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/info`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/wallabag-1)
