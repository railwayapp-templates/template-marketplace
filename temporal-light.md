# Deploy Temporal Light on Railway

Open source durable execution platform (Non-production)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/temporal-light)

## About

Temporal is a microservice orchestration platform that enables developers to build scalable applications without sacrificing productivity or reliability. It provides a robust framework for managing workflows and stateful applications, making it easier to handle complex business logic and long-running processes.

Hosting Temporal involves setting up the necessary infrastructure to support its features, including a PostgreSQL database for storing workflow state and a web interface for managing workflows. Railway simplifies this process by providing a one-click deployment option, allowing you to get started quickly without worrying about the underlying infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Temporal | `temporalio/auto-setup:1.28.0` | TCP service |
| Elasticsearch | [railwayapp-templates/elasticsearch](https://github.com/railwayapp-templates/elasticsearch) | Database |
| Temporal Basic Auth | `ghcr.io/brody192/railway-caddy-basic-auth:main` | Web service |
| Temporal UI | `temporalio/ui:2.39.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB` | Temporal | postgres12 | Database Type - You likely don't need to change this! |
| `PORT` | Temporal | 7233 | Post temporal is listening on - You likely don't need to change this! |
| `DBNAME` | Temporal | - | Database Name - You likely don't need to change this! |
| `ES_PWD` | Temporal | - | Elasticsearch Password - You likely don't need to change this! |
| `DB_PORT` | Temporal | - | Database Port - You likely don't need to change this! |
| `ES_USER` | Temporal | (secret) | Elasticsearch User - You likely don't need to change this! |
| `ES_SEEDS` | Temporal | - | Database Host - You likely don't need to change this! |
| `ENABLE_ES` | Temporal | true | Enable Elasticsearch - You likely don't need to change this! |
| `ES_VERSION` | Temporal | v7 | Elasticsearch Major Version - You likely don't need to change this! |
| `POSTGRES_PWD` | Temporal | - | Database Password - You likely don't need to change this! |
| `POSTGRES_USER` | Temporal | (secret) | Database User - You likely don't need to change this! |
| `POSTGRES_SEEDS` | Temporal | - | Database Host - You likely don't need to change this! |
| `PORT` | Elasticsearch | 9200 | Port that Elasticsearch will run on |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms500m -Xmx4g | The minimum and max heap size that Elasticsearch can use |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Password for Elasticsearch |
| `ELASTIC_USERNAME` | Elasticsearch | (secret) | - |
| `PASSWORD` | Temporal Basic Auth | (secret) | - |
| `USERNAME` | Temporal Basic Auth | (secret) | - |
| `PORT` | Temporal UI | 8080 | Port the UI is listening on - You likely don't need to change this! |
| `TEMPORAL_ADDRESS` | Temporal UI | - | Internal address of the temporal server - You likely don't need to change this! |
| `TEMPORAL_AUTH_ENABLED` | Temporal UI | false | UI is exposed by default, use auth in production |
| `TEMPORAL_CORS_ORIGINS` | Temporal UI | - | Domain for CORS Origins - You likely don't need to change this! |
| `TEMPORAL_AUTH_CLIENT_ID` | Temporal UI | - | Client ID for OIDC |
| `TEMPORAL_AUTH_CALLBACK_URL` | Temporal UI | - | Callback URL for OIDC |
| `TEMPORAL_AUTH_PROVIDER_URL` | Temporal UI | - | Provider URL for OIDC |
| `TEMPORAL_AUTH_CLIENT_SECRET` | Temporal UI | (secret) | Client secret for OIDC |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **TCP Proxies:** 7233
- **Healthcheck:** `/_cluster/health`
- **Volume:** `/esdata`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/temporal-light)
