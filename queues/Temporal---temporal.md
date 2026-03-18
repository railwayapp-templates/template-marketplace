# Deploy Temporal on Railway

Open source durable execution platform (seperate services + scaling)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/temporal)

## About

Temporal is a microservice orchestration platform that enables developers to build scalable applications without sacrificing productivity or reliability. It provides a robust framework for managing workflows and stateful applications, making it easier to handle complex business logic and long-running processes.

Hosting Temporal involves setting up the necessary infrastructure to support its features, including a PostgreSQL database for storing workflow state and a web interface for managing workflows. Railway simplifies this process by providing a one-click deployment option, allowing you to get started quickly without worrying about the underlying infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Temporal Matching | `temporalio/auto-setup:1.28.0` | Worker |
| Temporal History | `temporalio/auto-setup:1.28.0` | Worker |
| Elasticsearch | [railwayapp-templates/elasticsearch](https://github.com/railwayapp-templates/elasticsearch) | Database |
| Temporal Basic Auth | `ghcr.io/brody192/railway-caddy-basic-auth:main` | Web service |
| Temporal Worker | `temporalio/auto-setup:1.28.0` | Worker |
| Temporal Frontend | `temporalio/auto-setup:1.28.0` | Worker |
| Temporal UI | `temporalio/ui:2.39.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `DB` | Temporal Matching | postgres12 | Database Type - You likely don't need to change this! |
| `DBNAME` | Temporal Matching | - | Database Name - You likely don't need to change this! |
| `ES_PWD` | Temporal Matching | - | Elasticsearch Password - You likely don't need to change this! |
| `DB_PORT` | Temporal Matching | - | Database Port - You likely don't need to change this! |
| `ES_USER` | Temporal Matching | (secret) | Elasticsearch User - You likely don't need to change this! |
| `ES_SEEDS` | Temporal Matching | - | Database Host - You likely don't need to change this! |
| `SERVICES` | Temporal Matching | matching | Temporal services to run on this Railway service |
| `ENABLE_ES` | Temporal Matching | true | Enable Elasticsearch - You likely don't need to change this! |
| `BIND_ON_IP` | Temporal Matching | :: | IP to bind on - You likely don't need to change this! |
| `ES_VERSION` | Temporal Matching | v7 | Elasticsearch Major Version - You likely don't need to change this! |
| `POSTGRES_PWD` | Temporal Matching | - | Database Password - You likely don't need to change this! |
| `POSTGRES_USER` | Temporal Matching | (secret) | Database User - You likely don't need to change this! |
| `POSTGRES_SEEDS` | Temporal Matching | - | Database Host - You likely don't need to change this! |
| `TEMPORAL_ADDRESS` | Temporal Matching | - | Temporal Frontend Address - You likely don't need to change this! |
| `TEMPORAL_CLI_ADDRESS` | Temporal Matching | - | Temporal Frontend Address - You likely don't need to change this! |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal Matching | - | Broadcast address for Temporal cluster - You likely don't need to change this! |
| `DB` | Temporal History | postgres12 | Database Type - You likely don't need to change this! |
| `DBNAME` | Temporal History | - | Database Name - You likely don't need to change this! |
| `ES_PWD` | Temporal History | - | Elasticsearch Password - You likely don't need to change this! |
| `DB_PORT` | Temporal History | - | Database Port - You likely don't need to change this! |
| `ES_USER` | Temporal History | (secret) | Elasticsearch User - You likely don't need to change this! |
| `ES_SEEDS` | Temporal History | - | Database Host - You likely don't need to change this! |
| `SERVICES` | Temporal History | history | Temporal services to run on this Railway service |
| `ENABLE_ES` | Temporal History | true | Enable Elasticsearch - You likely don't need to change this! |
| `BIND_ON_IP` | Temporal History | :: | IP to bind on - You likely don't need to change this! |
| `ES_VERSION` | Temporal History | v7 | Elasticsearch Major Version - You likely don't need to change this! |
| `POSTGRES_PWD` | Temporal History | - | Database Password - You likely don't need to change this! |
| `POSTGRES_USER` | Temporal History | (secret) | Database User - You likely don't need to change this! |
| `POSTGRES_SEEDS` | Temporal History | - | Database Host - You likely don't need to change this! |
| `TEMPORAL_ADDRESS` | Temporal History | - | Temporal Frontend Address - You likely don't need to change this! |
| `TEMPORAL_CLI_ADDRESS` | Temporal History | - | Temporal Frontend Address - You likely don't need to change this! |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal History | - | Broadcast address for Temporal cluster - You likely don't need to change this! |
| `PORT` | Elasticsearch | 9200 | Port that Elasticsearch will run on |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms500m -Xmx4g | The minimum and max heap size that Elasticsearch can use |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Password for Elasticsearch |
| `ELASTIC_USERNAME` | Elasticsearch | (secret) | Username for Elasticsearch |
| `PASSWORD` | Temporal Basic Auth | (secret) | - |
| `USERNAME` | Temporal Basic Auth | (secret) | - |
| `DB` | Temporal Worker | postgres12 | Database Type - You likely don't need to change this! |
| `DBNAME` | Temporal Worker | - | Database Name - You likely don't need to change this! |
| `ES_PWD` | Temporal Worker | - | Elasticsearch Password - You likely don't need to change this! |
| `DB_PORT` | Temporal Worker | - | Database Port - You likely don't need to change this! |
| `ES_USER` | Temporal Worker | (secret) | Elasticsearch User - You likely don't need to change this! |
| `ES_SEEDS` | Temporal Worker | - | Database Host - You likely don't need to change this! |
| `SERVICES` | Temporal Worker | worker | Temporal services to run on this Railway service |
| `ENABLE_ES` | Temporal Worker | true | Enable Elasticsearch - You likely don't need to change this! |
| `BIND_ON_IP` | Temporal Worker | :: | IP to bind on - You likely don't need to change this! |
| `ES_VERSION` | Temporal Worker | v7 | Elasticsearch Major Version - You likely don't need to change this! |
| `POSTGRES_PWD` | Temporal Worker | - | Database Password - You likely don't need to change this! |
| `POSTGRES_USER` | Temporal Worker | (secret) | Database User - You likely don't need to change this! |
| `POSTGRES_SEEDS` | Temporal Worker | - | Database Host - You likely don't need to change this! |
| `TEMPORAL_ADDRESS` | Temporal Worker | - | Temporal Frontend Address - You likely don't need to change this! |
| `TEMPORAL_CLI_ADDRESS` | Temporal Worker | - | Temporal Frontend Address - You likely don't need to change this! |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal Worker | - | Broadcast address for Temporal cluster - You likely don't need to change this! |
| `DB` | Temporal Frontend | postgres12 | Database Type - You likely don't need to change this! |
| `PORT` | Temporal Frontend | 7233 | Post temporal is listening on - You likely don't need to change this! |
| `DBNAME` | Temporal Frontend | - | Database Name - You likely don't need to change this! |
| `ES_PWD` | Temporal Frontend | - | Elasticsearch Password - You likely don't need to change this! |
| `DB_PORT` | Temporal Frontend | - | Database Port - You likely don't need to change this! |
| `ES_USER` | Temporal Frontend | (secret) | Elasticsearch User - You likely don't need to change this! |
| `ES_SEEDS` | Temporal Frontend | - | Database Host - You likely don't need to change this! |
| `SERVICES` | Temporal Frontend | frontend | Temporal services to run on this Railway service |
| `ENABLE_ES` | Temporal Frontend | true | Enable Elasticsearch - You likely don't need to change this! |
| `BIND_ON_IP` | Temporal Frontend | :: | IP to bind on - You likely don't need to change this! |
| `ES_VERSION` | Temporal Frontend | v7 | Elasticsearch Major Version - You likely don't need to change this! |
| `POSTGRES_PWD` | Temporal Frontend | - | Database Password - You likely don't need to change this! |
| `POSTGRES_USER` | Temporal Frontend | (secret) | Database User - You likely don't need to change this! |
| `POSTGRES_SEEDS` | Temporal Frontend | - | Database Host - You likely don't need to change this! |
| `TEMPORAL_ADDRESS` | Temporal Frontend | - | Temporal Frontend Address - You likely don't need to change this! |
| `TEMPORAL_CLI_ADDRESS` | Temporal Frontend | - | Temporal Frontend Address - You likely don't need to change this! |
| `PUBLIC_FRONTEND_ADDRESS` | Temporal Frontend | - | Public Temporal Frontend Address - You likely don't need to change this! |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal Frontend | - | Broadcast address for Temporal cluster - You likely don't need to change this! |
| `PORT` | Temporal UI | 8080 | Port the UI is listening on - You likely don't need to change this! |
| `TEMPORAL_ADDRESS` | Temporal UI | - | Internal address of the temporal server - You likely don't need to change this! |
| `TEMPORAL_AUTH_ENABLED` | Temporal UI | false | UI is exposed by default, use auth in production |
| `TEMPORAL_CORS_ORIGINS` | Temporal UI | - | Domain for CORS Origins - You likely don't need to change this! |
| `TEMPORAL_AUTH_CLIENT_ID` | Temporal UI | - | Client ID for OIDC |
| `TEMPORAL_AUTH_CALLBACK_URL` | Temporal UI | - | Callback URL for OIDC |
| `TEMPORAL_AUTH_PROVIDER_URL` | Temporal UI | - | Provider URL for OIDC |
| `TEMPORAL_AUTH_CLIENT_SECRET` | Temporal UI | (secret) | Client secret for OIDC |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "TEMPORAL_BROADCAST_ADDRESS="$(ip -6 addr | awk '{print $2}' | grep -v '^fe80' | grep -E '^[0-9a-fA-F:]+/64' | cut -d '/' -f1)" /etc/temporal/entrypoint.sh autosetup"`
- **Healthcheck:** `/_cluster/health`
- **Volume:** `/esdata`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/temporal)
