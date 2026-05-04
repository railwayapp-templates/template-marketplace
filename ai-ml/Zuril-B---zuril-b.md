# Deploy Zuril B on Railway

Deploy and Host Zuril B with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zuril-b)

## About

Zuril B is a fully autonomous AI Chief of Staff powered by OpenClaw. It connects to Telegram, monitors your inbox, calendar, and tasks, and takes real action — sending emails, setting reminders, and managing your workflow — all with persistent memory across sessions.

Hosting Zuril B on Railway gives you a always-on AI agent that runs 24/7 without managing servers. Once deployed, Zuril B connects to your Telegram bot, your email, and any tools you configure via environment variables. It uses OpenClaw as its runtime engine, routing intelligence through your choice of AI provider (Anthropic, OpenRouter, etc.). No Docker expertise required — Railway handles the infrastructure. You bring your API keys, Railway handles the rest. Setup takes under 10 minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Zuril | [Dzorel/Zuril](https://github.com/Dzorel/Zuril) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `ENABLE_WEB_TUI` | true |
| `SETUP_PASSWORD` | (secret) |
| `TELEGRAM_TOKEN` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw |
| `OPENCLAW_CONFIGURED` | true |
| `OPENCLAW_CONFIG_PATH` | /data/.openclaw/openclaw.json |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 |
| `INTERNAL_GATEWAY_PORT` | 18789 |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_PRIMARY_MODEL` | anthropic/claude-sonnet-4-6 |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |
| `TELEGRAM_ALLOWED_USERS` | xxxxxx |
| `OPENCLAW_AGENTS_MAIN_MODELS` | anthropic/claude-sonnet-4-6 |
| `OPENCLAW_HEARTBEAT_INTERVAL` | 5m |
| `OPENCLAW_TELEGRAM_ALLOWED_USERS` | xxxxxxxxxxx |
| `OPENCLAW_MODELS_DEFAULT_FALLBACKS` | anthropic/claude-sonnet-4-6 |
| `TELEGRAM_ALLOWED_TELEGRAM_USER_IDS` | 5749841368 |
| `OPENCLAW_CHANNEL_TELEGRAM_STREAMING` | true |
| `OPENCLAW_AGENTS_DEFAULTS_SANDBOX_MODE` | off |

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/zuril-b)
