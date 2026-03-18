# Deploy ByteChef [n8n alternative] on Railway

Low-code, extendable API integration & automation platform. Just deploy it

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bytechef)

## About

![bytechef](https://github.com/bytechefhq/bytechef/raw/master/static/screenshot.png)

ByteChef can be self-hosted on various platforms to give you full control over your workflow automation infrastructure. Railway provides a streamlined deployment experience with automatic scaling, managed infrastructure, and simplified configuration. This deployment method is ideal for teams who want to focus on building workflows rather than managing servers, while maintaining the flexibility and power of a self-hosted solution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bytechef | `bytechef/bytechef` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BYTECHEF_DATASOURCE_PASSWORD` | bytechef | (secret) | - |
| `BYTECHEF_DATASOURCE_USERNAME` | bytechef | (secret) | - |
| `POSTGRES_DB` | Postgres | bytechef | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/actuator/health/readiness`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/bytechef)
