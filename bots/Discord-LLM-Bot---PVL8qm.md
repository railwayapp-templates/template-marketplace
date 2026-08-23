# Deploy Discord LLM Bot on Railway

Discord LLM bot with memory and search that finds meaning, not words.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/PVL8qm)

## About

A Discord chatbot that remembers your conversations and can find them again —
by exact words *or* by what they were about, in any of 30+ languages. Two
services, no search cluster, no vector database to run alongside.

Built with [discord.py](https://discordpy.readthedocs.io/), FastAPI and
PostgreSQL. Works with OpenAI or OpenRouter, and the model is a setting rather
than something baked into the code.

A Discord bot has to stay connected, so it is always-on by nature — which makes
the size of what you leave running the whole cost story. This template deploys
**two** services: the bot, and a PostgreSQL that does the searching itself
through [PostgreSQL + Hybrid Search](https://railway.com/deploy/postgresql-hybrid-search?referralCode=jk_FgY&utm_medium=integration&utm_source=template&utm_campaign=generic).
No Meilisearch container, no vector database, no sync job between them.

Everything the bot needs is provisioned on first boot: the schema, the search
extensions and the text analyzer. Existing deployments upgrade in place — new
columns are added on startup, so there is no migration to run and nothing to
back up first.

You bring a Discord bot token and one API key. **No privileged intents are
required**, so there is nothing to enable in the Developer Portal and no
approval to wait for.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discord-Bot | [yuting1214/Discord-Bot](https://github.com/yuting1214/Discord-Bot) | Web service |
| PostgresSearch | `ghcr.io/yuting1214/postgres-search:0.4.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PASSWORD` | Discord-Bot | (secret) |
| `DISCORD_TOKEN` | Discord-Bot | (secret) |
| `OPENAI_API_KEY` | Discord-Bot | (secret) |
| `POSTGRES_DB` | PostgresSearch | railway |
| `POSTGRES_USER` | PostgresSearch | (secret) |
| `POSTGRES_PASSWORD` | PostgresSearch | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** Python, PLpgSQL, Shell, Jupyter Notebook, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/PVL8qm)
