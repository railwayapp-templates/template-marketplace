# Deploy YapGab FINAL — Managed Postgres on Railway

Deploy and Host YapGab FINAL — Managed Postgres with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yapgab-final-managed-postgres)

## About

YapGab lets creators launch a private, white-label AI voice and text experience under their own brand. This template deploys the YapGab application with managed PostgreSQL and persistent storage.

This template creates two services: the YapGab application and a Railway-managed PostgreSQL database. Railway automatically provides persistent database storage, private networking, and the database connection. You only need to enter your YapGab license key during deployment. After launch, the setup wizard guides you through connecting your Stripe secret key, ElevenLabs account, Resend account, character settings, and public site URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nicknicknicknicko/yapgab:latest | `nicknicknicknicko/yapgab:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | nicknicknicknicko/yapgab:latest | 5000 | - |
| `NODE_ENV` | nicknicknicknicko/yapgab:latest | production | - |
| `SESSION_SECRET` | nicknicknicknicko/yapgab:latest | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/yapgab-final-managed-postgres)
