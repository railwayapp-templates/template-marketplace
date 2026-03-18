# Deploy Bun + React + PostgreSQL on Railway

Deploy and Host React + PostgreSQL + Bun with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bun-react-postgres)

## About

This starter template is a full-stack Todo application built with React frontend, Bun backend API, and PostgreSQL database. The entire JavaScript stack runs on Bun's fast runtime with persistent data storage.

Hosting this stack combines Bun's high-performance JavaScript runtime for both serving the React frontend and handling API requests with PostgreSQL for reliable data persistence. Bun's built-in server capabilities and native SQL template literals provide efficient database operations.

Railway automates deployment by provisioning the PostgreSQL database, detecting the Bun application, managing database connections, and handling automatic scaling for both the application and database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bun | [bun-templates/railway-react-postgres-starter](https://github.com/bun-templates/railway-react-postgres-starter) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

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

**Category:** Starters · **Verified:** Yes · **Languages:** TypeScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/bun-react-postgres)
