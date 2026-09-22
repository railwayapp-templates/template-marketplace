# Deploy Supermemory with Cloudflare Zero Trust on Railway

Supermemory memory engine with Cloudflare Zero Trust Access protection.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supermemory-with-cloudflare-zero-trust)

## About

Railway provides the compute, networking, and persistent storage:
- Compute: CPU/RAM scales automatically with your plan
- Volume: 10GB persistent storage for the embedded graph database
- Networking: Public domain with private database connections and Cloudflare Access overlay
- Monitoring: Health checks on the /health endpoint

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| supermemory | [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | Environment (development or production). |
| `OLLAMA_MODEL` | - | Ollama model name (e.g., gpt-oss:20b). Only used if OLLAMA_BASE_URL is set. |
| `OPENAI_MODEL` | gpt-4o | OpenAI model name (e.g., gpt-4o, gpt-4-turbo). Ignored if using Ollama. |
| `CF_ACCOUNT_ID` | - | Cloudflare Account ID for Zero Trust policies. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key for LLM access (gpt-4, gpt-4o, etc.). Leave empty to use local model via Ollama. |
| `OLLAMA_BASE_URL` | - | Ollama endpoint URL for local LLM (e.g., http://localhost:11434). Use this for fully offline operation. |
| `SUPERMEMORY_PORT` | 6767 | Port Supermemory listens on. |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key for Claude models. Leave empty if using OpenAI or Ollama. |
| `CF_ACCESS_CLIENT_ID` | - | Cloudflare Access Client ID for Zero Trust authentication. |
| `CF_ACCESS_CLIENT_SECRET` | (secret) | Cloudflare Access Client Secret for Zero Trust authentication. |

## Configuration

- **Start command:** `supermemory-server`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.supermemory`

**Category:** AI/ML · **Tags:** supermemory, cloudflare, zero-trust, memory, ai, self-hosted · **Languages:** TypeScript, MDX, Python, CSS, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/supermemory-with-cloudflare-zero-trust)
