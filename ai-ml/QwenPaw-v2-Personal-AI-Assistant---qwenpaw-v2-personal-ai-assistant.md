# Deploy QwenPaw v2 Personal AI Assistant on Railway

Always-on personal AI assistant with chat apps, memory and skills.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qwenpaw-v2-personal-ai-assistant)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qwenpaw-v2-personal-ai-assistant?referralCode=20H68q)

Run QwenPaw, the open-source personal AI assistant from the AgentScope team, around the clock on Railway. It answers in its own web console and in Telegram, Discord, Slack, DingTalk, Feishu, QQ and WeCom, keeps long-term memory on a persistent volume, and runs skills and scheduled tasks while you are away.

QwenPaw is a single Python service: a web console and REST API, agents with tools (shell, files, a real Chromium), skills, cron jobs, heartbeats and long-term memory. Self-hosting it needs a machine that never sleeps, durable storage for chats, memory and encrypted keys, and a login, because upstream ships with authentication off. This community template runs the official `agentscope/qwenpaw:v2.2.2` image with all state on one Railway volume, creates the login from generated credentials before the app starts and refuses to start without one, switches chat apps on from variables with sender approval, and sends logs to Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| QwenPaw | [baranberkay96/qwenpaw-railway](https://github.com/baranberkay96/qwenpaw-railway) (branch: main) (root: /services/qwenpaw) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | IANA timezone stored as the user timezone on the first boot (e.g. Europe/Istanbul); used for cron jobs and heartbeats. Change it later in the Console. |
| `PORT` | 8088 | Port of the QwenPaw console and API. Railway's healthcheck and the public domain use it; keep 8088 unless you also change the domain's target port. |
| `QQ_APP_ID` | - | Optional. QQ bot AppID; with QQ_CLIENT_SECRET enables the QQ channel. |
| `WECOM_BOT_ID` | - | Optional. WeCom (WeChat Work) AI bot ID; with WECOM_SECRET enables the WeCom channel. |
| `WECOM_SECRET` | (secret) | Optional. WeCom AI bot secret. |
| `FEISHU_APP_ID` | - | Optional. Feishu/Lark app ID (cli_...); with FEISHU_APP_SECRET enables the Feishu channel (WebSocket long connection). |
| `FEISHU_DOMAIN` | - | Optional. feishu (China, default) or lark (international). |
| `SLACK_APP_TOKEN` | (secret) | Optional. Slack app-level token (xapp-...) with connections:write, for Socket Mode. |
| `SLACK_BOT_TOKEN` | (secret) | Optional. Slack bot token (xoxb-...). Needs SLACK_APP_TOKEN too (Socket Mode, no public webhook). |
| `QQ_CLIENT_SECRET` | (secret) | Optional. QQ bot AppSecret. |
| `DISCORD_BOT_TOKEN` | (secret) | Optional. Discord bot token (Developer Portal > Bot, enable the Message Content intent); enables the Discord channel. |
| `FEISHU_APP_SECRET` | (secret) | Optional. Feishu/Lark app secret. |
| `LLAMA_ARG_THREADS` | - | Optional. CPU threads for in-container llama.cpp models (QwenPaw Local). Empty = derived from the container's CPU quota, capped at 8. |
| `DINGTALK_CLIENT_ID` | - | Optional. DingTalk app Client ID (AppKey); with DINGTALK_CLIENT_SECRET enables the DingTalk channel (Stream mode). |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional. Telegram bot token from @BotFather; enables the Telegram channel. Unknown senders must be approved in the Console first. |
| `QWENPAW_AUTH_PASSWORD` | (secret) | Console login password (min. 12 characters), generated at deploy. Change it here to reset the password on the next restart; a password changed in the Console is kept until this variable changes. |
| `QWENPAW_AUTH_USERNAME` | (secret) | Console login name, generated at deploy (random on purpose: five wrong passwords lock a username for 15 minutes). Changing it later renames the account on the next restart. |
| `DINGTALK_CLIENT_SECRET` | (secret) | Optional. DingTalk app Client Secret (AppSecret). |
| `QWENPAW_AGENT_LANGUAGE` | en | Language of the default agent and its persona files, chosen on the first boot only: en, zh, ru or id. Change it later per agent in the Console. |
| `QWENPAW_TRUSTED_PROXIES` | 10.0.0.0/8,100.64.0.0/10,172.16.0.0/12,192.168.0.0/16,fd00::/8 | Proxy networks whose X-Forwarded-For QwenPaw trusts, so login lockouts count real client IPs instead of Railway's edge. Written to security.trusted_proxies on every start; empty = trust none. |
| `QWENPAW_DISABLED_CHANNELS` | imessage,sip | Channels hidden from the Console. iMessage needs macOS and SIP needs inbound UDP, neither of which Railway offers. |
| `QWENPAW_TELEMETRY_DISABLED` | true | true = no install or daily usage pings to the QwenPaw team (nobody sees upstream's consent prompt on Railway). Set false to share anonymous environment stats. |
| `QWENPAW_TOOL_GUARD_ENABLED` | true | true forces QwenPaw's Tool Guard on (risky tool calls wait for your approval and catastrophic commands are blocked). Empty = the Console toggle decides. |
| `QWENPAW_TOOL_GUARD_DENIED_TOOLS` | - | Optional. Comma-separated tools the agent may never call, e.g. execute_shell_command to switch off shell access entirely. |

## Configuration

- **Healthcheck:** `/api/version`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Tags:** qwenpaw, agentscope, ai-agent, personal-assistant, telegram · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/qwenpaw-v2-personal-ai-assistant)
