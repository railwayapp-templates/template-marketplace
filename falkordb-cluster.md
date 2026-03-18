# Deploy FalkorDB Cluster on Railway

High-availability FalkorDB cluster for AI, ML, and GraphRAG workloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/falkordb-cluster)

## About

**FalkorDB-cluster** is a high-availability, multi-node graph database designed for low-latency, AI/ML, and GraphRAG applications. It allows you to store, query, and analyze complex graph data efficiently across distributed nodes, providing reliability, scalability, and fault tolerance for modern data-driven applications. The deployment also includes **FalkorDB-Browser** for simple, interactive access to your cluster.

Hosting a FalkorDB-cluster involves running multiple database nodes in a coordinated cluster with automatic replication and failover. Railway simplifies deployment by managing networking, environment variables, and container orchestration. Once deployed, your cluster supports high-throughput queries, persistent storage, and distributed workloads. **FalkorDB-Browser** provides a user-friendly interface to explore and interact with your graph data without needing command-line tools. Monitoring, scaling, and secure access are all handled via Railway’s platform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FalkorDB Node 3 | `falkordb/falkordb-server` | Database |
| Falkordb Browser | `falkordb/falkordb` | Web service |
| FalkorDB Node 2 | `falkordb/falkordb-server` | Database |
| FalkorDB Node 1 | `falkordb/falkordb-server` | Database |
| FalkorDB Node 6 | `falkordb/falkordb-server` | Database |
| FalkorDB Node 4 | `falkordb/falkordb-server` | Database |
| FalkorDB Node 5 | `falkordb/falkordb-server` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Falkordb Browser | 3000 |
| `FALKOR_PASSWORD` | Falkordb Browser | (secret) |
| `PORT` | FalkorDB Node 1 | 16379 |
| `FALKOR_PASSWORD` | FalkorDB Node 1 | (secret) |

## Configuration

- **Volume:** `/var/lib/falkordb/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/template/falkordb-cluster)
