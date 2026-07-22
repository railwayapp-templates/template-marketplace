# Deploy Linkwarden on Railway

Linkwarden: self-hosted bookmark manager with web archiving.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkwarden-2)

## About

Linkwarden runs as a Next.js application behind a Railway-generated domain with automatic TLS. The companion PostgreSQL service uses a persistent volume so your data survives restarts and redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| linkwarden | `ghcr.io/linkwarden/linkwarden:v2.15.1` | Web service |
| Postgres | `postgres:16-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | linkwarden | 8080 | Port Linkwarden listens on (default: 8080). |
| `DATABASE_URL` | linkwarden | - | PostgreSQL connection string. References the sibling Postgres service's DATABASE_URL so credentials stay in sync automatically. |
| `NEXTAUTH_SECRET` | linkwarden | (secret) | Secret for NextAuth session encryption. Auto-generated random value. |
| `LINKWARDEN_SECRET_KEY` | linkwarden | (secret) | Secret key used for encryption. Auto-generated random value. |
| `POSTGRES_DB` | Postgres | linkwarden | Initial database created on first boot. Must match the database name in Linkwarden's DATABASE_URL. |
| `DATABASE_URL` | Postgres | postgresql://postgres:postgres@postgres.railway.internal:5432/linkwarden | PostgreSQL connection string. The Linkwarden app references this via ${{Postgres.DATABASE_URL}}. |
| `POSTGRES_USER` | Postgres | (secret) | Postgres superuser name. Linkwarden connects with these credentials. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password. Default literal 'postgres' so a fresh marketplace deploy authenticates out of the box. Rotate this in the dashboard AND update the Linkwarden DATABASE_URL to match before production. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/linkwarden-2)
