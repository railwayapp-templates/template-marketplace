# Deploy Chatwoot v4 Omnichannel Support Desk on Railway

Live chat, email, WhatsApp Cloud API and social inbox with AI assist.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-v4-omnichannel-support-desk)

## About

Chatwoot is an open-source customer support platform that brings website live chat, email, WhatsApp, Facebook, Instagram, Telegram and other channels into one shared team inbox. This community template runs Chatwoot v4 on Railway with a separate Sidekiq worker, PostgreSQL with pgvector, Redis and a Railway Bucket for attachments.

Chatwoot is a Rails application with two processes: the web server (dashboard, REST API, website widget and real-time updates over Action Cable) and Sidekiq, which runs background jobs such as sending emails, syncing channels, delivering webhooks and AI tasks. Both need PostgreSQL (with the pgvector extension, which Chatwoot's schema requires) and Redis. Because Railway volumes belong to a single service, this template stores attachments and avatars in a Railway Bucket through Active Storage, so the web server and every Sidekiq replica see the same files. Database migrations run in a Railway pre-deploy step before each release, all secrets are generated, and the first visitor completes Chatwoot's installation onboarding to become Super Admin.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatwoot-sidekiq | [baranberkay96/chatwoot-railway](https://github.com/baranberkay96/chatwoot-railway) (branch: main) (root: /services/chatwoot) | Worker |
| chatwoot | [baranberkay96/chatwoot-railway](https://github.com/baranberkay96/chatwoot-railway) (branch: main) (root: /services/chatwoot) | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `pgvector/pgvector:0.8.7-pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LOG_LEVEL` | chatwoot-sidekiq | info | Rails log level. |
| `REDIS_URL` | chatwoot-sidekiq | - | Redis for Sidekiq queues, Action Cable and caching. |
| `FRONTEND_URL` | chatwoot-sidekiq | - | Same value as on chatwoot. |
| `POSTGRES_HOST` | chatwoot-sidekiq | - | Postgres (pgvector) host, private network. |
| `POSTGRES_PORT` | chatwoot-sidekiq | 5432 | Postgres port. |
| `STORAGE_REGION` | chatwoot-sidekiq | - | Bucket region. |
| `SECRET_KEY_BASE` | chatwoot-sidekiq | (secret) | Same value as on chatwoot. |
| `STORAGE_ENDPOINT` | chatwoot-sidekiq | - | Bucket S3 endpoint. |
| `POSTGRES_DATABASE` | chatwoot-sidekiq | - | Chatwoot database. |
| `POSTGRES_PASSWORD` | chatwoot-sidekiq | (secret) | Postgres password. |
| `POSTGRES_USERNAME` | chatwoot-sidekiq | (secret) | Postgres user. |
| `MAILER_SENDER_EMAIL` | chatwoot-sidekiq | - | Same value as on chatwoot. |
| `SIDEKIQ_CONCURRENCY` | chatwoot-sidekiq | 10 | Sidekiq threads per replica (also the DB pool size). |
| `STORAGE_BUCKET_NAME` | chatwoot-sidekiq | - | Bucket name. |
| `STORAGE_ACCESS_KEY_ID` | chatwoot-sidekiq | - | Bucket access key. |
| `ACTIVE_STORAGE_SERVICE` | chatwoot-sidekiq | s3_compatible | Attachments/avatars in the Railway Bucket so web and Sidekiq see the same files. |
| `STORAGE_FORCE_PATH_STYLE` | chatwoot-sidekiq | false | Railway Buckets use virtual-hosted URLs (set true only for old path-style buckets). |
| `STORAGE_SECRET_ACCESS_KEY` | chatwoot-sidekiq | (secret) | Bucket secret key. |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | chatwoot-sidekiq | - | Same value as on chatwoot. |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | chatwoot-sidekiq | - | Same value as on chatwoot. |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | chatwoot-sidekiq | - | Same value as on chatwoot. |
| `PORT` | chatwoot | 3000 | Puma port (domain + healthcheck). |
| `FORCE_SSL` | chatwoot | false | Railway terminates TLS at its edge; keep false to avoid redirect loops. |
| `LOG_LEVEL` | chatwoot | info | Rails log level. |
| `REDIS_URL` | chatwoot | - | Redis for Sidekiq queues, Action Cable and caching. |
| `FRONTEND_URL` | chatwoot | - | Public URL (links in emails, widget script). Update for a custom domain. |
| `POSTGRES_HOST` | chatwoot | - | Postgres (pgvector) host, private network. |
| `POSTGRES_PORT` | chatwoot | 5432 | Postgres port. |
| `STORAGE_REGION` | chatwoot | - | Bucket region. |
| `SECRET_KEY_BASE` | chatwoot | (secret) | Rails secret (signed cookies, tokens). Shared with Sidekiq. Never change after first boot. |
| `WEB_CONCURRENCY` | chatwoot | 0 | Puma worker processes (0 = single process). Raise to 2 for busy installs. |
| `STORAGE_ENDPOINT` | chatwoot | - | Bucket S3 endpoint. |
| `POSTGRES_DATABASE` | chatwoot | - | Chatwoot database. |
| `POSTGRES_PASSWORD` | chatwoot | (secret) | Postgres password. |
| `POSTGRES_USERNAME` | chatwoot | (secret) | Postgres user. |
| `RAILS_MAX_THREADS` | chatwoot | 5 | Puma threads per process. |
| `MAILER_SENDER_EMAIL` | chatwoot | Chatwoot <noreply@example.com> | From address for outgoing email (needs SMTP, see docs). |
| `STORAGE_BUCKET_NAME` | chatwoot | - | Bucket name. |
| `ENABLE_ACCOUNT_SIGNUP` | chatwoot | false | Public sign-up. Read once on first boot; afterwards change it in Super Admin > App Configs. |
| `STORAGE_ACCESS_KEY_ID` | chatwoot | - | Bucket access key. |
| `ACTIVE_STORAGE_SERVICE` | chatwoot | s3_compatible | Attachments/avatars in the Railway Bucket so web and Sidekiq see the same files. |
| `CAPTAIN_OPEN_AI_API_KEY` | chatwoot | (secret) | Optional. OpenAI key for Captain AI; copied into Super Admin config on deploy if not set there yet. |
| `STORAGE_FORCE_PATH_STYLE` | chatwoot | false | Railway Buckets use virtual-hosted URLs (set true only for old path-style buckets). |
| `STORAGE_SECRET_ACCESS_KEY` | chatwoot | (secret) | Bucket secret key. |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | chatwoot | - | Active Record encryption key (MFA, encrypted columns). Never change. |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | chatwoot | - | Active Record deterministic encryption key. Never change. |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | chatwoot | - | Active Record key derivation salt. Never change. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres (private network, no TLS). |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/app/railway/sidekiq.sh`
- **Start command:** `/app/railway/web.sh`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Tags:** chatwoot, customer-support, live-chat, helpdesk, omnichannel · **Languages:** Shell, Ruby, Dockerfile

[View on Railway →](https://railway.com/deploy/chatwoot-v4-omnichannel-support-desk)
