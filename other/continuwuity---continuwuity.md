# Deploy continuwuity on Railway

A community-driven Matrix homeserver

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/continuwuity)

## About

Continuwuity is a lightweight Matrix homeserver written in Rust — the community-driven continuation of conduwuit. It enables decentralized, federated real-time communication over the Matrix protocol, designed to run efficiently on modest hardware. It supports federation, appservice bridges, and per-user identities out of the box.

Hosting continuwuity involves running a single stateful binary (or OCI container) that handles Matrix client and federation APIs. It uses RocksDB as its embedded database — no external database server needed. You configure a server name (your domain), expose port 8448 for federation and 443 for clients (typically via a reverse proxy with TLS), and mount a persistent volume for the RocksDB data directory. The container image is minimal (no shell, just the binary and TLS certificates), making it well-suited for platform deployments. Configuration is done entirely through environment variables or a TOML file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| continuwuity/continuwuity:latest | `ghcr.io/continuwuity/continuwuity:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CONTINUWUITY_PORT` | 6167 |
| `CONTINUWUITY_ADDRESS` | 0.0.0.0 |
| `CONTINUWUITY_DATABASE_PATH` | /var/lib/continuwuity |
| `CONTINUWUITY_ALLOW_FEDERATION` | false |
| `CONTINUWUITY_ALLOW_REGISTRATION` | true |
| `CONTINUWUITY_REGISTRATION_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/_matrix/client/versions`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/continuwuity`

**Category:** Other

[View on Railway →](https://railway.com/deploy/continuwuity)
