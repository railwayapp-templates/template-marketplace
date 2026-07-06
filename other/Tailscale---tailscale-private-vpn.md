# Deploy Tailscale on Railway

[Jul'26] Self-hosted VPN for private apps, servers, and internal tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailscale-private-vpn)

## About

Tailscale is a secure mesh VPN that makes private networking simple. It lets you connect apps, servers, internal tools, and private services without exposing everything directly to the public internet. This template helps you deploy a self-hosted Tailscale node quickly with private network access support.

Hosting Tailscale allows you to create a secure private access layer for your infrastructure. Instead of relying only on public URLs, open ports, or complex VPN setup, Tailscale gives you encrypted connectivity between trusted devices and services.

This template is designed for users who want a simple Tailscale deployment that can be used as part of a private network setup. It is useful for accessing internal tools, connecting remote environments, or preparing an exit node for routing traffic through your Tailscale network.

Before deploying, you only need to provide your Tailscale auth key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tailscale-vpn | [codestorm-official/tailscale-vpn](https://github.com/codestorm-official/tailscale-vpn) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TAILSCALE_VERSION` | 1.98.4 |
| `TAILSCALE_HOSTNAME` | tailscale-app |
| `TAILSCALE_ADDITIONAL_ARGS` | --advertise-exit-node |

## Configuration

- **Volume:** `/var/lib/tailscale`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tailscale-private-vpn)
