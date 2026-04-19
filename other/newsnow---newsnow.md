# Deploy newsnow on Railway

Elegant real-time news dashboard with optional GitHub sync

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/newsnow)

## About

NewsNow runs cleanly on Railway as a single Docker image service, giving you one-click deployment and instant browser access to a real-time news dashboard. Railway handles public networking and runtime env management while upstream image defaults stay intact.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/ourongxing/newsnow:v0.0.39` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 4444 |
| `NODE_ENV` | production |
| `INIT_TABLE` | true |
| `JWT_SECRET` | (secret) |
| `ENABLE_CACHE` | true |
| `G_CLIENT_SECRET` | (secret) |
| `PRODUCTHUNT_API_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/newsnow)
