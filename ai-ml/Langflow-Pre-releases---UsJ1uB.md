# Deploy Langflow Pre-releases on Railway

Simple Langflow 1.0 Preview deployment using PostgreSQL as the database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/UsJ1uB)

## About

[Langflow](https://github.com/logspace-ai/langflow) is a visual framework for building multi-agent and RAG applications

This template is a simple setup that provides a persistent database with the use of PostgreSQL.

Environment variables:
- `LANGFLOW_LOG_LEVEL`: this is used to set the Langflow's logging level to improve debugging experience and to better control the logs.
- `LANGFLOW_PORT`: sets Langflow port. Defaults to Railway's exposed port.
- `LANGFLOW_SECRET_KEY`: Secret Key. Set it to a Secret value as this is used for authentication.
- `LANGFLOW_DATABASE_URL`: Set this to the DATABASE_URL. This is set to the URL of the Postgres instance that we set up in this template.

Other environment variables can be found in the [Langflow repo](https://github.com/logspace-ai/langflow). All Langflow variables should start with `LANGFLOW_`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langflowai/langflow:1.0-alpha | `langflowai/langflow:1.0-alpha` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | langflowai/langflow:1.0-alpha | 7860 | - |
| `LANGFLOW_PORT` | langflowai/langflow:1.0-alpha | - | Sets Langflow port to Railways exposed port. |
| `LANGFLOW_LOG_LEVEL` | langflowai/langflow:1.0-alpha | debug | Sets the log level in Langflow |
| `LANGFLOW_SECRET_KEY` | langflowai/langflow:1.0-alpha | (secret) | Secret Key. Set it to a Secret value as this is used for authentication. |
| `LANGFLOW_DATABASE_URL` | langflowai/langflow:1.0-alpha | - | Set this to the DATABASE_URL |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Start command:** `python -m langflow run --host 0.0.0.0`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/UsJ1uB)
