# Deploy Hermes Agent [Updated May '26] on Railway

Hermes Agent [May '26] (Self-Improving Hermes AI Agent) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes)

## About

Hermes Agent is an open-source, self-improving Hermes AI agent built by Nous Research (Nous-Hermes). It features a built-in learning loop that creates skills from experience, improves them during use, and builds a deepening model of who you are across sessions. It supports 200+ LLM models, messaging channels like Telegram, Discord, Slack, WhatsApp, and WeChat, and runs with persistent Honcho user modeling and scheduled automation. Hermes Agent works on any platform — Linux, macOS, and Android via Termux. It is a self-hosted alternative to ChatGPT Plus, Open WebUI, and custom GPT builders.

Self hosting Hermes Agent means your conversations, memories, skills, and API keys stay on infrastructure you control. There is no dependency on cloud AI providers that may limit usage or access your data. With Railway, the full Hermes AI stack deploys automatically — the gateway, web dashboard (WebUI), persistent volume for Honcho memories and skills, all provisioned with private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | [Shinyduo/hermes-agent](https://github.com/Shinyduo/hermes-agent) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9119 |
| `HERMES_HOME` | /opt/data |
| `GATEWAY_ALLOW_ALL_USERS` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes)
