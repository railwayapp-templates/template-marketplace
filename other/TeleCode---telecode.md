# Deploy TeleCode on Railway

Deploy and Host TeleCode with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/telecode)

## About

TeleCode is a powerful Telegram bot that transforms your mobile phone into a complete GitHub development environment. Connect to existing repositories, analyze code, edit files, commit changes, and manage your projects—all through simple Telegram commands. Use `/ask` for read-only code analysis and `/code` for making changes. Perfect for developers who want to code anywhere, anytime.

Hosting TeleCode involves deploying a Python-based Telegram bot that integrates with GitHub APIs and multiple LLM providers. The bot handles user authentication, repository management, AI-powered code generation, and automated Git operations. Railway's platform-as-a-service model is ideal for TeleCode as it provides persistent storage for user data, automatic SSL certificates for webhook endpoints, and seamless environment variable management. The deployment includes setting up webhook endpoints for Telegram, configuring GitHub access tokens, and establishing connections to AI providers like OpenRouter (recommended), Together AI, or OpenAI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TeleCode | [mumunha/TeleCode](https://github.com/mumunha/TeleCode) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BOT_TOKEN` | (secret) |
| `DEBUG_LLM` | true |
| `GITHUB_TOKEN` | (secret) |
| `GIT_STRATEGY` | direct |
| `LLM_PROVIDER` | together |
| `LLM_STREAMING` | true |
| `TOGETHER_MODEL` | moonshotai/Kimi-K2-Instruct |
| `TOGETHER_API_KEY` | (secret) |
| `MAX_REQUESTS_PER_DAY` | 50 |
| `MAX_REQUESTS_PER_HOUR` | 10 |
| `AUTHORIZED_TELEGRAM_USERS` | your_user |
| `CHAT_CONTEXT_MAX_MESSAGES` | 15 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/template/telecode)
