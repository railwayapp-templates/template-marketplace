# Deploy ClickHouse on Railway

Deploy ClickHouse OLAP database with one click - version-agnostic & secure

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/clickhouse-1)

## About

ClickHouse is an open-source column-oriented database for real-time analytics, processing billions of rows per second with 100-1000x faster query performance than traditional databases for analytical workloads.

Hosting ClickHouse requires server configuration, dependency management, networking setup, and security hardening. This template eliminates that complexity with a pre-configured deployment using official Docker images. Set a password, choose any ClickHouse version, and deploy instantly—no Docker expertise or infrastructure management required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | [nick0lay/ClickHouse](https://github.com/nick0lay/ClickHouse) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CLICKHOUSE_DB` | - | Database to create on startup |
| `CLICKHOUSE_USER` | (secret) | User name to create (replaces 'default' user) |
| `CLICKHOUSE_PASSWORD` | (secret) | User password |
| `CLICKHOUSE_IMAGE_TAG` | - | ClickHouse Docker image tag to deploy. Check available images https://hub.docker.com/r/clickhouse/clickhouse-server |
| `CLICKHOUSE_SKIP_USER_SETUP` | 0 | Skip all user configuration. WARNING: Makes default user accessible without password |
| `CLICKHOUSE_ACCESS_MANAGEMENT` | 0 | Grant user access management privileges |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** C++, Assembly, Python, Shell, C, Jinja, CMake, HTML, JavaScript, Clojure, Dockerfile, ANTLR, Rust, Java, C#, Perl, Cap'n Proto, Go, PLpgSQL, GAP, PHP, Roff, CSS, Vim Script, DIGITAL Command Language

[View on Railway →](https://railway.com/template/clickhouse-1)
