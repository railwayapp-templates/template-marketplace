# Deploy pilotdeck on Railway

Open-source AI Agent operating system for task-oriented productivity

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pilotdeck)

## About

PilotDeck is an open-source AI Agent operating system that runs as a containerized application. Railway provides a simple, one-click deployment option for PilotDeck with persistent storage for agent workspaces, configuration, and memory. The service runs two cooperating Node.js processes: a gateway for agent runtime and a UI server for web access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pilotdeck | `xiaosong233/pilotdeck-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3001 |
| `NODE_ENV` | production |
| `PILOT_HOME` | /root/.pilotdeck |
| `SERVER_PORT` | 3001 |
| `PILOTDECK_MODEL` | openrouter/deepseek/deepseek-v4-flash |
| `PILOTDECK_API_KEY` | (secret) |
| `PILOTDECK_API_URL` | https://openrouter.ai/api/v1 |
| `PILOTDECK_LIGHT_MODEL` | openrouter/qwen/qwen3-8b |
| `PILOTDECK_GATEWAY_PORT` | 18789 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/pilotdeck)
