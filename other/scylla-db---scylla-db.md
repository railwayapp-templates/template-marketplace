# Deploy scylla-db on Railway

Cassandra-compatible ScyllaDB for Railway with volume and private CQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scylla-db)

## About

**scylla-db** is a Railway template that runs [ScyllaDB](https://www.scylladb.com/) — a high-performance, Cassandra-compatible NoSQL database built for low-latency reads and writes at scale. It speaks the CQL protocol, so existing Cassandra drivers and tooling work out of the box. This template deploys a single-node ScyllaDB 5.1.4 instance tuned for Railway's container and private networking environment.

Hosting ScyllaDB on Railway means running a pre-built Docker image with container-friendly defaults: CPU and memory limits (`SMP`, `MEM`), overprovisioned mode, IPv6 private networking, and authenticated CQL access. The template attaches a persistent volume at `/var/lib/scylla` so data survives redeploys. Your application services connect over Railway's private network on port `9042`; external access requires enabling **TCP Proxy** (CQL is TCP, not HTTP). After deploy, link the ScyllaDB service to your app to receive connection reference variables (`SCYLLA_PRIVATE_HOST`, `SCYLLA_USER`, etc.). Change the default superuser password before production.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scylladb | `ghcr.io/marco-quintella/scylladb-railway:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MEM` | 2G | Memory limit |
| `SMP` | 2 | CPU cores for ScyllaDB |
| `SEEDS` | :: | Seed nodes for cluster formation |
| `API_ADDR` | :: | REST API listen address |
| `OVERPROV` | 1 | Overprovisioned mode (required in containers) |
| `LISTEN_ADDR` | - | CQL listen address |
| `SCYLLA_HOST` | - | Public hostname of the ScyllaDB service. Enable TCP Proxy for external CQL access. |
| `SCYLLA_PORT` | 9042 | CQL port on the private network (default 9042). |
| `SCYLLA_USER` | (secret) | CQL username for authenticated connections (matches AUTH_SUPERUSER_NAME). |
| `SCYLLA_PASSWORD` | (secret) | CQL password for authenticated connections. Must match the password hashed in AUTH_SUPERUSER_SHA512_PASSWORD. |
| `AUTH_SUPERUSER_NAME` | cassandra | Superuser username |
| `SCYLLA_PRIVATE_HOST` | - | Private network hostname for CQL connections from other Railway services in the same project. |
| `SCYLLA_PRIVATE_PORT` | 9042 | CQL port on the public network (default 9042). |
| `AUTH_SUPERUSER_SHA512_PASSWORD` | (secret) | SHA-512 hash of the superuser password |

## Configuration

- **Healthcheck:** `/storage_service/release_version`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/scylla`

**Category:** Other

[View on Railway →](https://railway.com/deploy/scylla-db)
