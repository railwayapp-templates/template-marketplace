# Deploy Chat-GPT Discord bot on Railway

GPT-4 chatbot with context

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/1cSU5t)

## About

## Chat-GPT Discord bot starter

This is a stater Discord bot that keeps user context in a Postgres database and interacts with OpenAI API.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/1cSU5t?referralCode=WpeP6D)

## ✨ Features

- Python
- Py-cord
- OpenAI
- PostgreSQL

## 🤷 How to use

- Install Python requirements `pip install -r requirements.txt`
- Set your [DISCORD_TOKEN](https://discord.com/developers/applications) and [OPENAI_API_KEY](https://platform.openai.com/account/api-keys) variables

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Discord-gpt4-bot-template | [jonbeau/Discord-gpt4-bot-template](https://github.com/jonbeau/Discord-gpt4-bot-template) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DISCORD_TOKEN` | Discord-gpt4-bot-template | (secret) | Your discord token |
| `OPENAI_API_KEY` | Discord-gpt4-bot-template | (secret) | Your OpenAI API Key https://platform.openai.com/account/api-keys |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** Python

[View on Railway →](https://railway.com/template/1cSU5t)
