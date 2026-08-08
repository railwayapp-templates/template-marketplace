# Deploy Chatwoot on Railway

Intercom, Zendesk Alternative: Modern customer support platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-customer-support)

## About

Chatwoot is an open-source customer engagement platform: live chat, email, WhatsApp, Instagram, Facebook, Telegram and SMS collapsed into one shared inbox your support agents work from. Built on Rails and Vue, it is the self-hosted alternative to Intercom, Zendesk and Freshdesk — no per-seat fee, and every conversation stays on infrastructure you control.

Self-host Chatwoot on Railway from the official `chatwoot/chatwoot:v4.16.2-ce` image. `chatwoot-web` runs Puma on port `3000` behind the public domain, health-checked at `/health`; a private `chatwoot-worker` runs Sidekiq, so job throughput is never tied to web memory. Managed **Postgres**, **Redis** and a Railway **object storage bucket** hold records, queues and attachments — no volume needed.

![Chatwoot Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786135138/43e06718-1729-487e-b920-d58e935c3f58.png)

Self-host Chatwoot when transcripts are regulated data, when per-agent pricing stops scaling, or when the widget must come from your domain.

- **Shared omnichannel inbox** — website chat, email, WhatsApp, Instagram, Facebook, Telegram, SMS and an API channel in one queue.
- **Embeddable live chat widget** — colours, greetings, pre-chat forms and business hours per inbox.
- **Automations, canned responses and a Help Center** — routing rules plus a knowledge base inside the widget.
- **Reports, CSAT and CSV export**, a **REST API**, signed **webhooks** and **agent bots**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| chatwoot-web | `chatwoot/chatwoot:v4.16.2-ce` | Web service |
| chatwoot-worker | `chatwoot/chatwoot:v4.16.2-ce` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | chatwoot-web | 3000 | HTTP port, matches public target port |
| `NODE_ENV` | chatwoot-web | production | Node environment for asset serving |
| `FORCE_SSL` | chatwoot-web | true | HSTS and secure session cookies |
| `LOG_LEVEL` | chatwoot-web | info | Application log verbosity |
| `RAILS_ENV` | chatwoot-web | production | Rails environment |
| `REDIS_URL` | chatwoot-web | - | Sidekiq queues and ActionCable |
| `DATABASE_URL` | chatwoot-web | - | Postgres connection string |
| `FRONTEND_URL` | chatwoot-web | - | Public base URL for links and emails |
| `DEFAULT_LOCALE` | chatwoot-web | en | Locale seeded onto new accounts |
| `STORAGE_REGION` | chatwoot-web | - | Bucket signing region |
| `SECRET_KEY_BASE` | chatwoot-web | (secret) | Signs sessions, keep stable |
| `WEB_CONCURRENCY` | chatwoot-web | 2 | Puma cluster worker processes |
| `INSTALLATION_ENV` | chatwoot-web | docker | Reported installation method |
| `STORAGE_ENDPOINT` | chatwoot-web | - | S3-compatible endpoint |
| `RACK_ATTACK_LIMIT` | chatwoot-web | 300 | Requests per five-minute window |
| `RAILS_MAX_THREADS` | chatwoot-web | 5 | Puma max threads per worker |
| `RAILS_MIN_THREADS` | chatwoot-web | 5 | Puma min threads per worker |
| `ENABLE_RACK_ATTACK` | chatwoot-web | true | Enable request rate limiting |
| `MAILER_SENDER_EMAIL` | chatwoot-web | Chatwoot <support@example.com> | Default outbound sender address |
| `RAILS_LOG_TO_STDOUT` | chatwoot-web | true | Send logs to the platform |
| `SIDEKIQ_CONCURRENCY` | chatwoot-web | 10 | Also sizes the Sidekiq DB pool |
| `STORAGE_BUCKET_NAME` | chatwoot-web | - | Attachment bucket name |
| `ENABLE_ACCOUNT_SIGNUP` | chatwoot-web | false | Blocks public account signup |
| `STORAGE_ACCESS_KEY_ID` | chatwoot-web | - | Bucket access key id |
| `ACTIVE_STORAGE_SERVICE` | chatwoot-web | s3_compatible | Store attachments in the bucket |
| `STORAGE_FORCE_PATH_STYLE` | chatwoot-web | false | Virtual-host bucket addressing |
| `STORAGE_SECRET_ACCESS_KEY` | chatwoot-web | (secret) | Bucket secret access key |
| `POSTGRES_STATEMENT_TIMEOUT` | chatwoot-web | 14s | Per-statement timeout for the app |
| `ENABLE_RACK_ATTACK_WIDGET_API` | chatwoot-web | true | Rate limit the widget API too |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | chatwoot-web | - | Encrypts MFA secrets |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | chatwoot-web | - | Deterministic encryption key |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | chatwoot-web | - | Key derivation salt |
| `NODE_ENV` | chatwoot-worker | production | Node environment |
| `LOG_LEVEL` | chatwoot-worker | info | Application log verbosity |
| `RAILS_ENV` | chatwoot-worker | production | Rails environment |
| `REDIS_URL` | chatwoot-worker | - | Sidekiq queue backend |
| `DATABASE_URL` | chatwoot-worker | - | Postgres connection string |
| `FRONTEND_URL` | chatwoot-worker | - | Public base URL used in jobs |
| `DEFAULT_LOCALE` | chatwoot-worker | en | Locale seeded onto new accounts |
| `STORAGE_REGION` | chatwoot-worker | - | Bucket signing region |
| `SECRET_KEY_BASE` | chatwoot-worker | (secret) | Must match the web service |
| `INSTALLATION_ENV` | chatwoot-worker | docker | Reported installation method |
| `STORAGE_ENDPOINT` | chatwoot-worker | - | S3-compatible endpoint |
| `MAILER_SENDER_EMAIL` | chatwoot-worker | Chatwoot <support@example.com> | Default outbound sender address |
| `RAILS_LOG_TO_STDOUT` | chatwoot-worker | true | Send logs to the platform |
| `SIDEKIQ_CONCURRENCY` | chatwoot-worker | 10 | Worker threads and DB pool size |
| `STORAGE_BUCKET_NAME` | chatwoot-worker | - | Attachment bucket name |
| `STORAGE_ACCESS_KEY_ID` | chatwoot-worker | - | Bucket access key id |
| `ACTIVE_STORAGE_SERVICE` | chatwoot-worker | s3_compatible | Store attachments in the bucket |
| `STORAGE_FORCE_PATH_STYLE` | chatwoot-worker | false | Virtual-host bucket addressing |
| `STORAGE_SECRET_ACCESS_KEY` | chatwoot-worker | (secret) | Bucket secret access key |
| `POSTGRES_STATEMENT_TIMEOUT` | chatwoot-worker | 14s | Per-statement timeout for jobs |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | chatwoot-worker | - | Must match the web service |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | chatwoot-worker | - | Must match the web service |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | chatwoot-worker | - | Must match the web service |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'echo "Rails.application.config.assume_ssl = true" > /app/config/initializers/zz_railway_assume_ssl.rb; exec bundle exec rails s -p 3000 -b 0.0.0.0'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'bundle exec rails ip_lookup:setup && exec bundle exec sidekiq -C config/sidekiq.yml'`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/chatwoot-customer-support)
