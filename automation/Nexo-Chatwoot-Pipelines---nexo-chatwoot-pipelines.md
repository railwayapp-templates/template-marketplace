# Deploy Nexo Chatwoot Pipelines on Railway

Chatwoot CE with Nexo Pipelines, Postgres 16, Valkey 8, and S3 storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nexo-chatwoot-pipelines)

## About

Deploy the Nexo Chatwoot Community Edition fork with first-class Pipelines:
configurable workflow stages, Kanban and list views, linked conversations,
activities, ownership, attention signals, automations, permissions, and
reporting foundations.

[Deploy Nexo Chatwoot Pipelines](https://railway.com/deploy/nexo-chatwoot-pipelines)

Nexo Chatwoot Pipelines is a multi-service Rails deployment. Railway runs Web
and Sidekiq Worker as separate stateless services, provisions PostgreSQL and
Valkey with persistent volumes, creates S3-compatible object storage, generates
installation-specific secrets, runs the database migration as a Web
pre-deploy release hook, and exposes only the Web service publicly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nexo-valkey | `valkey/valkey:8-alpine` | Database |
| Postgres | `pgvector/pgvector:pg16` | Database |
| nexo-chatwoot-worker | `ghcr.io/eliseoci/chatwoot-pipelines:v4.14.2-nexo.0@sha256:8576d9d3a9535a59fc729ea6c9394ab7a3bd70de9a1f8d3eac947a3daaa86d30` | Worker |
| nexo-chatwoot-web | `ghcr.io/eliseoci/chatwoot-pipelines:v4.14.2-nexo.0@sha256:8576d9d3a9535a59fc729ea6c9394ab7a3bd70de9a1f8d3eac947a3daaa86d30` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | nexo-valkey | 6379 | Valkey port. |
| `REDISUSER` | nexo-valkey | default | Valkey ACL user. |
| `REDISPASSWORD` | nexo-valkey | (secret) | - |
| `REDIS_PASSWORD` | nexo-valkey | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `NODE_ENV` | nexo-chatwoot-worker | production | Node runtime environment. |
| `RAILS_ENV` | nexo-chatwoot-worker | production | Rails runtime environment. |
| `SECRET_KEY_BASE` | nexo-chatwoot-worker | (secret) | - |
| `INSTALLATION_ENV` | nexo-chatwoot-worker | docker | Chatwoot installation type. |
| `RAILS_LOG_TO_STDOUT` | nexo-chatwoot-worker | true | Write Rails logs to Railway logs. |
| `ENABLE_ACCOUNT_SIGNUP` | nexo-chatwoot-worker | false | Keep public account registration disabled by default. |
| `ACTIVE_STORAGE_SERVICE` | nexo-chatwoot-worker | s3_compatible | Use the Railway bucket for attachments. |
| `RAILS_SERVE_STATIC_FILES` | nexo-chatwoot-worker | true | Serve compiled frontend assets from Web. |
| `STORAGE_FORCE_PATH_STYLE` | nexo-chatwoot-worker | false | Use virtual-host-style S3 URLs for Railway buckets. |
| `STORAGE_SECRET_ACCESS_KEY` | nexo-chatwoot-worker | (secret) | - |
| `NODE_ENV` | nexo-chatwoot-web | production | Node runtime environment. |
| `RAILS_ENV` | nexo-chatwoot-web | production | Rails runtime environment. |
| `SECRET_KEY_BASE` | nexo-chatwoot-web | (secret) | - |
| `INSTALLATION_ENV` | nexo-chatwoot-web | docker | Chatwoot installation type. |
| `RAILS_LOG_TO_STDOUT` | nexo-chatwoot-web | true | Write Rails logs to Railway logs. |
| `ENABLE_ACCOUNT_SIGNUP` | nexo-chatwoot-web | false | Keep public account registration disabled by default. |
| `ACTIVE_STORAGE_SERVICE` | nexo-chatwoot-web | s3_compatible | Use the Railway bucket for attachments. |
| `RAILS_SERVE_STATIC_FILES` | nexo-chatwoot-web | true | Serve compiled frontend assets from Web. |
| `STORAGE_FORCE_PATH_STYLE` | nexo-chatwoot-web | false | Use virtual-host-style S3 URLs for Railway buckets. |
| `STORAGE_SECRET_ACCESS_KEY` | nexo-chatwoot-web | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh valkey-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bundle exec sidekiq -C config/sidekiq.yml`
- **Start command:** `/bin/sh -lc 'bundle exec rails server -p "$PORT" -b 0.0.0.0'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/nexo-chatwoot-pipelines)
