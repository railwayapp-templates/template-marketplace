# Deploy Beava on Railway

Real-time Python feature server. No Kafka, no Flink, one binary.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/beava)

## About

Beava is a real-time feature server. Push events over HTTP or TCP and the next read reflects them. Define windowed aggregates in ~15 lines of Python (`@bv.event`, `@bv.table`), then query per-entity state via HTTP. Built for fraud detection, recommendations, LLM guardrails, and in-product analytics. Single Rust binary — no Kafka, no Flink, no feature store.

Beava runs as a single Rust binary with an in-memory state engine backed by a write-ahead log and periodic snapshots on disk. There is no external broker, stream worker, or feature-store dependency — events go straight to Beava and reads reflect the latest state immediately. This template provisions Beava from the official `beavadev/beava:latest` image with a 1 GB persistent volume mounted at `/data` for WAL + snapshots. Port 8080 is exposed publicly for the HTTP data plane (`/push`, `/get`, `/register`, `/health`). The lower-latency framed TCP fast-path on port 8081 is opt-in: flip one env var and add a Railway TCP Proxy on that port to enable it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| beavadev/beava:latest | `beavadev/beava:latest` | TCP service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8081
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/beava)
