# Deploy Hermes Agent on Railway

1-click deploy AI agent that works — Telegram, Discord, Slack & more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-2)

## About

Hermes Agent is an autonomous AI agent by [Nous Research](https://nousresearch.com/) that lives on your server, connects to your messaging channels (Telegram, Discord, Slack, etc.), and gets more capable the longer it runs. It functions as a persistent backend service that interacts entirely through these messaging platforms.

![](http://raw.githubusercontent.com/codestorm-official/hermes-agent/main/img/hermes-banner.png)

Hosting Hermes Agent on Railway involves deploying a containerized environment that manages both an Admin Dashboard and the Hermes gateway subprocess. The architecture requires a persistent Railway volume mounted at `/data` to store configurations, session histories, and user pairing data. This template simplifies the process by providing a web-based UI to manage providers, channels, and live logs, eliminating the need for manual configuration file editing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | [codestorm-official/hermes-agent](https://github.com/codestorm-official/hermes-agent) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent-2)
