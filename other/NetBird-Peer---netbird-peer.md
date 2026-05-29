# Deploy NetBird Peer on Railway

NetBird peer in a rootless container. Provide a setup key to connect.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/netbird-peer)

## About

NetBird Peer is the client agent of NetBird, an open-source WireGuard-based mesh VPN. Once registered with a Management Service, the peer joins a private overlay network where it can communicate with other peers over encrypted point-to-point tunnels, with NAT traversal handled automatically and zero-trust access policies enforced centrally.

Hosting a NetBird Peer on Railway means running the `netbirdio/netbird` container — the `rootless` variant, since Railway containers don't grant the `NET_ADMIN` / `SYS_ADMIN` / `SYS_RESOURCE` capabilities or `/dev/net/tun` access that the standard image expects, so userspace WireGuard is the realistic path. Note that userspace WireGuard has lower throughput than kernel WireGuard. The peer authenticates to a Management Service using a setup key passed via `NB_SETUP_KEY` and keeps a persistent WireGuard session alive, with a mounted volume preserving its identity across restarts. Only outbound traffic is needed; no public ports have to be exposed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NetBird Peer | `netbirdio/netbird:rootless-latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NB_MTU` | 1100 | MTU for the Peer |
| `NB_HOSTNAME` | - | NetBird Peer Name |
| `NB_SETUP_KEY` | - | NetBird setup key |
| `NB_USE_NETSTACK_MODE` | true | Toggle for using netstack mode |
| `NB_SOCKS5_LISTENER_PORT` | 1080 | SOCKS5 listening port |

## Configuration

- **Volume:** `/var/lib/netbird`

**Category:** Other

[View on Railway →](https://railway.com/deploy/netbird-peer)
