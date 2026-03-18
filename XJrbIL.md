# Deploy LobeChat on Railway

LobeChat, GitHub-based auth, ChatGPT, GPT-4, Bing, Anthropic, DALL-E-3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/XJrbIL)

## About

LobeChat is an open-source, AI-powered chatbot platform designed for seamless and customizable conversational experiences. Built with modern technologies, it supports multi-channel integration and GitHub-based authentication via [NextAuth](https://lobehub.com/docs/self-hosting/advanced/auth/next-auth/github), making it easy to deploy across various platforms. Whether for personal use or business applications, LobeChat enables efficient AI-driven communication with robust functionality and scalability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lobe | `lobehub/lobe-chat-database` | Web service |
| minio/mc:latest | `minio/mc:latest` | Database |
| pgvector | `pgvector/pgvector:pg16` | Database |
| MinIO | `minio/minio:latest` | Database |

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
- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/XJrbIL)
