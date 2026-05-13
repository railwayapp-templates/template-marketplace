# Deploy Formbricks + Postgres on Railway

Self-hosted surveys with Postgres, Valkey, volumes, and private networking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formbricks-postgres)

## About

Formbricks is an open-source survey and product feedback platform for collecting user insights, in-app feedback, and customer research. This template deploys Formbricks with Postgres, Valkey, persistent storage, and Railway private networking.

This template runs the official Formbricks container behind a Railway public domain, with Postgres for application data and Valkey for cache and rate-limit support. Database and cache traffic stay on Railway private networking, while only the Formbricks web service is exposed publicly.

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
