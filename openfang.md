# Deploy OpenFang on Railway

A template for OpenFang: The Agent Operating System.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openfang)

## About

![](https://www.openfang.sh/assets/openfang-logo.png)
OpenFang is an open-source Agent Operating System built in Rust. It runs autonomous AI agents — called Hands — that work on schedules, build knowledge graphs, generate leads, manage social media, and report results to a dashboard. One binary, 27 LLM providers, 40 channel adapters.

OpenFang ships as a single Rust binary with a built-in web dashboard. This template wraps it in a lightweight Node.js proxy that handles Railway-specific concerns: a password-protected `/setup` page, automatic API key injection into the dashboard, a stable healthcheck endpoint, and generated config backed by a persistent volume at `/data`. Set three environment variables (`SETUP_PASSWORD`, `OPENFANG_API_KEY`, and one LLM provider key), attach a volume, and you're running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openfang-railway-template | [nazihkalo/openfang-railway-template](https://github.com/nazihkalo/openfang-railway-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GROQ_API_KEY` | (secret) | Required for Groq's fast Llama/Mixtral inference |
| `GEMINI_API_KEY` | (secret) | Required for Google's Gemini models |
| `OPENAI_API_KEY` | (secret) | Required if using GPT models |
| `SETUP_PASSWORD` | (secret) | Password to access the /setup UI for initial configuration |
| `SLACK_APP_TOKEN` | (secret) | xapp- token; required for Slack Socket Mode (events) |
| `SLACK_BOT_TOKEN` | (secret) | xoxb- token; for Slack bot messaging |
| `OPENFANG_API_KEY` | (secret) | A secret YOU create to secure your OpenFang API endpoints (e.g., openssl rand -hex 32) |
| `ANTHROPIC_API_KEY` | (secret) | Required if using Claude models |
| `DISCORD_BOT_TOKEN` | (secret) | From Discord Developer Portal; enables Discord integration |
| `OPENFANG_LOG_LEVEL` | info | Verbosity of logs (debug, info, warn, error) |
| `TELEGRAM_BOT_TOKEN` | (secret) | From @BotFather; enables Telegram integration |
| `OPENFANG_DEFAULT_MODEL` | - | The specific model ID to use by default |
| `OPENFANG_ENABLE_NETWORK` | false | Set to "true" to allow the agent to perform web searches/fetches |
| `OPENFANG_DEFAULT_PROVIDER` | - | The fallback LLM provider (anthropic, openai, groq, gemini) |
| `OPENFANG_MEMORY_DECAY_RATE` | 0.05 | How fast the agent "forgets" older context (0.0 to 1.0) |
| `OPENFANG_DEFAULT_API_KEY_ENV` | (secret) | Points to the env var name containing the default key |

**Category:** AI/ML · **Languages:** JavaScript, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/template/openfang)
