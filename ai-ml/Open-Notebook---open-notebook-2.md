# Deploy Open Notebook on Railway

Self-hosted NotebookLM alternative with SurrealDB, notes, chat and podcasts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-notebook-2)

## About

Open Notebook is an open-source, self-hosted alternative to Google's NotebookLM. You collect sources (PDFs, web pages, YouTube, audio, text), chat with them with citations, keep notes, run reusable transformations, search across everything, and generate multi-speaker podcasts. It works with OpenAI, Anthropic, Google, Groq, Mistral, OpenRouter, Ollama, and any OpenAI-compatible endpoint, configured from the UI.

Hosting Open Notebook means running its container (Next.js UI, FastAPI backend, and a background worker under supervisord) next to a SurrealDB instance. This template mirrors the upstream two-service `docker-compose.yml`: the app image `lfnovo/open_notebook:1.14.0` with a volume at `/app/data` for uploads, podcasts, and caches, and `surrealdb/surrealdb:v2.6.5` with a volume at `/data` for the RocksDB datastore. Only the UI port (8502) is public; the frontend proxies `/api/*` to the backend, so a single Railway domain covers both. `API_URL` is pinned to the generated public domain because the frontend would otherwise auto-detect a `:5055` URL that Railway does not expose. SurrealDB binds `[::]:8000` for IPv6 private networking and runs with `RAILWAY_RUN_UID=0` so the non-root image can write the root-mounted volume. Both services have healthchecks with `PORT` set to their listen ports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SurrealDB | `surrealdb/surrealdb:v2.6.5` | Database |
| Open Notebook | `lfnovo/open_notebook:1.14.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SurrealDB | 8000 | Port Railway's healthcheck probes. Must equal the SurrealDB listen port set in SURREAL_BIND. |
| `SURREAL_BIND` | SurrealDB | [::]:8000 | Listen address. IPv6 wildcard (dual-stack on Linux) is required for Railway private networking; the image default 0.0.0.0:8000 is IPv4-only. |
| `SURREAL_PASS` | SurrealDB | - | Initial root password. Persisted inside the datastore on first boot, so changing this variable later does NOT change the stored credential. |
| `SURREAL_PATH` | SurrealDB | rocksdb:/data/mydatabase.db | Datastore path on the attached volume. RocksDB matches the upstream Open Notebook compose file. |
| `SURREAL_USER` | SurrealDB | (secret) | Initial root user, created on first boot only if no root user exists yet. |
| `SURREAL_EXPERIMENTAL_GRAPHQL` | SurrealDB | true | Set in the upstream docker-compose.yml. Not required by Open Notebook itself; safe to remove. |
| `PORT` | Open Notebook | 8502 | Port Railway's healthcheck and edge proxy probe. Must equal the Next.js frontend listen port (8502). The FastAPI backend stays on 5055 inside the container and is reached through the frontend's /api/* rewrite. |
| `API_URL` | Open Notebook | - | Public origin the browser uses for API calls (no trailing /api). Must be set: without it the frontend auto-detects https://<host>:5055, which Railway does not expose. Update if you attach a custom domain. |
| `SURREAL_URL` | Open Notebook | - | SurrealDB WebSocket RPC URL over Railway private networking. Must include the port and the /rpc path. |
| `CORS_ORIGINS` | Open Notebook | - | Origins allowed to call the API directly. Browser traffic goes through the same-origin /api rewrite, so this only matters for external API clients. Add custom domains here if you use them. |
| `SURREAL_USER` | Open Notebook | (secret) | SurrealDB root user, referenced from the SurrealDB service so the two always match. |
| `GOOGLE_API_KEY` | Open Notebook | (secret) | Optional and deprecated upstream. Prefer adding providers in the UI under Manage > Models after deploy. |
| `OPENAI_API_KEY` | Open Notebook | (secret) | Optional and deprecated upstream. Prefer adding providers in the UI under Manage > Models after deploy. |
| `INTERNAL_API_URL` | Open Notebook | http://localhost:5055 | Where the Next.js server proxies /api/* internally. Both processes run in this container, so leave it at localhost:5055. |
| `SURREAL_DATABASE` | Open Notebook | open_notebook | SurrealDB database name. Migrations run automatically on first boot. |
| `SURREAL_PASSWORD` | Open Notebook | (secret) | SurrealDB root password, referenced from the SurrealDB service. |
| `ANTHROPIC_API_KEY` | Open Notebook | (secret) | Optional and deprecated upstream. Prefer adding providers in the UI under Manage > Models after deploy. |
| `SURREAL_NAMESPACE` | Open Notebook | open_notebook | SurrealDB namespace. Created automatically on first boot. |
| `OPEN_NOTEBOOK_PASSWORD` | Open Notebook | (secret) | Login password for the web UI and API (Bearer token). Auth is fully disabled if this is empty, so keep it set on a public deployment. |
| `OPEN_NOTEBOOK_ENCRYPTION_KEY` | Open Notebook | - | Encrypts AI provider credentials stored in SurrealDB. Set once; if it changes, every stored credential becomes unreadable. |

## Configuration

- **Start command:** `/surreal start --log info`
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Healthcheck:** `/api/auth/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-notebook-2)
