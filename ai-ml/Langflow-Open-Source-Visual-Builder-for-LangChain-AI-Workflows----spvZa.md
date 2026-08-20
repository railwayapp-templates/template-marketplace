# Deploy Langflow | Open Source Visual Builder for LangChain AI Workflows on Railway

Low-code visual builder for RAG and multi-agent AI apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-spvZa)

## About

Langflow is a visual builder for LLM applications: drag components onto a canvas, connect them into RAG pipelines or multi-agent workflows, test them in the browser, and expose the result as an API endpoint. It is built on LangChain, so anything you assemble visually maps onto code you can read.

Langflow with PostgreSQL rather than the default SQLite, which is what makes it survive a redeploy: flows, users and API keys live in the database, and the config directory sits on a persistent volume.

Authentication is on. Langflow ships with an auto-login mode that hands every visitor an admin session — reasonable on a laptop, not on a public domain where flows can call out to your API keys. This template disables it, creates a superuser with a generated password, and requires new accounts to be activated by that superuser instead of self-serving.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langflow | `langflowai/langflow:1.11.2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16.15` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | langflow | 7860 | Port |
| `DB_WAIT_HOST` | langflow | - | Postgres private host; the start command waits for it before running Langflow's migrations. |
| `DB_WAIT_PORT` | langflow | 5432 | Postgres port waited on before Langflow starts. |
| `DO_NOT_TRACK` | langflow | true | Do not track |
| `LANGFLOW_PORT` | langflow | - | Port |
| `LANGFLOW_SUPERUSER` | langflow | admin | Superuser |
| `LANGFLOW_AUTO_LOGIN` | langflow | (secret) | Auth login |
| `LANGFLOW_CONFIG_DIR` | langflow | /app/langflow | Langflow Config Directory |
| `LANGFLOW_SECRET_KEY` | langflow | (secret) | Secret Key |
| `LANGFLOW_DATABASE_URL` | langflow | - | DB URL |
| `LANGFLOW_NEW_USER_IS_ACTIVE` | langflow | false | New user is active |
| `LANGFLOW_SUPERUSER_PASSWORD` | langflow | (secret) | Superuser Password |
| `POSTGRES_DB` | Postgres | railway | DB Name |
| `DATABASE_URL` | Postgres | - | DB URL |
| `POSTGRES_USER` | Postgres | (secret) | DB User |
| `POSTGRES_PASSWORD` | Postgres | (secret) | DB Password |
| `DATABASE_PUBLIC_URL` | Postgres | - | DB Public URL |

## Configuration

- **Start command:** `bash -c 'for i in $(seq 1 90); do (echo > /dev/tcp/$DB_WAIT_HOST/$DB_WAIT_PORT) 2>/dev/null && break; echo "waiting for postgres ($i/90)"; sleep 2; done; exec python -m langflow run --host 0.0.0.0'`
- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/-spvZa)
