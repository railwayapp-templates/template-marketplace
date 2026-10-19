# Deploy CLI Proxy API (Self-Hosted) on Railway

Self-host CLIProxyAPI with persistent accounts and sticky sessions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cliproxyapi-self-hosted)

## About

CLI Proxy API connects Claude Code, Codex, and other supported provider accounts to compatible API endpoints. This template includes persistent storage, generated access keys, and a web interface for managing accounts.

The template deploys one service with an HTTPS domain and a persistent `/data` volume. Configuration and accounts survive redeployments. Session affinity keeps conversations on the same account, with automatic failover when another eligible account is available.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CLI Proxy API | `ghcr.io/hosmelq/railway-cliproxyapi-template:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | IANA time zone for the service, such as UTC or America/Managua. |
| `PORT` | 8317 | Listening port for CLI Proxy API and Railway health checks. Keep this at 8317 unless you also update the saved server configuration and domain target port. |
| `CLIPROXY_API_KEY` | (secret) | Generated client key, applied only when /data/config.yaml is first created. Copy it into your client. After first boot, save key changes in Management Center and restart the service; this variable does not overwrite saved keys. |
| `MANAGEMENT_PASSWORD` | (secret) | Generated administrator key for /management.html and /v8/management. Keep it separate from client keys. To rotate it, change this variable and redeploy. It must contain at least 32 characters. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/cliproxyapi-self-hosted)
