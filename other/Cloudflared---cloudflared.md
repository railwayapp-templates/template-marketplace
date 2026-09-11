# Deploy Cloudflared on Railway

A lightweight Cloudflare Tunnel connector for securely exposing services.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudflared)

## About

Cloudflare Tunnel (`cloudflared`) provides a secure outbound connection between Railway services and Cloudflare's global network without exposing the origin service directly to the public internet.

This template deploys the official Cloudflare `cloudflared` container as a lightweight, remotely managed Tunnel connector.

This template runs the official `cloudflare/cloudflared` Docker image on Railway.

Unlike a traditional reverse proxy, Cloudflare Tunnel does not require an inbound public port. The `cloudflared` connector establishes an outbound encrypted connection from Railway to Cloudflare, allowing traffic from a configured hostname to reach services through the tunnel.

Tunnel configuration, public hostnames, and routing are managed remotely from Cloudflare. A Cloudflare Tunnel token is required to connect the Railway deployment to an existing tunnel.

Because the connector is stateless, no database, Redis instance, or persistent volume is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudflared | `cloudflare/cloudflared:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TUNNEL_TOKEN` | (secret) | Cloudflare remotely-managed Tunnel token |
| `TUNNEL_LOGLEVEL` | info | Logging level: debug, info, warn, error, fatal |
| `TUNNEL_TRANSPORT_PROTOCOL` | auto | Tunnel transport: auto, quic, or http2 |

## Configuration

- **Start command:** `tunnel --no-autoupdate run`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cloudflared)
