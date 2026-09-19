# Deploy Octop on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/octop-1)

## About

Octop is a self-hosted, multi-user AI assistant platform. One process serves a
web dashboard, a CLI, IM channels (Feishu, DingTalk, QQ, Discord, WeCom), and
cron automation, all sharing one control-plane database. Each user gets a team
of specialized agents with their own workspaces, providers, and schedules.

Octop is designed as a single, restart-safe process: FastAPI + uvicorn serving
the API and React dashboard, an agent runtime, a scheduler, and channel bridges,
with state rebuilt from the database on every boot. The default database is
SQLite on a mounted volume, so the whole deployment is one service plus one
volume. PostgreSQL is supported upstream but not required.

On Railway, the volume holds the database, agent workspaces, uploads, and the
credential file, so redeploys keep every conversation and setting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| octop | `ghcr.io/hmseeb/octop-railway:1.0.0-r2` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOME` | /data/octop | - |
| `PORT` | 8088 | - |
| `OCTOP_PORT` | 8088 | - |
| `OPENAI_API_KEY` | (secret) | Optional. Any OpenAI-compatible key gets you chatting; more providers can be added in the dashboard. |
| `OCTOP_BIND_HOST` | :: | - |
| `OCTOP_ADMIN_USERNAME` | (secret) | Username of the admin account created on first boot. |
| `OCTOP_DEFAULT_PASSWORD` | (secret) | Password of the admin account created on first boot. Change it after logging in. |

## Configuration

- **Start command:** `/usr/local/bin/docker-entrypoint.sh`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/octop`

**Category:** Other

[View on Railway →](https://railway.com/deploy/octop-1)
