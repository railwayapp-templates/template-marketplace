# Deploy ParadeDB on Railway

Simple, Elastic-quality search for Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paradedb)

## About

You want better search, not the burden of Elasticsearch. [ParadeDB](https://paradedb.com) is the modern Elastic alternative built as a Postgres extension.

For support, join the ParadeDB Community Slack: https://paradedb.com/slack

ParadeDB runs as a Postgres extension inside a standard PostgreSQL instance. The ParadeDB Docker image ships with pg_search pre-installed on PostgreSQL 18. There is no separate search service to manage — search indexes live in Postgres and are updated transactionally with your data. Deploying on Railway provisions a Docker container with persistent storage and a TCP proxy, giving you a fully functional ParadeDB instance accessible over both private and public connection strings.

For more information on deploying and hosting ParadeDB, see the [ParadeDB deployment documentation](https://docs.paradedb.com/deploy/overview).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ParadeDB | `paradedb/paradedb:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | paradedb | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "unset PGHOST; unset PGPORT; exec docker-entrypoint.sh postgres --port=5432 -c listen_addresses=*"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/paradedb)
