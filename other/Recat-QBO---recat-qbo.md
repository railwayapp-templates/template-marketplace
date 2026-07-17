# Deploy Recat QBO on Railway

Self-hosted QuickBooks transaction categorization. Open-source Uncat alt.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/recat-qbo)

## About

Recat QBO is a self-hosted transaction categorization and review queue for
QuickBooks Online — an open-source alternative to Uncat. Give your team a
simple queue for categorizing uncategorized QuickBooks transactions without
giving everyone a QuickBooks login.

One click provisions the Recat QBO application and a PostgreSQL database with
generated session and encryption secrets — no required input. The setup wizard
then asks how you want to start: try the demo (a built-in fake QuickBooks with
two sample companies — the entire loop works: sync, categorize, split,
transfer, post, undo, reports) or connect your real QuickBooks with your own
free Intuit API credentials. Your choice is honored end to end, demo and real
companies can coexist, and no environment variables are involved. Database
migrations run automatically on every deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/tx-joshg/recat-qbo:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SESSION_SECRET` | app | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/recat-qbo)
