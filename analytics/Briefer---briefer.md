# Deploy Briefer on Railway

Dashboard visualizations with Jupyter notebooks, Python, SQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/briefer)

## About

Briefer is a collaborative data platform that combines the flexibility of code notebooks with the ease of dashboards, supporting SQL, Python, and native visualizations. Designed for teams, it enables technical and non-technical users to analyze data, build interactive data apps, and share insights—all within a Notion-like, multiplayer workspace enhanced by AI-driven code generation and automation.

Simply provide an OpenAI api key in the Briefer AI service's configuration

After everything is deployed, visit the `briefer-nginx` service's public URL to access Briefer

Caveats to note: I've had issues connecting the Briefer API service to the Jupyter service and the AI service via internal IPv6 networking. The Jupyter service has a public TCP proxy assigned while the AI service has a public domain assigned. Communications over these public protocols might incur additional charges.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| briefer-ai | `briefercloud/briefer-ai` | Web service |
| briefer-jupyter | `briefercloud/briefer-jupyter` | Database |
| briefer-migration | `briefercloud/briefer-api` | Worker |
| briefer-nginx | [ju-li/railway-briefer](https://github.com/ju-li/railway-briefer) | Web service |
| pgvector | `pgvector/pgvector:pg16` | Database |
| briefer-web | [ju-li/railway-briefer](https://github.com/ju-li/railway-briefer) | Worker |
| briefer-api | `briefercloud/briefer-api` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | briefer-ai | 8000 | - |
| `OPENAI_API_KEY` | briefer-ai | (secret) | - |
| `BASIC_AUTH_PASSWORD` | briefer-ai | (secret) | - |
| `BASIC_AUTH_USERNAME` | briefer-ai | (secret) | - |
| `OPENAI_DEFAULT_MODEL_NAME` | briefer-ai | gpt-4o | - |
| `PORT` | briefer-jupyter | 8888 | - |
| `JUPYTER_TOKEN` | briefer-jupyter | (secret) | - |
| `NODE_ENV` | briefer-migration | production | - |
| `PORT` | briefer-nginx | 3000 | - |
| `POSTGRES_DB` | pgvector | briefer | Default database created when image is started. |
| `DATABASE_URL` | pgvector | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | pgvector | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | pgvector | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | briefer-web | production | - |
| `PORT` | briefer-api | 8080 | - |
| `API_URL` | briefer-api | /api | - |
| `NODE_ENV` | briefer-api | production | - |
| `LOG_LEVEL` | briefer-api | debug | - |
| `FRONTEND_URL` | briefer-api | / | - |
| `JUPYTER_TOKEN` | briefer-api | (secret) | - |
| `POSTGRES_PORT` | briefer-api | 5432 | - |
| `AI_API_PASSWORD` | briefer-api | (secret) | - |
| `AI_API_USERNAME` | briefer-api | (secret) | - |
| `AUTH_JWT_SECRET` | briefer-api | (secret) | - |
| `LOGIN_JWT_SECRET` | briefer-api | (secret) | - |
| `POSTGRES_DATABASE` | briefer-api | briefer | - |
| `POSTGRES_PASSWORD` | briefer-api | (secret) | - |
| `POSTGRES_USERNAME` | briefer-api | (secret) | - |
| `PYTHON_ALLOWED_LIBRARIES` | briefer-api | plotly,matplotlib,numpy,pandas | - |
| `WORKSPACE_SECRETS_ENCRYPTION_KEY` | briefer-api | (secret) | - |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c "jupyter server --ip=0.0.0.0 --ZMQChannelsWebsocketConnection.iopub_data_rate_limit=1.0e10 --ZMQChannelsWebsocketConnection.iopub_msg_rate_limit=1.0e6 --ServerApp.max_body_size=107374182400 --allow-root"`
- **Healthcheck:** `/api`
- **TCP Proxies:** 8888
- **Volume:** `/home/jupyteruser`
- **Start command:** `sh -c "cd /app/packages/database && npx prisma migrate deploy"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/briefer)
