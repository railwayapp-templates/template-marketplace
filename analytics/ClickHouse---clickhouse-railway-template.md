# Deploy ClickHouse on Railway

Fast column-oriented database for real-time analytics and data workloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickhouse-railway-template)

## About

ClickHouse is a high-performance, column-oriented SQL database designed for real-time analytics, OLAP workloads, event data, observability, and large-scale analytical queries. It is optimized for fast aggregations and high-throughput ingestion, making it suitable for applications that need to analyze large datasets with low query latency.

Hosting ClickHouse on Railway provides a managed deployment environment for running a persistent analytical database without maintaining the underlying server infrastructure yourself.

This template uses the official ClickHouse Docker image, exposes the HTTP interface on port `8123`, and stores database data in a persistent Railway volume mounted at `/var/lib/clickhouse`.

The deployment creates a configurable database user and password at startup. It also runs ClickHouse with the permissions required to write to the Railway-mounted volume.

Once deployed, applications can connect to ClickHouse over its HTTP interface or use Railway private networking for internal service-to-service communication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `clickhouse:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8123 | HTTP port used by ClickHouse |
| `CLICKHOUSE_DB` | default | Default database created on startup |
| `CLICKHOUSE_USER` | (secret) | Username used to authenticate to ClickHouse |
| `CLICKHOUSE_PASSWORD` | (secret) | Password used to authenticate to ClickHouse |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/clickhouse-railway-template)
