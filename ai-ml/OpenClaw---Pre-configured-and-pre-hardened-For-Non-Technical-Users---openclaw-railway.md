# Deploy OpenClaw - Pre-configured and pre-hardened (For Non-Technical Users) on Railway

Security-hardened always-on OpenClaw AI personal assistant

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-railway)

## About

_A pre-configured and safe-by-default OpenClaw template on Railway_

OpenClaw is an AI assistant platform that is very powerful, and with that power comes a lot of responsibility... and many pages of security and sandboxing documentation... 

This template deploys a pre-configured and security-hardened instance with 5 layers of protection — filesystem sandboxing, process isolation, locked permissions, behavioral guardrails, and log filtering. Configure entirely via environment variables, no SSH required for most functionality.

This template wraps the official OpenClaw gateway with secure defaults. On every deploy, your environment variables are compiled into a locked-down config file. The agent runs as a non-root user with filesystem access restricted to its own workspace. You bring your own LLM provider key (OpenRouter recommended for access to all major models through a single key) and a bot token for your preferred channel. 

The progressive tier system lets you unlock more capabilities — from basic chat assistant to full shell access — with a single env var change.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway | [Mattslayga/openclaw-railway](https://github.com/Mattslayga/openclaw-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AGENT_NAME` | - | Set your agent name ahead of time or when you first meet |
| `XAI_API_KEY` | (secret) | API Key from Xai |
| `GROQ_API_KEY` | (secret) | API Key from Groq |
| `BRAVE_API_KEY` | (secret) | Default option for web search api |
| `GATEWAY_TOKEN` | (secret) | Needed for accessing the internal gateway |
| `SECURITY_TIER` | 0 | The active security tier |
| `STEEL_API_KEY` | (secret) | API Key from Steel |
| `OPENAI_API_KEY` | (secret) | API Key from OpenAI |
| `SLACK_OWNER_ID` | - | For setting up slack and pairing it to you |
| `VENICE_API_KEY` | (secret) | API Key from Venice |
| `MISTRAL_API_KEY` | (secret) | API Key from Mistral |
| `SLACK_APP_TOKEN` | (secret) | To set u a slack connection |
| `SLACK_BOT_TOKEN` | (secret) | To set up a slack connection |
| `DEEPGRAM_API_KEY` | (secret) | API Key from Deepgram |
| `DEEPSEEK_API_KEY` | (secret) | API Key from Deepseek |
| `DISCORD_OWNER_ID` | - | For discord connection and pairing it to you |
| `TOGETHER_API_KEY` | (secret) | API Key from Together |
| `ANTHROPIC_API_KEY` | (secret) | API Key for Anthropic |
| `DISCORD_BOT_TOKEN` | (secret) | For connecting discord |
| `FIREWORKS_API_KEY` | (secret) | API Key for Fireworks |
| `GOOGLE_AI_API_KEY` | (secret) | API Key for Google |
| `LLM_PRIMARY_MODEL` | openrouter/moonshotai/kimi-k2.5 | The default/primary model |
| `TELEGRAM_OWNER_ID` | - | For connecting telegram and pairing it with you |
| `CLOUDFLARE_API_KEY` | (secret) | API Key for Cloudflare gateway |
| `LLM_SUBAGENT_MODEL` | openrouter/minimax/minimax-m2.5 | To preselect a model for subagents |
| `OPENROUTER_API_KEY` | (secret) | API Key for Openrouter (Recommended) |
| `TELEGRAM_BOT_TOKEN` | (secret) | For connecting telegram |
| `BROWSERBASE_API_KEY` | (secret) | API Key for Browserbase |
| `LLM_EMBEDDING_MODEL` | - | Used for vector embeddings and similarity search with memory. Default is 'openrouter/openai/text-embedding-3-small' |
| `LLM_FALLBACK_MODELS` | - | Comma separated list of models for fallback |
| `LLM_HEARTBEAT_MODEL` | openrouter/minimax/minimax-m2.5 | Model to use for heartbeats (Usually smaller and cheaper) |
| `BROWSERBASE_PROJECT_ID` | - | For use with Browserbase for browser automation |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-railway)
