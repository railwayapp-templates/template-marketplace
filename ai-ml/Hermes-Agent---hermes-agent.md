# Deploy Hermes Agent on Railway

The agent that grows with you

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent)

## About

Hermes Agent is a self-improving AI agent built by Nous Research. It features a built-in learning loop — creating skills from experience, improving them during use, persisting knowledge across sessions, and building a deepening model of who you are. Talk to it from Telegram, Discord, Slack, WhatsApp, Signal, or the CLI.

This Railway template deploys Hermes Agent with a Python-based web management layer. The web server provides a configuration UI protected by Basic Auth for setting up LLM providers, messaging channels, tool API keys, and model settings, plus a status dashboard with live gateway state and logs. On startup, if a provider API key is configured, the gateway launches automatically as a managed subprocess. All state persists on a Railway volume at `/data`. After initial configuration, you can remove the public endpoint — Hermes operates entirely through its configured messaging channels. It supports multiple LLM providers including OpenRouter, DeepSeek, GLM/Z.AI, Kimi, and MiniMax with no vendor lock-in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | [arjunkomath/hermes-agent-railway-template](https://github.com/arjunkomath/hermes-agent-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Admin server port |
| `ADMIN_PASSWORD` | (secret) | Admin server access password |
| `ADMIN_USERNAME` | (secret) | Admin server access username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent)
