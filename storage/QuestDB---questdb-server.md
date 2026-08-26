# Deploy QuestDB on Railway

Time-series database for storing and querying timestamped data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/questdb-server)

## About

QuestDB is an open-source time-series database for workloads where rows arrive faster than a general-purpose database can absorb them: market ticks, sensor readings and application metrics. It stores data in columns ordered by a designated timestamp, so a query over a time window reads only the columns and partitions it needs, and it speaks ordinary SQL extended with `SAMPLE BY`, `LATEST ON` and `ASOF JOIN`. Trading firms and telemetry platforms self-host QuestDB because one node handles millions of rows per second with no cluster to babysit.

Deploy QuestDB on Railway and you get one service running the official `questdb/questdb` image with a persistent volume at `/var/lib/questdb` holding the tables, write-ahead log and configuration. The public HTTPS domain points at port 9000, which serves the Web Console, the REST query API, InfluxDB line protocol over HTTP and the QWP binary protocol — all behind HTTP basic authentication generated at deploy time. Postgres wire on 8812 and line protocol over TCP on 9009 stay private, reachable from your other services at `questdb.railway.internal`, while a small server on 9003 answers the health check and exposes Prometheus metrics.

![Diagram of the QuestDB service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787643149/questdb-architecture.png)

QuestDB is a single Java, C++ and Rust process with no external dependencies — no ZooKeeper, no metadata store, no coordinator tier — so the whole database is one container plus one directory on disk. Self-hosting suits teams collecting telemetry continuously who want predictable cost and control of retention.

- `SAMPLE BY` for downsampling, `ASOF JOIN` for aligning differently-sampled series, `LATEST ON` for the newest row per key
- Materialized views maintaining aggregates incrementally, and Live Views refreshing window-function results in milliseconds
- Four ingestion paths: line protocol over HTTP and TCP, Postgres wire, REST, and the QWP binary protocol added in QuestDB 10
- Write-ahead logging with out-of-order writes, table-level Parquet storage and time-based partitioning with TTL

The single `questdb` service is the whole database, and the volume at `/var/lib/questdb` is what makes it durable. The source repository adds one piece on top of the official image: a TCP forwarder that accepts IPv6 connections and hands them to QuestDB's IPv4 listeners, because Railway routes traffic between services over IPv6 while QuestDB binds IPv4 only. Without it your other services could not reach the database privately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| questdb | [gridalpha/questdb-railway](https://github.com/gridalpha/questdb-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9003 | Port Railway health-checks |
| `QDB_PG_USER` | (secret) | Postgres wire username |
| `QDB_HTTP_USER` | (secret) | Web Console and REST username |
| `QDB_PG_PASSWORD` | (secret) | Postgres wire password |
| `QDB_HTTP_PASSWORD` | (secret) | Web Console and REST password |
| `QDB_METRICS_ENABLED` | true | Serve Prometheus metrics privately |
| `QDB_HTTP_MIN_NET_BIND_TO` | 0.0.0.0:9003 | Health and metrics listener address |
| `QDB_HTTP_HEALTH_CHECK_AUTHENTICATION_REQUIRED` | false | Leave health endpoint anonymous |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/questdb`

**Category:** Storage · **Languages:** Go, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/questdb-server)
