# Deploy Hermes Agent | Self-Improving AI by Nous Research on Railway

Self-Host Hermes Agent : AI with Persistent Memory & 200+ LLMs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-3)

## About

Hermes Agent is an open-source AI assistant from Nous Research that actually gets smarter the more you use it. It builds skills from conversations, remembers context across sessions through Honcho memory, and connects to 200+ LLM models. You can talk to it through Telegram, Discord, Slack, WhatsApp, or WeChat - all from a single self-hosted instance.

Why pay $20-50/month for managed AI assistants that forget everything between sessions? Self-hosting Hermes Agent on Railway gives you a persistent AI that grows with you - and it costs ~$5-10/month for the container. Your conversations, API keys, and learned skills stay on your infrastructure. Railway handles SSL, container orchestration, and networking automatically. The template deploys with a persistent volume for Hermes's embedded SQLite database (with FTS5 full-text search), its skill library, and Honcho user models. No external database required. Configure your LLM provider through the WebUI dashboard, connect your messaging channels, and you're running in under five minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | [shruti060701/hermes-agent-railway](https://github.com/shruti060701/hermes-agent-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9119 |
| `HERMES_HOME` | /opt/data |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent-3)
