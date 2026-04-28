# Deploy Vaultwarden on Railway

Alternative, self-hosted implementation of the Bitwarden password manager.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xNfnyW)

## About

Vaultwarden is a lightweight, self-hosted alternative implementation of the Bitwarden password manager server, written in Rust. It is fully compatible with all official Bitwarden clients — browser extensions, desktop apps, and mobile apps — while being far less resource-intensive than the official server.

Vaultwarden implements the full Bitwarden Server API as a single Rust binary served via Docker. This Railway template deploys the official image with a persistent volume at `/data` for storing the encrypted vault database, attachments, and configuration. The admin panel is protected by a token set at deploy time. Railway handles HTTPS at the platform level — set `DOMAIN` to your Railway public URL (or custom domain) so Vaultwarden can generate correct URLs for client sync, attachments, and the admin panel. The first user to register becomes the vault owner; you can disable further registrations via the admin panel after your initial setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vaultwarden | `vaultwarden/server:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `ADMIN_TOKEN` | (secret) |
| `ROCKET_PORT` | 8000 |

## Configuration

- **Start command:** `./start.sh`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/xNfnyW)
