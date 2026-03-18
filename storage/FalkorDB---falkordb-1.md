# Deploy FalkorDB on Railway

A FalkorDB single instance for AI, ML, and GraphRAG workloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/falkordb-1)

## About

**FalkorDB** is a high-performance, single-node graph database optimized for low-latency, AI/ML, and GraphRAG applications. It enables you to store, query, and analyze complex connected data with exceptional speed and efficiency. This deployment also includes **FalkorDB-Browser** for easy, interactive access to your database.

Hosting a FalkorDB single instance provides a fast and lightweight environment ideal for development, prototyping, or production workloads that don’t require clustering. Railway manages the containerization, networking, and environment setup automatically. Once deployed, you can connect to your FalkorDB instance through the provided endpoint or use **FalkorDB-Browser** to explore your data visually.

Railway ensures persistent storage, simple configuration, and seamless scaling as your application grows — all without managing infrastructure manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FalkorDB | `falkordb/falkordb` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `FALKORDB_PORT` | 16379 |
| `FALKORDB_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 16379
- **Volume:** `/var/lib/falkordb/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/falkordb-1)
