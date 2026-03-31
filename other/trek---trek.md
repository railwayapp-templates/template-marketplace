# Deploy trek on Railway

travel planner with live collaboration, maps, and budgets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trek)

## About

TREK is a self-hosted collaborative travel planner. Railway runs the official Docker image with managed networking and simple environment configuration, so you can launch quickly without managing servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trek | `mauriceboe/trek:2.7.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NODE_ENV` | production |
| `DEMO_MODE` | false |
| `JWT_SECRET` | (secret) |
| `FORCE_HTTPS` | false |
| `TRUST_PROXY` | 1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/trek)
