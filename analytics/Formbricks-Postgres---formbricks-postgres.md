# Deploy Formbricks + Postgres on Railway

Formbricks surveys with Postgres, Valkey, persistent uploads, secrets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formbricks-postgres)

## About

Self-host Formbricks surveys and experience management on Railway with Postgres, Valkey, generated secrets, persistent uploads, and private networking.

- `formbricks`: public Formbricks web service
- `postgres`: private Postgres database
- `valkey`: private cache service for rate limits, caching, and audit logging
- Persistent upload storage
- Generated auth, encryption, cron, database, and cache secrets
- One-domain default setup for fast first launch

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valkey | `valkey/valkey:8-alpine` | Database |
| postgres | `pgvector/pgvector:pg17` | Database |
| formbricks | `ghcr.io/formbricks/formbricks:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `VALKEY_PASSWORD` | valkey | (secret) |
| `POSTGRES_DB` | postgres | formbricks |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PORT` | formbricks | 3000 |
| `LOG_LEVEL` | formbricks | info |
| `CRON_SECRET` | formbricks | (secret) |
| `NEXTAUTH_SECRET` | formbricks | (secret) |
| `TELEMETRY_DISABLED` | formbricks | 1 |
| `PASSWORD_RESET_DISABLED` | formbricks | (secret) |
| `EMAIL_VERIFICATION_DISABLED` | formbricks | 1 |

## Configuration

- **Start command:** `/bin/sh -c 'exec valkey-server --appendonly yes --dir /data --requirepass "$VALKEY_PASSWORD"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nextjs/apps/web/saml-connection`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/formbricks-postgres)
