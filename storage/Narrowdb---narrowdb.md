# Deploy Narrowdb on Railway

A lightweight columnar database engine for log and time-series data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/narrowdb)

## About

NarrowDB is a lightweight columnar database engine for log and time-series data, written in Rust. It offers 5x faster ingestion than DuckDB, 34% smaller storage, and sub-5ms analytical queries at 10M rows. It speaks the PostgreSQL wire protocol, so any Postgres client can connect directly.

NarrowDB ships as a single binary with a built-in TCP server that implements the PostgreSQL wire protocol. Deploying it on Railway requires no external dependencies — just build the Rust binary and expose the server port. Data is persisted to a single file on disk using memory-mapped I/O. Configure the listen address, port, username, and password through environment variables. Any standard PostgreSQL client, ORM, or dashboard tool can connect to it out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Narrowdb | `ghcr.io/lassejlv/narrowdb:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NARROWDB_USER` | (secret) |
| `NARROWDB_LISTEN` | 0.0.0.0:6767 |
| `NARROWDB_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 6767
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/narrowdb)
