# Deploy vast-bold on Railway

OpenClaw-only instance for Lumina warm pool provisioning

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vast-bold)

## About

OpenClaw is an AI agent gateway that provides LLM-powered agents with tool access via iMessage, Slack, and Telegram channels.

This template deploys a single OpenClaw gateway service using a Dockerfile-based build from the austinmao/openclaw GitHub repository. The gateway runs on Node.js, exposes port 18789, and includes health checks. It is designed for per-tenant warm pool provisioning in the Lumina platform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | [austinmao/openclaw](https://github.com/austinmao/openclaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ANTHROPIC_API_KEY` | (secret) | Your Anthropic API key for the LLM brain |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** HTML, Python, TypeScript, Shell, JavaScript, CSS, Dockerfile, Swift, PowerShell, Jinja, Gherkin

[View on Railway →](https://railway.com/deploy/vast-bold)
