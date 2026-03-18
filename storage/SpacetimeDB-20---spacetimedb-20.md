# Deploy SpacetimeDB 2.0 on Railway

A performant real-time backend framework and database for apps and games.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/spacetimedb-20)

## About

SpacetimeDB 2.0 is a realtime database/server designed for modern app backends. It combines persistence, realtime subscriptions, and server-side logic so clients can sync state instantly. With 2.0, it’s intended not just for games, but also for web apps that need live data and low-latency interactions.

Hosting SpacetimeDB 2.0 on Railway is straightforward: run the official Docker image, expose the HTTP/WebSocket API through a Railway HTTP Proxy, and mount a persistent volume for the node’s data directory. Your service must bind to `0.0.0.0` and listen on the port Railway routes to (commonly `$PORT`). For durability across deploys/restarts, mount a Railway Volume at `/stdb` and point the server at `/stdb/data`. For monitoring, add an HTTP healthcheck against `/v1/ping`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SpacetimeDB | `clockworklabs/spacetime` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Start command:** `/bin/sh -c "spacetime start --data-dir=/stdb/data --listen-addr 0.0.0.0:${PORT}"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/stdb`

**Category:** Storage

[View on Railway →](https://railway.com/template/spacetimedb-20)
