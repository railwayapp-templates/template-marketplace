# Deploy PrestoDB on Railway

Analyze data across multiple sources with fast distributed SQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prestodb)

## About

PrestoDB is a distributed SQL query engine designed for fast analytics across multiple data sources. It lets you query databases, data lakes, object storage, and other systems using a single SQL interface without moving all data into one centralized database first.

Hosting PrestoDB on Railway gives you a lightweight analytical query layer that can connect to multiple external data sources through catalogs and connectors.

This template runs PrestoDB as a single service where the node acts as both coordinator and worker. The coordinator handles query planning and scheduling, while the same node also executes query tasks.

PrestoDB itself does not act as the primary storage layer. Instead, it connects to external systems such as PostgreSQL, MySQL, Hive, Iceberg, Kafka, Cassandra, and other supported platforms.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| presto | `prestodb/presto:0.299` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | PrestoDB HTTP endpoint and Web UI port |
| `PRESTO_NODE_ID` | presto-railway | Stable identifier for the single Presto node |
| `PRESTO_ENVIRONMENT` | production | Logical environment name for this Presto deployment |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/prestodb)
