# Deploy Chatwoot | Open-Source Customer Support Platform on Railway

Deploy Chatwoot (Intercom alternative). Live chat, email, WhatsApp, etc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/self-host-chatwoot)

## About

Self-host Chatwoot — the open-source, AI-powered customer support platform — on Railway with a production-ready four-service stack. This template deploys the full Chatwoot Community Edition (`chatwoot/chatwoot:latest`) with a dedicated Rails web server, a Sidekiq background worker, a pgvector-enabled PostgreSQL database, and Redis — everything wired together automatically via Railway's private networking. 

Chatwoot gives your team a unified inbox for live chat, email, WhatsApp, Instagram, Facebook, Telegram, and more — all from a single dashboard. It's the self-hosted alternative to Intercom, Zendesk, and Freshdesk that lets you own your customer data completely. The source code is available at [github.com/chatwoot/chatwoot](https://github.com/chatwoot/chatwoot).

![Chatwoot dashboard screenshot](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773254105/Chatwoot_Railway_Architecture_nabdo7.png)

Chatwoot is an open-source customer support platform built with Ruby on Rails and Vue.js. It centralises customer conversations from every channel your team uses into a shared inbox, replacing the fragmented tab-switching between email, social DMs, and chat tools.

Key features:
- **Omnichannel inbox** — live chat, email, WhatsApp, Instagram, Facebook, Telegram, Line, SMS
- **AI-powered agent (Captain)** — reply suggestions, conversation summaries, and knowledge base answers powered by OpenAI (Enterprise/Premium)
- **Team collaboration** — shared inboxes, private notes, @mentions, canned responses, labels, and auto-assignment
- **Automation &amp; workflows** — rule-based triggers to auto-assign, label, or respond to conversations
- **Help center portal** — built-in knowledge base for self-service support
- **Extensive API &amp; webhooks** — build custom integrations or connect to Slack, Shopify, Dialogflow, and more
- **CSAT &amp; reporting** — conversation, agent, inbox, and team performance reports

**Architecture:** The web service runs Puma (Rails) on port 3000 and handles all HTTP traffic and WebSocket connections. Sidekiq runs as a separate service on the same Docker image, processing background jobs — email delivery, avatar fetching, scheduled tasks, event dispatch — via a shared Redis queue. Both services connect independently to the pgvector PostgreSQL database. Encryption keys and `SECRET_KEY_BASE` must be identical across both services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PgVector | `pgvector/pgvector:pg18` | Database |
| Chatwoot | `chatwoot/chatwoot:latest` | Web service |
| SideKiq | `chatwoot/chatwoot:latest` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | PgVector | railway | Database created on initialization |
| `DATABASE_URL` | PgVector | - | Public Postgres connection string |
| `POSTGRES_USER` | PgVector | (secret) | Default Postgres admin username |
| `PGHOST_PRIVATE` | PgVector | - | Internal Postgres hostname |
| `PGPORT_PRIVATE` | PgVector | 5432 | Internal Postgres port |
| `POSTGRES_PASSWORD` | PgVector | (secret) | Generated password for Postgres user |
| `DATABASE_URL_PRIVATE` | PgVector | - | Internal Postgres connection string |
| `PORT` | Chatwoot | 3000 | HTTP server listening port |
| `NODE_ENV` | Chatwoot | production | Run Node.js in production mode |
| `FORCE_SSL` | Chatwoot | false | Disable forced HTTPS redirects |
| `LOG_LEVEL` | Chatwoot | info | Logging verbosity level |
| `RAILS_ENV` | Chatwoot | production | Run Rails in production mode |
| `REDIS_URL` | Chatwoot | - | Redis connection string for queues |
| `FRONTEND_URL` | Chatwoot | - | Public URL of Chatwoot instance |
| `POSTGRES_HOST` | Chatwoot | - | Hostname of Postgres database |
| `POSTGRES_PORT` | Chatwoot | - | Postgres server port |
| `SECRET_KEY_BASE` | Chatwoot | (secret) | Secret used for Rails sessions |
| `INSTALLATION_ENV` | Chatwoot | docker | Deployment environment identifier |
| `POSTGRES_SSLMODE` | Chatwoot | require | Require SSL for database connection |
| `POSTGRES_DATABASE` | Chatwoot | - | Database name used by Chatwoot |
| `POSTGRES_PASSWORD` | Chatwoot | (secret) | Password for Postgres authentication |
| `POSTGRES_USERNAME` | Chatwoot | (secret) | Username for Postgres authentication |
| `DATABASE_SSL_VERIFY` | Chatwoot | false | Disable SSL certificate verification |
| `RAILS_LOG_TO_STDOUT` | Chatwoot | true | Send Rails logs to stdout |
| `ACTIVE_STORAGE_SERVICE` | Chatwoot | local | File storage backend for attachments |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | Chatwoot | - | Primary encryption key for database |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | Chatwoot | - | Deterministic encryption key |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | Chatwoot | - | Salt used for encryption key derivation |
| `LOG_LEVEL` | SideKiq | info | Logging verbosity level |
| `RAILS_ENV` | SideKiq | production | Run Rails in production mode |
| `REDIS_URL` | SideKiq | - | Redis connection string for background jobs |
| `FRONTEND_URL` | SideKiq | - | Public URL of Chatwoot instance |
| `POSTGRES_HOST` | SideKiq | - | Hostname of Postgres database |
| `POSTGRES_PORT` | SideKiq | - | Postgres server port |
| `SECRET_KEY_BASE` | SideKiq | (secret) | Shared Rails secret key |
| `INSTALLATION_ENV` | SideKiq | docker | Deployment environment identifier |
| `POSTGRES_SSLMODE` | SideKiq | require | Require SSL for database connection |
| `POSTGRES_DATABASE` | SideKiq | - | Database name used by Chatwoot |
| `POSTGRES_PASSWORD` | SideKiq | (secret) | Password for Postgres authentication |
| `POSTGRES_USERNAME` | SideKiq | (secret) | Username for Postgres authentication |
| `DATABASE_SSL_VERIFY` | SideKiq | false | Disable SSL certificate verification |
| `RAILS_LOG_TO_STDOUT` | SideKiq | true | Send Rails logs to stdout |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | SideKiq | - | Shared primary encryption key |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | SideKiq | - | Shared deterministic encryption key |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | SideKiq | - | Shared key derivation salt |
| `REDISHOST` | Redis | - | Internal hostname for Redis |
| `REDISPORT` | Redis | 6379 | Default Redis server port |
| `REDISUSER` | Redis | default | Redis authentication username |
| `REDIS_URL` | Redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | External Redis connection string |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`
- **Start command:** `bundle exec rails s -p 3000 -b 0.0.0.0`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Start command:** `bundle exec sidekiq -C config/sidekiq.yml`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/self-host-chatwoot)
