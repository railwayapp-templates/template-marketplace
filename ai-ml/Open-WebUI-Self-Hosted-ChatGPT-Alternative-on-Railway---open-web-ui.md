# Deploy Open WebUI — Self-Hosted ChatGPT Alternative on Railway on Railway

Self-host Open WebUI: 136k stars, multi-model AI chat. No per-user fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-web-ui)

## About

![Open WebUI Interface](https://docs.openwebui.com/assets/images/demo-f704541c988ae735dde16b8baba17627.png)

Open WebUI is the world's most popular self-hosted AI chat platform — **136k+ GitHub stars**,
282 million container downloads, and the default recommendation in virtually every "private
ChatGPT alternative" guide published in 2026. Connect Ollama for local models, OpenAI,
Anthropic, DeepSeek, or any OpenAI-compatible API — all from one polished, ChatGPT-style
interface you fully own. Built-in RAG, multi-user access controls, Python tool runner, MCP
integration, and image generation — zero subscription fees, zero data sent to third parties.

---

Running Open WebUI in production requires a persistent volume for chat history and uploaded
documents, a public HTTPS endpoint for browser access, and secure environment variable handling
for LLM API credentials. Without a managed host, you're configuring Docker, managing volume
mounts, setting up SSL, and handling process restarts manually.

Railway provisions all of it automatically. This template deploys Open WebUI from the official
GitHub Container Registry image, mounts a persistent volume at `/app/backend/data`, and exposes
a public HTTPS URL immediately after deploy. Your chat history, user accounts, uploaded
documents, and RAG vector data survive every redeploy.

Typical cost: **~$5/month** on Railway's Hobby plan. ChatGPT Plus costs $20/month with usage
caps and OpenAI's data policies. Claude Pro costs $20/month. Open WebUI on Railway gives your
entire team access to multiple AI models at a flat ~$5/month compute cost — you pay only for
the LLM API tokens you actually use.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `ghcr.io/open-webui/open-webui:main` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_BASE_URL` | https://ollama.com |

## Configuration

- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-web-ui)
