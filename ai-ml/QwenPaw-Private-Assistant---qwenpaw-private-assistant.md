# Deploy QwenPaw Private Assistant on Railway

QwenPaw personal assistant: login on, shell tool off, one volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qwenpaw-private-assistant)

## About

QwenPaw is an open source personal AI assistant from the AgentScope team. It gives you a web console and REST API for chatting with your own agents, with long term memory, skills, scheduled tasks, a built in browser tool, and connectors that let the same assistant answer you in Telegram, Discord, Slack, DingTalk, Feishu, QQ, WeChat and more. It works with Qwen models through DashScope and with OpenAI, Anthropic, Gemini, OpenRouter, DeepSeek or any OpenAI compatible endpoint.

QwenPaw runs as a single container. This template uses the official `agentscope/qwenpaw:v2.2.1` image, the latest stable release, with one Railway volume at `/data`. Upstream Docker Compose uses three volumes (workspace, secrets, backups); the template points `QWENPAW_WORKING_DIR`, `QWENPAW_SECRET_DIR` and `QWENPAW_BACKUP_DIR` into that one volume, so your chats, your login, your encrypted model API keys and the key that decrypts them all survive redeploys. `PORT` and `QWENPAW_PORT` are pinned to 8088 so the healthcheck on `/api/version` reaches the app, and the start command sends the app's logs to the Railway log view.

The instance is private from the first boot. Login is switched on and your account is created automatically from a generated password, so nobody who finds the URL can register it first, and every API route needs a token. The agent's shell command tool is blocked by default, because a container has no sandbox and a shell command would run as root with access to your data and keys. You can allow it later by clearing one variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| QwenPaw | `agentscope/qwenpaw:v2.2.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8088 | Port Railway's healthcheck and edge proxy probe. Must equal QWENPAW_PORT (8088). |
| `QWENPAW_PORT` | 8088 | Port the QwenPaw web console and API listen on. The image entrypoint writes it into the supervisord command (qwenpaw app --host 0.0.0.0 --port $QWENPAW_PORT). Keep equal to PORT. |
| `QWENPAW_BACKUP_DIR` | /data/working.backups | Backup archives created from the Console. Same volume as the data, so download backups you want to keep off Railway. |
| `QWENPAW_SECRET_DIR` | (secret) | Login account (auth.json), encrypted provider API keys and the .master_key that decrypts them. Must stay on the /data volume or saved API keys and the login are lost on redeploy. Agents are blocked from reading this directory by the built-in File Guard. |
| `QWENPAW_WORKING_DIR` | /data/working | Config, agent workspaces, chats, memory, skills and plugins. Lives on the /data volume so nothing is lost on redeploy. The entrypoint runs qwenpaw init here on first boot. |
| `QWENPAW_AUTH_ENABLED` | true | Turns on the login screen and bearer token auth for every /api route. Leave true: without it anyone who finds the URL controls your assistant, its chat history and its tools. |
| `QWENPAW_AUTH_PASSWORD` | (secret) | Password of the single QwenPaw account, generated at deploy and used only on the first boot to create the account (stored hashed in auth.json on the volume). Changing this variable later does NOT change the password: use the Console profile settings or run qwenpaw auth reset-password in a Railway shell. |
| `QWENPAW_AUTH_USERNAME` | (secret) | Login username, generated at deploy. Randomized on purpose: five failed logins lock a username for 15 minutes, so a guessable name like admin would let anyone keep you locked out. Read it from this variable. Used on first boot only. |
| `QWENPAW_TOOL_GUARD_ENABLED` | true | Forces the Tool Guard on (this variable overrides the Console toggle). The guard is what enforces QWENPAW_TOOL_GUARD_DENIED_TOOLS and the approval prompts for risky tool calls. |
| `QWENPAW_TOOL_GUARD_DENIED_TOOLS` | execute_shell_command | Comma separated tools the agent may never call. Shell access is blocked by default because there is no kernel sandbox inside the container: a shell command runs as root with your volume, environment and network. Clear this variable to allow shell commands (flagged ones still need your approval in the Console). |

## Configuration

- **Start command:** `sh -c 'sed -i -e "s#^logfile=/var/log/supervisord.log#logfile=/dev/stdout\nlogfile_maxbytes=0#" -e "s#^stdout_logfile=/var/log/app.out.log#stdout_logfile=/dev/stdout\nstdout_logfile_maxbytes=0#" -e "s#^stderr_logfile=/var/log/app.err.log#stderr_logfile=/dev/stderr\nstderr_logfile_maxbytes=0#" /etc/supervisor/conf.d/supervisord.conf.template && exec /entrypoint.sh'`
- **Healthcheck:** `/api/version`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/qwenpaw-private-assistant)
