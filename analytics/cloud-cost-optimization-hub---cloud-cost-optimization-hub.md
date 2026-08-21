# Deploy cloud-cost-optimization-hub on Railway

Multi-cloud cost observability and optimization dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloud-cost-optimization-hub)

## About

Ccoh is a multi-cloud cost observability and optimization dashboard.

Railway runs the Next.js dashboard, private Go API, and PostgreSQL database as Docker services. Only the frontend is public; API traffic is proxied over Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `xiaosong233/cloud-cost-optimization-hub-frontend-railway:latest` | Web service |
| backend | `xiaosong233/cloud-cost-optimization-hub-backend-railway:latest` | Worker |
| database | `postgres:15.14-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | frontend | 3000 |
| `ENV` | backend | production |
| `PORT` | backend | 8080 |
| `DB_PORT` | backend | 5432 |
| `DB_USER` | backend | (secret) |
| `GIN_MODE` | backend | release |
| `LOG_LEVEL` | backend | info |
| `AWS_REGION` | backend | us-east-1 |
| `JWT_SECRET` | backend | (secret) |
| `DB_PASSWORD` | backend | (secret) |
| `JWT_EXPIRY_HOURS` | backend | 24 |
| `POSTGRES_DB` | database | ccoh |
| `POSTGRES_USER` | database | (secret) |
| `POSTGRES_PASSWORD` | database | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/cloud-cost-optimization-hub)
