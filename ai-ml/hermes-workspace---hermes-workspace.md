# Deploy hermes-workspace on Railway

AI command center for Hermes: chat, files, memory,  skills, terminal

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-workspace)

## About

Hermes Workspace runs on Railway as a two-service setup: a public web UI and a private Hermes agent gateway. Railway handles image deploys, service networking, and domain provisioning.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | `xiaosong233/hermes-agent-railway:latest` | Web service |
| hermes-workspace | `xiaosong233/hermes-workspace-railway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | hermes-agent | 8642 |
| `API_SERVER_HOST` | hermes-agent | 0.0.0.0 |
| `API_SERVER_PORT` | hermes-agent | 8642 |
| `ANTHROPIC_API_KEY` | hermes-agent | (secret) |
| `API_SERVER_ENABLED` | hermes-agent | true |
| `GATEWAY_ALLOW_ALL_USERS` | hermes-agent | true |
| `PORT` | hermes-workspace | 3000 |

## Configuration

- **Start command:** `hermes gateway run`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-workspace)
