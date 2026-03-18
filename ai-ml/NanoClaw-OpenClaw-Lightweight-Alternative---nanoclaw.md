# Deploy NanoClaw (OpenClaw Lightweight Alternative) on Railway

OpenClaw alternative with multi-channel, memory & Agents SDK built in

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanoclaw)

## About

NanoClaw is a personal AI assistant powered by Claude that connects to messaging channels (Slack, Telegram, Discord, WhatsApp, Gmail). It runs Claude Agent SDK in isolated processes, giving each group its own memory, skills, and tools - including web browsing, file management, and scheduled tasks.

Deploying NanoClaw on Railway involves running a single Node.js service that spawns Claude Agent SDK processes for each incoming message. A persistent volume stores authentication state, SQLite databases, group memory, and conversation history. The service uses a multi-stage Docker build that bundles Chromium (for web browsing), the Claude Code CLI, and the agent-runner into one image.

All five channels (Slack, Telegram, Discord, WhatsApp, Gmail) are pre-installed. Set the env vars for the channels you want - channels without tokens are silently skipped at startup. No post-deploy setup commands needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NanoClaw | [arnaudjnn/nanoclaw-railway](https://github.com/arnaudjnn/nanoclaw-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for scheduled tasks and log timestamps (default: UTC) |
| `GITHUB_TOKEN` | (secret) | GitHub personal access token for installing skills from private repos |
| `ASSISTANT_NAME` | Andy | ot display name used in conversations  (default: Andy) |
| `WHATSAPP_PHONE` | - | Phone number with country code (e.g. +33612345678). Used to request a pairing code on first connect. After pairing, auth state persists. |
| `GMAIL_CLIENT_ID` | - | OAuth 2.0 Client ID from Google Cloud Console |
| `SLACK_APP_TOKEN` | (secret) | App-Level Token for Socket Mode (starts with xapp-) |
| `SLACK_BOT_TOKEN` | (secret) | Bot User OAuth Token (starts with xoxb-) |
| `ANTHROPIC_API_KEY` | (secret) | API key for Claude model access |
| `DISCORD_BOT_TOKEN` | (secret) | Bot token from Discord Developer Portal |
| `TELEGRAM_BOT_TOKEN` | (secret) | Token from @BotFather |
| `GMAIL_CLIENT_SECRET` | (secret) | OAuth 2.0 Client Secret |
| `GMAIL_REFRESH_TOKEN` | (secret) | OAuth refresh token (obtained via the consent flow) |
| `SLACK_MAIN_CHANNEL_ID` | - | Channel ID to auto-register as the main group (Optional) |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nanoclaw)
