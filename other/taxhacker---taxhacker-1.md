# Deploy taxhacker on Railway

Self-hosted AI accounting app for freelancers and small businesses.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/taxhacker-1)

## About

TaxHacker is a self-hosted AI accounting application built with Next.js 15 and PostgreSQL. It uses LLMs to analyze receipts, invoices, and PDFs, extracting structured financial data automatically. The Railway deployment consists of two services: the TaxHacker app container (`ghcr.io/vas3k/taxhacker:latest`) and a managed PostgreSQL 17 database. A persistent volume stores uploaded documents at `/app/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| taxhacker | `ghcr.io/vas3k/taxhacker:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | taxhacker | 7331 |
| `NODE_ENV` | taxhacker | production |
| `UPLOAD_PATH` | taxhacker | /app/data/uploads |
| `SELF_HOSTED_MODE` | taxhacker | true |
| `BETTER_AUTH_SECRET` | taxhacker | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/taxhacker-1)
