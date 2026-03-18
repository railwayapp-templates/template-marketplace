# Deploy Kubo on Railway

Deploy a Kubo server in railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kubo)

## About

Kubo is the reference Go implementation of IPFS, providing content-addressed storage, retrieval, and peer-to-peer data distribution. This template deploys a production-ready Kubo node on Railway with sensible defaults and an easy path to scaling.

![IPFS Web UI status page](https://raw.githubusercontent.com/ipfs/ipfs-webui/main/docs/screenshots/ipfs-webui-status.png)

Kubo runs as a single service that exposes IPFS HTTP APIs and gateway endpoints while participating in the IPFS network for content discovery and distribution. It stores blocks locally, advertises content via libp2p, and can retrieve content from any peer that has it. Railway makes it simple to deploy Kubo without managing servers, while enabling vertical scaling and persistent storage for your node’s data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kubo | [FournyP/kubo-railway-template](https://github.com/FournyP/kubo-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `IPFS_PATH` | /data/ipfs | Path to the IPFS repo/data directory inside the container |
| `KUBO_ANNOUNCE` | - | Multiaddr announced to peers (public reachability) |
| `KUBO_API_ADDRESS` | /ip6/::/tcp/5001 | Kubo API listen address |
| `KUBO_SWARM_TCP_ADDRESS_IPV4` | /ip4/0.0.0.0/tcp/4001 | IPv4 TCP swarm listen address (libp2p connections) |
| `KUBO_SWARM_TCP_ADDRESS_IPV6` | /ip6/::/tcp/4001 | IPv6 TCP swarm listen address (libp2p connections) |
| `KUBO_SWARM_UDP_ADDRESS_IPV4` | /ip4/0.0.0.0/udp/4001/quic | IPv4 UDP/QUIC swarm listen address |
| `KUBO_SWARM_UDP_ADDRESS_IPV6` | /ip6/::/udp/4001/quic | IPv6 UDP/QUIC swarm listen address |

## Configuration

- **TCP Proxies:** 4001
- **Volume:** `/data/ipfs`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kubo)
