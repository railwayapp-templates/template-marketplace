# Deploy Hermes Agent (Multi-Channel) on Railway

Always-on AI agent for Telegram, Discord and Slack with a web dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-multi-channel)

## About

Hermes Agent is an autonomous AI agent by Nous Research that lives on your own server, connects to your messaging channels, and keeps its memory, skills and history on disk between conversations. This template runs the official Hermes image and also serves the Hermes web dashboard on your Railway domain, behind a login.

Hermes runs as a long-lived gateway process that connects out to Telegram, Discord, Slack, Matrix and the other platforms it supports, and answers the people you allow. There is no inbound webhook to configure. Alongside the gateway, the official image can supervise the Hermes dashboard, a web UI with chat, provider keys, skills, a kanban board, analytics and a console.

This template deploys one container carrying both. The gateway is the container's main process, so if it dies Railway restarts the deployment. The dashboard runs beside it under the image's own s6 supervisor, so a dashboard crash is restarted in place without touching the agent. All state lives on a Railway volume mounted at the image's own data directory, so redeploys and version bumps keep your history, memories, credentials and pairing decisions.

The dashboard is protected by Hermes' own auth gate. A username and a generated password are set for you at deploy time, anonymous visitors get a login page, and the session cookie signing key is generated per deployment so logins survive restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | [hmseeb/hermes-agent-dashboard](https://github.com/hmseeb/hermes-agent-dashboard) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HERMES_DASHBOARD` | true | Runs the Hermes web dashboard as a supervised service. Leave as true. |
| `OPENROUTER_API_KEY` | (secret) | Optional. Inference provider key, free from openrouter.ai/keys. You can also add this, or any other provider, from the dashboard's Keys tab after deploying. |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional. Bot token from @BotFather. Discord, Slack, Matrix and the rest are configured the same way, see the Hermes docs. |
| `HERMES_DASHBOARD_HOST` | :: | Bind address. Railway's edge reaches containers over IPv6. |
| `HERMES_DASHBOARD_PORT` | 8080 | Port the dashboard listens on. Matches the service domain target port. |
| `TELEGRAM_ALLOWED_USERS` | - | Optional. Comma separated numeric Telegram IDs allowed to talk to the agent, no brackets or quotes. Get yours from @userinfobot. Leave empty to approve senders from the dashboard instead. |
| `HERMES_DASHBOARD_PUBLIC_URL` | - | Public origin Hermes builds OAuth redirect URIs from. |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) | Signs dashboard session cookies so logins survive restarts and redeploys. |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) | Choose the password for the dashboard login page. Clearing it later does not open the dashboard up, it stops the dashboard from starting. |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) | Choose the username for the dashboard login page. |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** Automation · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-multi-channel)
