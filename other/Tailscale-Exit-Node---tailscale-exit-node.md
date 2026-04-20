# Deploy Tailscale Exit Node on Railway

A bare-bones simple Tailscale exit node deployment.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailscale-exit-node)

## About

Tailscale Exit Node is a feature of Tailscale's WireGuard-based VPN that routes all your device's internet traffic through a designated node in your tailnet. It acts as a secure, private gateway, giving you full control over your egress IP without relying on third-party VPN providers.

Hosting a Tailscale Exit Node on Railway involves running a lightweight container that joins your Tailscale network and advertises itself as an exit node. The service authenticates via an auth key, enables IP forwarding, and handles traffic routing through Railway's infrastructure. Railway's persistent networking and always-on deployment model make it a reliable host for an exit node that your devices can connect to at any time. Configuration is minimal, typically just a Tailscale auth key and a few environment variables and Railway handles the underlying compute and uptime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tailscale-exit-node | [jacobhutchings/tailscale-exit-node](https://github.com/jacobhutchings/tailscale-exit-node) | Database |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `TS_AUTHKEY` | Tailscale Auth Key |

## Configuration

- **Volume:** `/var/lib/tailscale`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tailscale-exit-node)
