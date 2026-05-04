# Deploy Hermes Agent | OpenClaw Alternative with Dashboard on Railway

Self-improving AI agent with memory, skills, and web dashboard 🤖

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-or-openclaw-alternative-wit)

## About

Hermes Agent | OpenClaw Alternative with Dashboard is a self-improving, open-source AI agent by [Nous Research](https://nousresearch.com/). It runs as a persistent backend service, connects to messaging channels such as Telegram, Discord, Slack, WhatsApp, and Email, remembers conversations, creates skills, and becomes more capable the longer it runs.

![](http://raw.githubusercontent.com/codestorm-official/hermes-agent/main/img/hermes-banner.png)

Hosting Hermes Agent | OpenClaw Alternative with Dashboard on Railway involves deploying a containerized service that runs the Hermes Agent gateway together with a browser-based admin dashboard. The deployment uses persistent storage, typically mounted at `/data`, to keep configuration, session data, memory, learned skills, logs, and user pairing information across restarts and redeploys. This template simplifies self-hosting by providing a web UI for managing LLM providers, messaging channels, access control, gateway status, and live logs without manually editing configuration files or setting up reverse proxies, TLS, process managers, or server infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | [praveen-ks-2001/hermes-agent-template](https://github.com/praveen-ks-2001/hermes-agent-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8642 |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent-or-openclaw-alternative-wit)
