# Deploy Workmates on Railway

Deploy and host Workmates AI agents with desktop and mobile access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/workmates)

## About

[What is Workmates? Your description in roughly ~50 words.]

[Roughly 100 word description what's involved in hosting/deploying Workmates]

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Workmates | `paxeer/workmates-ai:1.0.0-cloud.20260913` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WORKMATES_SERVER_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/workmates)
