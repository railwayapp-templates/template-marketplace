# Deploy Payload on Railway

Template for payload with custom setup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/payload)

## About

Payload template voor bvdo

Simpele template voor het hosting van meerdere payload websites op railway

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| payload-railway | [web-bvdo/payload-railway](https://github.com/web-bvdo/payload-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PAYLOAD_SECRET` | payload-railway | (secret) | - |
| `S3_SECRET_ACCESS_KEY` | payload-railway | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/payload)
