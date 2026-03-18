# Deploy ClickHouse + CH-UI on Railway

ClickHouse OLAP database with CH-UI web interface for data visualization.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickhouse-ch-ui-1)

## About

ClickHouse is an open-source column-oriented database for real-time analytics, processing billions of rows per second with 100-1000x faster query performance than traditional databases. This template pairs it with CH-UI, a modern web-based SQL editor and database explorer, connected over Railway's private network.

This template deploys a two-service stack:

- **ClickHouse**: High-performance OLAP database engine for analytical workloads
- **CH-UI**: Web-based SQL editor with multi-tab queries, database browsing, and query persistence
- **Private Networking**: CH-UI connects to ClickHouse over Railway's internal network — no database exposed to the internet
- **Persistent Storage**: Railway volume for database files and metadata

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: /solutions/clickhouse-chui/clickhouse) | Web service |
| CH-UI | `ghcr.io/caioricciuti/ch-ui:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_DB` | ClickHouse | - | Database to create on startup |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | User name to create (replaces 'default' user) |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | - |
| `CLICKHOUSE_IMAGE_TAG` | ClickHouse | - | ClickHouse Docker image tag to deploy. Check available images https://hub.docker.com/r/clickhouse/clickhouse-server |
| `CLICKHOUSE_SKIP_USER_SETUP` | ClickHouse | 0 | Skip all user configuration. WARNING: Makes default user accessible without password |
| `CLICKHOUSE_ACCESS_MANAGEMENT` | ClickHouse | 0 | Grant user access management privileges |
| `CONNECTION_NAME` | CH-UI | Railway ClickHouse | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/clickhouse-ch-ui-1)
