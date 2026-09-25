# Deploy Garnet on Railway

Microsoft Garnet 2.1 Redis-compatible cache with auth and durable storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/garnet)

## About

Garnet is a high-performance cache-store from Microsoft Research that speaks the Redis RESP protocol. Existing Redis clients and libraries connect unchanged, while Garnet adds multi-threaded scaling, low tail latency and durable storage. It supports strings, hashes, lists, sets, sorted sets, streams, Lua scripts, transactions and pub/sub.

This template deploys Garnet v2.1.8 from the official image as a single service with password authentication. Writes go to an append-only log and checkpoints on a Railway volume at `/data`, and Garnet recovers them on every start, so data survives redeploys. Memory is capped at 512 MB for the store and 64 MB for the index, which suits the Hobby plan; raise both variables for larger datasets. Services connect over the private network on port 6379, and external clients use the Railway TCP proxy. Garnet uses its portable storage device, because Railway does not offer native async I/O.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| garnet | `ghcr.io/microsoft/garnet:2.1.8` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GARNET_INDEX` | 64m |
| `GARNET_MEMORY` | 512m |
| `GARNET_PASSWORD` | (secret) |

## Configuration

- **Start command:** `sh -c 'exec /app/GarnetServer --port 6379 --auth Password --password "$GARNET_PASSWORD" --memory "$GARNET_MEMORY" --index "$GARNET_INDEX" --aof --aof-commit-freq 1000 --checkpointdir /data --recover --device-type RandomAccess'`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/garnet)
