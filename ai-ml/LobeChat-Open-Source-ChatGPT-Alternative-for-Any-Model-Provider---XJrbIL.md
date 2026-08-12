# Deploy LobeChat | Open Source ChatGPT Alternative for Any Model Provider on Railway

Multi-provider AI chat with a pgvector knowledge base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/XJrbIL)

## About

LobeChat is a polished chat interface for language models: OpenAI, Anthropic, Google, Groq, Ollama and dozens more behind one UI, with conversation branching, a plugin system, vision and file uploads, and a knowledge base backed by vector search.

This is the database edition, not the single-container demo. Conversations, users and knowledge-base embeddings live in PostgreSQL with the pgvector extension; uploaded files and generated images go to S3-compatible object storage, with a one-shot initializer that creates the bucket on first boot. Both data stores are on persistent volumes.

Because it is the database edition, it requires authentication — the template is wired for GitHub OAuth, and that is the one thing you have to fill in yourself.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lobe | `lobehub/lobe-chat-database:1.143.3` | Web service |
| minio/mc:latest | `minio/mc:RELEASE.2025-08-13T08-35-41Z` | Database |
| pgvector | `pgvector/pgvector:0.8.6-pg16` | Database |
| MinIO | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_URL` | lobe | - | App URL |
| `S3_BUCKET` | lobe | lobe | S3 Bucket |
| `S3_ENDPOINT` | lobe | - | S3 Endpoint |
| `DATABASE_URL` | lobe | - | DB URL |
| `NEXTAUTH_URL` | lobe | - | Nextauth URL |
| `AUTH_GITHUB_ID` | lobe | - | Auth  Github ID. See https://lobehub.com/docs/self-hosting/advanced/auth/next-auth/github |
| `NEXT_AUTH_SECRET` | lobe | (secret) | Next Auth Secret |
| `S3_ACCESS_KEY_ID` | lobe | - | S3 Access Key ID |
| `S3_PUBLIC_DOMAIN` | lobe | - | S3 Public Domain |
| `KEY_VAULTS_SECRET` | lobe | (secret) | Key Vaults Secret |
| `AUTH_GITHUB_SECRET` | lobe | (secret) | Auth Github Secret. See https://lobehub.com/docs/self-hosting/advanced/auth/next-auth/github |
| `S3_ENABLE_PATH_STYLE` | lobe | 1 | S3 Enable Path Style |
| `S3_SECRET_ACCESS_KEY` | lobe | (secret) | S3 Secret Access Key |
| `NEXT_AUTH_SSO_PROVIDERS` | lobe | github | Nextauth SSO Providers |
| `MINIO_BUCKET` | minio/mc:latest | - | MinIO Bucket |
| `MINIO_ENDPOINT` | minio/mc:latest | - | MinIO Endpoint |
| `MINIO_ROOT_USER` | minio/mc:latest | (secret) | MinIO Root User |
| `MINIO_ROOT_PASSWORD` | minio/mc:latest | (secret) | MinIO Root Password |
| `POSTGRES_DB` | pgvector | railway | Default database created when image is started. |
| `DATABASE_URL` | pgvector | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | pgvector | - | Railway Private Domain |
| `POSTGRES_USER` | pgvector | (secret) | User to connect to Postgres DB |
| `PGHOST_PRIVATE` | pgvector | - | Private Host |
| `PGPORT_PRIVATE` | pgvector | 5432 | Private Port |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | pgvector | - | URL to connect to Postgres database |
| `PORT` | MinIO | - | Port |
| `MINIO_BUCKET` | MinIO | lobe | MinIO Bucket |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO Root User |
| `MINIO_PUBLIC_HOST` | MinIO | - | Public Host |
| `MINIO_PUBLIC_PORT` | MinIO | 443 | Public Port |
| `MINIO_PRIVATE_HOST` | MinIO | - | Private Host |
| `MINIO_PRIVATE_PORT` | MinIO | 9000 | Private Port |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Root Password |
| `MINIO_PUBLIC_ENDPOINT` | MinIO | - | Public Endpoint |
| `MINIO_PRIVATE_ENDPOINT` | MinIO | - | Private Endpoint |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "for i in $(seq 1 30); do /usr/bin/mc alias set minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && break; echo waiting-for-minio $i; sleep 3; done; /usr/bin/mc mb --ignore-existing minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && echo BUCKET_INIT_OK && exit 0"`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/XJrbIL)
