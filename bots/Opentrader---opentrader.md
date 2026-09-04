# Deploy Opentrader on Railway

Self-hosted crypto trading bot: DCA, Grid & RSI bots with web UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opentrader)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/opentrader)

OpenTrader is a self-hosted cryptocurrency trading bot with built-in DCA, Grid, and RSI strategies, a polished web UI, and support for 100+ exchanges via CCXT. This template builds the bot from source (pinned to `v1.0.0-beta.29`), runs database migrations on boot, and serves the web UI on a single port.

After deploying, open your service URL and log in with:

- **Email:** `onboarding@opentrader.pro`
- **Password:** the value you set for `ADMIN_PASSWORD`

The template runs a single service that bundles the trading engine, the tRPC API server, and the web frontend. State is stored in an embedded SQLite database at `/app/data/opentrader.db`, persisted on a Railway volume — no external database service is required.

Key environment variables:

- `ADMIN_PASSWORD` (required) — UI login password. Auto-generated per deployment via `${{secret(16)}}`; log in with email `onboarding@opentrader.pro` and this generated value (visible in the service's Variables tab).
- `DATABASE_URL` — SQLite file path, wired to the persistent volume via `file:${{RAILWAY_VOLUME_MOUNT_PATH}}/opentrader.db`

`PORT` (4000) and `HOST` (0.0.0.0) are pinned in the image — no configuration needed. Exchange API keys are **not** stored in environment variables. You add exchange accounts (OKX, BYBIT, BITGET, BINANCE, KRAKEN, COINBASE, GATEIO, and more via CCXT) inside the web UI after login, and they are stored encrypted in the SQLite database on your own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opentrader | [INAPP-Mobile/opentrader](https://github.com/INAPP-Mobile/opentrader) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATABASE_URL` | - | SQLite database location on the persistent /app/data volume, via the RAILWAY_VOLUME_MOUNT_PATH reference. Change only if you know what you are doing. |
| `ADMIN_PASSWORD` | (secret) | REQUIRED. Password to log into the OpenTrader UI (email: onboarding@opentrader.pro). Auto-generated per deployment — copy the generated value from the service's Variables tab after deploy. Change it to your own to keep logins stable across redeploys. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Bots · **Languages:** TypeScript, JavaScript, Dockerfile, Shell, HTML

[View on Railway →](https://railway.com/deploy/opentrader)
