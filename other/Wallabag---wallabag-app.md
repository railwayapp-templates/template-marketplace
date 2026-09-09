# Deploy Wallabag on Railway

Saves web articles to read later, with tags, search and export

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wallabag-app)

## About

Wallabag is an open-source read-it-later application: give it a URL and it fetches the page, strips the navigation, ads and cookie banners, and keeps the readable article in your own database with its tags and annotations. It has been the standard self-hosted answer to Pocket and Instapaper for a decade, and since Mozilla closed Pocket in July 2025 it is where many of those libraries ended up — an archive that does not vanish when a page 404s.

Deploy Wallabag on Railway and you get the production shape rather than a single container: the **wallabag** service running nginx and PHP-FPM behind a public HTTPS domain, a managed **Postgres** service holding entries, tags and users, and a managed **Redis** service backing the asynchronous importers that move large libraries out of Pocket or Instapaper. A persistent volume keeps downloaded images, sessions and the encryption key for stored site credentials, so upgrades leave your data alone. The administrator account is created on first boot from the values you supply, and public registration is off, so the instance is private from the first request.

![Diagram of the wallabag, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788880013/wallabag-architecture.png)

Wallabag is a Symfony application published under the AGPL-3.0 by a French non-profit. What it stores is a record of what you read, and the copy is only useful if it outlives the source — which is why running your own instance is the point.

- Full-text extraction with per-site rules, so most articles parse cleanly
- Tags, automatic tagging rules, annotations and highlights
- Search and filters by reading time, domain, language and status
- Export to EPUB, MOBI, PDF, JSON, CSV, XML and text
- RSS/Atom feeds for unread, starred and archived entries
- A REST API, Firefox and Chrome extensions, Android and iOS apps
- Importers for Pocket, Instapaper, Readability, Pinboard, Delicious and Omnivore
- Two-factor authentication, multiple users, per-user settings

**wallabag** serves the UI and API and does the fetching and extraction. **Postgres** stores every entry, tag, annotation and user, and with the volume it is all you need to back up. **Redis** is the queue: without it a 4,000-article Pocket import would run inside one HTTP request and time out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| wallabag | [gridalpha/wallabag-railway](https://github.com/gridalpha/wallabag-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | wallabag | 8080 | Port nginx listens on |
| `PHP_MEMORY_LIMIT` | wallabag | 256M | PHP memory ceiling |
| `WALLABAG_ADMIN_USER` | wallabag | (secret) | Administrator username |
| `SYMFONY__ENV__LOCALE` | wallabag | en | Default interface language |
| `SYMFONY__ENV__SECRET` | wallabag | (secret) | Session and token signing key |
| `WALLABAG_ADMIN_EMAIL` | wallabag | admin@example.com | Administrator email address |
| `WALLABAG_DB_ADMIN_URL` | wallabag | - | Superuser URL, creates role and database |
| `WALLABAG_ADMIN_PASSWORD` | wallabag | (secret) | Administrator password, set at boot |
| `WALLABAG_IMPORT_WORKERS` | wallabag | pocket readability instapaper pinboard delicious omnivore firefox chrome wallabag_v1 wallabag_v2 | Import queues given a worker |
| `SYMFONY__ENV__FROM_EMAIL` | wallabag | no-reply@example.com | Sender address for outgoing mail |
| `SYMFONY__ENV__MAILER_DSN` | wallabag | smtp://127.0.0.1 | SMTP relay for mail; replace with a real one |
| `SYMFONY__ENV__REDIS_HOST` | wallabag | - | Private Redis host |
| `SYMFONY__ENV__REDIS_PORT` | wallabag | - | Redis port |
| `SYMFONY__ENV__DOMAIN_NAME` | wallabag | - | Public base URL |
| `SYMFONY__ENV__SERVER_NAME` | wallabag | wallabag | Issuer name shown by 2FA apps |
| `SYMFONY__ENV__REDIS_SCHEME` | wallabag | tcp | Redis transport |
| `SYMFONY__ENV__DATABASE_HOST` | wallabag | - | Private database host |
| `SYMFONY__ENV__DATABASE_NAME` | wallabag | wallabag | Database created at boot |
| `SYMFONY__ENV__DATABASE_PORT` | wallabag | 5432 | Database port |
| `SYMFONY__ENV__DATABASE_USER` | wallabag | (secret) | Scoped role created at boot |
| `SYMFONY__ENV__REDIS_PASSWORD` | wallabag | (secret) | Redis auth password |
| `SYMFONY__ENV__DATABASE_DRIVER` | wallabag | pdo_pgsql | Doctrine driver |
| `SYMFONY__ENV__DATABASE_CHARSET` | wallabag | utf8 | Connection charset |
| `SYMFONY__ENV__TWOFACTOR_SENDER` | wallabag | no-reply@example.com | Sender address for 2FA codes |
| `SYMFONY__ENV__DATABASE_PASSWORD` | wallabag | (secret) | Password for that scoped role |
| `SYMFONY__ENV__FOSUSER_CONFIRMATION` | wallabag | true | Email confirmation when signup is on |
| `SYMFONY__ENV__FOSUSER_REGISTRATION` | wallabag | false | Public signup disabled |
| `SYMFONY__ENV__DATABASE_TABLE_PREFIX` | wallabag | wallabag_ | Table name prefix |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/info`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/wallabag-data`

**Category:** Other · **Languages:** Shell, Dockerfile, Vim Snippet

[View on Railway →](https://railway.com/deploy/wallabag-app)
