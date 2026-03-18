# Deploy Arroyo on Railway

A cloud-native stream processing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ot9yYm)

## About

# Arroyo Stream Processing

Arroyo is a distributed stream processing engine written in Rust, designed to efficiently perform stateful computations on streams of data. Unlike traditional batch processors, streaming engines can operate on both bounded and unbounded sources, emitting results as soon as they are available.

In short: Arroyo lets you ask complex questions of high-volume real-time data with sub-second results.

## Key Features
- Real-time SQL queries on streaming data
- Stateful processing with exactly-once semantics  
- Connectors for Kafka, PostgreSQL, HTTP endpoints, and more
- Horizontal scalability for handling large data volumes
- Built-in checkpointing and fault tolerance
- Interactive query development environment
- Support for complex event processing, windowing, and joins
- WebAssembly-based UDFs for custom processing logic
- Designed for cloud-native deployments

This template provisions Arroyo with PostgreSQL on Railway, with automatic database migrations, making it easy to start building real-time data applications without complex infrastructure setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Arroyo | [kadumedim/arroyo-template](https://github.com/kadumedim/arroyo-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Arroyo | 5115 | - |
| `ARROYO__DATABASE__TYPE` | Arroyo | postgres | - |
| `ARROYO__DATABASE__POSTGRES__USER` | Arroyo | (secret) | - |
| `ARROYO__DATABASE__POSTGRES__PASSWORD` | Arroyo | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ot9yYm)
