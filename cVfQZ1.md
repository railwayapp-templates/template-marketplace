# Deploy gitingest-js on Railway

Chat with any git repo, with image and pdf processing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cVfQZ1)

## About

A JS implementation of [gitingest](https://github.com/cyclotruc/gitingest) with db storage for faster load time and image/pdf parsing

It is recommended to deploy on US regions, if you receive network issues when deploying on other regions, change it to US and it should work

Requirement for image/pdf:
- MISTRAL_API_KEY
- GEMINI_API_KEY

Navigate to {PUBLIC_DOMAIN}/docs for scalar docs

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| gitingest-js | [TZGyn/gitingest-js](https://github.com/TZGyn/gitingest-js) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `GEMINI_API_KEY` | gitingest-js | (secret) | gemini api key for processing images |
| `MISTRAL_API_KEY` | gitingest-js | (secret) | mistral api key for pdf processing |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/template/cVfQZ1)
