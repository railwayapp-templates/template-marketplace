# Deploy Hermes Agent v0.21 Always-On (Telegram, Discord, Slack) on Railway

Self-improving AI agent running 24/7 with web chat UI, memory and browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-v021-always-on-telegram-dis)

## About

Run Hermes Agent, the open-source self-improving agent from Nous Research, as an always-on assistant on Railway. Talk to it on Telegram, Discord or Slack, or chat in the browser and on your phone with Hermes WebUI. Memory, skills and schedules persist on a volume, a headless Chromium handles web tasks, and the official dashboard is included.

Hermes Agent runs as a long-lived gateway: it holds outbound connections to your chat platforms, calls the LLM provider you configure, uses tools (terminal, files, web, browser) and stores what it learns in its home directory. Hosting it yourself means a machine that never sleeps, durable storage for its SQLite state and memories, and safe ways to administer and talk to it. This community template runs the official `nousresearch/hermes-agent` image pinned to a release, mounts a Railway volume as `HERMES_HOME`, and runs three things side by side: the gateway, the official web dashboard, and Hermes WebUI, a community chat interface that shares the same memory, skills and sessions. Both web interfaces are protected by generated passwords.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes WebUI | [baranberkay96/hermes-agent-railway](https://github.com/baranberkay96/hermes-agent-railway) (branch: main) (root: /services/webui-proxy) | Web service |
| Hermes | [baranberkay96/hermes-agent-railway](https://github.com/baranberkay96/hermes-agent-railway) (branch: main) (root: /services/hermes) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Hermes WebUI | 8080 | Port Caddy listens on; Railway's healthcheck and public domain use it. |
| `HERMES_WEBUI_UPSTREAM` | Hermes WebUI | - | Private-network address of the WebUI, which runs inside the Hermes service (it needs Hermes' volume). |
| `PORT` | Hermes | 9119 | Port Railway's healthcheck and public domain use; must match HERMES_DASHBOARD_PORT. |
| `HERMES_WEBUI` | Hermes | 1 | Runs Hermes WebUI (browser and phone chat) inside this service on HERMES_WEBUI_PORT; open it via the Hermes WebUI service URL. |
| `OPENAI_API_KEY` | Hermes | (secret) | Optional direct OpenAI key (also used for voice tools when set). |
| `SLACK_APP_TOKEN` | Hermes | (secret) | Slack app-level token (xapp-...) with connections:write, used for Socket Mode. |
| `SLACK_BOT_TOKEN` | Hermes | (secret) | Slack bot token (xoxb-...). Slack also needs SLACK_APP_TOKEN (Socket Mode). |
| `HERMES_DASHBOARD` | Hermes | 1 | Runs the official Hermes web dashboard next to the gateway (s6-supervised, port 9119). |
| `ANTHROPIC_API_KEY` | Hermes | (secret) | Optional direct Anthropic key, if you prefer it over OpenRouter. |
| `DISCORD_BOT_TOKEN` | Hermes | (secret) | Discord bot token (Developer Portal > Bot). Enable the Message Content intent for the bot. |
| `HERMES_WEBUI_HOST` | Hermes | :: | WebUI bind address. "::" is dual-stack so the Hermes WebUI proxy reaches it over the private network. |
| `HERMES_WEBUI_PORT` | Hermes | 8787 | WebUI port on the private network; the Hermes WebUI service proxies to it. |
| `AGENT_BROWSER_ARGS` | Hermes | --no-sandbox,--disable-dev-shm-usage | Container-safe launch flags for the bundled headless Chromium (no user-namespace sandbox, no reliance on a large /dev/shm). Setting this replaces Hermes' auto-detected flags. |
| `OPENROUTER_API_KEY` | Hermes | (secret) | REQUIRED. OpenRouter API key (openrouter.ai/keys): one key for Claude, GPT, Gemini, Hermes and hundreds of other models. |
| `TELEGRAM_BOT_TOKEN` | Hermes | (secret) | Telegram bot token from @BotFather. Set at least one of Telegram, Discord or Slack (or connect one later on the dashboard's Channels page). |
| `HERMES_WEBUI_SECURE` | Hermes | 1 | Marks WebUI session cookies Secure (Railway serves it over HTTPS only). |
| `SLACK_ALLOWED_USERS` | Hermes | - | Comma-separated Slack member IDs allowed to talk to the agent. Empty = deny by default plus DM pairing. |
| `DISCORD_ALLOWED_USERS` | Hermes | - | Comma-separated Discord user IDs allowed to talk to the agent. Empty = deny by default plus DM pairing. |
| `HERMES_DASHBOARD_HOST` | Hermes | 0.0.0.0 | Dashboard bind address. A non-loopback bind always enforces the dashboard login. |
| `HERMES_DASHBOARD_PORT` | Hermes | 9119 | Dashboard port; the public domain targets it. |
| `HERMES_WEBUI_PASSWORD` | Hermes | (secret) | WebUI login password, generated at deploy. The WebUI never starts without it. Read it from this variable after deploying. |
| `HERMES_INFERENCE_MODEL` | Hermes | - | Optional process-wide model override (e.g. anthropic/claude-sonnet-4.6). Leave empty to pick the model in the dashboard; when set it wins over the dashboard choice. |
| `TELEGRAM_ALLOWED_USERS` | Hermes | - | Comma-separated Telegram user IDs allowed to talk to the agent. Empty = deny by default; approve people via DM pairing on the dashboard. |
| `HERMES_DASHBOARD_PUBLIC_URL` | Hermes | - | Public URL of the dashboard (Host/Origin allow-list and OAuth callbacks). Update it when you add a custom domain. |
| `HERMES_DASHBOARD_OAUTH_CLIENT_ID` | Hermes | - | Optional Nous Portal OAuth client id (agent:...). Upstream recommends OAuth over username/password for internet-facing dashboards. |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | Hermes | (secret) | Stable signing key for dashboard sessions so logins survive restarts and redeploys. |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | Hermes | (secret) | Dashboard login password, generated at deploy. Read it from this variable after deploying. |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | Hermes | (secret) | Dashboard login username (bundled username/password provider). |

## Configuration

- **Healthcheck:** `/proxy-health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`
- **Volume:** `/opt/data`

**Category:** AI/ML · **Tags:** hermes-agent, ai-agent, nous-research, telegram, discord · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-v021-always-on-telegram-dis)
