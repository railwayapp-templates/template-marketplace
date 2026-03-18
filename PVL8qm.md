# Deploy Discord LLM Bot on Railway

A Discord LLM Bot in Python.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/PVL8qm)

## About

## Overview

The ultimate Railway template for seamlessly integrating an LLM into your Discord bot. Designed to help you deploy and customize your AI assistant with ease.

## Highlights

🌟 LLM Model: Leverage the latest advancements with our chatbot, powered by OpenAI’s new GPT-4o mini, for the most accurate and helpful responses.

🌟 Group Sessions: Collaborate effortlessly with your team in a single Discord thread, with the AI chatbot providing real-time assistance.

🌟 Search Previous Messages: Quickly find and revisit past conversations with our easy-to-use search feature.

🌟 Resume Previous Threads: Pick up right where you left off by resuming previous discussions with the AI assistant.

🌟 Zero Downtime: Enjoy seamless service with smart rate limit management that prevents interruptions, and handle multiple messages at once for smooth interactions.

## User Manual
```
1. 🌟 Starting a New Independent Session
Command: @start_session

When to Use: When you want to start a new independent conversation with the bot.

How to Use: Simply type @start_session followed by your first question in any channel.

Example: @start_session What is the weather today?
===================================================================================
2. 🌟 Sending a Message in an Existing Independent Session
Command: @bot

When to Use: When you want to continue an existing conversation with the bot.

How to Use: Type @bot followed by your message directly in the channel.

Example: @bot Can you help me with my homework?
===================================================================================
3.🌟 Starting a New Group Session
Command: @start_group_session

When to Use: When you want to initiate a group discussion involving the bot and other users.

How to Use: Type @start_group_session followed by your first question or topic in the channel where the group discussion will take place.

Example: @start_group_session What are the latest trends in AI?
===================================================================================
4. 🌟 Sending a Message in an Existing Group Session
Command: @bot_group

When to Use: When you want to contribute to an ongoing group discussion involving the bot.

How to Use: Type @bot_group followed by your message directly in the channel where the group session is active.

Example: @bot_group Does anyone know the answer to this question? 

===================================================================================
5. 🌟 Searching for Information in an Individual Session
Command: @search_session

When to Use: When you want the bot to search through individual session conversations.

How to Use: Type @search_session followed by your query in the channel.

Example: @search_session What is the capital of France?
===================================================================================
6. 🌟 Searching for Information in a Group Session
Command: @search_group_session

When to Use: When you want the bot to search through group session conversations.

How to Use: Type @search_group_session followed by your query in the channel where the group session is active.

Example: @search_group_session What are the latest trends in AI?
===================================================================================
7. 🌟 Resuming a Previous Individual Session
Command: @resume_session:

When to Use: When you want to resume a previous conversation with the bot in an individual session.

How to Use: Type @resume_session: followed by the session ID in the channel.

Example: @resume_session: 123456
===================================================================================
8. 🌟Resuming a Previous Group Session
Command: @resume_group_session:

When to Use: When you want to resume a previous group conversation with the bot.

How to Use: Type @resume_group_session: followed by the session ID in the channel.

Example: @resume_group_session: 789012 
```

## Learn More
* [discord.py](https://discordpy.readthedocs.io/en/stable/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| 🔎 meilisearch | `getmeili/meilisearch:v1.8.4` | Web service |
| Discord-Bot | `markchen1214/discord-llm-chatbot` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PORT` | 🔎 meilisearch | 3331 | - |
| `MEILI_ENV` | 🔎 meilisearch | production | - |
| `MEILI_DB_PATH` | 🔎 meilisearch | /meili_data/data.ms | Path to Meilisearch's on-disk database. Defaults to /meili_data/data.ms. Refer to Meilisearch Docs -> Configure -> Database path for more info. |
| `MEILI_HTTP_ADDR` | 🔎 meilisearch | :::3331 | - |
| `PASSWORD` | Discord-Bot | (secret) | Password for OpenAPI authentication. |
| `USER_NAME` | Discord-Bot | - | Username for OpenAPI authentication. |
| `DISCORD_TOKEN` | Discord-Bot | (secret) | Token for Discord Bot. |
| `OPENAI_API_KEY` | Discord-Bot | (secret) | OpenAI API Key. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`

**Category:** Bots

[View on Railway →](https://railway.com/template/PVL8qm)
