# Deploy QuestDB on Railway

High-performance time-series database with built-in web console

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/questdb)

## About

QuestDB is an open-source time-series database designed for fast ingestion and SQL queries over time-series data. It supports millions of rows per second ingestion via InfluxDB Line Protocol and delivers sub-second query performance on billions of rows — with a built-in web console for immediate SQL access.

This template deploys a production-ready QuestDB instance:

- **Built-in Web Console**: SQL editor with autocomplete, schema browser, and chart visualization — no extra UI service needed
- **Multi-Protocol Access**: PostgreSQL wire protocol (port 8812), InfluxDB Line Protocol (port 9009), and REST API — all from a single container
- **Persistent Storage**: Railway volume for database files and WAL (write-ahead log)
- **High Performance**: Columnar storage with SIMD-optimized queries for time-series analytics

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| QuestDB | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: /solutions/questdb/questdb) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `QDB_PG_USER` | (secret) | PostgreSQL wire protocol username |
| `QDB_HTTP_USER` | (secret) | HTTP basic auth username for web console |
| `QDB_PG_PASSWORD` | (secret) | PostgreSQL wire protocol password |
| `QDB_HTTP_PASSWORD` | (secret) | HTTP basic auth password for web console |
| `QUESTDB_IMAGE_TAG` | latest | Docker image tag for version control |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Python, Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/questdb)
