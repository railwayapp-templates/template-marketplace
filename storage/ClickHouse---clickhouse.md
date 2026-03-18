# Deploy ClickHouse on Railway

A single-node ClickHouse database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickhouse)

## About

ClickHouse is the fastest and most resource efficient open-source database for real-time apps and analytics.

ClickHouse processes analytical queries 100-1000x faster than traditional row-oriented systems with the same available I/O throughput and CPU capacity. Columnar storage format allows fitting more hot data in RAM, which leads to shorter response times.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:25.8` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | - | Private ClickHouse HTTP API host |
| `PORT` | 8123 | Private ClickHouse HTTP API port |
| `HOST_PORT` | - | Private ClickHouse HTTP API host:port |
| `PUBLIC_HOST` | - | Public ClickHouse HTTP API host |
| `PUBLIC_PORT` | 443 | Public ClickHouse HTTP API port |
| `DATABASE_URL` | - | Private database URL |
| `CLICKHOUSE_DB` | railway | Default database name |
| `CLICKHOUSE_USER` | (secret) | Name of ClickHouse user |
| `PUBLIC_HOST_PORT` | - | Public ClickHouse HTTP API host:port |
| `DATABASE_JDBC_URL` | - | Private database JDBC URL |
| `CLICKHOUSE_PASSWORD` | (secret) | Password for ClickHouse user |
| `PUBLIC_DATABASE_URL` | - | Private database URL |
| `PUBLIC_DATABASE_JDBC_URL` | - | Private database JDBC URL |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/clickhouse)
