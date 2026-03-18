# Deploy Logos Blockchain Node on Railway

Logos Blockchain devnet node with live web dashboard and p2p networking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/logos-blockchain-node)

## About

Logos Blockchain Node is the reference implementation of the Logos Blockchain — a privacy-preserving, decentralized protocol built on Nomos. It uses Cryptarchia consensus with ZK circuits to enable trustless, censorship-resistant infrastructure for the Logos network. **This template runs a testnet node.**

Hosting a Logos Blockchain Node means running a full participant in the Logos testnet — validating blocks, maintaining chain state, and contributing to network decentralization. The node runs the `logos-blockchain-node` binary alongside ZK circuit files required for Cryptarchia consensus. This Railway template handles the full setup: downloading the official binary and circuits at build time, initializing fresh node keys on first boot, persisting chain state to a volume, and exposing a live web dashboard for monitoring. No manual configuration required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| logos-node-railway | [mart1n-xyz/logos-node-railway](https://github.com/mart1n-xyz/logos-node-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | Web dashboard port (Railway routes public traffic here) |
| `DATA_DIR` | /data | Persistent volume mount path for config and chain state |
| `NODE_API_PORT` | 8080 | Internal node HTTP API port |
| `BOOTSTRAP_PEERS` | /ip4/65.109.51.37/udp/3000/quic-v1/p2p/12D3KooWL7a8LBbLRYnabptHPFBCmAs49Y7cVMqvzuSdd43tAJk8 /ip4/65.109.51.37/udp/3001/quic-v1/p2p/12D3KooWPLeAcachoUm68NXGD7tmNziZkVeMmeBS5NofyukuMRJh /ip4/65.109.51.37/udp/3002/quic-v1/p2p/12D3KooWKFNe4gS5DcCcRUVGdMjZp3fUWu6q6gG5R846Ui1pccHD /ip4/65.109.51.37/udp/3003/quic-v1/p2p/12D3KooWAnriLgXyQnGTYz1zPWPkQL3rthTKYLzuAP7MMnbgsxzR | Space-separated multiaddrs for devnet bootstrap peers (v0.2.1) |
| `DASHBOARD_PASSWORD` | (secret) | Password for the web dashboard (user: admin). Leave empty to disable auth. |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** HTML, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/logos-blockchain-node)
