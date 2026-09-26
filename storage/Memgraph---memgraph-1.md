# Deploy Memgraph on Railway

Memgraph 3.13: in-memory graph database (Cypher, Bolt) with Memgraph Lab.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memgraph-1)

## About

Memgraph is an in-memory graph database that speaks Cypher and the Bolt protocol, so Neo4j drivers and many Neo4j tools work with it. It is built for fast graph queries and streaming workloads such as recommendations, fraud detection, network analysis and knowledge graphs for AI applications.

This template runs the official `memgraph/memgraph:3.13.1` image with Memgraph Lab, the web UI, as a second service. A database user with a generated password is created on first boot, and Bolt stays on Railway's private network at `memgraph.railway.internal:7687` over IPv4 and IPv6. Lab is public; it asks for that user and password to connect. Snapshots and the write-ahead log are stored on a Railway volume, so data survives redeploys. Memgraph keeps the whole graph in memory, so size the service for your data; small graphs fit the Hobby plan. It runs as root because Memgraph insists that the process owns its data directory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| memgraph | `memgraph/memgraph:3.13.1` | Database |
| lab | `memgraph/lab:3.13.2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MEMGRAPH_USER` | memgraph | (secret) |
| `MEMGRAPH_PASSWORD` | memgraph | (secret) |
| `PORT` | lab | 3000 |
| `QUICK_CONNECT_MG_PORT` | lab | 7687 |

## Configuration

- **Start command:** `/usr/lib/memgraph/memgraph --bolt-address=:: --bolt-port=7687 --also-log-to-stderr=true --log-level=INFO --storage-snapshot-on-exit=true --storage-wal-enabled=true --storage-snapshot-interval-sec=300 --telemetry-enabled=false`
- **Volume:** `/var/lib/memgraph`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/memgraph-1)
