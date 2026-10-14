# Deploy opencode-manager on Railway

Deploy and Host OpenCode Manager on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-manager)

## About

Deploy OpenCode Manager on Railway in minutes using the published upstream image.

OpenCode Manager runs as a single container from `ghcr.io/chriswritescode-dev/opencode-manager:latest` on port `5003`. Railway provisions the service, public domain, and a persistent volume for `/app/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode-manager | `ghcr.io/chriswritescode-dev/opencode-manager:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AUTH_SECRET` | (secret) |
| `ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/opencode-manager)
