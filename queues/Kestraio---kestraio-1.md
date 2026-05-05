# Deploy Kestra.io on Railway

Kestra is a powerful, open-source orchestration and scheduling platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kestraio-1)

## About

Kestra is a powerful open-source orchestration platform that enables you to build, run, schedule, and monitor complex data pipelines and workflows. It provides a user-friendly interface for creating workflows using YAML, supports multiple programming languages, and offers an extensive plugin ecosystem for seamless integrations with cloud services, databases, and APIs.

**Important**: Don't forget to set your `KESTRA_USERNAME` / `KESTRA_PASSWORD` environment variables. By default, these are `admin@kestra.local`/`Kestra123!`

Kestra is a Java-based orchestration platform requiring PostgreSQL for metadata and persistent storage for artifacts. Railway provides managed PostgreSQL, SSL, and storage out-of-the-box. This template uses standalone mode - all components in a single container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kestra.io | [dougwithseismic/railway-kestra](https://github.com/dougwithseismic/railway-kestra) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KESTRA_URL` | Kestra.io | - | The public-facing url, with https prefix |
| `KESTRA_PORT` | Kestra.io | 8080 | - |
| `POSTGRES_USER` | Kestra.io | (secret) | - |
| `KESTRA_API_PORT` | Kestra.io | 8082 | - |
| `KESTRA_PASSWORD` | Kestra.io | (secret) | - |
| `KESTRA_USERNAME` | Kestra.io | (secret) | - |
| `WORKER_REPLICAS` | Kestra.io | 1 | - |
| `EXECUTOR_REPLICAS` | Kestra.io | 1 | - |
| `POSTGRES_PASSWORD` | Kestra.io | (secret) | - |
| `SCHEDULER_REPLICAS` | Kestra.io | 1 | - |
| `KESTRA_AUTH_ENABLED` | Kestra.io | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kestraio-1)
