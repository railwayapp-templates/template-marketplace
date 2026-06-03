# Deploy Chatwoot | Customer Support Platform on Railway

Deploy and host Chatwoot on railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-or-customer-support-platform)

## About

Chatwoot is a modern, open-source customer support platform designed to provide an exceptional omnichannel experience. Serving as a robust alternative to Intercom or Zendesk, it centralizes live chat, email, and social media messaging into a single powerful inbox while offering built-in AI support agents and help center portals.

Deploying Chatwoot involves orchestrating a Ruby on Rails backend and a Vue.js frontend, which requires PostgreSQL for robust data storage and Redis for background job processing and real-time websocket features. Managing a production instance means configuring environment variables for omni-channel webhooks, email delivery (SMTP), and optional cloud object storage for user attachments. Using a modern cloud platform simplifies this process by automating the deployment of these distinct services, allowing you to easily scale background worker processes, manage persistent volumes, and run database migrations seamlessly without dealing with manual infrastructure provisioning.

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

[View on Railway →](https://railway.com/deploy/chatwoot-or-customer-support-platform)
