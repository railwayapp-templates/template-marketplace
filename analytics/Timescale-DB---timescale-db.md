# Deploy Timescale-DB on Railway

greSQL for time-series data, with a browser SQL console

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/timescale-db)

## About

TimescaleDB is a PostgreSQL extension that turns an ordinary Postgres database into a time-series engine. It adds hypertables, which transparently partition a table into time-based chunks, plus continuous aggregates, columnstore compression and retention policies — while keeping everything else about Postgres intact, so the same SQL, drivers, ORMs and backup tools still work. Teams use it for metrics, IoT readings, financial ticks and application events: tables that grow forever and are almost always queried by time. Self-host TimescaleDB when you want that on infrastructure you control, without moving relational data into a second, unfamiliar database.

Deploy TimescaleDB on Railway and you get the database plus a browser SQL console in one project. The database runs the official `timescale/timescaledb-ha` image — TimescaleDB, Toolkit, pgvector, pgvectorscale and PostGIS on PostgreSQL 18 — and keeps its cluster on a persistent volume. Other services reach it over Railway's private network; `psql`, Grafana or DBeaver reach it through a TCP proxy. Alongside it, a **pgweb** service serves a UI for browsing tables and running queries, behind HTTP basic auth and locked to this one database.

![Diagram of the TimescaleDB and pgweb services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787458055/timescaledb-architecture.png)

A hypertable behaves like a single table, but rows land in chunks partitioned by time. Queries filtered on time touch only the chunks they need, inserts hit the newest chunk, and dropping old data becomes a metadata operation instead of a `DELETE` over millions of rows. On top of that, TimescaleDB adds:

- **Continuous aggregates** — rollups that refresh incrementally in the background, so a dashboard query over a month of raw readings answers from a small pre-computed table.
- **Columnstore compression** — older chunks convert to a columnar layout, usually shrinking storage several times over while staying fully queryable.
- **Retention and reordering policies** — jobs that drop, compress or reorder chunks on a schedule you define in SQL.
- **Hyperfunctions and Toolkit** — `time_bucket`, gap filling, LOCF and approximate percentiles.
- **Everything Postgres already has** — joins, JSONB, PostGIS geometry, pgvector embeddings, roles and row-level security.

InfluxDB and QuestDB win benchmarks on raw ingest rate; TimescaleDB wins when time-series data has to be joined to the customers, devices or accounts already sitting in Postgres. Self-hosting suits teams already running Postgres, or with compliance reasons to keep data on their own infrastructure. pgweb exists so the deployment is usable the moment it is live: a small Go binary that talks to the database privately and owns no state of its own.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TimescaleDB | [gridalpha/timescaledb-railway](https://github.com/gridalpha/timescaledb-railway) | Database |
| pgweb | `sosedoff/pgweb:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_DB` | TimescaleDB | tsdb | Application database, created at boot |
| `APP_USER` | TimescaleDB | (secret) | Application role that owns APP_DB |
| `APP_PASSWORD` | TimescaleDB | (secret) | Application role password |
| `DATABASE_URL` | TimescaleDB | - | Private connection string |
| `POSTGRES_SSL` | TimescaleDB | on | Serve TLS with a generated certificate |
| `POSTGRES_PASSWORD` | TimescaleDB | (secret) | Superuser password, set on first boot |
| `DATABASE_PUBLIC_URL` | TimescaleDB | - | External connection string |
| `TIMESCALEDB_TELEMETRY` | TimescaleDB | off | Upstream telemetry, off by default |
| `PORT` | pgweb | 9090 | Anonymous metrics listener, used for health checks |
| `PGWEB_AUTH_PASS` | pgweb | - | HTTP basic auth password |
| `PGWEB_AUTH_USER` | pgweb | (secret) | HTTP basic auth username |
| `PGWEB_DATABASE_URL` | pgweb | - | Database the console is locked to |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/home/postgres/pgdata`
- **Start command:** `/bin/sh -c 'exec /usr/bin/pgweb --bind=0.0.0.0 --listen=8081 --skip-open --lock-session --open-retry=60 --open-retry-delay=5 --metrics --metrics-addr=:9090 --metrics-path=/metrics --auth-user="$PGWEB_AUTH_USER" --auth-pass="$PGWEB_AUTH_PASS"'`
- **Healthcheck:** `/metrics`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/timescale-db)
