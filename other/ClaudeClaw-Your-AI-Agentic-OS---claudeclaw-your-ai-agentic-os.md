# Deploy ClaudeClaw — Your AI Agentic OS on Railway

ClaudeClaw — Your AI Agentic OS accessible from Telegram + Web Dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claudeclaw-your-ai-agentic-os)

## About

ClaudeClaw is a self-hosted AI agentic operating system powered by Claude Code that runs 24/7 as a service. Command it via Telegram, delegate tasks across a fleet of specialized sub-agents, schedule autonomous workflows, and monitor your entire agent network from a dashboard featuring Mission Control, War Room, and Hive Mind.

ClaudeClaw runs as a single Docker container on Railway, delivering a full AI agentic OS: a Telegram-connected command interface, a multi-agent task engine, a scheduler, and a web dashboard — all in one always-on deployment. The dashboard includes three distinct views: Mission Control for managing active operations, War Room for coordinating high-priority sessions, and Hive Mind for observing agent activity in real time. Persistent memory, sessions, and scheduled tasks are stored in an encrypted SQLite database that survives redeploys automatically. Setup only requires three things: a Telegram bot token, your Anthropic API key, and your Telegram chat ID. The dashboard and database encryption keys are generated automatically by the template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| claudeclaw-os-vanilla | [philip-couboura/claudeclaw-os-vanilla](https://github.com/philip-couboura/claudeclaw-os-vanilla) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `USER_NAME` | - | Your first name — the bot will use this when addressing you. Optional; leave blank to set later from the dashboard. |
| `ASSISTANT_NAME` | - | The bot's display name (e.g. 'Atlas'). Defaults to 'ClaudeClaw' if blank. |
| `ALLOWED_CHAT_ID` | - | Your personal Telegram numeric chat ID — only messages from this chat ID will be accepted by the bot. To find yours: after deploying, message your bot once on Telegram, then visit https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/getUpdates in a browser and find "chat":{"id":N}. Paste that number here. If you don't know it yet, paste any placeholder digit, deploy, message the bot, retrieve the real ID, then update this variable. |
| `DASHBOARD_TOKEN` | (secret) | - |
| `ANTHROPIC_API_KEY` | (secret) | Your Anthropic API key. Generate one at https://console.anthropic.com → Settings → Keys → Create Key. Format: sk-ant-api03-... (around 108 characters). You pay for Claude usage on the account that owns this key — set spend limits at console.anthropic.com → Billing if needed. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Your private Telegram bot token. Create a bot by messaging @BotFather on Telegram, send /newbot, choose a name and username, then paste the token here. Format: 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11. Treat it like a password — anyone with this token can control your bot. |
| `CLAUDECLAW_USE_ANTHROPIC_API_KEY` | (secret) | - |

## Configuration

- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/store`

**Category:** Other · **Languages:** TypeScript, Python, JavaScript, Shell, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/claudeclaw-your-ai-agentic-os)
