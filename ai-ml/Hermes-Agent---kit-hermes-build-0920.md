# Deploy Hermes Agent on Railway

Hermes Agent: self-hosted AI agent for Telegram, Discord, Slack with memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kit-hermes-build-0920)

## About

Hermes Agent is Nous Research's open-source, self-hosted AI agent: a gateway that talks to you on Telegram, Discord, Slack, WhatsApp and more, runs tools (shell, browser, files, web search), keeps long-term memory, learns reusable skills, and exposes an OpenAI-compatible API - all from one always-on container. This template deploys the official image pinned by digest with the web dashboard behind a generated login, a persistent volume for your agent's state, and a deployment healthcheck. **There is nothing to fill in.** After the deploy, open the public URL and log in as `admin` with the password in the `Hermes` service's Variables tab, then add a model provider key and a messaging platform from the dashboard.

**Plan requirements.** Measured on this exact image: the container idles around **330 MB** with the dashboard, gateway and API server running (measured after five idle minutes) and peaks around 365 MB at boot; each active conversation adds tens of MB. It fits every plan from Trial up; Hobby (8 GB) is the comfortable choice once you enable tools like the headless browser, which add a few hundred MB while they run.

Hermes runs three things in one container: the **gateway** (connects to your messaging platforms and runs the agent), the **dashboard** (web UI for configuration, provider keys, sessions and logs) and the **OpenAI-compatible API server** (`/v1/chat/completions` on port 8642 inside the container, protected by a generated bearer key). All state - config, provider keys, sessions, memory, skills - lives under `/opt/data` on the volume, so redeploys and upgrades keep your agent's memory. The dashboard is only reachable through the generated basic-auth login; upstream refuses to bind it publicly without one. The container starts as root and drops to the `hermes` user for every service, which is how the official image is designed to run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes | `nousresearch/hermes-agent:v2026.9.14@sha256:99641e57ec762c59e54cb44aa6746b7fc68c18b3c5ddb088af54234c613d9294` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9119 | Port the Hermes dashboard listens on. Railway's public domain and healthcheck target this port. |
| `HERMES_HOME` | /opt/data | Hermes state directory (config, sessions, memory, skills). Mounted on the volume so it survives redeploys. |
| `API_SERVER_KEY` | - | Bearer token for the OpenAI-compatible API. Generated once at deploy time. |
| `OPENAI_API_KEY` | (secret) | Optional - OpenAI key, if you prefer OpenAI directly. |
| `API_SERVER_HOST` | 0.0.0.0 | Bind address for the API server. |
| `ANTHROPIC_API_KEY` | (secret) | Optional - Anthropic key, if you prefer Claude directly. |
| `DISCORD_BOT_TOKEN` | (secret) | Optional - Discord bot token, if you want the agent in Discord. |
| `API_SERVER_ENABLED` | true | Turns on Hermes's OpenAI-compatible API server on the gateway (port 8642 inside the container; reach it via the dashboard or private networking). |
| `OPENROUTER_API_KEY` | (secret) | Optional - OpenRouter key so the agent can talk to a model. You can also add any provider key from the dashboard after deploying. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional - Telegram bot token from @BotFather. Leave blank to run without Telegram; the dashboard and API still work. |
| `TELEGRAM_ALLOWED_USERS` | - | Optional - Comma-separated Telegram user IDs allowed to talk to the bot. Leave blank to allow no one until you set it. |
| `HERMES_DASHBOARD_PUBLIC_URL` | - | Public URL of the dashboard, used for links and OAuth callbacks. Set automatically from your Railway domain. |
| `HERMES_DISABLE_LAZY_INSTALLS` | 1 | Do not pip-install optional tool packages at runtime; keeps boots fast and the image immutable. |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) | Password for the web dashboard. Generated for you - copy it from this Variables tab after deploying. |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) | Username for the web dashboard's login. |

## Configuration

- **Start command:** `/opt/hermes/docker/entrypoint-dispatch.sh sh -c 'cmp -s /opt/data/config.yaml /opt/hermes/cli-config.yaml.example && sed -i "/^  base_url: \"https:\/\/openrouter.ai\/api\/v1\"$/d" /opt/data/config.yaml; hermes dashboard --host 0.0.0.0 --port "$PORT" --no-open & dash=$!; trap "kill -TERM \$gw \$dash 2>/dev/null; wait; exit 0" TERM INT; while :; do hermes gateway run --external-supervisor & gw=$!; wait $gw; c=$?; [ "$c" -eq 75 ] || { kill -TERM $dash 2>/dev/null; exit "$c"; }; done'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kit-hermes-build-0920)
