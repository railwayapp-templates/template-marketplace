# Deploy Hermes Agent by Nous Research on Railway

Self-hosted Hermes Agent built from the official Nous Research Docker image

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-official-dashboard)

## About

Hermes Agent is a self-hosted AI agent system by Nous Research built for autonomous workflows, agent experimentation, persistent memory, scheduled tasks, and AI-powered automation. This template deploys Hermes Agent on Railway using the official Nous Research Docker image, giving you a fast way to run it without managing server infrastructure yourself.

![Hermes Agent](https://imgur.com/jog7AzF.png)

Hosting Hermes Agent on Railway offers a simple path to run a self-hosted AI agent environment in the cloud. This template uses the official Nous Research Docker image and includes persistent storage so your agent configuration, memory, sessions, logs, and runtime data remain available across redeployments.

Before deploying, you only need to set a dashboard **username** and **password**. After deployment, open the generated Railway URL and access the Hermes Agent interface directly from your browser.

From the dashboard you can configure AI providers, manage agent settings, monitor activity, and control the gateway status.

If the gateway status shows **off** when you first open the dashboard, click **Restart Gateway** in the bottom-left corner of the interface. After restarting, the gateway status should switch to running.

### Quick Comparison with Other AI Agent Frameworks

| Feature                              | Hermes Agent     | CrewAI           | LangGraph        | OpenHands / AutoGPT | OpenClaw         |
|--------------------------------------|------------------|------------------|------------------|---------------------|------------------|
| Fully self-hosted                    | ✅               | ✅               | ✅               | ✅                  | ✅               |
| Built-in learning / skill creation loop | ✅            | ❌               | ❌               | ❌                  | ❌               |
| Persistent cross-session memory      | ✅               | Limited          | Configurable     | Basic               | Limited          |
| Multi-platform messaging gateway (Telegram, Discord, Slack, WhatsApp, etc.) | ✅ | ❌          | ❌               | ❌                  | ✅               |
| Built-in scheduled tasks / cron      | ✅               | Limited          | ❌               | Limited             | Limited          |
| Browser dashboard for management     | ✅               | ❌               | ❌               | Partial             | Partial          |
| Simple one-click Railway deploy      | ✅               | ❌               | ❌               | ❌                  | ❌               |
| Model-agnostic (any LLM provider)    | ✅               | ✅               | ✅               | ✅                  | ✅               |
| Focused on long-running autonomous agents | ✅          | Multi-agent crews| Graph orchestration | Coding-focused   | General automation |
| Open-source (MIT / permissive)       | ✅               | ✅               | ✅               | ✅                  | ✅               |

Hermes Agent stands out when you want a self-improving agent with real persistent memory, multi-platform reach, and scheduled automation — all deployable on Railway in minutes with almost no ops overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | `nousresearch/hermes-agent:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9119 |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |
| `HERMES_GID` | 10000 |
| `HERMES_UID` | 10000 |
| `API_SERVER_HOST` | 0.0.0.0 |
| `API_SERVER_PORT` | 8642 |
| `HERMES_DASHBOARD` | 1 |
| `API_SERVER_ENABLED` | true |
| `HERMES_DASHBOARD_HOST` | 0.0.0.0 |
| `HERMES_DASHBOARD_PORT` | 9119 |
| `GATEWAY_ALLOW_ALL_USERS` | true |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) |

## Configuration

- **Start command:** `sh -lc '/opt/hermes/bin/hermes dashboard --host 0.0.0.0 --port ${PORT:-9119} --no-open & exec /opt/hermes/bin/hermes gateway'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-official-dashboard)
