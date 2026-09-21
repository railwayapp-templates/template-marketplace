# Deploy Nats on Railway

Self-hosted NATS server with JetStream persistence on a Railway volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nats-1)

## About

NATS runs as a single container on Railway with a volume mount at `/data`. JetStream state — streams, consumers, and messages — is file-backed under `/data/jetstream` and survives restarts and redeploys. The server starts as root (the base image default) so the root-owned volume is writable.

### Ports & Health

| Port | Purpose | Reach |
|------|---------|-------|
| `4222` | NATS client protocol | private domain |
| `8222` | Monitor / HTTP API (health) | public domain (health = `GET /` returns `200`) |
| `6222` | Cluster (reserved) | private (reserved for future multi-node) |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nats | `ghcr.io/mc9max/nats:v2.15.0` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for log timestamps (e.g. America/New_York). |
| `PORT` | 8222 | Monitor/HTTP port. Railway maps the public domain to this port (health check + status endpoints). |
| `NATS_LOGGING` | info | NATS log level. Options: debug, trace, info, error. (debug/trace are also fixed off in the server config.) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/nats-1)
