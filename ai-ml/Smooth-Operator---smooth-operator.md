# Deploy Smooth Operator on Railway

an agent to manage your daily ops

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/smooth-operator)

## About

Smooth Operator is a Telegram-based AI operator for daily ops. Ask it questions about incidents, customers, logs, databases, and deploys, and it investigates connected systems for you. Instead of jumping between dashboards and support threads, you get grounded answers in one chat powered by your chosen OpenRouter model.

Hosting Smooth Operator on Railway gives you an always-on AI operator that runs in your own cloud environment. Deploy the template, add your Telegram bot token, add your OpenRouter API key, choose an OpenRouter model, and start chatting with your bot. Railway keeps the service running and provides persistent storage so sessions and runtime state survive redeploys. You can begin with just Telegram and OpenRouter, then optionally connect Datadog or a Postgres database when you want Smooth Operator to investigate production systems.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| operator-agent | [thearyanag/operator-agent](https://github.com/thearyanag/operator-agent) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PI_MODEL` | - | Optional: product-level provider choice. Leave empty to use the default Anthropic model. |
| `DD_API_KEY` | (secret) | - |
| `DD_APP_KEY` | - | Optional Datadog site override, for example datadoghq.com or us5.datadoghq.com. |
| `PI_WORKDIR` | - | Required for the default Anthropic model unless Anthropic auth is already configured in pi settings. |
| `PI_PROVIDER` | - | OpenRouter mode: user provides an API key and model string. |
| `DATABASE_URL` | - | Required for the local Datadog MCP package if enabled in .mcp.json. |
| `PI_SESSION_DIR` | - | Optional: comma-separated directories that pi may send as Telegram file attachments |
| `ALLOWED_GROUP_ID` | - | Optional: stream private-DM assistant text through Telegram sendMessageDraft. |
| `ALLOWED_USER_IDS` | - | Optional: if set, users in this group/supergroup can interact with the bot. |
| `OPENROUTER_MODEL` | - | OpenAI Codex mode: user provides the credential fields normally stored in ~/.pi/agent/auth.json. |
| `ANTHROPIC_API_KEY` | (secret) | Optional: explicit pi model in provider/model-id format. |
| `PI_THINKING_LEVEL` | - | Optional: extra comma-separated extension file or directory paths for pi. |
| `OPENROUTER_API_KEY` | (secret) | - |
| `PI_EXTENSION_PATHS` | - | Optional: path to the operator system prompt markdown file. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional: comma-separated Telegram user IDs that may DM the bot. |
| `PI_SYSTEM_PROMPT_PATH` | - | Optional: custom directory for persisted per-chat pi sessions. |
| `OPENAI_CODEX_AUTH_JSON` | - | Optional: pi thinking level. |
| `OPENAI_CODEX_ACCOUNT_ID` | - | Alternative OpenAI Codex input: either the openai-codex credential object or the full auth.json object. |
| `OPENAI_CODEX_ACCESS_TOKEN` | (secret) | - |
| `TELEGRAM_ATTACHMENT_ROOTS` | - | Required for the local Postgres MCP package if enabled in .mcp.json. |
| `TELEGRAM_BUSINESS_DRY_RUN` | - | Optional: working directory pi should operate in. |
| `OPENAI_CODEX_REFRESH_TOKEN` | (secret) | - |
| `ENABLE_TELEGRAM_NATIVE_STREAMING` | - | Optional: enable Telegram Business / Chat Automation messages. |
| `ENABLE_TELEGRAM_BUSINESS_AUTOMATION` | - | Optional: comma-separated Telegram user IDs whose connected Business accounts may auto-reply. |
| `TELEGRAM_BUSINESS_ALLOWED_OWNER_IDS` | - | Optional: run Business automation without sending replies to managed chats. |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/smooth-operator)
