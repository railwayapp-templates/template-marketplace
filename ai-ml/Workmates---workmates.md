# Deploy Workmates on Railway

Deploy and host Workmates AI agents with desktop and mobile access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/workmates)

## About

Workmates gives you a persistent workspace where multiple AI agents can work independently or collaborate as a team. Agents can have their own roles, skills, tools, projects, and conversations while sharing rooms for coordinated work.

This Railway template runs the Workmates server and web application as a single cloud-hosted workspace that you can access from a browser, mobile device, or the Workmates desktop app.

Running Workmates on Railway turns the normally local workspace into an always-available cloud environment.

The deployment includes the Workmates API server and web/PWA interface, with persistent storage mounted at `/data`. Agents, conversations, installed skills, workflows, configuration, uploaded files, and activity records remain available across restarts and redeployments.

Railway also provides the public HTTPS endpoint used by Workmates clients. Access to the workspace is protected by `WORKMATES_SERVER_TOKEN`.

After deployment, open the generated Railway domain, authenticate with the server token, and connect an AI provider such as OpenRouter, Centra, or another supported Workmates engine.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Workmates | `paxeer/workmates-ai:1.0.0-cloud.20260913` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `WORKMATES_HOSTED` | 1 |
| `WORKMATES_DATA_DIR` | /data/workspace |
| `WORKMATES_STATIC_DIR` | /app/dist |
| `WORKMATES_SERVER_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/workmates)
