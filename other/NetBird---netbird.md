# Deploy NetBird on Railway

Run a NetBird agent on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/netbird)

## About

NetBird is an open-source overlay network built on WireGuard. It connects your laptops, servers, and cloud services into one private network with zero-trust access control. You manage peers, groups, access policies, and routes from a web dashboard, using either NetBird Cloud or your own self-hosted management server.

This template runs a NetBird peer. It does not run the NetBird management server. Railway containers have no TUN device and no `NET_ADMIN` capability, so the template uses NetBird's official `rootless` image in netstack mode, where WireGuard and routing run entirely in userspace. You supply a setup key from your NetBird dashboard, and the template stores the peer's state on a Railway volume so the peer keeps its identity across redeploys. Set `NB_HOSTNAME` to give the peer a stable name. If you self-host NetBird, point `NB_MANAGEMENT_URL` at your server. You can also pin the image with `VERSION`. Routes into Railway's private network, or exit node traffic, are configured centrally in the NetBird dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NetBird | [jayhale/railway-netbird](https://github.com/jayhale/railway-netbird) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VERSION` | rootless-latest | Pin to a specific NetBird Docker image |
| `NB_CONFIG` | - | The path to the NetBird configuration (computed on start-up), aligned to the attached volume to persist config across restarts / deploys. |
| `NB_HOSTNAME` | - | The agent's hostname in your NetBird network |
| `NB_SETUP_KEY` | - | The agent setup key from the NetBird management server |
| `NB_STATE_DIR` | - | The path to the NetBird state directory, aligned to the attached volume to persist state across restarts / deploys. |

## Configuration

- **Volume:** `/var/lib/netbird`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/netbird)
