# Deploy ScyllaDB (Open-Source NoSQL Database & Cassandra Alternative) on Railway

ScyllaDB [Mar ’26] (High-Speed, Low-Latency Data Platform) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scylladb)

## About

ScyllaDB is an open-source, high-performance NoSQL database designed to handle massive workloads with low latency and high throughput. Built as a drop-in replacement for Apache Cassandra, ScyllaDB uses a highly optimized C++ core to deliver unmatched performance while maintaining compatibility with Cassandra’s APIs and tools.

You can self-host ScyllaDB to maintain complete control over your database environment, ensuring data security and performance consistency. Hosting ScyllaDB on Railway means you can deploy, scale, and monitor your database in the cloud with minimal effort.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scylladb-railway | `ghcr.io/null2264/scylladb-railway:5.1.4-v2` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MEM` | 2G |
| `SMP` | 2 |
| `SEEDS` | :: |
| `API_ADDR` | :: |
| `OVERPROV` | 1 |
| `LISTEN_ADDR` | :: |
| `AUTH_SUPERUSER_NAME` | cassandra |
| `AUTH_SUPERUSER_SHA512_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/scylla`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/scylladb)
