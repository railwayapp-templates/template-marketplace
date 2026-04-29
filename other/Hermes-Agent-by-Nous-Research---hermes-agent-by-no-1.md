# Deploy Hermes Agent by Nous Research on Railway

Deploy Hermes Agent by Nous Research

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-by-no-1)

## About

Hermes Agent is an open-source, self-improving AI assistant with 113K GitHub stars. It runs 24/7, connects to Telegram, Discord, Slack, and email, and gets smarter over time — automatically writing and refining skills based on the tasks it completes.

Hermes Agent is designed to run as a persistent, always-on service — making Railway an ideal host. Deploying on Railway gives you a containerized instance with a persistent volume for skills and memory storage, an admin dashboard to configure your LLM provider, messaging channels, and API keys without touching config files. The agent uses under 512MB of memory at idle, keeping you on Railway's most cost-effective tier. Once deployed, you connect your LLM via OpenRouter, wire up your messaging channel, and your agent is live and ready to extend with MCP integrations like Supabase.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | [derekcheungsa/hermes-agent-template](https://github.com/derekcheungsa/hermes-agent-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_PASSWORD` | (secret) | Admin password |
| `ADMIN_USERNAME` | (secret) | User name |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent-by-no-1)
