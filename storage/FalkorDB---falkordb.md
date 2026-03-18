# Deploy FalkorDB on Railway

High-performance graph database optimized for GraphRAG and AI/ML

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/falkordb)

## About

FalkorDB is a high-performance graph database optimized for GraphRAG applications, using GraphBLAS under the hood for sparse adjacency matrix graph representation. 

Designed specifically for AI/ML and GenAI workloads, it delivers accurate, relevant results with reduced hallucinations and enhanced performance for knowledge graphs and LLM integration.

FalkorDB runs as a Redis module, requiring Redis 7.4 or higher for the latest version. Hosting FalkorDB involves deploying a Redis server with the FalkorDB module loaded, making it accessible for graph database operations. The deployment handles graph storage, query processing, and real-time data ingestion for AI applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FalkorDB | `falkordb/falkordb` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 6379 |
| `FALKOR_PASSWORD` | (secret) |
| `FALKOR_USERNAME` | (secret) |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/var/lib/falkordb/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/falkordb)
