# Deploy public-tunnel on Railway

Make public TCP port use Tailscale and Socat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/public-tunnel)

## About

public-tunnel is a simple TCP tunneling service that allows you to expose a private TCP service to the public internet without opening inbound ports on the source machine. It works by forwarding traffic through a cloud-hosted tunnel endpoint.

Hosting public-tunnel on Railway allows you to create a publicly accessible TCP endpoint that forwards traffic to a private target service. Railway provides the public TCP proxy, while public-tunnel handles the connection to the target. This setup is useful for accessing services behind NAT, firewalls, or CGNAT without modifying network infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| thuonghai2711/publictunnel | `thuonghai2711/publictunnel` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TOKEN` | (secret) | Tailscale auth token |
| `TARGET` | - | Tailscale TCP ip:port |

## Configuration

- **TCP Proxies:** 2711

**Category:** Other

[View on Railway →](https://railway.com/template/public-tunnel)
