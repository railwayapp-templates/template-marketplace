# Deploy Hermes - Telegram on Railway

Nous Research's Ai Agent Runtime Telegram Supervised Gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-telegram)

## About

Hermes Agent is an autonomous, self-improving AI agent from Nous Research. It lives on your infrastructure, talks to you over messaging platforms (Telegram, Discord, Slack, and more), runs tools and terminals, and grows more capable the longer it runs. This template deploys the official `nousresearch/hermes-agent` Docker image on Railway as a worker service with persistent state under `/data`, and always defaults to the `latest` image tag.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/hermes-telegram)

Hosting Hermes Agent on Railway runs a single container using the official image `nousresearch/hermes-agent:latest`. A persistent volume is mounted at `/data` so configuration, sessions, pairing state, logs, and the default workspace survive redeploys. The container starts `hermes gateway`, which connects to your chosen messaging platforms and inference providers.

The web/admin surface is not the primary interface — you interact with the agent over Telegram, Discord, Slack, or other supported platforms. Railway SSH is available for status checks and one-off `hermes` commands.

**Important Railway notes:** This is a long-running worker, not a classic web app. There is no public HTTP port required for normal operation. Persist everything under `/data` (the template sets `HERMES_HOME=/data/.hermes` and uses `/data/workspace` as the default terminal working directory). Auto-updates inside the container are not used; upgrade by redeploying so you always pull a fresh official image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes | [OpenSource-Templates/Hermes](https://github.com/OpenSource-Templates/Hermes) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key used to authenticate requests to AI models through OpenRouter. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token used to connect the application to your Telegram bot. |
| `HERMES_IMAGE_VERSION` | latest | Version tag of the Hermes container image to use. "latest" uses the most recent available image. |
| `TELEGRAM_ALLOWED_USERS` | - | Comma-separated list of Telegram user IDs allowed to interact with the bot. Leave empty to allow all users, if supported by the application. |
| `AGENT_CACHE_MEMORY_HIGH_MB` | 750 | Memory threshold in MB at which the agent cache considers memory usage high. |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/hermes-telegram)
