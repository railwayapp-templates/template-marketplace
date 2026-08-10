# Deploy Hermes Kanban Web on Railway

Self-hosted Kanban board backed by the Hermes Agent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-kanban-web-1)

## About

Host your own Hermes Kanban board in minutes with a single click. The template provisions a FastAPI + vanilla JS single-page application running inside the official `nousresearch/hermes-agent` Docker image, with SSH-free persistent storage for all board and profile data.

The app runs **inside the `nousresearch/hermes-agent` Docker image**, so the `hermes` CLI is available on PATH and all persistent state (boards, profiles, config) lives under `HERMES_HOME` (`/opt/data`) on a Railway volume shared with the Hermes agent runtime. Because the data lives on a persistent volume, your boards, profiles, stashed cards and theme survive redeploys and restarts.

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
| `OLLAMA_BASE_URL` | hermes-kanban-web | - | Ollama API base URL. Auto-linked to the sibling Ollama service for local LLM inference. |
| `HERMES_KANBAN_API_TOKEN` | hermes-kanban-web | (secret) | OPTIONAL bearer token. When set, all API requests (including the SSE stream) require 'Authorization: Bearer ***'. Leave empty to keep the board open. |

## Configuration

- **Start command:** `ollama serve`
- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Languages:** JavaScript, Python, CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-kanban-web-1)
