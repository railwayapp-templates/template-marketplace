# Deploy Command on Railway

Self-hosted server for the Command planner app (REST + MCP over SQLite)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/command)

## About

Command is a self-hosted server for the Command planner app: notes, calendar, goals and delegation, served as a REST API for the iOS app and an MCP server for AI agents, all over a single SQLite database.

This template runs the official `ghcr.io/legitimate-apps/command-server` image as one service with a persistent volume at `/data` (the SQLite database and self-generated server secrets live there) and a public HTTPS Railway domain. No configuration is required: press Deploy, wait for the service to turn green, then copy the service's `https://…up.railway.app` domain into the Command app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| command | `ghcr.io/legitimate-apps/command-server:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port the server listens on (the public domain targets it). Leave as is. |
| `COMMAND_AI_API_KEY` | (secret) | Optional OpenRouter API key for the in-app assistant |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/command)
