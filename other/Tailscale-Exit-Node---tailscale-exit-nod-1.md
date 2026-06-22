# Deploy Tailscale Exit Node on Railway

Docker Image Tailscale Exit Node, no GitHub dependency.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailscale-exit-nod-1)

## About

A Tailscale Exit Node allows you to route all your internet traffic through a designated machine in your tailnet. It gives you a secure, private egress IP without relying on commercial VPN providers.

This template deploys the official Tailscale Docker image on Railway configured as an exit node. It joins your Tailscale network using an auth key, advertises itself as an exit node, and persists its state using a Railway volume. 

Once deployed, you simply approve the machine in the Tailscale admin console and enable it as an exit node. Railway handles the underlying infrastructure, keeping your node always-on with minimal maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tailscale Exit Node | `tailscale/tailscale:stable` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TS_AUTHKEY` | - | Tailscale authentication key used to join your tailnet. Generate one in the Tailscale admin console (Settings → Keys). Use a reusable or ephemeral (single-use) key. |
| `TS_HOSTNAME` | - | Custom hostname for this node in your Tailscale network. Helpful for identifying the Railway exit node. |
| `TS_STATE_DIR` | /var/lib/tailscale | Directory inside the container where Tailscale stores its state (auth, keys, etc.). Mount a Railway Volume here so the node stays authenticated after restarts. |
| `TS_EXTRA_ARGS` | --advertise-exit-node | Extra flags passed to tailscale up. Use this to make the node an exit node, enable SSH, advertise routes, etc. |
| `TS_ACCEPT_ROUTES` | true | Whether this node should accept routes (including exit nodes and subnet routes) advertised by other machines in your tailnet. |

## Configuration

- **Start command:** `/usr/local/bin/containerboot`
- **Volume:** `/var/lib/tailscale`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tailscale-exit-nod-1)
