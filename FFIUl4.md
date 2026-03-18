# Deploy paradedb on Railway

Postgres for search and analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/FFIUl4)

## About

ParadeDB is an Elasticsearch alternative built on Postgres. We’re modernizing the features of Elasticsearch, starting with real-time search and analytics.

ParadeDB is not a fork of Postgres, but regular Postgres with custom extensions installed. ParadeDB itself ships with Postgres 16.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paradedb/paradedb:16-v0.8.4 | `paradedb/paradedb:16-v0.8.4` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | postgres |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/FFIUl4)
