# Deploy LineBot FastAPI on Railway

A Line LLM Bot with FastAPI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yNppuu)

## About

## Key Features and Integrations 🎉
Key features:

* 🤖 LINE Bot Integration: Easily create and manage LINE bots with built-in event handling and messaging capabilities.
* ⚡ FastAPI API Documentation and Authentication: Leverage FastAPI's powerful documentation tools and secure authentication mechanisms.
* 🧠 LLM Integration (OpenAI): Implement advanced chatbot logic using Large Language Models, with support for text and image modalities.

## Why This Template ? 🚀
* 📝 API-Driven Logging: This template uses API calls to log data, ensuring better modularity and flexibility.
* ⚙️ Async Non-Blocking Operations: Designed to handle multiple user inputs simultaneously, making the bot responsive and efficient even under heavy load.
* 🌐 LLM Omniversal Integration: Supports various input modalities (text, image, audio) for a more versatile and interactive chatbot experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| markchen1214/linebot-fastapi | `markchen1214/linebot-fastapi` | Web service |
| PostgreSQL | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PASSWORD` | markchen1214/linebot-fastapi | (secret) | Password for accessing OpenAPI document. |
| `USER_NAME` | markchen1214/linebot-fastapi | - | User name for accessing OpenAPI document. |
| `OPENAI_API_KEY` | markchen1214/linebot-fastapi | (secret) | https://openai.com/index/openai-api/ |
| `LINE_CHANNEL_SECRET` | markchen1214/linebot-fastapi | (secret) | - |
| `LINE_CHANNEL_ACCESS_TOKEN` | markchen1214/linebot-fastapi | (secret) | - |
| `POSTGRES_DB` | PostgreSQL | railway | Default database created when image is started. |
| `DATABASE_URL` | PostgreSQL | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | PostgreSQL | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | PostgreSQL | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | PostgreSQL | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/yNppuu)
