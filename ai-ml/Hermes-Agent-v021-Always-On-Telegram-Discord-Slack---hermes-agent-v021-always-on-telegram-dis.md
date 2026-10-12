# Deploy Hermes Agent v0.21 Always-On (Telegram, Discord, Slack) on Railway

Self-improving AI agent running 24/7 with persistent memory and a browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-v021-always-on-telegram-dis)

## About

Run Hermes Agent, the open-source self-improving agent from Nous Research, as an always-on assistant on Railway. It answers you on Telegram, Discord or Slack, keeps its memory, skills and schedules on a persistent volume, browses the web with a built-in headless Chromium and ships with the official web dashboard.

Hermes Agent runs as a long-lived gateway: it holds outbound connections to your chat platforms, calls the LLM provider you configure, uses tools (terminal, files, web, browser) and stores what it learns in `~/.hermes`. Hosting it yourself means you need a machine that never sleeps, durable storage for its SQLite state and memories, and a safe way to administer it. This community template runs the official `nousresearch/hermes-agent` image pinned to a release, keeps the gateway and dashboard under the image's own s6 supervisor, mounts a Railway volume as `HERMES_HOME`, and protects the dashboard with a generated password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes | [baranberkay96/hermes-agent-railway](https://github.com/baranberkay96/hermes-agent-railway) (branch: main) (root: /services/hermes) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9119 | Port Railway's healthcheck and public domain use; must match HERMES_DASHBOARD_PORT. |
| `OPENAI_API_KEY` | (secret) | Optional direct OpenAI key (also used for voice tools when set). |
| `SLACK_APP_TOKEN` | (secret) | Slack app-level token (xapp-...) with connections:write, used for Socket Mode. |
| `SLACK_BOT_TOKEN` | (secret) | Slack bot token (xoxb-...). Slack also needs SLACK_APP_TOKEN (Socket Mode). |
| `HERMES_DASHBOARD` | 1 | Runs the official Hermes web dashboard next to the gateway (s6-supervised, port 9119). |
| `ANTHROPIC_API_KEY` | (secret) | Optional direct Anthropic key, if you prefer it over OpenRouter. |
| `DISCORD_BOT_TOKEN` | (secret) | Discord bot token (Developer Portal > Bot). Enable the Message Content intent for the bot. |
| `AGENT_BROWSER_ARGS` | --no-sandbox,--disable-dev-shm-usage | Container-safe launch flags for the bundled headless Chromium (no user-namespace sandbox, no reliance on a large /dev/shm). Setting this replaces Hermes' auto-detected flags. |
| `OPENROUTER_API_KEY` | (secret) | REQUIRED. OpenRouter API key (openrouter.ai/keys): one key for Claude, GPT, Gemini, Hermes and hundreds of other models. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token from @BotFather. Set at least one of Telegram, Discord or Slack (or connect one later on the dashboard's Channels page). |
| `SLACK_ALLOWED_USERS` | - | Comma-separated Slack member IDs allowed to talk to the agent. Empty = deny by default plus DM pairing. |
| `DISCORD_ALLOWED_USERS` | - | Comma-separated Discord user IDs allowed to talk to the agent. Empty = deny by default plus DM pairing. |
| `HERMES_DASHBOARD_HOST` | 0.0.0.0 | Dashboard bind address. A non-loopback bind always enforces the dashboard login. |
| `HERMES_DASHBOARD_PORT` | 9119 | Dashboard port; the public domain targets it. |
| `HERMES_INFERENCE_MODEL` | - | Optional process-wide model override (e.g. anthropic/claude-sonnet-4.6). Leave empty to pick the model in the dashboard; when set it wins over the dashboard choice. |
| `TELEGRAM_ALLOWED_USERS` | - | Comma-separated Telegram user IDs allowed to talk to the agent. Empty = deny by default; approve people via DM pairing on the dashboard. |
| `HERMES_DASHBOARD_PUBLIC_URL` | - | Public URL of the dashboard (Host/Origin allow-list and OAuth callbacks). Update it when you add a custom domain. |
| `HERMES_DASHBOARD_OAUTH_CLIENT_ID` | - | Optional Nous Portal OAuth client id (agent:...). Upstream recommends OAuth over username/password for internet-facing dashboards. |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) | Stable signing key for dashboard sessions so logins survive restarts and redeploys. |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) | Dashboard login password, generated at deploy. Read it from this variable after deploying. |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) | Dashboard login username (bundled username/password provider). |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Tags:** hermes-agent, ai-agent, nous-research, telegram, discord · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-v021-always-on-telegram-dis)
