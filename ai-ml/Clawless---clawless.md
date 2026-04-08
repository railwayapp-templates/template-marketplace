# Deploy Clawless on Railway

Serverless AI agent backend — multi-provider, built-in tools, SSE streaming

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clawless)

## About

Clawless is OpenClaw's agent runtime extracted for serverless. It provides a ready-to-use AI agent backend with 14 built-in tools, SSE streaming, multi-turn sessions, and user isolation. Configure your agent's tools, knowledge, and API keys from any frontend via REST API — no redeployment needed. Supports 11 AI providers with automatic model fallback.

Deploying Clawless on Railway takes under a minute. Click the deploy button, set three environment variables (provider, model, API key), and your agent backend is live. Railway handles the Node.js build, port assignment, and health checks automatically. Clawless persists tool configurations, knowledge, and secrets to the local filesystem, which Railway maintains across restarts. Your frontend connects via REST API to send prompts, register tools, teach the agent, and stream responses. No additional databases or services are required for basic usage — everything runs in a single Railway service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clawless | [cloudlinqed/clawless](https://github.com/cloudlinqed/clawless) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |
| `DEFAULT_PROVIDER` | openai |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/clawless)
