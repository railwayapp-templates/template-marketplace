# Deploy tick-stock-panel on Railway

A-share stock monitoring, backtesting, and AI analysis dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tick-stock-panel)

## About

Tick Stock Panel is a self-hosted A-share quantitative workspace for stock screening, market monitoring, technical indicators, backtesting, watchlists, and optional AI-assisted analysis. It combines a FastAPI backend with a React dashboard, persists user data locally, and supports configurable data providers including TickFlow for research workflows.

Railway runs the maintained multi-architecture GHCR container as a single HTTP service. Railway supplies TLS, public networking, deployment automation, secret generation, and restart handling without requiring users to manage servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tick-stock-panel | `ghcr.io/shy3130/tick-stock-panel:v0.2.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 3018 |
| `AI_MODEL` | deepseek-chat |
| `DATA_DIR` | /app/data |
| `LOG_LEVEL` | INFO |
| `AI_API_KEY` | (secret) |
| `AI_BASE_URL` | https://api.deepseek.com/v1 |
| `AI_PROVIDER` | openai_compat |
| `AUTH_PASSWORD` | (secret) |
| `TICKFLOW_API_KEY` | (secret) |
| `AI_DAILY_TOKEN_BUDGET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/tick-stock-panel)
