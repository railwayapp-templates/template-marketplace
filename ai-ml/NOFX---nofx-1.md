# Deploy NOFX on Railway

AI trading terminal for stocks, forex, crypto, and commodities.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nofx-1)

## About

NOFX is an open-source AI trading terminal assistant for US stocks, commodities, forex, and crypto. It combines a Go backend with a modern web frontend, offering real-time market analysis, AI-powered trade insights, and secure API key management — all self-hosted.

Hosting NOFX involves running a single all-in-one container that bundles the Go backend and nginx-served frontend. The backend handles market data, AI inference, and user authentication, while nginx proxies the frontend and API on a single public port. NOFX uses SQLite by default for storage, requiring a persistent volume mounted at `/app/data` to survive redeployments. Encryption keys and JWT secrets are auto-generated at startup if not provided, making initial deployment straightforward with minimal configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nofx-railway-template | [Amritasha/nofx-railway-template](https://github.com/Amritasha/nofx-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JWT_SECRET` | (secret) | Enter JWT SECRET |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nofx-1)
