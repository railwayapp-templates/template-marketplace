# Deploy pg_easy_replicate on Railway

Set up logical replication between two PostgreSQL databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/MfqQcU)

## About

This templates deploys [`pg_easy_replicate`](https://github.com/shayonj/pg_easy_replicate) on Railway.

`pg_easy_replicate` is a CLI orchestrator tool that simplifies the process of setting up [logical replication](https://www.postgresql.org/docs/current/logical-replication.html) between two PostgreSQL databases. `pg_easy_replicate` also supports switchover. After the source (primary database) is fully replicated, `pg_easy_replicate` puts it into read-only mode and via logical replication flushes all data to the new target database. This ensures zero data loss and minimal downtime for the application. This method can be useful for performing minimal downtime (up to &lt;1min, depending) major version upgrades between a Blue/Green PostgreSQL database setup, load testing and other similar use cases.

Learn more at https://github.com/shayonj/pg_easy_replicate.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pg_easy_replicate | `shayonj/pg_easy_replicate:latest` | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SOURCE_DB_URL` | Connection URL to source database. |
| `TARGET_DB_URL` | Connection URL to target database. |

**Category:** Storage

[View on Railway →](https://railway.com/template/MfqQcU)
