# Deploy wild-pure on Railway

Lightweight, privacy-first LLM proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wild-pure)

## About

VoidLLM is a lightweight, privacy-first LLM proxy for teams. It sits between your applications and LLM providers, giving you organization-wide access control, usage tracking, and key management. One binary, sub-2ms overhead, zero knowledge of your prompts.

VoidLLM deploys as a single Docker container with SQLite for storage. No external databases required. Two environment variables are auto-generated during deploy, and the proxy is immediately ready. Open the web UI to create your organization, add upstream LLM providers like OpenAI, Anthropic, Azure, Ollama, or vLLM, generate scoped API keys, and start proxying. Your existing OpenAI SDK code works by just changing the base URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| voidmind-io/voidllm:latest | `ghcr.io/voidmind-io/voidllm:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `VOIDLLM_ADMIN_KEY` | Bootstrap key for initial setup. Creates the first admin user and organization on first start. |
| `VOIDLLM_ENCRYPTION_KEY` | Encryption key for securing upstream API keys in the database. Auto-generated — do not change after first deploy. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/wild-pure)
