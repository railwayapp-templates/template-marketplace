# Deploy CLIProxyAPI — Daily Auto-Update on Railway

CLIProxyAPI gateway with verified daily updates and automatic rollback.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cliproxyapi-secure-release-tracked)

## About

CLIProxyAPI is an open-source proxy that lets you connect your own AI provider accounts and use them through a standard, compatible API. This template runs it on Railway and keeps it up to date for you.

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

**Category:** AI/ML · **Languages:** Go, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cliproxyapi-secure-release-tracked)
