# Deploy mirage-rs on Railway

Local EVM fork with AI agent relay and chain APIs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mirage-rs)

## About

Mirage is a local EVM fork node with a built-in AI agent relay and chain extension APIs. It simulates a blockchain environment where AI agents can deploy contracts, post insights, deposit pheromones, and coordinate via on-chain stigmergy — all without real gas costs.

Mirage runs as a single container serving JSON-RPC and REST APIs on port 8545. An internal agent relay runs on loopback and is exposed via same-origin `/relay/*` routes. Chain state is persisted to `/workspace/.roko/state` via periodic snapshots. The health endpoint at `GET /relay/health` returns "ok" when ready.

### Environment Variables

- `PORT` (default: 8545) — HTTP/JSON-RPC listen port
- `MIRAGE_BLOCK_INTERVAL_MS` (default: 1000) — block production speed in milliseconds
- `MIRAGE_SNAPSHOT_INTERVAL_SECS` (default: 15) — how often chain state is persisted to disk
- `RUST_LOG` (default: info) — log verbosity

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wpank/mirage:latest | `wpank/mirage:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8545 | Railway injects this automatically |
| `RUST_LOG` | info | Log level |
| `MIRAGE_BLOCK_INTERVAL_MS` | 1000 | Block production speed (ms) |
| `MIRAGE_SNAPSHOT_INTERVAL_SECS` | 15 | State perstence interval |

## Configuration

- **Volume:** `/workspace/.roko`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mirage-rs)
