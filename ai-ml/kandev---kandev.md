# Deploy kandev on Railway

Coordinate AI coding workflows from a secure, persistent web UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kandev)

## About

Run Kandev's control plane, web UI, API, WebSocket gateway, and MCP endpoint from its official container on Railway's managed HTTPS infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kandev | `ghcr.io/kdlbs/kandev:0.86.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 38429 |
| `KANDEV_FEATURES_AUTH` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kandev)
