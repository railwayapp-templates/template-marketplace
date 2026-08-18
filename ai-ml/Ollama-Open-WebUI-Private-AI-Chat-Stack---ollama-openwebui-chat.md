# Deploy Ollama + Open WebUI — Private AI Chat Stack on Railway

Self-host a private AI chat UI with local & cloud models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-openwebui-chat)

## About

This template pairs Open WebUI — the most popular self-hosted AI chat interface — with Ollama, the open-source local model runner, in one private stack. You get a polished, ChatGPT-style UI you fully own, wired to Ollama for running open models and to any cloud provider (OpenAI, Anthropic, and more) through the same interface. On Railway's CPU compute, Ollama is best for small models and embeddings, or pointed at an external GPU host, while cloud APIs handle heavy generation — so you get a flexible private AI workspace without sending your conversations to a third party.

---

This is a two-service private AI stack, and understanding what runs well where makes it genuinely useful — this template is set up honestly around Railway's compute.

**Open WebUI is the private frontend — that's the reliable win.** You get a full ChatGPT-style interface you own: multi-model chat, user accounts and roles, conversation history, built-in RAG over your documents, and a tool runner — all self-hosted, with no per-user fees and no data sent to a third party. This works great on Railway regardless of where the models run.

**Ollama on Railway suits small models and embeddings — size expectations honestly.** Railway provides CPU compute, not GPUs, so Ollama here runs small models (1–3B) and embedding models at usable speeds, which is genuinely handy for lightweight chat, testing, and RAG embeddings. Larger models (7B and up) run slowly on CPU and can exceed memory — for fast local inference on big models, point Open WebUI at an external GPU-backed Ollama host via `OLLAMA_BASE_URL`, or use a cloud API for heavy generation. This template is honest about that so you configure it for good results rather than hitting a wall.

**Mix local and cloud in one interface.** Set `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` and Open WebUI shows those models alongside anything served by Ollama — run a small local model for quick private tasks and switch to a frontier cloud model for heavy work, in the same chat.

**Persist both volumes.** Open WebUI's data (chats, users, documents, RAG vectors) lives on its volume, and Ollama's pulled models on theirs — both survive redeploys, so you don't re-download multi-gigabyte models or lose history. Model storage grows with each model you pull.

**Set the secret key and lock signups.** Set `WEBUI_SECRET_KEY` to a stable random value so sessions stay valid, and `ENABLE_SIGNUP=false` after creating your admin account so the public can't register. The first account you create becomes the administrator.

Typical cost: **~$5–15/month** on Railway for the two services and model storage, plus any cloud LLM usage. Both tools are free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama | `ollama/ollama` | Database |
| Open-WebUI | `ghcr.io/open-webui/open-webui` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OLLAMA_HOST` | ollama | :: | Allows Ollama to listen on all interfaces |
| `OLLAMA_ORIGINS` | ollama | - | Comma-separated list of allowed origins for CORS. Needed if you’re connecting a web app (like OpenWebUI) from a different host/domain |
| `OLLAMA_BASE_URL` | Open-WebUI | - | Points OpenWebUI to the internal Ollama API endpoint for model access. |
| `WEBUI_SECRET_KEY` | Open-WebUI | (secret) | Secret key used by OpenWebUI to secure sessions and authentication. |
| `CORS_ALLOW_ORIGIN` | Open-WebUI | * | Allows the web UI to connect from any origin. |

## Configuration

- **Volume:** `/root/.ollama`
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-openwebui-chat)
