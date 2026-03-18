# Deploy Headscale on Railway

Self-hosted Tailscale control server — your own WireGuard mesh VPN

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/headscale)

## About

Headscale is an open-source, self-hosted implementation of the Tailscale control server. It lets you create your own WireGuard-based mesh VPN using standard Tailscale clients, without routing coordination through Tailscale's hosted infrastructure.

Hosting Headscale requires a publicly accessible server with persistent storage for the SQLite database and encryption keys. This template handles that automatically — it deploys Headscale with a persistent volume at /var/lib/headscale, auto-detects the server URL from your Railway domain, and runs behind Railway's TLS termination. The server listens on port 8080 for the HTTP API and uses the standard Tailscale DERP relay network for NAT traversal. No external databases or dependencies are needed. Once deployed, you create users and auth keys via the CLI, then point any Tailscale client at your Railway domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| headscale | [Sokanon/railway-headscale](https://github.com/Sokanon/railway-headscale) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP Server Port |

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/headscale)
