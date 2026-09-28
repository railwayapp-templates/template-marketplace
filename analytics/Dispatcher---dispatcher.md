# Deploy Dispatcher on Railway

Earnings, deploys and health dashboard for your Railway templates

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dispatcher)

## About

Dispatcher is a self-hosted dashboard for people who publish Railway templates. It signs in with your Railway account, snapshots your template earnings and deployment counts on a schedule, charts payouts, projects and active deploys over time, notifies you when a template's health drops or a payout is requested, and can withdraw your kickback balance to your payout account every day. Railway's own metrics page shows aggregates; Dispatcher keeps the history.

Dispatcher is one Go binary with the React frontend and a DuckDB database embedded, so the template is a single service with a volume at `/data` for the database file. Login is Railway OAuth: on first start Dispatcher registers an OAuth client, and `CALLBACK_URL` is set to the service's public domain followed by `/api/auth/callback` so the redirect lands back on your instance. There is no separate user database; Railway remains the only authority on who you are, and losing access to the workspace ends the session.

The health check on `/api/health` keeps traffic off a deploy until it is ready. Background collection, auto-withdraw and notifications assume a single process, so keep the service at one replica.

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

**Category:** Analytics · **Languages:** Go, TypeScript, CSS, Shell, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/dispatcher)
