# Deploy nanobot v0.3 Always-On Personal AI Agent on Railway

Lightweight AI agent that lives in your chat apps and runs 24/7.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nanobot-v03-always-on-personal-ai-agent)

## About

Run nanobot, the lightweight open-source personal AI agent from HKUDS, around the clock on Railway. It answers you in its own web chat and in Telegram, Discord, Slack, WhatsApp and other chat apps, remembers what matters on a persistent volume, and runs scheduled tasks while you are away.

nanobot runs as a long-lived gateway: it keeps outbound connections to your chat apps, calls the LLM provider you choose, uses tools (shell, files, web search and fetch, cron) and stores sessions and memory under `~/.nanobot`. Self-hosting it needs a machine that never sleeps, durable storage, and a protected way to administer it. This community template builds nanobot v0.3.5 from the tagged upstream source, serves the bundled WebUI over HTTPS behind upstream's own password check, keeps config, sessions and memory on a Railway volume, and turns Railway variables into config so no JSON editing is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nanobot | [baranberkay96/nanobot-railway](https://github.com/baranberkay96/nanobot-railway) (branch: main) (root: /services/nanobot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | IANA timezone the agent uses for dates, reminders and cron jobs (e.g. Europe/Istanbul). |
| `PORT` | 8765 | Port of the WebUI/WebSocket channel. Railway's healthcheck and public domain use it; keep 8765 unless you also change the domain's target port. |
| `LLM_MODEL` | - | Optional. Model ID as your provider names it (e.g. anthropic/claude-opus-4.5 on OpenRouter). When set it wins over the WebUI model on every restart; leave empty to choose in the WebUI. |
| `GROQ_API_KEY` | (secret) | Optional. Groq API key (chat models and the default voice-message transcription provider). |
| `LLM_PROVIDER` | - | Optional. Provider for LLM_MODEL (openrouter, anthropic, openai, gemini, deepseek, groq). Empty = auto-detect from the model ID and available keys. |
| `GEMINI_API_KEY` | (secret) | Optional. Google Gemini API key. Also set LLM_MODEL or pick a model in the WebUI. |
| `OPENAI_API_KEY` | (secret) | Optional. OpenAI API key. Also set LLM_MODEL (e.g. an OpenAI model ID) or pick a model in the WebUI. |
| `SLACK_APP_TOKEN` | (secret) | Optional. Slack app-level token (xapp-...) with connections:write, for Socket Mode. |
| `SLACK_BOT_TOKEN` | (secret) | Optional. Slack bot token (xoxb-...). Needs SLACK_APP_TOKEN too (Socket Mode, no public webhook needed). |
| `DEEPSEEK_API_KEY` | (secret) | Optional. DeepSeek API key. Also set LLM_MODEL or pick a model in the WebUI. |
| `SLACK_ALLOW_FROM` | - | Optional. Comma-separated Slack member IDs allowed to DM the bot. Empty = DM pairing codes. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Anthropic API key. nanobot's stock default model (anthropic/claude-opus-4-5) runs on this key without further model setup. |
| `DISCORD_BOT_TOKEN` | (secret) | Optional. Discord bot token (Developer Portal > Bot, enable Message Content intent); enables the Discord channel. |
| `NANOBOT_WEB_TOKEN` | (secret) | WebUI password (upstream tokenIssueSecret), generated at deploy. Copy it from this variable and paste it on the WebUI login screen. |
| `DISCORD_ALLOW_FROM` | - | Optional. Comma-separated Discord user IDs allowed to talk to the bot. Empty = pairing codes. |
| `OPENROUTER_API_KEY` | (secret) | Optional. OpenRouter key (openrouter.ai/keys): one key for Claude, GPT, Gemini and many more. You can also add any provider later in WebUI Settings > Models. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional. Telegram bot token from @BotFather; enables the Telegram channel. Channels can also be added later in WebUI Settings > Channels. |
| `TELEGRAM_ALLOW_FROM` | - | Optional. Comma-separated Telegram user IDs that may talk to the bot. Empty = unknown users get a pairing code you approve in the WebUI. |
| `WEBUI_ALLOW_REMOTE_INSTALL` | false | true lets authenticated WebUI users install extra Python packages and marketplace skills. Common chat channels are preinstalled, so keep false unless you need more. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nanobot/.nanobot`

**Category:** AI/ML · **Tags:** nanobot, ai-agent, personal-assistant, telegram, discord · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/nanobot-v03-always-on-personal-ai-agent)
