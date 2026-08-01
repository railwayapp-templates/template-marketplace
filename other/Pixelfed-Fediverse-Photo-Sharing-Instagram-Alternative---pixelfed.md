# Deploy Pixelfed | Fediverse Photo Sharing, Instagram Alternative on Railway

Your own Instagram on the Fediverse — photos, albums, federation built in.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pixelfed)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/pixelfed?utm_medium=integration&utm_source=button&utm_campaign=pixelfed)

[Pixelfed](https://pixelfed.org/) is a free and open source photo sharing platform for the Fediverse — an ethical Instagram alternative. Chronological feeds, albums, stories, filters, discovery, and no ads or tracking. Thanks to ActivityPub federation your instance connects with Mastodon and the rest of the Fediverse out of the box.

This template runs the full Pixelfed stack in three Railway services: the Pixelfed app (nginx + PHP-FPM + the Horizon queue worker + the task scheduler combined in one container, based on the excellent [jippi/docker-pixelfed](https://jippi.github.io/docker-pixelfed/) images), MySQL 8, and Redis. First-boot setup is fully automatic — app key, migrations, OAuth keys, and the federation instance actor are generated on first deploy and persisted on the storage volume. Photos and videos live on the app service's volume at `/var/www/storage`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7-alpine` | Database |
| mysql | `mysql:8` | Database |
| pixelfed | [nomideusz/pixelfed-railway](https://github.com/nomideusz/pixelfed-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | mysql | (secret) | Don't change. |
| `MYSQL_DATABASE` | mysql | pixelfed | Don't change. |
| `MYSQL_PASSWORD` | mysql | (secret) | Database password. Auto generated. |
| `MYSQL_RANDOM_ROOT_PASSWORD` | mysql | (secret) | Don't change. |
| `PORT` | pixelfed | 80 | Port for Railway healthcheck probing. Do not change. |
| `APP_ENV` | pixelfed | production | Don't change. |
| `APP_URL` | pixelfed | - | Wired automatically. Don't change. |
| `DB_HOST` | pixelfed | - | Wired automatically. Don't change. |
| `DB_PORT` | pixelfed | 3306 | Don't change. |
| `APP_NAME` | pixelfed | Pixelfed | Instance name shown in the UI and metadata. |
| `APP_DEBUG` | pixelfed | false | Don't change. |
| `APP_DOMAIN` | pixelfed | - | Wired automatically. Don't change. Federation identities are tied to this domain — attach your custom domain BEFORE federating. |
| `REDIS_HOST` | pixelfed | - | Wired automatically. Don't change. |
| `REDIS_PORT` | pixelfed | 6379 | Don't change. |
| `DB_DATABASE` | pixelfed | - | Wired automatically. Don't change. |
| `DB_PASSWORD` | pixelfed | (secret) | Wired automatically. Don't change. |
| `DB_USERNAME` | pixelfed | (secret) | Wired automatically. Don't change. |
| `LOG_CHANNEL` | pixelfed | stderr | Logs go to Railway's log view. |
| `MAIL_DRIVER` | pixelfed | log | Set to smtp (with MAIL_HOST/PORT/USERNAME/PASSWORD/ENCRYPTION/FROM_ADDRESS) for real emails. |
| `ACTIVITY_PUB` | pixelfed | true | ActivityPub federation with Mastodon & the Fediverse. |
| `ADMIN_DOMAIN` | pixelfed | - | Wired automatically. Don't change. |
| `CACHE_DRIVER` | pixelfed | redis | Don't change. |
| `PF_MAX_USERS` | pixelfed | 1000 | Maximum number of accounts on this instance. |
| `QUEUE_DRIVER` | pixelfed | redis | Don't change. |
| `REDIS_CLIENT` | pixelfed | phpredis | Don't change. |
| `DB_CONNECTION` | pixelfed | mysql | Don't change. |
| `OAUTH_ENABLED` | pixelfed | true | Required for mobile/third-party apps. |
| `PF_MAKE_ADMIN` | pixelfed | - | After registering in the web UI, set this to your username and redeploy — that account becomes admin. |
| `TRUST_PROXIES` | pixelfed | * | Don't change — Railway terminates TLS in front of the app. |
| `HORIZON_PREFIX` | pixelfed | horizon- | Don't change. |
| `MAX_PHOTO_SIZE` | pixelfed | 15000 | Max photo/video size in KB. |
| `SESSION_DOMAIN` | pixelfed | - | Wired automatically. Don't change. |
| `SESSION_DRIVER` | pixelfed | database | Don't change. |
| `AP_REMOTE_FOLLOW` | pixelfed | true | Allow remote follows from other Fediverse servers. |
| `BROADCAST_DRIVER` | pixelfed | log | Don't change. |
| `OPEN_REGISTRATION` | pixelfed | true | Anyone can sign up. Set false after creating your account for a private instance. |
| `ENABLE_CONFIG_CACHE` | pixelfed | true | Don't change. |
| `ENFORCE_EMAIL_VERIFICATION` | pixelfed | false | Keep false unless you configure a real mailer (MAIL_* vars). |

## Configuration

- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --datadir=/var/lib/mysql/data`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/api/v1/instance`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/storage`

**Category:** Other · **Languages:** Shell, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/pixelfed)
