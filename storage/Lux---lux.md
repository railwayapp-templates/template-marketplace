# Deploy Lux on Railway

A drop-in Redis replacement. 3-5x faster.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lux)

## About

Lux is a drop-in Redis replacement written in Rust. It's multi-threaded with a sharded concurrent architecture that delivers 3–5x faster throughput than Redis by using all available cores. It speaks the RESP protocol, so it works with every existing Redis client — zero code changes required.

Deploying Lux on Railway uses the official Docker image (`ghcr.io/lux-db/lux:latest`), which weighs in at just 856KB. Lux starts instantly and auto-tunes its shard count based on available CPU cores. For persistence, Lux takes automatic snapshots at a configurable interval (default 60 seconds), so you'll want a persistent volume to retain data across redeploys. Authentication can be enabled by setting the `LUX_PASSWORD` environment variable. Connect with any Redis client by pointing it at your Railway-provided domain — no code changes needed compared to an existing Redis setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lux | `ghcr.io/lux-db/lux:latest` | Database |

## Configuration

- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/lux)
