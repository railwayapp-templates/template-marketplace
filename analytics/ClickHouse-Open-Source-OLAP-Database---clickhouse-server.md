# Deploy ClickHouse | Open Source OLAP Database on Railway

Self-host ClickHouse on Railway for real-time fast analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickhouse-server)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickhouse-server?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Deploy ClickHouse on Railway to get a production-ready, open-source columnar OLAP database that answers sub-second analytical queries across billions of rows. Self-host ClickHouse without running your own hardware — the `clickhouse/clickhouse-server` image ships with a tuned engine, SQL interface, and HTTP/native protocols out of the box.

This Railway template provisions a single `clickhouse/clickhouse-server:24` service with a persistent volume mounted at `/var/lib/clickhouse`, an HTTPS domain on port 8123 for the REST/JDBC interface, and a TCP proxy on port 9000 so `clickhouse-client` and other native-protocol drivers can connect from anywhere.

ClickHouse is a column-oriented database management system (DBMS) built for online analytical processing (OLAP). Unlike row-stores like Postgres or MySQL, ClickHouse reads only the columns a query touches and compresses heavily — queries scan gigabytes per second per core.

- Column-oriented storage with per-column compression (LZ4, ZSTD, Delta, Gorilla)
- Vectorised query execution and SIMD-accelerated operators
- Full SQL with arrays, nested types, window functions, and approximate aggregations
- Horizontal scalability via replication and sharding
- Native streaming ingestion from Kafka, RabbitMQ, and S3
- Massive ecosystem of table engines: MergeTree, ReplicatedMergeTree, Distributed, Kafka, S3, MaterializedView

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:24` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CLICKHOUSE_DB` | default | Initial database name |
| `CLICKHOUSE_USER` | (secret) | Bootstrap admin username |
| `CLICKHOUSE_PASSWORD` | (secret) | Bootstrap admin password (plain value, not ${{secret()}}) |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | 1 | Enable SQL user/role management |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/clickhouse-server)
