# Deploy lettabot on Railway

Your personal AI assistant that remembers everything.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lettabot)

## About

[LettaBot](https://letta.bot) is a multi-channel AI assistant powered by Letta agents with persistent memory. It connects to Telegram, Discord, and Slack, maintaining a single continuous conversation across all platforms. Your agent remembers context, learns preferences, and can take proactive actions.

Learn more here: https://github.com/letta-ai/lettabot

LettaBot runs as a Node.js server that connects to your messaging platforms via their respective APIs. It requires a Letta Cloud API key for the AI backend and at least one channel token (Telegram, Discord, or Slack). The server maintains WebSocket/long-poll connections to each platform and routes messages to
your Letta agent. On first deploy, it automatically discovers or creates an agent by name, so your memory persists across redeploys without manual configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lettabot | [letta-ai/lettabot](https://github.com/letta-ai/lettabot) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MODEL` | - | Model for new agents (e.g., claude-sonnet-4-20250514). Ignored for existing agents. |
| `AGENT_NAME` | - | Agent name (default: LettaBot). If no LETTA_AGENT_ID provided, finds or creates agent with this name. |
| `WORKING_DIR` | - | Working directory (default: /tmp/lettabot) |
| `CRON_ENABLED` | - | Enable cron jobs (true/false) |
| `LETTA_API_KEY` | (secret) | Your Letta API key. Get one here: https://app.letta.com/projects/default-project/api-keys |
| `LETTA_AGENT_ID` | - | Specific agent ID (optional, auto-discovered by AGENT_NAME if not set) |
| `LETTA_BASE_URL` | - | Custom Letta server URL (default: https://api.letta.com) |
| `OPENAI_API_KEY` | (secret) | OpenAI API key for voice message transcription (optional) |
| `SLACK_APP_TOKEN` | (secret) | Slack app token (xapp-...) - required for Socket Mode |
| `SLACK_BOT_TOKEN` | (secret) | Slack bot token (xoxb-...) |
| `HEARTBEAT_PROMPT` | - | Custom heartbeat prompt (optional) |
| `HEARTBEAT_TARGET` | - | Target chat for heartbeats (e.g., telegram:123456789) |
| `DISCORD_BOT_TOKEN` | (secret) | Discord bot token |
| `DISCORD_DM_POLICY` | - | `pairing`, `allowlist`, or `open` (default: pairing) |
| `ATTACHMENTS_MAX_MB` | - | Max attachment size in MB (default: 20) |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token from @BotFather |
| `TELEGRAM_DM_POLICY` | - | `pairing`, `allowlist`, or `open` (default: pairing) |
| `SLACK_ALLOWED_USERS` | - | Comma-separated Slack user IDs (for allowlist mode) |
| `DISCORD_ALLOWED_USERS` | - | Comma-separated Discord user IDs (for allowlist mode) |
| `HEARTBEAT_INTERVAL_MIN` | - | Heartbeat interval in minutes (enables proactive messages) |
| `TELEGRAM_ALLOWED_USERS` | - | Comma-separated Telegram user IDs (for allowlist mode). Get your ID from @userinfobot |
| `ATTACHMENTS_MAX_AGE_DAYS` | - | Days to keep attachments (default: 14) |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, Python, MDX, Shell

[View on Railway →](https://railway.com/template/lettabot)
