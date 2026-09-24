# Deploy QuestDB on Railway

QuestDB 10 time-series database with auth, ILP ingest and Postgres wire.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/questdb-1)

## About

QuestDB is a high-performance open-source time-series database with SQL. It ingests millions of rows per second through the InfluxDB Line Protocol, queries with SQL extensions for time series such as SAMPLE BY and ASOF JOIN, and speaks the PostgreSQL wire protocol, so existing drivers and tools like Grafana work.

This template deploys QuestDB 10.0.1 with its data on a Railway volume. The web console and REST API are on the public domain behind HTTP basic auth, and the PostgreSQL wire protocol is exposed through a Railway TCP proxy with its own generated password. Services on Railway can use port 8812 over the private network. The health endpoint on port 9003 is unauthenticated for Railway's health check. Telemetry is off. QuestDB uses memory-mapped files, so give it RAM to match your working set; the Hobby plan fits small workloads. Back up the volume regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| questdb | `questdb/questdb:10.0.1` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9003 |
| `QDB_PG_USER` | (secret) |
| `QDB_HTTP_USER` | (secret) |
| `QDB_PG_PASSWORD` | (secret) |
| `QDB_HTTP_PASSWORD` | (secret) |
| `QDB_TELEMETRY_ENABLED` | false |
| `QDB_HTTP_HEALTH_CHECK_AUTHENTICATION_REQUIRED` | false |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8812
- **Volume:** `/var/lib/questdb`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/questdb-1)
