# Deploy Langflow | Visual AI Workflow Builder with Postgres and a Real Volume on Railway

Self-host Langflow on Railway — flows, Postgres & files that persist.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-or-visual-ai-workflow-builder-w)

## About

[Langflow](https://langflow.org) is a visual builder for LLM workflows — you assemble prompts, models, retrievers and tools on a canvas and expose the result as an API. This template deploys it with PostgreSQL, a persistent volume, and authentication switched on.

Langflow splits its state across two places. Flows, users and API keys go into PostgreSQL. Uploaded files, cached component metadata and the local config live on disk under the config directory. A container filesystem is wiped on every redeploy, so without a volume those disappear — and since the flows themselves survive in Postgres, the instance looks intact right up until a flow references a file that is no longer there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Langflow | `langflowai/langflow:1.11.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `LANGFLOW_HOST` | Langflow | 0.0.0.0 | - |
| `LANGFLOW_PORT` | Langflow | 7860 | - |
| `LANGFLOW_LOG_LEVEL` | Langflow | INFO | - |
| `LANGFLOW_SUPERUSER` | Langflow | admin | - |
| `LANGFLOW_AUTO_LOGIN` | Langflow | (secret) | - |
| `LANGFLOW_CONFIG_DIR` | Langflow | /app/langflow | - |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) | - |
| `LANGFLOW_SUPERUSER_PASSWORD` | Langflow | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langflow-or-visual-ai-workflow-builder-w)
