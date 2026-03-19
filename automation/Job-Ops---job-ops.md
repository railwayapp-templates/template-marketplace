# Deploy Job Ops on Railway

Deploy and Host Job Ops with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/job-ops)

## About

Job Ops is an automated job-operations platform that aggregates opportunities, runs extractors, and powers a searchable backend for job workflows. This template deploys a production-ready Job Ops stack on Railway with sensible defaults and an easy path to scale.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Lp9q5l?referralCode=C3Uv6n&utm_medium=integration&utm_source=template&utm_campaign=generic)

Job Ops runs as a Node.js orchestrator service with Python-powered extraction capabilities, browser automation support, and persistent data storage for generated assets such as PDFs. Railway simplifies deployment by packaging the full runtime into a single service while connecting managed dependencies for database, cache, browser automation, and object storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| KeyDB | `eqalpha/keydb` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Browserless | `ghcr.io/browserless/chromium:latest` | Worker |
| Job Ops | [FournyP/job-ops-railway-template](https://github.com/FournyP/job-ops-railway-template) | Web service |
| Reactive Resume | `amruthpillai/reactive-resume` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KEYDB_USER` | KeyDB | (secret) | - |
| `KEYDB_PASSWORD` | KeyDB | (secret) | - |
| `KEYDB_PRIVATE_PORT` | KeyDB | 6379 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Browserless | 8080 | - |
| `TOKEN` | Browserless | (secret) | - |
| `TIMEOUT` | Browserless | 300000 | - |
| `CONCURRENT` | Browserless | 10 | - |
| `MAX_QUEUE_LENGTH` | Browserless | 10 | - |
| `BROWSER_PORT_PRIVATE` | Browserless | 3001 | - |
| `PORT` | Job Ops | 8080 | - |
| `PORT` | Reactive Resume | 3000 | - |
| `NODE_ENV` | Reactive Resume | production | - |
| `AUTH_SECRET` | Reactive Resume | (secret) | - |
| `CHROME_TOKEN` | Reactive Resume | (secret) | - |
| `DISABLE_EMAIL_AUTH` | Reactive Resume | false | - |
| `STORAGE_SECRET_KEY` | Reactive Resume | (secret) | - |
| `ACCESS_TOKEN_SECRET` | Reactive Resume | (secret) | - |
| `REFRESH_TOKEN_SECRET` | Reactive Resume | (secret) | - |
| `VITE_DISABLE_SIGNUPS` | Reactive Resume | false | - |

## Configuration

- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/job-ops)
