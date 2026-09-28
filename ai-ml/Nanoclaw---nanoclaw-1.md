# Deploy Nanoclaw on Railway

Personal Claude AI assistant for Slack, Telegram, Discord, WhatsApp, Gmail

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanoclaw-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/nanoclaw-1)

NanoClaw is a personal AI assistant powered by Claude that connects to messaging channels (Slack, Telegram, Discord, WhatsApp, Gmail). It runs Claude Agent SDK in isolated processes, giving each group its own memory, skills, and tools - including web browsing, file management, and scheduled tasks.

Deploying NanoClaw on Railway involves running a single Node.js service that spawns Claude Agent SDK processes for each incoming message. A persistent volume stores authentication state, SQLite databases, group memory, and conversation history. The service uses a multi-stage Docker build that bundles Chromium (for web browsing), the Claude Code CLI, and the agent-runner into one image.

All five channels (Slack, Telegram, Discord, WhatsApp, Gmail) are pre-installed. Set the env vars for the channels you want - channels without tokens are silently skipped at startup. No post-deploy setup commands needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nanoclaw | [mc9max/nanoclaw-railway](https://github.com/mc9max/nanoclaw-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for message timestamps and scheduled tasks (e.g. America/Los_Angeles). |
| `GITHUB_TOKEN` | (secret) | GitHub personal access token — only needed to install skills from private repos. |
| `ASSISTANT_NAME` | Andy | Bot display name. On first startup, a chat group with this exact name is auto-registered as the main group. |
| `WHATSAPP_PHONE` | - | WhatsApp bot phone number in international format, no plus sign (e.g. 12125551234). Leave empty to skip the WhatsApp channel. |
| `GMAIL_CLIENT_ID` | - | Google OAuth 2.0 Client ID for the Gmail channel (Desktop app type). Leave empty to skip the Gmail channel. |
| `SLACK_APP_TOKEN` | (secret) | Slack App-Level Token for Socket Mode (xapp-...). |
| `SLACK_BOT_TOKEN` | (secret) | Slack Bot User OAuth Token (xoxb-...). Leave empty to skip the Slack channel. |
| `ANTHROPIC_API_KEY` | (secret) | API key for Claude model access from console.anthropic.com. Required — the bot cannot start without it. |
| `DISCORD_BOT_TOKEN` | (secret) | Discord bot token from the Discord Developer Portal (enable Message Content Intent). Leave empty to skip the Discord channel. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token from @BotFather (123456:ABC-...). Leave empty to skip the Telegram channel. |
| `GMAIL_CLIENT_SECRET` | (secret) | Google OAuth Client Secret. |
| `GMAIL_REFRESH_TOKEN` | (secret) | Google OAuth refresh token (see README for the oauth playground flow). |
| `SLACK_MAIN_CHANNEL_ID` | - | Optional Slack channel ID auto-registered as the main group on first startup. |
| `ASSISTANT_HAS_OWN_NUMBER` | false | Set true only if the WhatsApp number is NOT a secondary number (i.e. the bot owns its only number). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Python, Shell, Swift, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/nanoclaw-1)
