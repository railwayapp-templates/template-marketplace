# Deploy betterMQ on Railway

Http Messaging & Scheduling

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bettermq)

## About

betterMQ is an open-source, self-hosted HTTP message broker. Enqueue durable jobs over HTTP and deliver them with signed webhook push—no pull workers or Redis required. One process serves the API, control panel, and docs for async jobs, cron, delays, fan-out, and flow control.

This template runs the public Docker image with HTTP on port 8080 and a persistent volume at `/data` for queues, auth, RocksDB indexes, and local message storage. After deploy, open `/panel/` to set a panel password and copy your API token. Defaults use local disk storage; you can later switch to SlateDB/S3 from Infrastructure in the panel. Redeploys keep data as long as the volume stays attached. No database sidecar is required for the basic setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bettermq | `ghcr.io/bettermq/bettermq:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `PORT` | Port Railway routes HTTP to (must match BETTERMQ_PORT) |
| `BETTERMQ_PORT` | HTTP listen port for the betterMQ broker |

## Configuration

- **Start command:** `bettermq serve --data-dir /data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/bettermq)
