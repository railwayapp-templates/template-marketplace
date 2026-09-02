# Deploy StarRocks on Railway

Fast SQL OLAP database for analyzing large amounts of data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/starrocks-analytics)

## About

StarRocks is an open-source MPP analytical database that answers joins and aggregations over hundreds of millions of rows in well under a second, over the MySQL wire protocol. Teams reach for it when a read replica stops keeping up with a dashboard, or when they want one engine for freshly ingested rows and for historical tables in Apache Iceberg. Any MySQL client connects, so dbt, Superset, Metabase and Grafana work on day one.

This template runs StarRocks in its **shared-data** architecture, separating compute from storage. A frontend node (FE) owns metadata, parses SQL and plans queries; a compute node (CN) executes every query and load; and an S3-compatible bucket holds every tablet. The compute tier keeps only a local cache, so you can self-host StarRocks without sizing a disk for your dataset up front. The frontend is published on a Railway domain for its console and REST API, and on a TCP proxy for MySQL clients.

![Diagram of the StarRocks frontend and compute node on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788258342/starrocks-architecture.png)

StarRocks is a columnar, vectorized MPP engine built for analytics fast enough to sit in front of users rather than behind a nightly job. Self-hosting suits teams for whom query latency is a product feature, or who want warehouse-grade SQL without per-query billing.

- Sub-second aggregations and joins from a vectorized engine with a cost-based optimizer
- MySQL protocol compatibility, so existing BI tools and drivers connect unchanged
- Real-time upserts through primary-key tables, not only appends
- Asynchronous materialized views with automatic query rewrite, so a dashboard query is answered from a pre-aggregate without changing the SQL
- External catalogs for Iceberg, Delta Lake, Hudi, Hive and JDBC, so one engine queries live and lake tables

**starrocks-fe** holds the catalog, plans queries and terminates client connections, keeping its metadata journal on a volume. **starrocks-cn** reads tablets from object storage and executes the fragments it is handed, using its volume purely as a cache. **starrocks-storage** is the system of record for your tables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| starrocks-cn | [gridalpha/starrocks-railway](https://github.com/gridalpha/starrocks-railway) | Database |
| starrocks-fe | [gridalpha/starrocks-railway](https://github.com/gridalpha/starrocks-railway) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | starrocks-cn | 8040 | Compute node HTTP port |
| `SR_FE_HOST` | starrocks-cn | - | Private hostname of the frontend |
| `SR_ROOT_PASSWORD` | starrocks-cn | (secret) | Used to register with the frontend |
| `PORT` | starrocks-fe | 8030 | HTTP console and REST API port |
| `SR_S3_BUCKET` | starrocks-fe | - | Bucket holding every tablet |
| `SR_S3_PREFIX` | starrocks-fe | starrocks | Key prefix inside the bucket |
| `SR_S3_REGION` | starrocks-fe | - | Bucket region |
| `SR_S3_ENDPOINT` | starrocks-fe | - | S3 endpoint URL |
| `SR_ROOT_PASSWORD` | starrocks-fe | (secret) | Password for the root superuser |
| `SR_S3_ACCESS_KEY_ID` | starrocks-fe | - | Bucket access key |
| `SR_S3_SECRET_ACCESS_KEY` | starrocks-fe | (secret) | Bucket secret key |

## Configuration

- **Healthcheck:** `/api/health`
- **Volume:** `/data`
- **Healthcheck:** `/api/bootstrap`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 9030

**Category:** Analytics · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/starrocks-analytics)
