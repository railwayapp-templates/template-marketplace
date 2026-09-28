# Deploy Langfuse 4 | LLM Observability, Evals and Prompt Management on Railway

Langfuse v4 with ClickHouse, S3 bucket and API keys ready on first boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langfuse-4)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/langfuse-4?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=langfuse-4)

[Langfuse](https://langfuse.com/) is the open-source LLM engineering platform: tracing for every model call, tool call and agent step, prompt management, evaluations, datasets and cost tracking. This template runs Langfuse v4, the current major version, with the same architecture Langfuse Cloud uses: web, worker, ClickHouse, Postgres, Redis and object storage. Your organization, project and API keys exist the moment the deploy finishes.

- **The full v4 stack, pinned.** Langfuse web and worker 4.46.0, ClickHouse 25.12, Postgres 17 and Redis 8, all on Railway's private network. Nothing but the web UI has a public address.
- **Traces in a Railway bucket.** Raw events, media attached to traces and batch exports go to the bundled bucket instead of a MinIO container, so there is no storage service to size or back up.
- **API keys on first boot.** The first boot creates your admin user, an organization, a project and its public and secret keys. Copy the keys from the Variables tab into your app, no clicking through the UI first.
- **Closed by default.** Public sign-up is off: only the admin created on first boot can log in until you invite others.
- **Upgrades that migrate themselves.** The web service runs the Postgres and ClickHouse migrations on every start, so bumping the image tag is the whole upgrade.
- **A quiet ClickHouse.** Logs go to Railway's log view instead of gigabytes of files on the container disk, and the internal metric tables that write every second are off. That leaves more of your plan's memory and disk for traces.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.10.2-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| ClickHouse | [nomideusz/langfuse-railway](https://github.com/nomideusz/langfuse-railway) (root: /clickhouse) | Database |
| Langfuse | `langfuse/langfuse:4.46.0` | Web service |
| Worker | `langfuse/langfuse-worker:4.46.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `POSTGRES_DB` | Postgres | langfuse | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password (letters and digits: it goes into a URL) |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Auto-generated ClickHouse password (letters and digits: it goes into a URL) |
| `PORT` | Langfuse | 3000 | Port Langfuse listens on - leave as is |
| `SALT` | Langfuse | - | Salt for hashing API keys - never change after the first deploy |
| `HOSTNAME` | Langfuse | :: | Listen on IPv4 and IPv6 - leave as is |
| `REDIS_AUTH` | Langfuse | - | Redis password - leave as is |
| `REDIS_HOST` | Langfuse | - | Redis host - private network, leave as is |
| `REDIS_PORT` | Langfuse | 6379 | Redis port |
| `DATABASE_URL` | Langfuse | - | Postgres connection - private network, leave as is |
| `NEXTAUTH_URL` | Langfuse | - | Public URL of Langfuse - set it to your custom domain when you add one |
| `CLICKHOUSE_URL` | Langfuse | - | ClickHouse HTTP endpoint - private network, leave as is |
| `ENCRYPTION_KEY` | Langfuse | - | 64 hex chars encrypting stored LLM API keys - never change after the first deploy |
| `CLICKHOUSE_USER` | Langfuse | (secret) | ClickHouse user - leave as is |
| `NEXTAUTH_SECRET` | Langfuse | (secret) | Signs login sessions |
| `AUTH_DISABLE_SIGNUP` | Langfuse | true | Only invited users can join. Set to false to let anyone with the URL sign up |
| `CLICKHOUSE_PASSWORD` | Langfuse | (secret) | ClickHouse password - leave as is |
| `LANGFUSE_INIT_ORG_ID` | Langfuse | my-org | ID of the organization created on first boot |
| `LANGFUSE_INIT_ORG_NAME` | Langfuse | My Organization | Name of the organization created on first boot |
| `LANGFUSE_INIT_USER_NAME` | Langfuse | Admin | Display name of the first admin |
| `CLICKHOUSE_MIGRATION_URL` | Langfuse | - | ClickHouse native endpoint for migrations - leave as is |
| `LANGFUSE_INIT_PROJECT_ID` | Langfuse | my-project | ID of the project created on first boot |
| `LANGFUSE_INIT_USER_EMAIL` | Langfuse | - | Your email - the first admin login, created on first boot |
| `CLICKHOUSE_CLUSTER_ENABLED` | Langfuse | false | Single-node ClickHouse |
| `LANGFUSE_INIT_PROJECT_NAME` | Langfuse | My Project | Name of the project created on first boot |
| `LANGFUSE_INIT_USER_PASSWORD` | Langfuse | (secret) | Password of the first admin - copy it from here to log in, then change it in Langfuse |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | Langfuse | - | CSV/JSON exports go to the bundled Railway bucket - leave as is |
| `LANGFUSE_S3_BATCH_EXPORT_PREFIX` | Langfuse | exports/ | Key prefix inside the bucket |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | Langfuse | - | Bucket region |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Langfuse | - | Raw ingested events go to the bundled Railway bucket - leave as is |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Langfuse | events/ | Key prefix inside the bucket |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Langfuse | - | Bucket region |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | Langfuse | - | Images, audio and files attached to traces go to the bundled Railway bucket - leave as is |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | Langfuse | media/ | Key prefix inside the bucket |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | Langfuse | - | Bucket region |
| `LANGFUSE_INIT_PROJECT_PUBLIC_KEY` | Langfuse | - | Project public key (LANGFUSE_PUBLIC_KEY in your app) |
| `LANGFUSE_INIT_PROJECT_SECRET_KEY` | Langfuse | (secret) | Project secret key (LANGFUSE_SECRET_KEY in your app) |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | Langfuse | true | Exports are written to the bucket and downloaded from a signed link |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | Langfuse | - | Bucket endpoint |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | Langfuse | - | Bucket endpoint |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | Langfuse | - | Bucket endpoint |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | Langfuse | - | Bucket credentials |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Langfuse | - | Bucket credentials |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | Langfuse | - | Bucket credentials |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | Langfuse | false | Railway buckets use virtual-host style addressing |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Langfuse | false | Railway buckets use virtual-host style addressing |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | Langfuse | false | Railway buckets use virtual-host style addressing |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | Langfuse | (secret) | Bucket credentials |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Langfuse | (secret) | Bucket credentials |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | Langfuse | (secret) | Bucket credentials |
| `PORT` | Worker | 3030 | Worker health endpoint port - leave as is |
| `SALT` | Worker | - | Salt for hashing API keys - never change after the first deploy |
| `REDIS_AUTH` | Worker | - | Redis password - leave as is |
| `REDIS_HOST` | Worker | - | Redis host - private network, leave as is |
| `REDIS_PORT` | Worker | 6379 | Redis port |
| `DATABASE_URL` | Worker | - | Postgres connection - private network, leave as is |
| `NEXTAUTH_URL` | Worker | - | Public URL of Langfuse - set it to your custom domain when you add one |
| `CLICKHOUSE_URL` | Worker | - | ClickHouse HTTP endpoint - private network, leave as is |
| `ENCRYPTION_KEY` | Worker | - | 64 hex chars encrypting stored LLM API keys - never change after the first deploy |
| `CLICKHOUSE_USER` | Worker | (secret) | ClickHouse user - leave as is |
| `CLICKHOUSE_PASSWORD` | Worker | (secret) | ClickHouse password - leave as is |
| `CLICKHOUSE_MIGRATION_URL` | Worker | - | ClickHouse native endpoint for migrations - leave as is |
| `CLICKHOUSE_CLUSTER_ENABLED` | Worker | false | Single-node ClickHouse |
| `LANGFUSE_S3_BATCH_EXPORT_BUCKET` | Worker | - | CSV/JSON exports go to the bundled Railway bucket - leave as is |
| `LANGFUSE_S3_BATCH_EXPORT_PREFIX` | Worker | exports/ | Key prefix inside the bucket |
| `LANGFUSE_S3_BATCH_EXPORT_REGION` | Worker | - | Bucket region |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | Worker | - | Raw ingested events go to the bundled Railway bucket - leave as is |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | Worker | events/ | Key prefix inside the bucket |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | Worker | - | Bucket region |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | Worker | - | Images, audio and files attached to traces go to the bundled Railway bucket - leave as is |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | Worker | media/ | Key prefix inside the bucket |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | Worker | - | Bucket region |
| `LANGFUSE_S3_BATCH_EXPORT_ENABLED` | Worker | true | Exports are written to the bucket and downloaded from a signed link |
| `LANGFUSE_S3_BATCH_EXPORT_ENDPOINT` | Worker | - | Bucket endpoint |
| `LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT` | Worker | - | Bucket endpoint |
| `LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT` | Worker | - | Bucket endpoint |
| `LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID` | Worker | - | Bucket credentials |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | Worker | - | Bucket credentials |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | Worker | - | Bucket credentials |
| `LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE` | Worker | false | Railway buckets use virtual-host style addressing |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | Worker | false | Railway buckets use virtual-host style addressing |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | Worker | false | Railway buckets use virtual-host style addressing |
| `LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY` | Worker | (secret) | Bucket credentials |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | Worker | (secret) | Bucket credentials |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | Worker | (secret) | Bucket credentials |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf /data/lost+found && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --maxmemory-policy noeviction --appendonly yes --dir /data"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/api/public/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/langfuse-4)
