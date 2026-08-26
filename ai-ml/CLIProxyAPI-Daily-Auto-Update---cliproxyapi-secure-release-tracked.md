# Deploy CLIProxyAPI — Daily Auto-Update on Railway

CLIProxyAPI gateway with verified daily updates and automatic rollback.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cliproxyapi-secure-release-tracked)

## About

CLIProxyAPI is an open-source compatibility gateway for connecting authorized
provider accounts and exposing compatible model APIs. This template packages
it as a secure, persistent, release-tracked Railway service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cliproxyapi | [l4time/railway-cliproxyapi-template](https://github.com/l4time/railway-cliproxyapi-template) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `CLIPROXY_PROXY_KEY` | Generated client API key for proxy requests. |
| `CLIPROXY_MANAGEMENT_KEY` | Generated management API key; keep private. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, Shell, Go, Dockerfile

[View on Railway →](https://railway.com/deploy/cliproxyapi-secure-release-tracked)
