# Deploy claude-flux on Railway

Your personal AI assistant on Telegram, powered by Claude, runs on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-flux)

## About

Claude Flux is a self-hosted AI assistant that runs inside Telegram, powered by Claude Code CLI. It handles text, voice, photos, and documents — with persistent memory, scheduled tasks, a
  web dashboard, and the ability to send emails and SMS on your behalf.                                                                                                                         
                                                            
  ## About Hosting claude-flux                                                                                                                                                                  
                                                                                                                                                                                                
  Hosting Claude Flux requires two services running in tandem: the bot service (Telegram relay + web dashboard) and a PostgreSQL database with pgvector for semantic memory search. The bot
  service runs Bun, whisper.cpp for local voice transcription, and Claude Code CLI. All configuration — API keys, user preferences, integrations — is managed through a built-in web UI at your
  Railway public URL. No manual file editing required after deployment.

  ## Common Use Cases

  - **Personal AI assistant on Telegram** — chat with Claude, get reminders, manage tasks, and have the bot remember facts about you across sessions
  - **Automated workflows** — schedule recurring tasks that Claude runs on your behalf (summaries, reports, notifications via SMS or email)
  - **Voice-to-text productivity** — send voice notes that are transcribed locally and processed by Claude without any third-party transcription API

  ## Dependencies for claude-flux Hosting

  - **Anthropic API key** — required to run Claude Code CLI (get one at console.anthropic.com)
  - **Telegram bot token + user ID** — required to connect the bot (from @BotFather and @userinfobot)

  ### Deployment Dependencies

  - [Anthropic Console](https://console.anthropic.com/) — Claude API key
  - [Telegram BotFather](https://t.me/botfather) — create your bot and get the token
  - [ElevenLabs](https://elevenlabs.io/) *(optional)* — text-to-speech and AI phone calls
  - [OpenAI](https://platform.openai.com/) *(optional)* — embeddings for semantic memory search
  - [Twilio](https://console.twilio.com/) *(optional)* — outbound SMS
  - [Resend](https://resend.com/) *(optional)* — outbound email
  - [ngrok](https://ngrok.com/) *(optional)* — public tunnel if self-hosting (Railway provides this automatically via `RAILWAY_PUBLIC_DOMAIN`)

  ### Implementation Details

  On first boot, the entrypoint automatically:
  1. Waits for PostgreSQL to be healthy
  2. Applies SQL migrations
  3. Downloads the whisper.cpp speech model (~142 MB) if not cached
  4. Starts the Telegram relay and web dashboard on port 3000

  The dashboard is available at your Railway public URL. On first visit it shows an onboarding wizard — no `.env` editing needed. All secrets are saved to the database through the UI.

  ```bash
  # RAILWAY_PUBLIC_DOMAIN is automatically injected by Railway
  # and shown in the bot's startup Telegram message
  # so you always know your dashboard URL

  ## Why Deploy claude-flux on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and
  horizontally scale it.

  By deploying claude-flux on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on
  Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| claude-flux | [ntzamos/claude-flux](https://github.com/ntzamos/claude-flux) | Web service |
| pgvector | `pgvector/pgvector:pg18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | claude-flux | 3000 |
| `POSTGRES_DB` | pgvector | railway |
| `POSTGRES_USER` | pgvector | (secret) |
| `PGPORT_PRIVATE` | pgvector | 5432 |
| `POSTGRES_PASSWORD` | pgvector | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML · **Languages:** TypeScript, Shell, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/claude-flux)
