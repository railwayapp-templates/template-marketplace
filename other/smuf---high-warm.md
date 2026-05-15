# Deploy smuf on Railway

smuf is a self-hosted HTTP tunnel tool — like ngrok, but yours.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/high-warm)

## About

**smuf** is a self-hosted HTTP tunnel tool — like ngrok, but yours. Deploy `smuf-server` on Railway for zero-quota, always-warm tunnels to your local services.

Hosting smuf on Railway is straightforward. The `smuf-server` binary runs in a Docker container, listening for control connections from your local client and proxying HTTP/HTTPS traffic through. Railway handles TLS, domain management, and scaling — you just set your domain and auth token. The server maintains persistent multiplexed connections via yamux, allowing multiple tunnels and concurrent requests over a single TCP link. Railway's built-in public networking maps your custom domain directly to the tunnel endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| smuf | [cosmind-rusu/smuf](https://github.com/cosmind-rusu/smuf) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SMUF_DOMAIN` | - | Your public domain. Railway sets ${{RAILWAY_PUBLIC_DOMAIN}} automatically — use a custom domain for production |
| `SMUF_HTTP_PORT` | 8080 | Public HTTP port. Railway uses this for inbound traffic — keep 8080 unless you have a specific port conflict |
| `SMUF_AUTH_TOKEN` | (secret) | Shared secret between server and client. Use ${{secret(64, "abcdef0123456789")}} to auto-generate on deploy |
| `SMUF_MAX_CONNS_PER_IP` | 10 | Maximum concurrent tunnels per client IP. Default 10 is fine for most use cases. Increase for heavy multi-tunnel setups |

**Category:** Other · **Languages:** Go, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/high-warm)
