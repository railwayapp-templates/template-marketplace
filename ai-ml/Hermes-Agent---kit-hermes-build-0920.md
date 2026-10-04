# Deploy Hermes Agent on Railway

Hermes Agent: self-hosted AI agent for Telegram, Discord, Slack with memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kit-hermes-build-0920)

## About

![Hermes Agent dashboard: a chat answered through OpenRouter, with the agent's tools, skills and gateway status](https://bogusz.co/external/hermes-banner-v1.png)

Nous Research's self-hosted AI agent, always on: it talks to you on Telegram, Discord or Slack, runs tools, remembers across conversations, and serves an OpenAI-compatible API — configured from a web dashboard.

**Get started**

1. **Deploy.** Nothing to fill in. Plan: Hobby. The container idles at about 550 MB, but the dashboard's **Chat** tab starts a second agent process of about 400 MB per chat session, and these stay until the service restarts, so after real use it sits at 1.2-1.8 GB. Trial (1 GB) holds one dashboard chat session; Free (0.5 GB) cannot run the dashboard chat at all.
2. **Sign in.** Open the Hermes service URL. Username `admin`; the password is `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` in the service's **Variables** tab.
3. **Add a provider key and a chat app.** In the dashboard add a provider key (OpenRouter, Anthropic, OpenAI or any OpenAI-compatible endpoint), or set `OPENROUTER_API_KEY` in Variables, and if you like a Telegram or Discord bot token with your allowed user IDs. The gateway restarts itself with the new configuration.
4. **Choose your model.** Hermes starts on `anthropic/claude-opus-4.6`, which costs $5/$25 per million tokens on OpenRouter. In **Chat**, click the model name in the right-hand panel, pick **OpenRouter** in the provider list (the picker opens on Nous Portal, which shows no models), choose a model such as `deepseek/deepseek-v4.1-flash` ($0.30/$1.20), then **Switch** and **Reload**. It applies to new chats, Telegram and the API.

Hermes Agent is Nous Research's open-source, self-hosted AI agent: a gateway that talks to you on Telegram, Discord, Slack, WhatsApp and more, runs tools (shell, browser, files, web search), keeps long-term memory, learns reusable skills, and exposes an OpenAI-compatible API - all from one always-on container. This template deploys the official image pinned by digest with the web dashboard behind a generated login, a persistent volume for your agent's state, and a deployment healthcheck. Hermes runs three things in one container: the **gateway** (connects to your messaging platforms and runs the agent), the **dashboard** (web UI for configuration, provider keys, sessions and logs) and the **OpenAI-compatible API server** (`/v1/chat/completions` on port 8642 inside the container, protected by a generated bearer key). All state - config, provider keys, sessions, memory, skills - lives under `/opt/data` on the volume, so redeploys and upgrades keep your agent's memory. The dashboard is only reachable through the generated basic-auth login; upstream refuses to bind it publicly without one. The container starts as root and drops to the `hermes` user for every service, which is how the official image is designed to run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes | `nousresearch/hermes-agent:v2026.9.24@sha256:fca358f12efd65bfaaca05884166f15c0e2788375ca30d77061ac1ebc96452b7` | Web service |

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
| `GATEWAY_MULTIPLEX_PROFILES` | false | Keeps the gateway in single-profile mode so it reads provider keys from these service variables. Switching the model in the dashboard otherwise turns on multi-profile mode, where Telegram and the API stop seeing keys set here. |
| `HERMES_DASHBOARD_PUBLIC_URL` | - | Public URL of the dashboard, used for links and OAuth callbacks. Set automatically from your Railway domain. |
| `HERMES_DISABLE_LAZY_INSTALLS` | 1 | Do not pip-install optional tool packages at runtime; keeps boots fast and the image immutable. |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) | Password for the web dashboard. Generated for you - copy it from this Variables tab after deploying. |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) | Username for the web dashboard's login. |

## Configuration

- **Start command:** `/opt/hermes/docker/entrypoint-dispatch.sh bash -c 'cmp -s /opt/data/config.yaml /opt/hermes/cli-config.yaml.example && sed -i "/^  base_url: \"https:\/\/openrouter.ai\/api\/v1\"$/d" /opt/data/config.yaml
hermes dashboard --host 0.0.0.0 --port "$PORT" --no-open & dash=$!
gw=
trap "kill -TERM \$gw \$dash 2>/dev/null; wait; exit 0" TERM INT
dashboard_exited() {
  echo "[railway] dashboard exited with code $1; stopping the gateway so Railway restarts the service"
  kill -TERM $gw 2>/dev/null; wait $gw 2>/dev/null
  exit 1
}
stamp() { stat -c %Y /opt/data/config.yaml /opt/data/.env 2>/dev/null | tr "\n" " "; }
delay=5
while :; do
  started=$SECONDS
  hermes gateway run --external-supervisor & gw=$!
  ended=; wait -n -p ended $gw $dash; code=$?
  [ "$ended" = "$dash" ] && dashboard_exited $code
  if [ "$code" -eq 75 ]; then delay=5; continue; fi
  [ $((SECONDS - started)) -gt 600 ] && delay=5
  cap=60; [ "$code" -eq 78 ] && cap=600
  echo "[railway] gateway exited with code $code; the dashboard stays up. Restarting the gateway in ${delay}s, or as soon as config.yaml or .env changes."
  before=$(stamp); until_=$((SECONDS + delay))
  while [ $SECONDS -lt $until_ ] && [ "$(stamp)" = "$before" ]; do
    sleep 5 & nap=$!
    ended=; wait -n -p ended $nap $dash; code=$?
    [ "$ended" = "$dash" ] && { kill $nap 2>/dev/null; dashboard_exited $code; }
  done
  delay=$((delay * 2)); [ $delay -gt $cap ] && delay=$cap
done'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kit-hermes-build-0920)
