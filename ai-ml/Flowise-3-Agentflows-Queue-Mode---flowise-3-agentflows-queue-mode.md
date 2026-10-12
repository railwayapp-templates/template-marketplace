# Deploy Flowise 3 Agentflows (Queue Mode) on Railway

Visual LLM agent builder with Redis queue workers for heavy, parallel runs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-3-agentflows-queue-mode)

## About

Flowise is an open-source, low-code builder for LLM chatbots, agents and multi-agent Agentflows. This community template runs Flowise 3 in queue mode: a main server for the UI and API, scalable worker containers that execute flows from a Redis queue, Postgres for data and a Railway Bucket for files.

A single Flowise container handles the editor, the API and every flow execution in one Node.js process, so one heavy document upsert or long agent run slows everyone down. Flowise's queue mode splits this: the main server accepts requests and pushes executions to Redis (BullMQ), and dedicated workers pick them up in parallel. Running it properly needs Postgres instead of SQLite, shared object storage for uploads, and the same encryption and session secrets on every container. This template wires those pieces on Railway with generated secrets and private networking, so workers can be scaled with replicas.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Flowise | `flowiseai/flowise:3.1.4` | Web service |
| Flowise Worker | `flowiseai/flowise-worker:3.1.4` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `MODE` | Flowise | queue | Queue mode: the main server enqueues executions in Redis (BullMQ), workers run them. |
| `PORT` | Flowise | 3000 | HTTP port (public domain target). |
| `APP_URL` | Flowise | - | Public URL (links in emails, secure cookies). |
| `LOG_LEVEL` | Flowise | info | error | warn | info | verbose | debug. |
| `REDIS_URL` | Flowise | - | Redis for queue, sessions and streaming. family=0 lets ioredis use IPv6 private networking. |
| `SMTP_HOST` | Flowise | - | Optional: SMTP server for invites and password resets. |
| `SMTP_PORT` | Flowise | - | Optional: SMTP port (e.g. 465 or 587). |
| `SMTP_USER` | Flowise | (secret) | Optional: SMTP username. |
| `JWT_ISSUER` | Flowise | Flowise | JWT issuer. |
| `QUEUE_NAME` | Flowise | flowise-queue | BullMQ queue name (must match on main and workers). |
| `SMTP_SECURE` | Flowise | true | Use TLS for SMTP. |
| `DATABASE_SSL` | Flowise | false | Private network; TLS not required. |
| `JWT_AUDIENCE` | Flowise | Flowise | JWT audience. |
| `SENDER_EMAIL` | Flowise | - | Optional: From address for emails. |
| `STORAGE_TYPE` | Flowise | s3 | Uploaded files go to the Railway Bucket (shared by main and workers). |
| `DATABASE_HOST` | Flowise | - | Postgres private host. |
| `DATABASE_NAME` | Flowise | - | Postgres database. |
| `DATABASE_PORT` | Flowise | - | Postgres port. |
| `DATABASE_TYPE` | Flowise | postgres | Database engine. |
| `DATABASE_USER` | Flowise | (secret) | Postgres user. |
| `REMOVE_ON_AGE` | Flowise | 86400 | Remove finished jobs after N seconds. |
| `SMTP_PASSWORD` | Flowise | (secret) | Optional: SMTP password. |
| `REMOVE_ON_COUNT` | Flowise | 10000 | Keep at most N finished jobs. |
| `S3_ENDPOINT_URL` | Flowise | - | Railway Bucket S3 endpoint. |
| `DATABASE_PASSWORD` | Flowise | (secret) | Postgres password. |
| `S3_STORAGE_REGION` | Flowise | - | Railway Bucket region. |
| `TOKEN_HASH_SECRET` | Flowise | (secret) | Secret used to hash reset/invite tokens. |
| `S3_FORCE_PATH_STYLE` | Flowise | false | Railway Buckets use virtual-hosted style; set true only if the bucket's Credentials tab says path-style. |
| `JWT_AUTH_TOKEN_SECRET` | Flowise | (secret) | JWT signing secret for access tokens. |
| `EXPRESS_SESSION_SECRET` | Flowise | (secret) | Session cookie signing secret. |
| `S3_STORAGE_BUCKET_NAME` | Flowise | - | Railway Bucket name. |
| `ENABLE_BULLMQ_DASHBOARD` | Flowise | true | Queue dashboard at /admin/queues (requires a logged-in user). |
| `FLOWISE_FILE_SIZE_LIMIT` | Flowise | 50mb | Max upload size. |
| `JWT_REFRESH_TOKEN_SECRET` | Flowise | (secret) | JWT signing secret for refresh tokens. |
| `S3_STORAGE_ACCESS_KEY_ID` | Flowise | - | Railway Bucket access key. |
| `DISABLE_FLOWISE_TELEMETRY` | Flowise | true | Disable anonymous telemetry. |
| `FLOWISE_SECRETKEY_OVERWRITE` | Flowise | (secret) | Encryption key for stored credentials, shared by main and workers. Never change after first boot. |
| `JWT_TOKEN_EXPIRY_IN_MINUTES` | Flowise | (secret) | Access token lifetime. |
| `S3_STORAGE_SECRET_ACCESS_KEY` | Flowise | (secret) | Railway Bucket secret key. |
| `QUEUE_REDIS_EVENT_STREAM_MAX_LEN` | Flowise | 10000 | Max events kept per Redis stream. |
| `JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES` | Flowise | (secret) | Refresh token lifetime. |
| `MODE` | Flowise Worker | - | Queue mode: the main server enqueues executions in Redis (BullMQ), workers run them. |
| `PORT` | Flowise Worker | 5566 | Port of the worker's health endpoint (Railway healthcheck). |
| `APP_URL` | Flowise Worker | - | Public URL (links in emails, secure cookies). |
| `LOG_LEVEL` | Flowise Worker | - | error | warn | info | verbose | debug. |
| `REDIS_URL` | Flowise Worker | - | Redis for queue, sessions and streaming. family=0 lets ioredis use IPv6 private networking. |
| `JWT_ISSUER` | Flowise Worker | - | JWT issuer. |
| `QUEUE_NAME` | Flowise Worker | - | BullMQ queue name (must match on main and workers). |
| `WORKER_PORT` | Flowise Worker | 5566 | Health endpoint port inside the worker image. |
| `DATABASE_SSL` | Flowise Worker | - | Private network; TLS not required. |
| `JWT_AUDIENCE` | Flowise Worker | - | JWT audience. |
| `STORAGE_TYPE` | Flowise Worker | - | Uploaded files go to the Railway Bucket (shared by main and workers). |
| `DATABASE_HOST` | Flowise Worker | - | Postgres private host. |
| `DATABASE_NAME` | Flowise Worker | - | Postgres database. |
| `DATABASE_PORT` | Flowise Worker | - | Postgres port. |
| `DATABASE_TYPE` | Flowise Worker | - | Database engine. |
| `DATABASE_USER` | Flowise Worker | (secret) | Postgres user. |
| `REMOVE_ON_AGE` | Flowise Worker | - | Remove finished jobs after N seconds. |
| `REMOVE_ON_COUNT` | Flowise Worker | - | Keep at most N finished jobs. |
| `S3_ENDPOINT_URL` | Flowise Worker | - | Railway Bucket S3 endpoint. |
| `DATABASE_PASSWORD` | Flowise Worker | (secret) | Postgres password. |
| `S3_STORAGE_REGION` | Flowise Worker | - | Railway Bucket region. |
| `TOKEN_HASH_SECRET` | Flowise Worker | (secret) | Secret used to hash reset/invite tokens. |
| `WORKER_CONCURRENCY` | Flowise Worker | 25 | Executions processed in parallel per worker replica. |
| `S3_FORCE_PATH_STYLE` | Flowise Worker | - | Railway Buckets use virtual-hosted style; set true only if the bucket's Credentials tab says path-style. |
| `JWT_AUTH_TOKEN_SECRET` | Flowise Worker | (secret) | JWT signing secret for access tokens. |
| `EXPRESS_SESSION_SECRET` | Flowise Worker | (secret) | Session cookie signing secret. |
| `S3_STORAGE_BUCKET_NAME` | Flowise Worker | - | Railway Bucket name. |
| `FLOWISE_FILE_SIZE_LIMIT` | Flowise Worker | - | Max upload size. |
| `JWT_REFRESH_TOKEN_SECRET` | Flowise Worker | (secret) | JWT signing secret for refresh tokens. |
| `S3_STORAGE_ACCESS_KEY_ID` | Flowise Worker | - | Railway Bucket access key. |
| `DISABLE_FLOWISE_TELEMETRY` | Flowise Worker | - | Disable anonymous telemetry. |
| `FLOWISE_SECRETKEY_OVERWRITE` | Flowise Worker | (secret) | Encryption key for stored credentials, shared by main and workers. Never change after first boot. |
| `JWT_TOKEN_EXPIRY_IN_MINUTES` | Flowise Worker | (secret) | Access token lifetime. |
| `S3_STORAGE_SECRET_ACCESS_KEY` | Flowise Worker | (secret) | Railway Bucket secret key. |
| `QUEUE_REDIS_EVENT_STREAM_MAX_LEN` | Flowise Worker | - | Max events kept per Redis stream. |
| `JWT_REFRESH_TOKEN_EXPIRY_IN_MINUTES` | Flowise Worker | (secret) | Refresh token lifetime. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/ping`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Tags:** flowise, agents, llm, low-code, queue

[View on Railway →](https://railway.com/deploy/flowise-3-agentflows-queue-mode)
