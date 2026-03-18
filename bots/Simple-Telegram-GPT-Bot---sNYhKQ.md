# Deploy Simple Telegram GPT Bot on Railway

A simple AI chatbot leverages GPT models.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sNYhKQ)

## About

*Important*: This service is deployed into private network, but bots on Telegram are public. As long as anyone has the bot handle, they have access to the bot.

Useful references:
- [Obtain Your Bot Token](https://core.telegram.org/bots/tutorial#obtain-your-bot-token)
- [Where do I find my API key?](https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key)

---

TL;DR:

1. Obtain API keys
2. Deploy and fill-in the variables
3. Talk to the Bot over Telegram :)

---

This template aims to provide an [open-source](https://github.com/kaxing/simple-telegram-gpt-bot/) single-script chatbot using GPT models.

The Chatbot leverages [Python Telegram Bot](https://python-telegram-bot.org/) library. Allows users to interact with different OpenAI models with ease.

Key features include:
Multi-user sessions.
Handling both images (require vision model) and text messages.
Keeping chat history in-memory within the session.
Fine-tuning configurations: customize system prompt and temperature.

The goal is to provide a minimal yet workable chatbot through the Telegram interface without worrying about middlemen other than OpenAI endpoints.

---

Any feedback is welcome: https://github.com/kaxing/simple-telegram-gpt-bot/discussions/categories/questions

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bot | [kaxing/simple-telegram-gpt-bot/](https://github.com/kaxing/simple-telegram-gpt-bot/) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | API key for OpenAI. Will be asking upon starting the bot. |
| `TELEGRAM_TOKEN` | (secret) | Bot token is required for initializing the bot. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | true | Due to the script start time too short. We need to apply this workaround: https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images |

## Configuration

- **TCP Proxies:** 443

**Category:** Bots · **Languages:** Python

[View on Railway →](https://railway.com/deploy/sNYhKQ)
