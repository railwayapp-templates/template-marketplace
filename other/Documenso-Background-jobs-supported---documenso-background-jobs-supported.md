# Deploy Documenso (Background jobs supported) on Railway

Documenso (The OSS DocuSign Alternative) - Document signing platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/documenso-background-jobs-supported)

## About

Documenso is the open-source DocuSign alternative for digital document signing. This template runs Documenso with **background jobs supported** — pairing the app with PostgreSQL and a Redis-backed BullMQ queue so signing-request emails and document processing run asynchronously. Built from the official Docker image, it deploys a complete, production-ready stack in ~2–3 minutes.

📖 **Full deployment guide:** [Documenso on Railway — step-by-step](https://github.com/protemplate/documenso-railway/blob/main/docs/railway-deployment.md)

Documenso is a Remix web application backed by PostgreSQL (via Prisma) that handles document uploads, signing workflows, audit trails, and transactional email. Self-hosting it normally means provisioning a database, wiring a job queue for reliable email delivery, generating encryption keys, running migrations, and supplying a signing certificate. This template does that wiring for you: it provisions Postgres and Redis with persistent volumes, generates the encryption and session secrets, runs database migrations automatically on startup, and connects every service over Railway's private network. Documents are stored in PostgreSQL by default — no object storage to configure. The only thing you supply is an SMTP provider so Documenso can email signing links to recipients.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Documenso | `documenso/documenso:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | documenso | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | Documenso | 3000 | - |
| `NEXTAUTH_URL` | Documenso | - | Public URL for NextAuth callbacks (matches WEBAPP_URL) |
| `NEXTAUTH_SECRET` | Documenso | (secret) | NextAuth session encryption secret (auto-generated) |
| `NEXT_PRIVATE_SMTP_HOST` | Documenso | - | SMTP server hostname (required at deploy) |
| `NEXT_PRIVATE_SMTP_PORT` | Documenso | 587 | - |
| `NEXT_PRIVATE_REDIS_PREFIX` | Documenso | documenso | - |
| `NEXT_PRIVATE_JOBS_PROVIDER` | Documenso | bullmq | - |
| `NEXT_PRIVATE_SMTP_PASSWORD` | Documenso | (secret) | SMTP password or API key (required at deploy) |
| `NEXT_PRIVATE_SMTP_USERNAME` | Documenso | (secret) | SMTP username (required at deploy) |
| `DOCUMENSO_DISABLE_TELEMETRY` | Documenso | true | - |
| `NEXT_PRIVATE_ENCRYPTION_KEY` | Documenso | - | Random string of at least 32 characters for symmetric encryption |
| `NEXT_PRIVATE_SMTP_FROM_NAME` | Documenso | Documenso | - |
| `NEXT_PRIVATE_SMTP_TRANSPORT` | Documenso | smtp-auth | - |
| `NEXT_PUBLIC_UPLOAD_TRANSPORT` | Documenso | database | - |
| `NEXT_PRIVATE_SMTP_FROM_ADDRESS` | Documenso | - | Sender email address (required at deploy) |
| `NEXT_PRIVATE_BULLMQ_CONCURRENCY` | Documenso | 10 | - |
| `NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY` | Documenso | - | Secondary encryption key (must differ from NEXT_PRIVATE_ENCRYPTION_KEY) |
| `NEXT_PUBLIC_DOCUMENT_SIZE_UPLOAD_LIMIT` | Documenso | 5 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/documenso-background-jobs-supported)
