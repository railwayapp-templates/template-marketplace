# Deploy nakama on Railway

It's like Hermes Agent & OpenClaw but designed to work nicely with teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nakama)

## About

Nakama is a multi-tenant AI agent platform for teams. It combines a browser-based chat workspace with configurable agent identities, tools, skills, memory, automations, and messaging channels. A single container provides the dashboard, API, and workers, giving teams a practical way to operate capable agents while retaining human control and organizational isolation.

Railway runs Nakama from its pinned upstream GHCR image as one HTTP service. The platform supplies a public domain, routes traffic to port 4310, and manages container restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nakama | `ghcr.io/ahmadrosid/nakama:0.4.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4310 |
| `NAKAMA_HOST` | 0.0.0.0 |
| `NAKAMA_PORT` | 4310 |
| `DATABASE_URL` | file:/nakama/data/sqlite/nakama.sqlite |
| `NAKAMA_CONFIG_DIR` | /nakama/data |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/nakama/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nakama)
