# Deploy openclaw on Railway

openclaw template for railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-1)

## About

🦞 OpenClaw is an open-source personal AI assistant that  connects through your existing chat apps. It acts as an autonomous agent platform—managing emails, calendars, browser automation, and cross-platform messaging through WhatsApp, Slack, Discord, Telegram, Teams, and more.

You'll need to configure channel credentials for each messaging platform you want to connect, set up your preferred LLM provider (Claude, GPT-5, local models), and optionally enable browser automation via headless Chromium.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw_railway_template | [BasedLukas/openclaw_railway_template](https://github.com/BasedLukas/openclaw_railway_template) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ANTHROPIC_API_KEY` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |

## Configuration

- **Volume:** `/root/.openclaw`

**Category:** Bots · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-1)
