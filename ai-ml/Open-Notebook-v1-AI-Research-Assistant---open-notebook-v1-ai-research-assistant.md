# Deploy Open Notebook v1 AI Research Assistant on Railway

Private NotebookLM alternative: chat with your sources, generate podcasts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-notebook-v1-ai-research-assistant)

## About

Open Notebook is an open-source, privacy-focused alternative to Google NotebookLM. Collect PDFs, web pages, YouTube videos, audio and notes into notebooks, chat with them with citations, search across everything and turn your material into multi-speaker podcasts, using the AI providers you choose. This template runs Open Notebook with SurrealDB, password protection and persistent storage.

Open Notebook's official image runs three processes: a Next.js web app, a FastAPI backend and a background worker that ingests sources, creates embeddings and renders podcasts. They share one data directory for uploads and audio, and store everything else in SurrealDB. Hosting it means keeping those processes together, giving them persistent storage, protecting the instance with a password and an encryption key for stored API keys, and pointing the browser at the right API URL. This community template pins Open Notebook 1.15.0 and SurrealDB 2.7.0, generates every secret, serves the UI and API from one HTTPS domain, and adds healthchecks so a deploy only goes live once the database is migrated and the app answers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SurrealDB | `surrealdb/surrealdb:v2.7.0` | Database |
| Open Notebook | `lfnovo/open_notebook:1.15.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SurrealDB | 8000 | Port SurrealDB listens on (HTTP + WebSocket RPC). Used by the healthcheck and by Open Notebook. |
| `SURREAL_LOG` | SurrealDB | info | SurrealDB log level. |
| `SURREAL_BIND` | SurrealDB | [::]:8000 | Listen address: all IPv6 and IPv4 interfaces on the private network (no public domain). |
| `SURREAL_PASS` | SurrealDB | - | Root password created on first start. Generated at deploy. |
| `SURREAL_PATH` | SurrealDB | rocksdb:/data/open-notebook.db | Storage engine and data path on the /data volume (RocksDB, as in upstream's docker-compose). |
| `SURREAL_USER` | SurrealDB | (secret) | Root user created on first start. Generated at deploy. |
| `SURREAL_NO_BANNER` | SurrealDB | true | Skip the ASCII banner in the logs. |
| `SURREAL_EXPERIMENTAL_GRAPHQL` | SurrealDB | true | Same setting as upstream Open Notebook's docker-compose. |
| `PORT` | Open Notebook | 8502 | Port of the Next.js frontend, which also proxies /api/* to the internal API (5055). Railway routes the domain and the healthcheck here. |
| `API_URL` | Open Notebook | - | Public URL the browser uses for API calls (same origin, proxied by the frontend). Update it if you add a custom domain. |
| `SURREAL_URL` | Open Notebook | - | SurrealDB WebSocket endpoint on the private network. |
| `CORS_ORIGINS` | Open Notebook | - | Origins allowed to call the API cross-origin (upstream default is *). Add your custom domain here if you use one. |
| `SURREAL_USER` | Open Notebook | (secret) | SurrealDB root user (from the SurrealDB service). |
| `SURREAL_DATABASE` | Open Notebook | open_notebook | SurrealDB database used by Open Notebook. |
| `SURREAL_PASSWORD` | Open Notebook | (secret) | SurrealDB root password (from the SurrealDB service). |
| `SURREAL_NAMESPACE` | Open Notebook | open_notebook | SurrealDB namespace used by Open Notebook. |
| `OPEN_NOTEBOOK_PASSWORD` | Open Notebook | (secret) | Password for the web UI, also the REST API bearer token. Generated at deploy; empty disables authentication entirely. |
| `OPEN_NOTEBOOK_ENCRYPTION_KEY` | Open Notebook | - | Encrypts AI provider credentials stored in the database. Required; changing it makes saved credentials unreadable. |
| `OPEN_NOTEBOOK_WORKER_MAX_TASKS` | Open Notebook | 5 | Background tasks (source processing, embeddings, podcasts) the worker runs at once (upstream default 5). Use 1 for strict provider rate limits. |
| `OPEN_NOTEBOOK_MAX_UPLOAD_SIZE_MB` | Open Notebook | 100 | Largest upload the API accepts, in MB (upstream default 100). |

## Configuration

- **Start command:** `/surreal start`
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Healthcheck:** `/api/config`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Tags:** open-notebook, notebooklm, research, rag, podcast

[View on Railway →](https://railway.com/deploy/open-notebook-v1-ai-research-assistant)
