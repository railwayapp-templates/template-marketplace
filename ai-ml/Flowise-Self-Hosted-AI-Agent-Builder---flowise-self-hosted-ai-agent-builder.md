# Deploy Flowise – Self-Hosted AI Agent Builder on Railway

Self-hosted Flowise: Build AI agents, chatbots & RAG pipelines visually.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-self-hosted-ai-agent-builder)

## About

Flowise is the most popular open-source drag-and-drop UI for building LLM-powered applications, AI agents, and chatbots. Deploy your own Flowise instance on Railway in under 2 minutes — no DevOps expertise needed. Perfect for developers, startups, and enterprises who want full control over their AI workflows without vendor lock-in.

Flowise lets you build production-ready AI applications using a visual node-based editor. By hosting Flowise on Railway, you get automatic HTTPS, persistent storage, zero-downtime deploys, and instant scaling — all without touching a server. Railway handles the infrastructure so you can focus on building powerful AI workflows with GPT-4, Claude, Gemini, Llama, and 100+ other LLM integrations.

This template deploys Flowise with:
- Persistent local SQLite database (no additional DB cost)
- Configurable username/password authentication
- Health-check monitoring via /api/v1/ping
- Auto-restart on failure with 10 retries
- File upload support up to 50MB
- Pre-configured storage paths for flows, API keys, and logs

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flowise | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `DEBUG` | false |
| `LOG_PATH` | /home/node/.flowise/logs |
| `APIKEY_PATH` | /home/node/.flowise |
| `DATABASE_PATH` | /home/node/.flowise |
| `SECRETKEY_PATH` | (secret) |
| `FLOWISE_PASSWORD` | (secret) |
| `FLOWISE_USERNAME` | (secret) |
| `BLOB_STORAGE_PATH` | /home/node/.flowise/storage |
| `FLOWISE_FILE_SIZE_LIMIT` | 50mb |
| `FLOWISE_SECRETKEY_OVERWRITE` | (secret) |

## Configuration

- **Healthcheck:** `/api/v1/ping`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, HTML, Handlebars, CSS, SCSS, Shell, Dockerfile, Batchfile

[View on Railway →](https://railway.com/deploy/flowise-self-hosted-ai-agent-builder)
