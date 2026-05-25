# Deploy AlphaClaw on Railway

Deploy and Host AlphaClaw with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alphaclaw)

## About

Launch your always-on personal AI assistant effortlessly with this one-click Railway template. An intuitive configuration interface guides you through choosing your AI models, linking communication channels, authorizing Google Workspace, and setting up GitHub backups. Transform a fresh deployment into a fully functioning Telegram or Discord assistant in just a few minutes.

* **Always-on OpenClaw Gateway**: Includes a web-based dashboard to manage onboarding, API keys, active channels, and system health.
* **Comprehensive Version Control**: Automatically syncs your configurations, scheduled tasks, workspace files, and agent memory directly to GitHub.
* **Instant Chat Integrations**: Pre-configured for Telegram and Discord, allowing you to easily link or unlink messaging platforms on the fly.
* **Seamless Google Workspace Connect**: Natively integrates with Gmail, Calendar, Drive, Contacts, and Sheets via built-in OAuth.
* **Secure Secret Management**: Your API keys remain protected as environment variables, appearing only as safe `${ENV_VAR}` placeholders in your Git repository.
* **Streamlined Single-Port Architecture**: Both the configuration UI and gateway routing operate smoothly through a single port.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-railway-template | [iqbalexperience/alphaclaw](https://github.com/iqbalexperience/alphaclaw) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `WEBHOOK_TOKEN` | (secret) |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/alphaclaw)
