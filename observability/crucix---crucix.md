# Deploy crucix on Railway

Crucix is a self-hosted OSINT intelligence terminal

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/crucix)

## About

[Crucix](https://github.com/calesthio/Crucix) is an open-source intelligence dashboard that combines macro, conflict, weather, transport, satellite, and social signals into one live interface. The app is a single Node.js service (`server.mjs`) with Server-Sent Events for real-time updates and a health endpoint at `/api/health`.

For Railway, the simplest setup is one service deployed from the upstream GitHub repository (`master` branch) using the included Dockerfile. Crucix works with zero API keys, then progressively improves as you add provider credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| crucix | `xiaosong233/crucix:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3117 |
| `EIA_API_KEY` | (secret) |
| `LLM_API_KEY` | (secret) |
| `FRED_API_KEY` | (secret) |
| `ACLED_PASSWORD` | (secret) |
| `AISSTREAM_API_KEY` | (secret) |
| `DISCORD_BOT_TOKEN` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |
| `REFRESH_INTERVAL_MINUTES` | 15 |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/template/crucix)
