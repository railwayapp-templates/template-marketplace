# Deploy Langflow on Railway

Simple Langflow deployment using PostgreSQL as the database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/JMXEWp)

## About

[Langflow](https://github.com/logspace-ai/langflow) is a low-code tool that helps in the development and deployment of LLM apps.

This template is a simple setup that provides a persistent database with the use of PostgreSQL.

Environment variables:
- LOGLEVEL: this is used to set the Langflow's logging level to improve debugging experience and to better control the logs.

Other environment variables can be found in the [Langflow repo](https://github.com/logspace-ai/langflow). All Langflow variables should start with `LANGFLOW_`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langflowai/langflow:latest | `langflowai/langflow:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | langflowai/langflow:latest | 7860 | - |
| `LANGFLOW_PORT` | langflowai/langflow:latest | - | Sets Langflow port to Railways exposed port. |
| `LANGFLOW_LOG_LEVEL` | langflowai/langflow:latest | debug | Sets the log level in Langflow |
| `LANGFLOW_SECRET_KEY` | langflowai/langflow:latest | (secret) | Secret Key. Set it to a Secret value as this is used for authentication. |
| `LANGFLOW_DATABASE_URL` | langflowai/langflow:latest | - | Set this to the DATABASE_URL |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Start command:** `python -m langflow run --host 0.0.0.0`
- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/JMXEWp)
