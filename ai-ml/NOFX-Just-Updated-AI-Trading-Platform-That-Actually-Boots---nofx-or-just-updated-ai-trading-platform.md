# Deploy NOFX | (Just Updated) AI Trading Platform That Actually Boots on Railway

AI trading platform that boots, is pre-claimed, and keeps its keys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nofx-or-just-updated-ai-trading-platform)

## About

NOFX is a self-hosted AI trading platform: you connect your own exchange accounts and your
own AI provider keys, describe a strategy, and let one or more AI traders analyse the market
and place orders on your behalf. It ships a React dashboard, a strategy studio, backtesting,
a decision log and a Go trading engine that runs continuously.

This template deploys it **already booted, already claimed, and with its data on a disk**.
A stock NOFX deploy on Railway does none of the three: the trading engine exits at startup
while the dashboard keeps answering, the first stranger to reach the URL can register the
owner account, and the SQLite database — which holds your exchange API keys — lives on the
container's disposable filesystem.

One container and one volume. Upstream publishes a Go backend and an nginx-served React
frontend as two images; this template merges them behind a single nginx listener, both
pinned by digest, so there is nothing to build at deploy time and no second billed service.

The backend keeps everything in SQLite under `/app/data` on the volume: users, AI traders,
strategies, decision logs, and the encrypted exchange and AI provider credentials. The two
keys that encrypt those credentials are generated once onto the same volume rather than at
every boot, which is what makes a redeploy readable to itself.

The container also supervises its own processes: if the trading engine stops, the container
stops with it and Railway restarts the deployment, instead of serving a dashboard in front of
an engine that is no longer trading.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nofx | `ghcr.io/bon5co/nofx-railway:2026.08.13` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JWT_SECRET` | (secret) |
| `NOFX_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nofx-or-just-updated-ai-trading-platform)
