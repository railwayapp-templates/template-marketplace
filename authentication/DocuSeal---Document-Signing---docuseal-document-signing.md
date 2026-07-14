# Deploy DocuSeal - Document Signing on Railway

Open-source DocuSign alternative for self-hosted document signing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docuseal-document-signing)

## About

**Open-source DocuSign alternative for self-hosted document signing.** Create, fill, and sign custom PDF forms with an easy-to-use online tool. Deploy with Postgres, Redis, and Railway Bucket for production-ready setup.

This template deploys a complete production-ready DocuSeal instance on Railway. It includes a PostgreSQL database for storing documents and submissions, Redis for handling background jobs (email notifications and PDF processing via Sidekiq), and a Railway Bucket (S3-compatible storage) for securely storing uploaded documents and signed files.

Everything is connected over Railway’s private network with automatic environment variable wiring. You get a scalable, secure, and low-maintenance self-hosted document signing solution without managing servers manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Docuseal | `docuseal/docuseal:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Docuseal | 3000 | - |
| `FORCE_SSL` | Docuseal | true | - |
| `SECRET_KEY_BASE` | Docuseal | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | Docuseal | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/docuseal-document-signing)
