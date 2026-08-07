# Deploy Chatwoot (Sidekiq Worker) on Railway

Intercom alternative with a dedicated Sidekiq worker and shared storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-sidekiq-worker)

## About

Chatwoot is an open-source customer engagement suite — a self-hosted Intercom
alternative that pulls live chat, email, WhatsApp, Instagram and Facebook into
one shared inbox. This template runs it the way Chatwoot's own production
compose file does: the Rails web process and the Sidekiq worker as two separate
services instead of one container doing both.

Deploying provisions four services and a storage bucket: a **Rails** service
serving the dashboard, API and chat widget, a **Sidekiq** service running every
background job, Postgres, Redis, and a Railway Storage Bucket that both halves
share. The first deploy takes a few minutes while the image pulls and Rails
loads the schema; the Sidekiq service restarts a couple of times in the meantime
until that schema exists, which is expected and self-healing. Only Rails gets a
public domain. When it comes up, open the domain and the installer asks you to
create the first admin account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Sidekiq | `chatwoot/chatwoot:v4.16.2-ce` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Rails | `chatwoot/chatwoot:v4.16.2-ce` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | Sidekiq | production | Node environment. Keep as production. |
| `LOG_LEVEL` | Sidekiq | info | Rails log level: debug, info, warn or error. |
| `RAILS_ENV` | Sidekiq | production | Rails environment. Keep as production. |
| `REDIS_URL` | Sidekiq | - | Redis backing Sidekiq's queues and Chatwoot's caches. |
| `SMTP_PORT` | Sidekiq | 587 | SMTP port. |
| `SMTP_DOMAIN` | Sidekiq | - | HELO domain presented to the SMTP server. |
| `DATABASE_URL` | Sidekiq | - | Postgres connection string over the private network. |
| `FRONTEND_URL` | Sidekiq | - | Same public URL as Rails, so links in outgoing email resolve. |
| `SMTP_ADDRESS` | Sidekiq | - | SMTP host. Leave empty to disable outgoing email. |
| `SMTP_PASSWORD` | Sidekiq | (secret) | SMTP password. |
| `SMTP_USERNAME` | Sidekiq | (secret) | SMTP username. |
| `DEFAULT_LOCALE` | Sidekiq | en | Language new accounts and signed-out pages default to. |
| `STORAGE_REGION` | Sidekiq | - | Region of the storage bucket. |
| `SECRET_KEY_BASE` | Sidekiq | (secret) | Must match Rails. |
| `INSTALLATION_ENV` | Sidekiq | docker | Tells Chatwoot it is running from the Docker image. |
| `STORAGE_ENDPOINT` | Sidekiq | - | S3 API endpoint for the bucket. |
| `MAILER_SENDER_EMAIL` | Sidekiq | Chatwoot <no-reply@example.com> | From address on outgoing mail. Use a domain your SMTP provider can send for. |
| `RAILS_LOG_TO_STDOUT` | Sidekiq | true | Send logs to Railway instead of a file inside the container. |
| `SIDEKIQ_CONCURRENCY` | Sidekiq | 10 | Jobs run in parallel per replica, and the size of this service's Postgres pool. |
| `SMTP_AUTHENTICATION` | Sidekiq | plain | SMTP auth mechanism: plain, login or cram_md5. |
| `STORAGE_BUCKET_NAME` | Sidekiq | - | Bucket holding uploads, avatars and generated exports. |
| `ENABLE_ACCOUNT_SIGNUP` | Sidekiq | false | Public sign-ups: true, false, or api_only. The first admin is created by the installer regardless. |
| `STORAGE_ACCESS_KEY_ID` | Sidekiq | - | Access key id for the bucket's S3 API. |
| `ACTIVE_STORAGE_SERVICE` | Sidekiq | s3_compatible | Active Storage backend. s3_compatible points Chatwoot at the Railway bucket. |
| `STORAGE_FORCE_PATH_STYLE` | Sidekiq | true | Railway buckets address objects by path, not by subdomain. |
| `SMTP_ENABLE_STARTTLS_AUTO` | Sidekiq | true | Upgrade the SMTP connection to TLS when the server offers it. |
| `STORAGE_SECRET_ACCESS_KEY` | Sidekiq | (secret) | Secret key for the bucket's S3 API. |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | Sidekiq | - | Must match Rails, or encrypted columns are unreadable here. |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | Sidekiq | - | Must match Rails. |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | Sidekiq | - | Must match Rails. |
| `POSTGRES_DB` | Postgres | railway | Default database created when the image starts. |
| `DATABASE_URL` | Postgres | - | Connection string used by Chatwoot over the private network. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to the Postgres database. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for the Postgres user. |
| `PORT` | Rails | 3000 | Port Puma binds. Must match the healthcheck probe. |
| `NODE_ENV` | Rails | production | Node environment. Keep as production. |
| `LOG_LEVEL` | Rails | info | Rails log level: debug, info, warn or error. |
| `RAILS_ENV` | Rails | production | Rails environment. Keep as production. |
| `REDIS_URL` | Rails | - | Redis backing Sidekiq's queues and Chatwoot's caches. |
| `SMTP_PORT` | Rails | 587 | SMTP port. |
| `SMTP_DOMAIN` | Rails | - | HELO domain presented to the SMTP server. |
| `DATABASE_URL` | Rails | - | Postgres connection string over the private network. |
| `FRONTEND_URL` | Rails | - | Public URL of this install. Used in emails, widget snippets and OAuth callbacks. |
| `SMTP_ADDRESS` | Rails | - | SMTP host. Leave empty to disable outgoing email. |
| `SMTP_PASSWORD` | Rails | (secret) | SMTP password. |
| `SMTP_USERNAME` | Rails | (secret) | SMTP username. |
| `DEFAULT_LOCALE` | Rails | en | Language new accounts and signed-out pages default to. |
| `STORAGE_REGION` | Rails | - | Region of the storage bucket. |
| `SECRET_KEY_BASE` | Rails | (secret) | Generated key signing sessions and cookies. Shared with Sidekiq. |
| `INSTALLATION_ENV` | Rails | docker | Tells Chatwoot it is running from the Docker image. |
| `STORAGE_ENDPOINT` | Rails | - | S3 API endpoint for the bucket. |
| `RAILS_MAX_THREADS` | Rails | 5 | Puma threads, and the size of this service's Postgres pool. |
| `MAILER_SENDER_EMAIL` | Rails | Chatwoot <no-reply@example.com> | From address on outgoing mail. Use a domain your SMTP provider can send for. |
| `RAILS_LOG_TO_STDOUT` | Rails | true | Send logs to Railway instead of a file inside the container. |
| `SMTP_AUTHENTICATION` | Rails | plain | SMTP auth mechanism: plain, login or cram_md5. |
| `STORAGE_BUCKET_NAME` | Rails | - | Bucket holding uploads, avatars and generated exports. |
| `ENABLE_ACCOUNT_SIGNUP` | Rails | false | Public sign-ups: true, false, or api_only. The first admin is created by the installer regardless. |
| `STORAGE_ACCESS_KEY_ID` | Rails | - | Access key id for the bucket's S3 API. |
| `ACTIVE_STORAGE_SERVICE` | Rails | s3_compatible | Active Storage backend. s3_compatible points Chatwoot at the Railway bucket. |
| `STORAGE_FORCE_PATH_STYLE` | Rails | true | Railway buckets address objects by path, not by subdomain. |
| `SMTP_ENABLE_STARTTLS_AUTO` | Rails | true | Upgrade the SMTP connection to TLS when the server offers it. |
| `STORAGE_SECRET_ACCESS_KEY` | Rails | (secret) | Secret key for the bucket's S3 API. |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | Rails | - | Generated key encrypting sensitive columns, including 2FA secrets. Shared with Sidekiq. |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | Rails | - | Generated key for encrypted columns that must stay queryable. Shared with Sidekiq. |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | Rails | - | Generated salt for encryption key derivation. Shared with Sidekiq. |
| `REDISHOST` | Redis | - | Railway private domain name for Redis. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default Redis user. |
| `REDIS_URL` | Redis | - | Connection string for Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, used by the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password protecting Redis. |

## Configuration

- **Start command:** `bundle exec sidekiq -C config/sidekiq.yml`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -f tmp/pids/server.pid; bundle exec rails db:chatwoot_prepare && exec bundle exec rails s -p $PORT -b 0.0.0.0"`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/chatwoot-sidekiq-worker)
