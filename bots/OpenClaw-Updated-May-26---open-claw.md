# Deploy OpenClaw [Updated May '26] on Railway

OpenClaw [May '26] (Claw AI Multi-Agent Assistant with Plugins) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-claw)

## About

OpenClaw is an open-source Claw AI personal assistant with 347k+ GitHub stars. It connects to any LLM provider — OpenAI, Anthropic, Google Gemini, OpenRouter, Baidu AI Cloud Qianfan, and custom endpoints — with native webchat, Telegram, Discord, Slack, WhatsApp, Feishu, and Google Meet integrations. OpenClaw features multi-agent orchestration, DuckDuckGo search provider, websearch tools, persistent memory, plugin extensions, and a ClawBot gateway with TypeBox schema validation. It is a self-hosted alternative to ChatGPT Plus, Claude Pro, and Clawd AI.

Self hosting OpenClaw means your conversations, API keys, and configuration stay on infrastructure you control. There is no dependency on cloud subscriptions that limit usage. With Railway, the full Claw AI stack deploys automatically — the Express wrapper, ClawBot gateway, persistent volume for state and workspace, all provisioned with private networking and HTTPS.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | [Shinyduo/openclaw](https://github.com/Shinyduo/openclaw) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Bots · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/open-claw)
