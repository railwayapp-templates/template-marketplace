# Deploy Valkey on Railway

In-memory key/value store for caching, sessions and job queues

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/valkey)

## About

Valkey is an in-memory key/value data store — the Linux Foundation's BSD-3 licensed continuation of Redis 7.2, maintained by contributors from AWS, Google and Oracle. It holds strings, hashes, lists, sets, sorted sets, streams and bitmaps in memory with optional durability on disk, and answers most operations in under a millisecond. Teams self-host Valkey as an application cache, a session store, a rate limiter and the queue behind BullMQ, Sidekiq and Celery. It speaks the RESP protocol and reports `redis_version:7.2.4` beside its own version, so every existing Redis client works unchanged.

This template deploys the shape Valkey's own documentation calls production. `valkey-primary` is a writable server with append-only-file persistence on its own volume; `valkey-replica` is a read-only asynchronous replica, with its own volume, that streams every write from the primary over Railway's private network. Both build from the `gridalpha/valkey-railway` repository on top of the official `valkey/valkey:9` image. Apps in the same project reach the primary at `valkey-primary.railway.internal:6379`, and a TLS listener serves clients outside Railway. Password authentication is mandatory, and both servers size their memory limit and I/O thread count from the container's real quota at every boot.

![The Valkey primary and read replica with their data volumes](https://res.cloudinary.com/rroe4rtk/image/upload/v1788775073/valkey-architecture.png)

Valkey forked from Redis 7.2.4 in March 2024, after Redis Ltd. moved to a source-available licence, and has stayed BSD-3 and vendor-neutral under the Linux Foundation. Version 9 adds atomic slot migration, hash-field expiration and multithreaded I/O.

- Rich data types: strings, hashes with per-field TTLs, lists, sets, sorted sets, streams, bitmaps, HyperLogLog and geospatial indexes
- Durability by append-only file, RDB snapshots, or both
- Asynchronous replication with dual-channel full sync
- Server-side Lua scripting and functions for atomic multi-step operations
- Keyspace notifications, pub/sub and stream consumer groups
- ACL users, TLS and per-client memory limits

`valkey-primary` accepts every write, persists it, and streams the replication log onward. `valkey-replica` holds a full read-only copy: send read-heavy traffic there, take backups from it, or promote it with `REPLICAOF NO ONE` if the primary is lost. Each service owns one volume at `/data` holding the append-only file, RDB snapshot and TLS keypair.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| valkey-replica | [gridalpha/valkey-railway](https://github.com/gridalpha/valkey-railway) | Database |
| valkey-primary | [gridalpha/valkey-railway](https://github.com/gridalpha/valkey-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | valkey-replica | 8080 | HTTP liveness endpoint, not Valkey |
| `VALKEY_ROLE` | valkey-replica | replica | Read-only replicating node |
| `VALKEY_PASSWORD` | valkey-replica | (secret) | Same credential as the primary |
| `VALKEY_TLS_PORT` | valkey-replica | 6380 | TLS listener port |
| `VALKEY_TLS_ENABLED` | valkey-replica | true | Generate a keypair and open the TLS listener |
| `VALKEY_PRIMARY_HOST` | valkey-replica | - | Primary's private hostname |
| `VALKEY_PRIMARY_PORT` | valkey-replica | 6379 | Primary's plaintext port |
| `VALKEY_MAXMEMORY_POLICY` | valkey-replica | noeviction | Reject writes when full, never evict |
| `PORT` | valkey-primary | 8080 | HTTP liveness endpoint, not Valkey |
| `VALKEY_ROLE` | valkey-primary | primary | Writable node |
| `VALKEY_PASSWORD` | valkey-primary | (secret) | requirepass, and the replication credential |
| `VALKEY_TLS_PORT` | valkey-primary | 6380 | TLS listener port, the TCP proxy target |
| `VALKEY_TLS_ENABLED` | valkey-primary | true | Generate a keypair and open the TLS listener |
| `VALKEY_MAXMEMORY_POLICY` | valkey-primary | noeviction | Reject writes when full, never evict |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/data`
- **TCP Proxies:** 6380

**Category:** Storage · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/valkey)
