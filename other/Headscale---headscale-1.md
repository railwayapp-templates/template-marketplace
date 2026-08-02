# Deploy Headscale on Railway

Self-hosted Tailscale control server with MagicDNS and DERP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/headscale-1)

## About

This template runs the official Headscale container (v0.29.3) on Railway. A lightweight entrypoint renders `config.yaml` from Railway's injected environment (`PORT`, `RAILWAY_PUBLIC_DOMAIN`) at container start. DERP relays use Tailscale's public infrastructure since Railway does not expose UDP. All state lives on a persistent volume, so nodes stay registered across restarts and redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| headscale | [INAPP-Mobile/headscale](https://github.com/INAPP-Mobile/headscale) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port Railway routes to. Railway injects this automatically. |
| `HEADSCALE_BASE_DOMAIN` | example.com | Base domain for MagicDNS hostnames (e.g. ts.yourdomain.com). Must differ from the server's public domain. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/headscale`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/headscale-1)
