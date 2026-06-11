# Deploy green-calm on Railway

Deploy and Host green-calm with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/green-calm)

## About

An AI employee for residential contractors. Connects to Gmail and Google Drive,
answers project questions with cited sources, transcribes voice notes from the
truck, and proactively flags emails that need attention — all through Telegram.
Runs on a ~$5/month Railway service. Built on Hermes Agent.

The Construction AI Employee runs as an always-on Railway service. One Dockerfile
installs Hermes Agent, code-server (browser-based VS Code), and all dependencies.
On first boot, the entrypoint installs the construction-agent profile — including
construction domain knowledge, five specialized skills for email processing, data
mapping, Gmail and Drive search, and proactive inbox flagging — plus a structured
Context OS that organizes every project, email, decision, invoice, and spec sheet.
You paste four API keys into Railway's Variables form, click Deploy, and two
minutes later your agent is alive on Telegram. No terminal, no code, no config files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| construction-agent | [afinnegan67/construction-agent](https://github.com/afinnegan67/construction-agent) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GROQ_API_KEY` | (secret) |
| `OPENROUTER_API_KEY` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |
| `CODE_SERVER_PASSWORD` | (secret) |

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/green-calm)
