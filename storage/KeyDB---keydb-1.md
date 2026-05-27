# Deploy KeyDB on Railway

Deploy and Host KeyDB with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keydb-1)

## About

KeyDB is a high-performance, open-source database and a faster, drop-in alternative to Redis. Backed by Snap, it features multithreading, memory efficiency, and an MVCC architecture that executes queries without blocking. It maintains full compatibility with the Redis protocol, making migration seamless and reducing operation costs.

Hosting KeyDB involves provisioning infrastructure that can leverage its multithreaded, high-throughput architecture. Deploying KeyDB typically requires setting up a compute environment with sufficient RAM, as it keeps data in-memory for sub-millisecond latencies. Because it is a superset of Redis functionality, hosting KeyDB is operationally similar to managing a Redis instance but allows you to handle heavier workloads on a single node (over 1 million ops/sec). Configuration includes setting up Active-Replication for hot-spare failover, managing simple TCP-based load balancing, and choosing persistence options like RDB snapshots or AOF logs to ensure data durability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| KeyDB | `eqalpha/keydb:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `KEYDB_URL` | - | URL to connect to KeyDB over the private network |
| `KEYDB_HOST` | - | Railway private domain name |
| `KEYDB_PORT` | 6379 | Port to connect to KeyDB over the private network |
| `KEYDB_USER` | (secret) | Default user to connect to KeyDB |
| `KEYDB_PASSWORD` | (secret) | Password to connect to KeyDB |
| `KEYDB_PUBLIC_URL` | - | URL to connect to KeyDB Publically |
| `KEYDB_PUBLIC_HOST` | - | Railway public TCP domain name |
| `KEYDB_PUBLIC_PORT` | - | Port to connect to KeyDB Publically |

## Configuration

- **Start command:** `/bin/sh -c "exec keydb-server /etc/keydb/keydb.conf --server-threads 16 --always-show-logo no --appendonly yes --requirepass ${KEYDB_PASSWORD} --port ${KEYDB_PORT}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/keydb-1)
