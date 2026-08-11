# Deploy vizier on Railway

The one agent-first platform for your entire business stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vizier)

## About

Vizier is a self-hosted, agent-first platform for building internal software end to end. Collections with typed fields, validation and per-role access; JavaScript functions; server-rendered pages; document templates; scheduled jobs; email and messaging integrations — one binary, one admin UI, and an MCP endpoint so AI agents can build and operate it directly.

Vizier ships as a single container with no external services to run. Deployment is one service plus a persistent volume mounted where the data lives. You set a public URL and an auth secret, and open the app: the first run walks you through creating the admin account and company profile. Because state is a file on disk, run a single replica and scale vertically; automatic off-site backups to any S3-compatible bucket are built in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| junkiez/vizier:latest | `ghcr.io/junkiez/vizier:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_SECRET` | (secret) | Secret used for encryption |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/vizier)
