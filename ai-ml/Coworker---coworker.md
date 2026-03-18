# Deploy Coworker on Railway

Array Ventures: Coworker Agent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coworker)

## About

Coworker is an open-source AI agent built with [Mastra](https://mastra.ai). It acts as an AI team member that handles tasks, answers questions, and manages workflows via chat. Supports OpenAI, Anthropic, Google Gemini, NVIDIA, Groq, and Kimi. Includes A2A protocol, MCP server/client with UI, Lovable-like app builder, and a skills marketplace. An open-source alternative to OpenClaw.

This template deploys a complete Coworker stack: the Mastra server, Inngest for scheduled task workflows, Postgres and Redis for Inngest's production mode, and an optional Tailscale subnet router for private network access. All services are pre-configured with Railway's private networking so they communicate securely without public exposure. After deploying, set your preferred AI model and provider API key. Download the [Coworker desktop app](https://github.com/Array-Ventures/coworker/releases) for macOS and point it at your Railway server URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| coworker | `ghcr.io/array-ventures/coworker:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MODEL` | - | AI model to use (e.g. openai/gpt-4o, anthropic/claude-sonnet-4-20250514, nvidia/moonshotai/kimi-k2.5) |
| `DATA_PATH` | - | File workspace base path. No changes needed. |
| `GROQ_API_KEY` | (secret) | Groq API key. Required if using a Groq model. |
| `KIMI_API_KEY` | (secret) | Kimi API key. Required if using a Kimi model. |
| `NVIDIA_API_KEY` | (secret) | NVIDIA API key. Required if using an NVIDIA-hosted model. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key. Required if using an OpenAI model. |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key. Required if using a Claude model. |
| `COWORKER_API_TOKEN` | (secret) | Agent API Token |
| `GOG_KEYRING_PASSWORD` | (secret) | Optional. Password for Google Workspace credentials keyring. |
| `GOOGLE_GENERATIVE_AI_API_KEY` | (secret) | Google AI API key. Required if using a Gemini model. |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/coworker)
