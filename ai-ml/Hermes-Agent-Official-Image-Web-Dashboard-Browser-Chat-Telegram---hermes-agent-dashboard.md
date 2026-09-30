# Deploy Hermes Agent | Official Image, Web Dashboard, Browser Chat, Telegram on Railway

Nous Research's self-improving agent: web dashboard, browser chat, Telegram

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-dashboard)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/hermes-agent-dashboard?utm_medium=integration&utm_source=button&utm_campaign=hermes-agent-dashboard)

[Hermes Agent](https://github.com/NousResearch/hermes-agent) is Nous Research's self-improving AI agent. It remembers you across sessions, writes its own skills, runs scheduled jobs and talks to you on Telegram, Discord, Slack and more. This template runs the official image with the password-protected web dashboard, the in-browser chat and the messaging gateway, with all agent state stored on a volume.

One service, one volume at `/opt/data`. The official `nousresearch/hermes-agent` image runs under s6 with two supervised processes. The **gateway** handles messaging platforms and the cron scheduler. The **web dashboard** gives you chat, sessions, models, API keys, skills, cron, logs and config from a browser. The dashboard is bound publicly and sits behind a username/password login. The password is generated for you on deploy. Memory, skills, sessions, config and API keys all live on the volume, so they survive redeploys and image upgrades.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes Agent | `nousresearch/hermes-agent:v2026.9.24` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9119 | Port Railway routes the domain and healthcheck to. Do not change. |
| `HERMES_DASHBOARD` | 1 | Runs the web dashboard next to the gateway. Do not change. |
| `MALLOC_ARENA_MAX` | 2 | Caps glibc malloc arenas for the Python processes: about 100 MB less memory with the Chat tab open, which keeps the service inside 1 GB. |
| `OPENROUTER_API_KEY` | (secret) | Optional. OpenRouter key, the quickest way to reach hundreds of models with one key. Any other provider (Anthropic, OpenAI, Nous Portal, DeepSeek, ...) can be added later on the dashboard's Keys page. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional. Bot token from @BotFather to talk to your agent on Telegram. |
| `HERMES_DASHBOARD_PORT` | 9119 | Dashboard port. Do not change. |
| `TELEGRAM_ALLOWED_USERS` | - | Optional. Comma-separated numeric Telegram user IDs allowed to use the bot (ask @userinfobot for yours). Unknown users get a pairing code you approve on the dashboard's Pairing page. |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) | Signs login sessions so they survive restarts and redeploys. Changing it logs everyone out. |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) | Password for the dashboard login. Generated for you; it guards an agent that can run shell commands, so keep it long. |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) | Username for the dashboard login. |

## Configuration

- **Start command:** `/opt/hermes/docker/entrypoint-dispatch.sh gateway run`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-dashboard)
