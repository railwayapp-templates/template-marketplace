# Deploy moltis on Railway

A Rust-native claw. Voice, memory, MCP tools built-in.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moltis-1)

## About

Moltis can be hosted on Railway using a pinned GHCR Docker image with zero build pipeline. Railway manages TLS termination and provides a public domain, making it a fast and low-friction option for self-hosted AI gateway deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| moltis | `ghcr.io/moltis-org/moltis:20260328.01` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 13131 |
| `MOLTIS_NO_TLS` | true |
| `MOLTIS_PASSWORD` | (secret) |
| `MOLTIS_BEHIND_PROXY` | true |
| `MOLTIS_DEPLOY_PLATFORM` | railway |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/moltis-1)
