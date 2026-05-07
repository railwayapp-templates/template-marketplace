# Deploy bold-pure on Railway

Finance App by Paired Minds

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bold-pure)

## About

A complete self-hosted personal finance tracker — banks, equities, alternatives, recurring payments, AI-parsed broker statements. Multi-currency dashboard, passkey 2FA, manager + viewer roles. Hosted entirely in your own Railway account, with cryptographic license keys protecting access. Your data, your server.

Finances ships as a public Docker image on GHCR. Deploying gives you three connected Railway services: a Node.js API + UI, a PostgreSQL database (your data lives here, in your Railway VPC), and a 1 GB volume for file uploads. The image makes outbound calls only to bank aggregators (your keys), Yahoo Finance for prices, and your email provider — never to the maintainer's domain. A 14-day trial activates automatically on first boot; paid tiers unlock unlimited users and bank integrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| timwernerdxb/finances:stable | `ghcr.io/timwernerdxb/finances:stable` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `API_TOKEN` | timwernerdxb/finances:stable | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bold-pure)
