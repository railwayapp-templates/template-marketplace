# Deploy Hermes Agent on Railway

Nous Research’s self-improving AI agent that learns across sessions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-1)

## About

Hermes Agent is an open-source AI agent from Nous Research. It runs a **messaging gateway** (Telegram, Discord, Slack) and an **OpenAI-compatible HTTP API** (`/v1/chat/completions`, models, health). This template packages Hermes in Docker with a **web setup page** at `/setup` so you configure LLM keys and bots without shell access—ideal for always-on hosting on Railway.

Hosting Hermes here means Railway builds a **Dockerfile** that clones Hermes at a pinned release (`HERMES_REF`), installs Python and Node dependencies, and runs a small **wrapper** (`node /wrapper/src/server.js`) that starts `hermes gateway run`, serves `/setup`, and **proxies** public HTTP to Hermes’s internal API. You add a **volume** mounted at `/data/hermes` for persistent config and state, set variables (or use `/setup`) for your LLM provider and optional messaging tokens, and get a single public URL. Health checks use `GET /setup/healthz` per `railway.toml`. Users chat via **Telegram** (typical), other platforms, or the HTTP API—not the interactive local TUI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent-railway-template | [Lukem121/hermes-agent-railway-template](https://github.com/Lukem121/hermes-agent-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LLM_MODEL` | anthropic/claude-sonnet-4.6 | Optional (advanced) — skip for Telegram-only |
| `HERMES_HOME` | /data/hermes | Persistent storage mount path |
| `API_SERVER_KEY` | - | Optional — defaults to allowlist-only. |
| `OPENROUTER_API_KEY` | (secret) | Optional model override. If not set, Hermes falls back to its default model. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional messaging platform user id |
| `TELEGRAM_ALLOWED_USERS` | - | Optional: persistent profile location inside container. |
| `GATEWAY_ALLOW_ALL_USERS` | false | Optional messaging platform tokens |

## Configuration

- **Healthcheck:** `/setup/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/hermes`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent-1)
