# Deploy CockroachDB on Railway

Always-on distributed SQL for resilient, scalable applications.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cockroachdb)

## About

CockroachDB is a distributed SQL database designed for resilient, scalable, and PostgreSQL-compatible applications. It combines relational SQL with distributed storage, strong consistency, and horizontal scalability, making it suitable for transactional workloads that need reliability and future scale without abandoning familiar SQL tooling.

Hosting CockroachDB on Railway provides a persistent PostgreSQL-compatible SQL database with built-in administration tools and a browser-accessible DB Console.

This template runs CockroachDB in single-node mode with persistent storage. SQL connections are available through the PostgreSQL wire protocol, while the built-in DB Console provides visibility into databases, SQL activity, node health, storage, and cluster metrics.

The single-node architecture keeps deployment lightweight and cost-efficient while preserving the core CockroachDB SQL experience. It is well suited for development, testing, internal applications, prototypes, and workloads that do not yet require a fully distributed multi-node deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CockroachDB | `cockroachdb/cockroach:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SQL_PORT` | 26257 | PostgreSQL-compatible SQL port |
| `HTTP_PORT` | 8080 | CockroachDB DB Console and HTTP endpoint |
| `COCKROACH_STORE` | /cockroach/cockroach-data | Persistent CockroachDB storage path |

## Configuration

- **Start command:** `cockroach start-single-node --insecure --listen-addr=0.0.0.0:26257 --http-addr=0.0.0.0:8080 --store=/cockroach/cockroach-data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cockroach/cockroach-data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cockroachdb)
