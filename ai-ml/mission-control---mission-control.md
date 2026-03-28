# Deploy mission-control on Railway

Mission Control is an AI agent orchestration dashboard with task management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mission-control)

## About

Mission Control is designed for self-hosted deployment. Railway provides a zero-infrastructure-management platform that runs the official Docker image directly from GHCR, making it the simplest path to a production-ready instance without managing servers, networking, or container orchestration manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mission-control | `ghcr.io/builderz-labs/mission-control:v2.0.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `API_KEY` | (secret) |
| `AUTH_PASS` | eyVcrAvUkN16Hnqv3a6l8mxx |
| `AUTH_USER` | (secret) |
| `AUTH_SECRET` | (secret) |
| `MC_ALLOW_ANY_HOST` | true |
| `NEXT_PUBLIC_GATEWAY_OPTIONAL` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mission-control)
