# Deploy Mercury Agent Railway - 1 Click deploy on Railway

Mercury is a persistent AI agent that runs 24/7.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mercury-agent-railway)

## About

Running Mercury here means shipping a **Docker** image on **Node 20**, installing Mercury from npm, and starting **`mercury start`** in the foreground (no HTTP service). The template **entrypoint** symlinks `~/.mercury` to **`/data/mercury`**, writes **`mercury.yaml`** from **`MERCURY_OWNER`** so the interactive first-run wizard never blocks the container, seeds **`~/.mercury/.env`** from Railway on every boot, and can enable **Telegram** plus optional **CLI-less pairing** via **`TELEGRAM_BOOTSTRAP_ADMIN_ID`**. You must **attach a Railway Volume** at **`/data`** so memory, soul markdown, skills, cron schedules, and Telegram access survive redeploys. Supply **`DEFAULT_PROVIDER`**, the matching provider API key(s), and **`TELEGRAM_BOT_TOKEN`** for typical headless use. **Do not set a custom start command** that bypasses the image `ENTRYPOINT`, or volume wiring and bootstrapping will not run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mercury-railway | [4bade3/mercury-railway](https://github.com/4bade3/mercury-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GROK_MODEL` | - | optional |
| `MEMORY_DIR` | ./memory | optional — path to memory storage |
| `GITHUB_EMAIL` | - | optional — email for co-authored commits |
| `GITHUB_TOKEN` | (secret) | optional — fine-grained PAT with repo scope |
| `GROK_API_KEY` | (secret) | required if DEFAULT_PROVIDER=grok |
| `MERCURY_NAME` | Mercury | display name for your agent |
| `OPENAI_MODEL` | - | optional. use any OpenRouter model string e.g. anthropic/claude-sonnet-4-5 |
| `GROK_BASE_URL` | - | optional |
| `MERCURY_OWNER` | human | your name — the agent knows who it works for |
| `DEEPSEEK_MODEL` | - | optional |
| `OPENAI_API_KEY` | (secret) | required if DEFAULT_PROVIDER=openai. use sk-or-... for OpenRouter |
| `ANTHROPIC_MODEL` | - | optional |
| `GITHUB_USERNAME` | (secret) | optional |
| `OPENAI_BASE_URL` | https://api.openai.com/v1 | set to https://openrouter.ai/api/v1 for OpenRouter |
| `DEEPSEEK_API_KEY` | (secret) | required if DEFAULT_PROVIDER=deepseek |
| `DEFAULT_PROVIDER` | openai | pick `anthropic`, `deepseek`, `openai`, or `grok` |
| `ANTHROPIC_API_KEY` | (secret) | required if DEFAULT_PROVIDER=anthropic |
| `DEEPSEEK_BASE_URL` | - | optional |
| `DAILY_TOKEN_BUDGET` | (secret) | optional — daily token limit before auto-concise kicks in |
| `OLLAMA_CLOUD_MODEL` | - | optional |
| `TELEGRAM_BOT_TOKEN` | (secret) | get from https://t.me/BotFather — required for headless use |
| `GITHUB_DEFAULT_REPO` | - | optional — default repo name |
| `GITHUB_DEFAULT_OWNER` | - | optional — default repo owner |
| `OLLAMA_CLOUD_API_KEY` | (secret) | required if DEFAULT_PROVIDER=ollamaCloud |
| `MERCURY_AGENT_VERSION` | latest | Pin to an npm version such as `0.5.2`, `0.5.4`, `latest` |
| `OLLAMA_CLOUD_BASE_URL` | - | optional |
| `HEARTBEAT_INTERVAL_MINUTES` | 60 | optional — how often Mercury checks budget and tasks |
| `TELEGRAM_BOOTSTRAP_ADMIN_ID` | - | Telegram User id to whitelist |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/mercury-agent-railway)
