# Deploy CM42 Central (Pivotal Tracker Clone) on Railway

An agile project planning tool and Pivotal Tracker drop-in replacement.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cm42-central)

## About

Built with ❤️ from engineers at [Inloop Studio](https://inloop.studio/)

**What is CM42 Central ?**  
CM42 Central is an open-source, user story–based backlog management system for agile development teams. Originally forked from the now-discontinued Fulcrum project, cm42-central has evolved into a robust alternative to commercial tools like Pivotal Tracker and Trello, offering deeper features for project planning, iteration management, and team collaboration[1][2].

Hosting CM42 Central on Railway provides a scalable, modern environment for agile software project management. With Railway, you eliminate manual infrastructure setup; everything from web servers to databases and cache layers is easily provisioned within a few clicks. Deploying CM42 Central enables your team to collaborate on project backlogs, track agile iterations, analyze metrics (velocity, burn-up), and integrate with team communication channels like Slack and Mattermost without worrying about infrastructure maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/inloopstudio-team/cm42-central:web` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| Memcached | `memcached:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Adminer | `adminer` | Web service |
| worker | `ghcr.io/inloopstudio-team/cm42-central:worker` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 3000 | Port your app server will listen on |
| `DB_HOST` | web | - | Database host/domain for Postgres instance |
| `NODE_ENV` | web | production | Node.js environment (production/development) |
| `MAIN_HOST` | web | - | Public domain name of your deployed app |
| `RAILS_ENV` | web | production | Rails environment (production/development/test) |
| `SMTP_HOST` | web | - | Host address of your SMTP email server (e.g., smtp.gmail.com) |
| `SMTP_PORT` | web | - | Port used to connect to SMTP server (e.g., 465 or 587) |
| `DB_MIGRATE` | web | true | Whether to run database migrations on deploy |
| `DB_PASSWORD` | web | (secret) | Password for connecting to your Postgres database |
| `DB_USERNAME` | web | (secret) | Username for connecting to your Postgres database |
| `DATABASE_URL` | web | - | Full connection URL for your Postgres database |
| `SECRET_TOKEN` | web | (secret) | Secret token for Verifying Rails API/legacy sessions |
| `MAILER_SENDER` | web | - | Default "from" email address for outgoing emails |
| `SMTP_PASSWORD` | web | (secret) | Password for SMTP email sender |
| `SMTP_USERNAME` | web | (secret) | Username for SMTP email sender |
| `CLOUDINARY_URL` | web | - | URL for connecting to Cloudinary (image/file storage CDN) |
| `REDISCLOUD_URL` | web | - | Redis server connection URL |
| `SECRET_KEY_BASE` | web | (secret) | Secret key for verifying signed cookies/session in Rails |
| `MEMCACHIER_SERVERS` | web | - | Memcache server connection URL for caching |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | worker | 3000 | Port your app server will listen on |
| `DB_HOST` | worker | - | Database host/domain for Postgres instance |
| `NODE_ENV` | worker | production | Node.js environment (production/development) |
| `MAIN_HOST` | worker | - | Public domain name of your deployed app |
| `RAILS_ENV` | worker | production | Rails environment (production/development/test) |
| `SMTP_HOST` | worker | - | Host address of your SMTP email server (e.g., smtp.gmail.com) |
| `SMTP_PORT` | worker | - | Port used to connect to SMTP server (e.g., 465 or 587) |
| `DB_MIGRATE` | worker | true | Whether to run database migrations on deploy |
| `DB_PASSWORD` | worker | (secret) | Password for connecting to your Postgres database |
| `DB_USERNAME` | worker | (secret) | Username for connecting to your Postgres database |
| `DATABASE_URL` | worker | - | Full connection URL for your Postgres database |
| `SECRET_TOKEN` | worker | (secret) | Secret token for Verifying Rails API/legacy sessions |
| `MAILER_SENDER` | worker | - | Default "from" email address for outgoing emails |
| `SMTP_PASSWORD` | worker | (secret) | Password for SMTP email sender |
| `SMTP_USERNAME` | worker | (secret) | Username for SMTP email sender |
| `CLOUDINARY_URL` | worker | - | URL for connecting to Cloudinary (image/file storage CDN) |
| `REDISCLOUD_URL` | worker | - | Redis server connection URL |
| `SECRET_KEY_BASE` | worker | (secret) | Secret key for verifying signed cookies/session in Rails |
| `MEMCACHIER_SERVERS` | worker | - | Memcache server connection URL for caching |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `docker-entrypoint.sh memcached -vv --max-item-size=32m`
- **TCP Proxies:** 11211
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "entrypoint.sh php -S [::]:${PORT} -t /var/www/html"`
- **Healthcheck:** `/`

**Category:** Other

[View on Railway →](https://railway.com/template/cm42-central)
