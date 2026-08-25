# Deploy LobeChat | Open Source ChatGPT Alternative for Any Model Provider on Railway

Multi-provider AI chat with built-in accounts and a document knowledge base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/XJrbIL)

## About

LobeChat is a polished chat interface for language models: OpenAI, Anthropic, Google, Groq, Ollama and dozens more behind one UI, with conversation branching, a plugin system, vision and file uploads, and a knowledge base backed by vector search.

This is LobeChat v2, the server edition rather than the single-container demo. Conversations, users and knowledge-base embeddings live in PostgreSQL — ParadeDB, which carries both `pg_search` for full-text ranking and `pgvector` for embeddings. Uploaded files and generated images go to S3-compatible object storage, with an initializer that creates the bucket and its policy. Redis backs caching and background messaging. Postgres, object storage and Redis each sit on a persistent volume.

Sign-in is built in: v2 uses Better-Auth with email and password, so the first person to register creates their account and starts using it. There is nothing to fill in before deploying — no OAuth app, no identity provider, no required fields on the deploy screen. Optional SSO providers (Google, GitHub, Authelia, Keycloak, Logto, Okta, Zitadel and others) can be added afterwards with `AUTH_SSO_PROVIDERS`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lobe | `lobehub/lobehub:2.2.14` | Web service |
| Bucket Init | `minio/mc:RELEASE.2025-08-13T08-35-41Z` | Database |
| Postgres | `paradedb/paradedb:0.25.3-pg17` | Database |
| MinIO | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| Redis | `redis:8.10.0-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | lobe | 3210 | Port LobeChat listens on. |
| `APP_URL` | lobe | - | Public URL of this deployment. Must not end with a slash. |
| `REDIS_TLS` | lobe | 0 | Redis runs on the private network without TLS. |
| `REDIS_URL` | lobe | - | Redis connection string. |
| `S3_BUCKET` | lobe | - | Bucket for uploads. |
| `S3_SET_ACL` | lobe | 0 | MinIO rejects the canned-ACL header; the bucket policy grants public reads instead. |
| `AUTH_SECRET` | lobe | (secret) | Signs Better-Auth sessions. Changing it logs everyone out. |
| `S3_ENDPOINT` | lobe | - | S3 endpoint the browser uploads to. |
| `DATABASE_URL` | lobe | - | Postgres connection string. |
| `DB_WAIT_HOST` | lobe | - | Host the start command waits for before running migrations. |
| `DB_WAIT_PORT` | lobe | 5432 | Port the start command waits for. |
| `REDIS_PREFIX` | lobe | lobechat | Key prefix for this deployment. |
| `S3_ACCESS_KEY` | lobe | - | S3 access key. |
| `INTERNAL_APP_URL` | lobe | http://localhost:3210 | Loopback URL the server uses to reach itself. |
| `S3_ACCESS_KEY_ID` | lobe | - | S3 access key (id form read by the app). |
| `S3_PUBLIC_DOMAIN` | lobe | - | Public domain files are served from. |
| `KEY_VAULTS_SECRET` | lobe | (secret) | Encrypts stored provider API keys at rest. Changing it makes existing keys unreadable. |
| `S3_ENABLE_PATH_STYLE` | lobe | 1 | MinIO addresses buckets by path, not subdomain. |
| `S3_SECRET_ACCESS_KEY` | lobe | (secret) | S3 secret key. |
| `LLM_VISION_IMAGE_USE_BASE64` | lobe | 1 | Send vision images inline, so models work before the bucket is publicly reachable. |
| `MINIO_BUCKET` | Bucket Init | - | Bucket to create. |
| `MINIO_ENDPOINT` | Bucket Init | - | Private MinIO endpoint. |
| `MINIO_ROOT_USER` | Bucket Init | (secret) | MinIO access key. |
| `MINIO_ROOT_PASSWORD` | Bucket Init | (secret) | MinIO secret key. |
| `POSTGRES_DB` | Postgres | lobechat | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Private connection string used by LobeChat. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external clients. |
| `PORT` | MinIO | - | Port MinIO serves the S3 API on. |
| `MINIO_BUCKET` | MinIO | lobe | Bucket LobeChat stores uploads in. |
| `MINIO_ROOT_USER` | MinIO | (secret) | Generated MinIO access key. |
| `MINIO_PUBLIC_HOST` | MinIO | - | Public hostname, used by the browser to upload files. |
| `MINIO_PUBLIC_PORT` | MinIO | 443 | Public port. |
| `MINIO_PRIVATE_HOST` | MinIO | - | Private hostname. |
| `MINIO_PRIVATE_PORT` | MinIO | 9000 | Private port. |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Generated MinIO secret key. |
| `MINIO_PUBLIC_ENDPOINT` | MinIO | - | Public S3 endpoint, used by the browser. |
| `MINIO_PRIVATE_ENDPOINT` | MinIO | - | Private S3 endpoint, used by the bucket initialiser. |
| `REDIS_URL` | Redis | - | Private connection string used by LobeChat. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password. |

## Configuration

- **Start command:** `/bin/sh -c 'for i in $(seq 1 90); do nc -z "$DB_WAIT_HOST" "$DB_WAIT_PORT" && break; echo "waiting for postgres ($i/90)"; sleep 2; done; exec /bin/node /app/startServer.js'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "for i in $(seq 1 30); do /usr/bin/mc alias set minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && break; echo waiting-for-minio $i; sleep 3; done; /usr/bin/mc mb --ignore-existing minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set download minio/${MINIO_BUCKET}/public && echo BUCKET_INIT_OK; exec sleep infinity"`
- **Start command:** `/bin/sh -c "unset PGPORT; exec docker-entrypoint.sh postgres --port=5432 -c shared_preload_libraries=pg_search"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Start command:** `sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data --bind 0.0.0.0 ::'`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/XJrbIL)
