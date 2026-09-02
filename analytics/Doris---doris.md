# Deploy Doris on Railway

Sub-second analytics on billions of rows, self-hosted and MySQL-compatible

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/doris)

## About

Apache Doris is an open-source MPP analytical database that answers aggregations, joins and window functions over hundreds of millions of rows in well under a second, through the ordinary MySQL wire protocol. It came out of Baidu, graduated from the Apache Incubator in 2022, and runs dashboards and real-time warehouses at Xiaomi and Tencent. Teams reach for it when Postgres stops keeping up with `GROUP BY` over billions of rows but they will not give up SQL joins, upserts or the tooling they have.

Self-host Apache Doris on Railway with this template and you get a complete two-tier cluster, not a single container. A **Frontend (FE)** service holds the catalog, plans SQL and serves the web console; a **Backend (BE)** service stores every tablet and runs the vectorized execution engine. A **managed object storage bucket** is wired in as a cold tier, so partitions past a cooldown window move off local disk. The two nodes find each other over the private network by hostname, so they survive redeploys, and the cluster takes queries as soon as the deploy is green — no manual registration, no default password left in place.

![Diagram of the Doris frontend and backend services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788262485/doris-architecture.png)

Doris is a columnar, vectorized, massively parallel database for interactive analytics on data that keeps changing. Unlike most OLAP engines it has first-class primary-key upserts through its Unique Key model, so late corrections and CDC streams do not force a rewrite, and its cost-based optimizer makes multi-table joins practical rather than something to design around.

- **MySQL protocol compatibility** — existing drivers, BI tools and shells connect unchanged
- **Three table models** — Duplicate for raw events, Aggregate for rollups, Unique for upsertable rows
- **Materialized views**, synchronous rollups and asynchronous multi-table views
- **Inverted indexes** for full-text search and high-cardinality filtering
- **Stream Load and Routine Load** for HTTP micro-batches and Kafka ingestion
- **External catalogs** for querying Hive, Iceberg, Postgres and MySQL in place

Self-host it when latency, data residency or per-seat pricing rules out a hosted warehouse.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| doris-be | [gridalpha/doris-railway](https://github.com/gridalpha/doris-railway) | Database |
| doris-fe | [gridalpha/doris-railway](https://github.com/gridalpha/doris-railway) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | doris-be | 8040 | HTTP port Railway health-checks |
| `PORT` | doris-fe | 8030 | HTTP port Railway health-checks |
| `DORIS_BE_HOST` | doris-fe | - | Backend private hostname |
| `DORIS_S3_BUCKET` | doris-fe | - | Cold-tier bucket name |
| `DORIS_S3_REGION` | doris-fe | - | Cold-tier bucket region |
| `DORIS_S3_ENDPOINT` | doris-fe | - | Cold-tier S3 endpoint |
| `DORIS_S3_ROOT_PATH` | doris-fe | doris | Key prefix inside the bucket |
| `DORIS_ROOT_PASSWORD` | doris-fe | (secret) | Password for the root account |
| `DORIS_S3_ACCESS_KEY_ID` | doris-fe | - | Cold-tier access key |
| `DORIS_S3_SECRET_ACCESS_KEY` | doris-fe | (secret) | Cold-tier secret key |

## Configuration

- **Healthcheck:** `/api/health`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 9030

**Category:** Analytics · **Languages:** Shell, Berry

[View on Railway →](https://railway.com/deploy/doris)
