# Deploy Fedis on Railway

Fast Redis-compatible server in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fedis)

## About

Fedis is a fast Redis-compatible server written in Rust. It supports common Redis commands, optional password authentication, append-only file (AOF) persistence, periodic snapshots, and a Prometheus-style metrics endpoint. Fedis is a lightweight drop-in cache or state layer for apps that want Redis-like behavior with a focused, self-hosted runtime.

Hosting Fedis on Railway is straightforward: run the container, expose port `6379`, and configure persistence and auth with environment variables. For production usage, attach a persistent volume and set `FEDIS_DATA_PATH` (or `FEDIS_AOF_PATH`) so data survives restarts and deploys. You can secure access by setting `FEDIS_PASSWORD` (and optional `FEDIS_USERNAME`/`FEDIS_USERS`), then connect from your app using standard Redis clients. If you need observability, enable the metrics endpoint with `FEDIS_METRICS_ADDR` and scrape it from your monitoring stack. The result is a managed, Redis-compatible service with minimal operational overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Fedis | `ghcr.io/lassejlv/fedis:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FEDIS_HOST` | 0.0.0.0 |
| `FEDIS_PASSWORD` | (secret) |
| `FEDIS_DATA_PATH` | /data |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/fedis)
