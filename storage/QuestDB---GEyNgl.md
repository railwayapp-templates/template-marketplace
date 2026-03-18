# Deploy QuestDB on Railway

QuestDB is the world's fastest growing open-source time-series database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/GEyNgl)

## About

QuestDB is the fastest growing open-source time-series database offering blazingly fast, high throughput ingestion and dynamic, low-latency SQL queries. Built from the ground up in Java, C++, and Rust with zero dependencies and garbage collection.

Hosting QuestDB provides a high-performance time-series database solution optimized for financial market data, IoT sensors, and real-time dashboards. With its column-oriented storage model, parallelized vector execution, and SIMD instructions, QuestDB delivers exceptional performance on limited hardware. The database implements ANSI SQL with native time-series extensions, making it simple to analyze, filter, and downsample data. Features include high-speed ingestion via InfluxDB Line Protocol, responsive Web Console for data management, and excellent performance with high data cardinality workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| questdb/questdb | `questdb/questdb:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9000 | A user-defined PORT to tell Railway what port to expose for public networking. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/GEyNgl)
