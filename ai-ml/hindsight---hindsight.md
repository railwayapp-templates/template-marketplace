# Deploy hindsight on Railway

Long-term AI memory system with API+Control Plane in one deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hindsight)

## About

This template runs Hindsight from the official upstream GHCR container image on Railway, exposing the Control Plane publicly while keeping the internal API connected in the same container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/vectorize-io/hindsight:0.5.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9999 |
| `HINDSIGHT_CP_PORT` | 9999 |
| `HINDSIGHT_API_HOST` | 0.0.0.0 |
| `HINDSIGHT_API_PORT` | 8888 |
| `HINDSIGHT_ENABLE_CP` | true |
| `HINDSIGHT_ENABLE_API` | true |
| `HINDSIGHT_API_LLM_PROVIDER` | none |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hindsight)
