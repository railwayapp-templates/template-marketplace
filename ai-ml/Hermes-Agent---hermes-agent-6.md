# Deploy Hermes Agent on Railway

Self-hosted Nous Research Hermes Agent: memory, skills, cron & API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-6)

## About

Hermes Agent is an open-source, self-improving AI agent from Nous Research. It has persistent memory, a skill system, cron-based scheduling, and an OpenAI-compatible API — usable from a web dashboard, terminal, Telegram, Discord, or Slack. This template runs the official `nousresearch/hermes-agent` image with a persistent volume, so your memory, skills, and config survive every redeploy.

This template deploys the official Hermes Agent Docker image and starts the gateway (`gateway run`), which exposes an OpenAI-compatible API on port 8642 with a public `/health` endpoint plus the web dashboard on port 9119. All state — configuration, API keys, sessions, memory, and skills — is stored in a volume mounted at `/opt/data`, so nothing is lost between deploys. You supply one LLM provider key (OpenRouter by default) and a bearer key is auto-generated to protect the API. No external database is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nousresearch/hermes-agent:latest | `nousresearch/hermes-agent:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HERMES_HOME` | /opt/data |
| `HERMES_MODEL` | openrouter/anthropic/claude-3.5-sonnet |
| `API_SERVER_HOST` | 0.0.0.0 |
| `API_SERVER_PORT` | 8642 |
| `HERMES_DASHBOARD` | 1 |
| `API_SERVER_ENABLED` | true |
| `OPENROUTER_API_KEY` | (secret) |

## Configuration

- **Start command:** `gateway run`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-6)
