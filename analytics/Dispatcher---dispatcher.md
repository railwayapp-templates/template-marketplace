# Deploy Dispatcher on Railway

Dispatcher is a simple but powerful dashboard for your Railway templates

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dispatcher)

## About

Dispatcher is a self-hosted analytics dashboard for Railway template publishers. It signs into your Railway workspace, snapshots your template earnings on a schedule, and charts payouts, projects, and active deploys over time. It can also automatically withdraw your kickback balance to your payout account every day.

Dispatcher ships as a single Go binary with the React frontend and DuckDB database embedded, so hosting it means running exactly one service, no separate database or frontend to manage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dispatcher | [ThallesP/dispatcher](https://github.com/ThallesP/dispatcher) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DB_PATH` | /data/dispatcher.duckdb |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics · **Languages:** TypeScript, Go, CSS, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/dispatcher)
