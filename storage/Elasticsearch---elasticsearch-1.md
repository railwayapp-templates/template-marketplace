# Deploy Elasticsearch on Railway

Advanced search and analytics with Elasticsearch and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elasticsearch-1)

## About

Elasticsearch is a distributed search and analytics engine built for fast full-text search, log analysis, observability, and real-time data exploration. It stores and indexes structured and unstructured data so applications can perform powerful searches, aggregations, filtering, and analytical queries with low latency.

Hosting Elasticsearch on Railway provides a persistent search and analytics engine without requiring you to manage a dedicated virtual machine.

This template runs Elasticsearch as a single-node deployment with persistent storage for indexes and application data. The HTTP API can be accessed through Railway's networking layer, making it suitable for applications that need full-text search, log indexing, analytics, semantic search, or fast document retrieval.

A single-node architecture keeps the deployment simple and cost-efficient while still providing the core Elasticsearch capabilities needed by many development, internal, and small-to-medium production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elasticsearch | `elasticsearch:9.5.2` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9200 | Railway public HTTP target port |
| `discovery.type` | single-node | Run Elasticsearch as a standalone single-node cluster |
| `ELASTIC_PASSWORD` | (secret) | Password for the built-in elastic superuser |
| `xpack.security.enabled` | true | Enable Elasticsearch authentication |
| `xpack.security.http.ssl.enabled` | false | Railway terminates public HTTPS |
| `xpack.security.autoconfiguration.enabled` | false | Disable automatic TLS/enrollment setup |

## Configuration

- **Start command:** `/bin/bash -c 'echo "=== identity ==="; id; echo "=== tools ==="; command -v su || true; command -v setpriv || true; command -v gosu || true; command -v su-exec || true; command -v chroot || true; command -v tini || true; sleep 3600'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/elasticsearch-1)
