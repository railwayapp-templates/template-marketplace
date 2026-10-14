# Deploy Hermes Agent + WebUI on Railway

Hermes Agent with Hermes WebUI. Password protected, auto-updated.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-webui)

## About

Hermes Agent is the open-source, self-hosted AI agent from Nous Research. It keeps memory across sessions, writes its own skills, runs scheduled tasks and answers on Telegram, Discord, Slack and other messaging apps. Hermes WebUI is a browser interface for it with chat, sessions, a workspace file browser, memory, skills and settings, on desktop and phone.

This template runs Hermes Agent, Hermes WebUI and the Hermes gateway together in one service with one volume.

- The WebUI is the public page and is protected by a password that is generated for you.
- The agent runs inside the WebUI process, using the official Nous Research image.
- The gateway runs next to it, so scheduled tasks fire while you are away and messaging apps can reach the agent. Its API only listens inside the container.

First steps:

1. Open the public URL and sign in with `HERMES_WEBUI_PASSWORD` from the Variables tab.
2. Add a model key, either as a variable (for example `OPENROUTER_API_KEY`) or in the WebUI under Settings → Providers.
3. Pick a model in the composer and start chatting.

Updates: the Hermes Agent and Hermes WebUI versions are pinned. A GitHub Action checks for new releases every day, builds and smoke-tests them, and only then updates the repo. Railway then shows an update notice in your project, and you choose when to apply it. Your data is kept.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes | [aimranov27/hermes-webui-railway](https://github.com/aimranov27/hermes-webui-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NOUS_API_KEY` | (secret) | Optional. Nous Portal API key for Hermes models. |
| `OPENAI_API_KEY` | (secret) | Optional. OpenAI API key for GPT models. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Anthropic API key for Claude models. |
| `OPENROUTER_API_KEY` | (secret) | Optional. OpenRouter API key. One key gives access to models from most providers. You can also add keys later in the WebUI under Settings → Providers. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional. Bot token from @BotFather to chat with Hermes on Telegram. Also set TELEGRAM_ALLOWED_USERS. |
| `HERMES_WEBUI_PASSWORD` | (secret) | Password for the Hermes WebUI login. Generated for you. The service will not start without it. Change it here and redeploy to set a new one. |
| `TELEGRAM_ALLOWED_USERS` | - | Optional. Your numeric Telegram user ID (ask @userinfobot), comma-separated for several people. Hermes does not answer anyone else. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-webui)
