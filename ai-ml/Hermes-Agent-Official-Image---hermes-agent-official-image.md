# Deploy Hermes Agent (Official Image) on Railway

Nous Research's Hermes Agent: memory on a volume, API with a key, Telegram

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-official-image)

## About

[Hermes Agent](https://github.com/NousResearch/hermes-agent) is Nous Research's open-source (MIT) AI agent. It keeps memory across conversations and writes its own skills, and you can talk to it from Telegram or any OpenAI-compatible app. This template runs Nous Research's official Docker image with its own process supervisor, and keeps everything Hermes stores on a volume.

I made it after reading the configs of the Hermes templates already on Railway. The most deployed one built on the official image mounts its volume at `/data`, but Hermes keeps its memory and sessions in `/opt/data`, so a redeploy wipes them. It also lets any Telegram user talk to the bot, and every message spends the owner's API credits. Here the volume is on `/opt/data`, Telegram only answers the user IDs you list, and the only public endpoint is Hermes's API behind a generated key.

The deploy form asks for an OpenRouter API key. Set `MODEL` too if you want a specific model. When the deploy is done, copy `HERMES_API_URL` and `API_SERVER_KEY` from the Variables tab and point any OpenAI-compatible client at them, with the model name `hermes-agent`:

```bash
curl https://YOUR-DOMAIN/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "hermes-agent", "messages": [{"role": "user", "content": "Hello"}]}'
```

For Telegram, create a bot with @BotFather, put its token in `TELEGRAM_BOT_TOKEN` and your numeric user ID in `TELEGRAM_ALLOWED_USERS`, and redeploy.

What I tested before publishing: `/health` answers without a key, while the API and the session list return 401 without it. A chat completion through Hermes came back in 2.9 seconds with exactly the text I asked for. After a restart the session from that chat was still there. The container used 196 MB of RAM at idle and 301 MB at its peak, a few dollars a month.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | `nousresearch/hermes-agent:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8642 | Port Railway routes to and healthchecks (the API server) |
| `MODEL` | - | Optional: model to use, e.g. anthropic/claude-sonnet-4.6. Applied on every start; empty keeps Hermes's default (Claude Opus) |
| `API_SERVER_KEY` | - | Bearer key for the API (generated). Anyone with it can use your agent |
| `HERMES_API_URL` | - | Base URL for OpenAI-compatible clients (model: hermes-agent) |
| `OPENAI_API_KEY` | (secret) | Optional: direct OpenAI key |
| `API_SERVER_HOST` | 0.0.0.0 | Listen on all interfaces so Railway can route to it |
| `API_SERVER_PORT` | 8642 | API server port |
| `ANTHROPIC_API_KEY` | (secret) | Optional: direct Anthropic key instead of OpenRouter |
| `API_SERVER_ENABLED` | true | OpenAI-compatible API on the public domain |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter API key: one key for Claude, GPT, Gemini and the rest (openrouter.ai/keys) |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional: token from @BotFather to chat with Hermes on Telegram |
| `TELEGRAM_ALLOWED_USERS` | - | Telegram user IDs allowed to use the bot, comma-separated (ask @userinfobot for yours) |

## Configuration

- **Start command:** `/opt/hermes/docker/entrypoint-dispatch.sh sh -c 'if [ -n "${MODEL:-}" ]; then hermes config set model "$MODEL"; fi; exec hermes gateway run'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Tags:** hermes, ai-agent, nous-research, telegram, openai-compatible

[View on Railway →](https://railway.com/deploy/hermes-agent-official-image)
