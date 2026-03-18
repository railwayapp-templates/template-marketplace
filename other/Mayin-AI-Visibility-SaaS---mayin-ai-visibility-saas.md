# Deploy Mayin – AI Visibility SaaS on Railway

Deploy Mayin with PostgreSQL preconfigured on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mayin-ai-visibility-saas)

## About

This Railway template deploys Mayin as a self-hosted SaaS application with PostgreSQL preconfigured. Railway automatically provisions the application runtime, networking, and database, removing the need for manual infrastructure setup or credential management.

After deployment, you can configure Mayin for your business, activate your license, and begin serving AI-friendly metadata and discovery endpoints. This setup is designed for founders, startups, and teams who want to experiment with AI visibility without managing complex DevOps workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| mayin-railway | [dinupkalleril/mayin-railway](https://github.com/dinupkalleril/mayin-railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, PLpgSQL, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/mayin-ai-visibility-saas)
