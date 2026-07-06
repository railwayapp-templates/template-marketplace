# Deploy Hermes Agent — Fresh Dashboard on Railway

[Jul'26] 1-click deploy AI agent that works — Telegram, Discord & Slack 🤖

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-2)

## About

Hermes Agent is an autonomous AI agent by [Nous Research](https://nousresearch.com/)
that runs continuously on your server and communicates through messaging channels
such as Telegram, Discord, Slack, Email, Mattermost, Matrix, and WhatsApp.

This Railway template includes a custom administration dashboard focused on a
simple setup and operational workflow.

![](https://raw.githubusercontent.com/codestorm-official/hermes-agent/main/img/hermes-banner.png)

The deployment runs two components in one Railway container:

* A Starlette-based Admin Dashboard exposed through Railway's public domain.
* The Hermes gateway, managed by the dashboard as a subprocess.

A persistent Railway Volume mounted at `/data` stores:

* Provider API keys and channel credentials.
* Hermes configuration.
* Sessions and memories.
* Skills and workspace data.
* Pairing requests and approved users.

The dashboard updates `config.yaml` non-destructively, preserving unrelated
Hermes settings that may have been added outside the dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | [codestorm-official/hermes-agent](https://github.com/codestorm-official/hermes-agent) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent-2)
