# Deploy Personal AI Assistant for Telegram on Railway

Private Telegram AI with memory, web search, voice, vision & files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/personal-ai-assistant)

## About

Personal AI Assistant for Telegram is a private AI assistant that runs directly in Telegram. It includes persistent memory, web search, voice transcription, image understanding, document analysis, and owner-only access.

The template deploys a lightweight Python application together with PostgreSQL and requires only a Telegram bot token, your Telegram user ID, and an OpenAI API key.

This template runs the Telegram bot as an asynchronous Python service using long polling, so no public domain or webhook configuration is required.

PostgreSQL stores conversation history and long-term memories. OpenAI provides chat, web search, voice transcription, vision, and document understanding.

The database schema is created automatically on first startup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| personal-ai-telegram | [mastter-nsk/personal-ai-telegram](https://github.com/mastter-nsk/personal-ai-telegram) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BOT_NAME` | personal-ai-telegram | Personal AI | Name of your personal AI assistant. |
| `TIMEZONE` | personal-ai-telegram | UTC | Your timezone in IANA format, for example Europe/Berlin, Asia/Novosibirsk or America/New_York. Default: UTC. |
| `PERSONALITY` | personal-ai-telegram | You are a helpful, natural and personal AI assistant. | System prompt that defines the assistant's personality, tone and behavior. |
| `DATABASE_URL` | personal-ai-telegram | - | PostgreSQL connection URL. Filled automatically from the included Postgres service. |
| `OPENAI_MODEL` | personal-ai-telegram | gpt-5.6-luna | OpenAI model used for chat, reasoning, vision and web search. |
| `OPENAI_API_KEY` | personal-ai-telegram | (secret) | Your OpenAI API key used for chat, web search, voice transcription, image analysis and documents. |
| `CONTEXT_MESSAGES` | personal-ai-telegram | 20 | Number of recent conversation messages kept in active chat context. |
| `OWNER_TELEGRAM_ID` | personal-ai-telegram | - | Your numeric Telegram user ID. Only this account can use the bot. |
| `TELEGRAM_BOT_TOKEN` | personal-ai-telegram | (secret) | Telegram bot token from @BotFather |
| `TRANSCRIPTION_MODEL` | personal-ai-telegram | gpt-4o-mini-transcribe | OpenAI model used to transcribe Telegram voice messages. |
| `POSTGRES_DB` | Postgres | railway | Database created automatically when PostgreSQL starts. |
| `DATABASE_URL` | Postgres | - | PostgreSQL connection URL for applications. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL administrator username. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password used to initialize the PostgreSQL server. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/personal-ai-assistant)
