# Deploy agentsforus-hermes-template on Railway

Run your AI agents on a machine in the cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentsforus-hermes-1)

## About

Your own AI assistant that runs 24/7 in the cloud and talks to you over Telegram — always on, always yours, even when your laptop is closed.

This template deploys a personal AI agent to Railway's cloud so it never goes offline. Once set up, you message it on Telegram from any phone or computer, any
time of day. A simple web dashboard walks you through connecting your AI model and Telegram bot — no command line, no code. Your agent's memory, skills, and
settings are automatically backed up to a private GitHub repo every hour, so nothing is lost if anything goes wrong. If your agent ever crashes, it restarts
itself. You just keep chatting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent-template | [pgill/hermes-agent-template](https://github.com/pgill/hermes-agent-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ADMIN_PASSWORD` | (secret) |
| `BACKUP_GITHUB_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** Python, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/agentsforus-hermes-1)
