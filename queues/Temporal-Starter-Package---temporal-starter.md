# Deploy Temporal Starter Package on Railway

Deploys repository-configured Temporal with two example apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/temporal-starter)

## About

Temporal is a microservice orchestration platform that enables developers to build scalable applications without sacrificing productivity or reliability. It provides a robust framework for managing workflows and stateful applications, making it easier to handle complex business logic and long-running processes.

Hosting Temporal involves setting up the necessary infrastructure to support its features, including a PostgreSQL database for storing workflow state and a web interface for managing workflows. Railway simplifies this process by providing a one-click deployment option, allowing you to get started quickly without worrying about the underlying infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Temporal | [railwayapp-templates/temporal](https://github.com/railwayapp-templates/temporal) (root: /temporal) | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Client | [railwayapp-templates/temporal](https://github.com/railwayapp-templates/temporal) (root: /hello-world) | Worker |
| Temporal UI | `temporalio/ui` | Worker |
| Temporal Basic Auth | `ghcr.io/brody192/railway-caddy-basic-auth:main` | Web service |
| Worker | [railwayapp-templates/temporal](https://github.com/railwayapp-templates/temporal) (root: /hello-world) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB` | Temporal | postgresql | Database Type |
| `PORT` | Temporal | 7233 | Post temporal is listening on |
| `DBNAME` | Temporal | - | Database Name - You likely don't need to change this! |
| `DB_PORT` | Temporal | - | Database Port - You likely don't need to change this! |
| `POSTGRES_PWD` | Temporal | - | Database Password - You likely don't need to change this! |
| `POSTGRES_USER` | Temporal | (secret) | Database User - You likely don't need to change this! |
| `POSTGRES_SEEDS` | Temporal | - | Database Host - You likely don't need to change this! |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PORT` | Temporal UI | 8080 | Port the UI is listening on |
| `TEMPORAL_ADDRESS` | Temporal UI | - | Internal address of the temporal server |
| `TEMPORAL_AUTH_ENABLED` | Temporal UI | false | UI is exposed by default, use auth in production |
| `TEMPORAL_CORS_ORIGINS` | Temporal UI | - | Domain for CORS Origins |
| `TEMPORAL_AUTH_CLIENT_ID` | Temporal UI | - | Client ID for OIDC |
| `TEMPORAL_AUTH_CALLBACK_URL` | Temporal UI | - | Callback URL for OIDC |
| `TEMPORAL_AUTH_PROVIDER_URL` | Temporal UI | - | Provider URL for OIDC |
| `TEMPORAL_AUTH_CLIENT_SECRET` | Temporal UI | (secret) | Client secret for OIDC |
| `PASSWORD` | Temporal Basic Auth | (secret) | - |
| `USERNAME` | Temporal Basic Auth | (secret) | - |

## Configuration

- **TCP Proxies:** 7233
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `npm run workflow`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm run start`

**Category:** Queues · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/temporal-starter)
