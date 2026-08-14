# Deploy Hermes Kanban Web on Railway

Self-hosted Kanban board backed by the Hermes Agent + web terminal

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-kanban-web-1)

## About

Deploy this template on Railway with one click. Railway provides compute, TLS at the edge, and a public URL. The service restarts automatically on failures. The template provisions two services: the **hermes-kanban-web** app (from the `nousresearch/hermes-agent` Docker image) with a persistent volume at `/opt/data`, plus a companion **Ollama** service (from `ollama/ollama`) with a volume at `/root/.ollama` for local LLM inference. The app's `OLLAMA_BASE_URL` is auto-linked to the sibling over the internal Railway network.

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/hermes-kanban-web-1)

The app runs **inside the `nousresearch/hermes-agent` Docker image**, so the `hermes` CLI is on PATH and all persistent state (boards, profiles, config) lives under `HERMES_HOME` (`/opt/data`) on a Railway volume. Boards, profiles, stashed cards and theme survive redeploys and restarts. The runtime is supervised by supervisord (nginx public proxy, uvicorn FastAPI app, Hermes gateway, ttyd web terminal) running as the `hermes` user. The terminal at `/kanban-terminal/` uses ttyd's built-in token auth (no nginx basic auth — Railway's edge proxy returns 407 when an `Authorization` header reaches terminal paths, so auth is delegated to ttyd's token check via a boot-hook-written credential file).

### Updating Hermes

The Hermes runtime (`hermes` CLI + agent) is baked into the Docker image. The `/opt/hermes` directory in the container is the image's own runtime — it is **not** a persistent volume (Railway allows one volume per service, which is used for `/opt/data`).

- To update `hermes`, open the web terminal at `/kanban-terminal/` and run `hermes update` (or `pip install -U hermes-agent`). The update installs to the image's `/opt/hermes` but **does not survive redeploys** — it will revert to the base-image version on the next deploy.
- If you need a persistent custom Hermes install, you would need a separate template/service pattern (not supported in this single-service template).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama/ollama:latest | `ollama/ollama:latest` | Database |
| hermes-kanban-web | [INAPP-Mobile/hermes-kanban-web](https://github.com/INAPP-Mobile/hermes-kanban-web) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_BASE_URL` | ollama/ollama:latest | - | Ollama API base URL. Auto-configured to the internal Railway private domain over HTTPS. |
| `PORT` | hermes-kanban-web | 8502 | HTTP port Railway routes to. Railway injects this automatically. |
| `HERMES_HOME` | hermes-kanban-web | /opt/data | Root directory for all Hermes persistent state (boards, profiles, config). Mounted as a Railway volume. |
| `ADMIN_PASSWORD` | hermes-kanban-web | (secret) | Password for the /terminal/ web terminal basic-auth gate. |
| `ADMIN_USERNAME` | hermes-kanban-web | (secret) | Username for the /terminal/ web terminal basic-auth gate. |
| `OLLAMA_BASE_URL` | hermes-kanban-web | - | Ollama API base URL. Auto-linked to the sibling Ollama service for local LLM inference. |
| `HERMES_KANBAN_API_TOKEN` | hermes-kanban-web | (secret) | OPTIONAL bearer token. When set, all API requests (including the SSE stream) require 'Authorization: Bearer ***'. Leave empty to keep the board open. |

## Configuration

- **Start command:** `ollama serve`
- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Languages:** JavaScript, Python, CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-kanban-web-1)
