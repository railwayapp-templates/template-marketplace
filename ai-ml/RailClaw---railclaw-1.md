# Deploy RailClaw on Railway

One-click OpenClaw deployment — persistent, containerized, just add keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railclaw-1)

## About

RailClaw is a secure, containerized, one-click deploy of OpenClaw on Railway — a pre-configured gateway with Control UI, token auth, channel health monitoring and persistent storage. No manual config files, no CLI setup, just deploy and connect.

Hosting RailClaw requires a persistent process that stays online to maintain connections to messaging channels and handle incoming requests. 

The gateway needs API keys for your chosen LLM provider (Anthropic, OpenAI) and a secure gateway auth token.                          

Railway handles the container lifecycle, health checks, and automatic restarts — so the gateway stays available without manual intervention. 

Configuration is injected via environment variables at deploy time, with no files to manage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railclaw | [looselyorganized/railclaw](https://github.com/looselyorganized/railclaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 18789 | Port the gateway listens on — must match OpenClaw's default (18789)  |
| `BRAVE_API_KEY` | (secret) | Enables the web_search tool for live web results |
| `OPENAI_API_KEY` | (secret) | Alternative LLM provider for GPT models |
| `OPENCLAW_MODEL ` | - | Default agent model (default: anthropic/claude-sonnet-4-6) |
| `ANTHROPIC_API_KEY ` | (secret) | Powers the agent's conversational model (Claude). Get one at console.anthropic.com |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Random string to secure gateway API access. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.openclaw`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/railclaw-1)
