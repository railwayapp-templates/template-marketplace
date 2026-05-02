# Deploy atomic on Railway

Self-hosted, semantically-connected personal knowledge base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/atomic)

## About

Atomic runs well on Railway using the upstream all-in-one container, which bundles the web UI, API server, and nginx reverse proxy in a single service for one-click browser access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/kenforthewin/atomic:1.32.4` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8081 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/atomic)
