# Deploy Dragonfly | Redis-Compatible Data Store on Railway

Self Host Dragonfly. High-performance Redis-compatible data store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dragonfly-redis-alternative)

## About

Deploy Dragonfly on Railway to get a modern, high-performance Redis-compatible in-memory data store running in minutes. Self-host Dragonfly as a drop-in Redis replacement with 25x more throughput and 80% less memory usage on the same hardware.

This Railway template deploys Dragonfly with a persistent volume at `/data` for snapshot durability, password authentication via `DFLY_requirepass`, and a TCP proxy for external connections. Dragonfly runs on port 6379 and is wire-compatible with any Redis client.

Dragonfly is a modern in-memory data store built from the ground up in C++ with a multi-threaded, shared-nothing architecture. It serves as a drop-in replacement for both Redis and Memcached, supporting ~240 Redis commands and all Memcached commands.

- **25x throughput** over Redis on equivalent hardware (3.8M QPS on a single node)
- **80% lower memory** for the same dataset size — no memory spikes during snapshots
- **Multi-threaded** — scales vertically with CPU cores, unlike single-threaded Redis
- **Wire-compatible** with Redis (RESP2/RESP3) and Memcached protocols
- **Built-in persistence** via RDB-compatible snapshots with scheduled cron-based backups
- **Unified caching** with an adaptive eviction algorithm when `cache_mode` is enabled

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dragonfly | `ghcr.io/dragonflydb/dragonfly:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DFLY_dir` | /data | Snapshot persistence directory |
| `DFLY_maxmemory` | 0 | Memory limit (0 = auto-detect) |
| `DFLY_dbfilename` | dump | Snapshot file name prefix |
| `DFLY_requirepass` | - | Redis AUTH password |
| `DFLY_proactor_threads` | 4 | IO thread pool size |

## Configuration

- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/dragonfly-redis-alternative)
