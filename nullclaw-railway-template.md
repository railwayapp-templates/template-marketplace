# Deploy nullclaw-railway-template on Railway

Deploy Nullclaw with one click on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nullclaw-railway-template)

## About

A Docker-based deployment template for NullClaw — an AI agent framework supporting Claude, GPT, Llama, and other LLMs via Telegram, Discord, Slack, IRC, and CLI. Deploy to Railway.app or run locally with Docker in minutes.

Hosting nullclaw-railway-template requires deploying a Docker container that runs the NullClaw binary. The template uses a multi-stage build to compile NullClaw from its GitHub repository with Zig. At runtime, `entrypoint.sh` generates a JSON configuration file from environment variables. The service exposes HTTP endpoints for health checks (`/health`) and API access on port 3000. You'll need at least one LLM provider API key — OpenRouter is recommended for its 100+ model support.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nullclaw-railway-template | [codetitlan/nullclaw-railway-template](https://github.com/codetitlan/nullclaw-railway-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `XAI_API_KEY` | (secret) | - |
| `GATEWAY_HOST` | 0.0.0.0 | - |
| `GATEWAY_PORT` | 3000 | Security settings |
| `GROQ_API_KEY` | (secret) | - |
| `AUDIT_ENABLED` | true | - |
| `DEFAULT_MODEL` | openrouter/minimax/minimax-m2.5 | \ |
| `AUTONOMY_LEVEL` | supervised | - |
| `MEMORY_BACKEND` | sqlite | - |
| `OPENAI_API_KEY` | (secret) | - |
| `WORKSPACE_ONLY` | true | - |
| `MISTRAL_API_KEY` | (secret) | - |
| `REQUIRE_PAIRING` | true | - |
| `SANDBOX_BACKEND` | auto | - |
| `DEEPSEEK_API_KEY` | (secret) | - |
| `ALLOW_PUBLIC_BIND` | true | - |
| `ANTHROPIC_API_KEY` | (secret) | - |
| `OPENROUTER_API_KEY` | (secret) | - |
| `MAX_ACTIONS_PER_HOUR` | 20 | - |

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/nullclaw-railway-template)
