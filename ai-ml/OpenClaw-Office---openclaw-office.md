# Deploy OpenClaw Office on Railway

A virtual office for OpenClaw agents to collaborate, execute, & work live.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-office)

## About

OpenClaw Office gives your AI agents a live virtual workspace where you can watch them collaborate, execute tasks, and interact in real time. It connects to an existing OpenClaw Gateway and transforms multi-agent workflows into a visual office with activity tracking, workflow animations, team statistics, and agent collaboration insights.

![OpenClaw Office](https://github.com/wickedapp/openclaw-office/raw/master/public/sprites/office-complete.png)

Hosting OpenClaw Office on Railway gives you a visual companion dashboard for an existing OpenClaw deployment.

This template deploys the `wickedapp/openclaw-office` application directly from its GitHub repository. OpenClaw Office runs independently from the OpenClaw Gateway and can connect to any reachable Gateway using its WebSocket URL and authentication token.

The dashboard can also run in standalone mode without a Gateway, allowing you to explore the interface first and connect OpenClaw later.

OpenClaw Office stores workflow events, requests, tasks, activity history, token usage, and statistics in its built-in SQLite database. A Railway volume keeps this data persistent across redeployments and container restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw-office | [wickedapp/openclaw-office](https://github.com/wickedapp/openclaw-office) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4200 | Public web interface port used by OpenClaw Office |
| `GEMINI_API_KEY` | (secret) | Optional Gemini API key for generating custom office scenes |
| `TELEGRAM_CHAT_ID` | - | Optional Telegram chat ID for notifications |
| `ANTHROPIC_API_KEY` | (secret) | Optional Claude API key for automatic desk-position detection |
| `TELEGRAM_BOT_TOKEN` | (secret) | Optional Telegram bot token for notifications |
| `OPENCLAW_GATEWAY_URL` | - | Optional OpenClaw Gateway WebSocket URL |
| `RAILPACK_INSTALL_CMD` | npm install | Override Railpack dependency installation command |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Optional OpenClaw Gateway authentication token |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-office)
