# Deploy traefik-tailscale on Railway

Deploy Traefik + Tailscale with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/empathetic-serenity)

## About

This template is a lightweight, containerized networking stack that combines **Tailscale** and **Traefik** to expose your Railway-hosted services securely over your Tailnet. It enables encrypted remote access, automatic TLS via Tailscale certificates, and a unified reverse-proxy layer without needing public internet ingress.

Hosting **this template** on Railway provides an elegant way to manage secure, private entrypoints for your applications. This template deploys a Tailscale node with kernel-level networking and a Traefik sidecar container sharing the same network namespace. Together, they provide Tailnet ingress, dynamic routing, automatic TLS certificates, and domain mapping from custom subdomains to Tailscale service endpoints. With persistent storage for Tailscale state and Traefik configuration, the setup can run continuously and automatically reconnect to your Tailnet after restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ts-traefik | `tailscale/tailscale:latest` | Database |
| traefik | `traefik:v3.6` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TS_AUTHKEY` | tskey-auth-your-actual-key |
| `TS_STATE_DIR` | /var/lib/tailscale |
| `TS_USERSPACE` | false |

## Configuration

- **Volume:** `/var/lib/tailscale`
- **Volume:** `/etc/traefik`

**Category:** Starters

[View on Railway →](https://railway.com/template/empathetic-serenity)
