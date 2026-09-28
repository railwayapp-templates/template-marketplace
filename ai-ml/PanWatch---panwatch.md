# Deploy PanWatch on Railway

AI stock monitoring dashboard with alerts and paper trading

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/panwatch)

## About

PanWatch is a self-hosted stock monitoring and research workspace with a responsive web dashboard. It combines watchlists, market data, technical analysis, price alerts, portfolio tracking, paper trading, AI-assisted research, scheduled agents, and notifications in one application. Persistent storage keeps user settings, credentials, watchlists, and historical application data available across restarts.

Railway runs the pinned PanWatch Docker image as a single HTTP service with an automatically generated public domain. A Railway volume persists application data across redeployments and restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| panwatch | `sunxiao0721/panwatch:0.14.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Asia/Shanghai |
| `PORT` | 8000 |
| `DATA_DIR` | /app/data |
| `LOG_LEVEL` | INFO |
| `JWT_SECRET` | (secret) |
| `AUTH_PASSWORD` | (secret) |
| `AUTH_USERNAME` | (secret) |
| `PLAYWRIGHT_SKIP_BROWSER_INSTALL` | 1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/panwatch)
