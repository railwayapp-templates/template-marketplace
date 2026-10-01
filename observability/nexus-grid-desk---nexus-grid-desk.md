# Deploy nexus-grid-desk on Railway

Paper-only trading desk with durable history. No live orders.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nexus-grid-desk)

## About

Nexus Grid Desk is a paper operator desk for retail traders — status, market, engine, and controls in one Railway service. It has no live order execution path. It does not promise profitable trading.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nexus-grid-desk)

Published listing: https://railway.com/deploy/nexus-grid-desk

Hosting this template runs one Railway service from the `desk/` folder of the public GitHub repo. Railway builds the Dockerfile, exposes public HTTP on port 8080, and health-checks `/api/health`. The paper loop runs in-process. The template mounts a persistent volume at `/data` for its SQLite paper journal. Railway hosting and volume storage are billable according to your Railway plan; paper trading itself needs no exchange or AI API keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nexus-grid-webapp | [cheffer0723/nexus-grid-dashboard-](https://github.com/cheffer0723/nexus-grid-dashboard-) (root: /desk) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NEXUS_STATE_DB` | /data/nexus-desk.sqlite3 |
| `NEXUS_PAPER_ONLY` | 1 |
| `NEXUS_CONTROL_PASSWORD` | (secret) |
| `NEXUS_JEV_CALLS_ENABLED` | 0 |
| `NEXUS_JEV_MAX_CALLS_PER_DAY` | 3 |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability · **Languages:** Python, JavaScript, CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nexus-grid-desk)
