# Deploy OpenClaw (Prev Clawdbot, Moltbot) on Railway

[May'26] Easy Self Host & Deploy OpenClaw — In Under 10 Mins

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-prev-clawdbot-moltbot-easy-self)

## About

<p>
OpenClaw (formerly Clawdbot and Moltbot) is an autonomous AI agent that executes tasks, automates workflows, and interacts across chat platforms using large language models. This template enables secure self-hosting of OpenClaw with a one-click deployment on Railway, making it simple for personal users to run a private AI assistant without complex DevOps configuration.
</p>

<p>
If you are searching for a secure and beginner-friendly way to deploy OpenClaw for personal use, this template removes infrastructure complexity while keeping you in full control of your API keys and data.
</p>

<p>
Hosting OpenClaw requires running a persistent AI agent service that connects to language model APIs, messaging platforms, and optional storage systems. A production-ready setup typically involves Docker configuration, environment variable management, HTTPS certificates, reverse proxy setup, process monitoring, and secure credential handling.
</p>
<p>
For personal users and AI enthusiasts, managing this infrastructure manually can be overwhelming.
</p>
<p>
This Railway template simplifies the entire process by packaging OpenClaw into a managed deployment environment. Infrastructure, networking, environment variables, and container lifecycle are handled automatically. You only configure your API keys and platform tokens. The result is a secure and scalable OpenClaw instance that you control without server administration.
</p>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openclaw Main | [sahilrupani/openclaw-railway-template](https://github.com/sahilrupani/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `ENABLE_WEB_TUI` | false | Enable / Disable web based TUI |
| `SETUP_PASSWORD` | (secret) | Password for the setup (no username required) |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | - |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 | - |
| `INTERNAL_GATEWAY_PORT` | 18789 | - |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Token for the gateway. Set it to something secure (you need to paste this on the UI on first run) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, JavaScript, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openclaw-prev-clawdbot-moltbot-easy-self)
