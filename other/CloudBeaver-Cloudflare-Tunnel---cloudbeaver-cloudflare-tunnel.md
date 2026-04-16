# Deploy CloudBeaver + Cloudflare Tunnel on Railway

A web-based tool for managing SQL, NoSQL, and cloud databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudbeaver-cloudflare-tunnel)

## About

CloudBeaver + Cloudflare Tunnel is a secure, browser-based database management setup. CloudBeaver provides a collaborative web UI for managing SQL, NoSQL, and cloud databases, while Cloudflare Tunnel exposes it safely to the internet without opening ports or managing complex networking.

Hosting CloudBeaver with Cloudflare Tunnel involves deploying the CloudBeaver web application alongside a Cloudflare Tunnel client that securely routes traffic from the public internet to your private service. Instead of exposing ports or configuring firewalls, the tunnel creates an outbound connection to Cloudflare, providing secure access via a public URL. On Railway, this setup typically includes configuring environment variables, running both services in containers or a single service, and ensuring persistent storage for CloudBeaver workspace data. This approach simplifies secure remote database access for teams.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CloudBeaver | `dbeaver/cloudbeaver` | Database |
| Cloudflare Tunnel | `cloudflare/cloudflared` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | CloudBeaver | 8978 | - |
| `TUNNEL_TOKEN` | Cloudflare Tunnel | (secret) | Your Cloudflare Tunnel token |

## Configuration

- **Volume:** `/opt/cloudbeaver/workspace`
- **Start command:** `cloudflared tunnel --no-autoupdate run`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cloudbeaver-cloudflare-tunnel)
