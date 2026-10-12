# Deploy Open WebUI | (Just Updated) ChatGPT-Style UI for Any LLM, Chats Survive Redeploys on Railway

Self-hosted ChatGPT-style UI for any LLM. Chats persist on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-or-just-updated-chatgpt-style)

## About

Open WebUI is a self-hosted, ChatGPT-style chat interface for large language models. It connects to OpenAI-compatible APIs (OpenAI, OpenRouter, Groq, vLLM, LiteLLM, Ollama and others) and adds multi-user accounts, chat history, document upload with retrieval, prompt libraries and model management. This template runs the official Open WebUI image from a digest-pinned tag as a single service with a Railway volume holding all data.

- **The first account to sign up becomes the admin.** Open the public URL and register; that user is the administrator. Every later signup lands as `pending` (`DEFAULT_USER_ROLE=pending`) until the admin approves it, so strangers who find the URL cannot use your API keys.
- **Sessions and secrets are set for you.** `WEBUI_SECRET_KEY` is generated per deploy and `WEBUI_URL` is set to the public domain, so logins survive restarts and OAuth redirects point at the right address.
- **Chats survive redeploys.** The volume is mounted at `/app/backend/data`, where Open WebUI keeps its SQLite database, uploaded files and vector store. The start command prints the user id and whether the directory is writable in the deploy log.
- **Thread counts follow your plan.** The start command reads the container CPU limit and sets `OMP_NUM_THREADS` and `MKL_NUM_THREADS` from it, so the embedding model does not oversubscribe the host's cores.
- **No bundled Ollama.** The built-in Ollama API is switched off. Add a model provider under Admin Panel, Settings, Connections (an OpenAI-compatible URL and key), or point it at an Ollama service in the same project.
- **Telemetry is off.** Scarf and anonymized telemetry are disabled.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `ghcr.io/open-webui/open-webui:v0.12.0@sha256:1565038903151ced924b5a3226f73f40f16963df4b910441f6391f10144afdaa` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WEBUI_SECRET_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; N=1; if [ -r /sys/fs/cgroup/cpu.max ]; then read Q P < /sys/fs/cgroup/cpu.max; [ "$Q" != max ] && N=$(( (Q + P - 1) / P )); else N=$(nproc); fi; export OMP_NUM_THREADS=$N MKL_NUM_THREADS=$N ENABLE_OLLAMA_API=false DEFAULT_USER_ROLE=pending SCARF_NO_ANALYTICS=true DO_NOT_TRACK=true ANONYMIZED_TELEMETRY=false; echo "[railway] uid=$(id -u) threads=$N data=$(stat -c %u:%g /app/backend/data)"; test -w /app/backend/data && echo "[railway] data writable"; cd /app/backend; exec bash start.sh'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-or-just-updated-chatgpt-style)
