# Deploy Telegram Groq on Railway

Chat with Groq in Telegram

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-groq)

## About

Telegram Groq is an open-source Telegram bot that lets you chat with Groq's high-speed large language models directly from Telegram. Simply connect your Telegram Bot Token and Groq API Key, deploy the bot, and start having AI-powered conversations from any Telegram client.

Railway makes deploying Telegram Groq easy by automatically building the application from the GitHub repository and keeping the bot running continuously. The bot connects to Telegram using your Bot Token and communicates with Groq's API to generate AI responses. Railway manages deployments, environment variables, logs, and infrastructure automatically, allowing you to focus on chatting with the bot. Since the bot only maintains outbound connections to Telegram and Groq, no database or persistent storage is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| telegram-groq | [bilalnawaz072/telegram-groq](https://github.com/bilalnawaz072/telegram-groq) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GROQ_API_KEY` | (secret) | https://console.groq.com/keys |
| `TELEGRAM_BOT_TOKEN` | (secret) | Get from BotFather telegram |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/telegram-groq)
