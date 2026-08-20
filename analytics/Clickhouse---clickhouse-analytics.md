# Deploy Clickhouse on Railway

Columnar database for fast analytics queries over very large tables

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickhouse-analytics)

## About

ClickHouse is an open-source columnar database built for analytical queries over very large tables. It stores each column separately, compresses it hard, and scans billions of rows per second on ordinary hardware — which is why it sits underneath Plausible, PostHog, Langfuse and most self-hosted event pipelines. Teams reach for it when Postgres starts timing out on a `GROUP BY` over a year of events.

Deploy ClickHouse on Railway as a replicated cluster rather than a single container. This template runs upstream's *replication for fault tolerance* topology: one shard held by two servers, `clickhouse-1` and `clickhouse-2`; a three-node ClickHouse Keeper ensemble, `keeper-1` to `keeper-3`, coordinating them; and a Caddy `proxy` owning the only public domain. Rows written to either replica appear on both, and the proxy routes to the first healthy one, failing over when it stops answering. Self-host ClickHouse on Railway and all five stateful nodes keep a volume at `/var/lib/clickhouse`.

![Diagram of ClickHouse, Keeper and proxy services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787126364/clickhouse-architecture.png)

ClickHouse answers analytical questions — counts, sums, percentiles, funnels — over tables too big for a row store to scan interactively. It does not replace a transactional database; it goes beside one when reporting queries start hurting. Self-host it when per-query cloud pricing turns unpredictable, or when the data cannot leave your infrastructure.

Key features:

- **Columnar storage with aggressive compression** — often 10x or better on event data
- **Vectorised execution** scanning hundreds of millions of rows per second per core
- **`ReplicatedMergeTree`** — multi-master replication, either replica taking writes
- **Materialised views** that roll data up as it is inserted, not on a schedule
- **Table engines** reading Kafka, S3, Postgres and MySQL directly

Each service has one job. **clickhouse-1** and **clickhouse-2** are full copies of the same shard, each with its own volume, serving HTTP on 8123 and the native protocol on 9000, and exchanging data parts on 9009. **keeper-1** to **keeper-3** hold the replication log and decide which replica merges which part. **proxy** is Caddy, holding the public HTTPS endpoint and health-checking both replicas on `/ping`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse-2 | [gridalpha/clickhouse-railway](https://github.com/gridalpha/clickhouse-railway) (root: server) | Database |
| keeper-2 | [gridalpha/clickhouse-railway](https://github.com/gridalpha/clickhouse-railway) (root: keeper) | Database |
| clickhouse-1 | [gridalpha/clickhouse-railway](https://github.com/gridalpha/clickhouse-railway) (root: server) | Database |
| keeper-1 | [gridalpha/clickhouse-railway](https://github.com/gridalpha/clickhouse-railway) (root: keeper) | Database |
| proxy | [gridalpha/clickhouse-railway](https://github.com/gridalpha/clickhouse-railway) (root: proxy) | Web service |
| keeper-3 | [gridalpha/clickhouse-railway](https://github.com/gridalpha/clickhouse-railway) (root: keeper) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | clickhouse-2 | 8123 | Health-check port, HTTP interface |
| `KEEPER_HOSTS` | clickhouse-2 | - | Keeper ensemble, in raft id order |
| `CLICKHOUSE_USER` | clickhouse-2 | (secret) | ClickHouse account name |
| `CLICKHOUSE_PASSWORD` | clickhouse-2 | (secret) | Must match replica 1 |
| `CLICKHOUSE_REPLICAS` | clickhouse-2 | - | Every replica in the shard |
| `CLICKHOUSE_REPLICA_ID` | clickhouse-2 | 02 | The {replica} macro, unique per replica |
| `PORT` | keeper-2 | 9182 | Readiness endpoint port |
| `KEEPER_HOSTS` | keeper-2 | - | Keeper ensemble, in raft id order |
| `KEEPER_SERVER_ID` | keeper-2 | 2 | Raft id, matches position in KEEPER_HOSTS |
| `PORT` | clickhouse-1 | 8123 | Health-check port, HTTP interface |
| `KEEPER_HOSTS` | clickhouse-1 | - | Keeper ensemble, in raft id order |
| `CLICKHOUSE_USER` | clickhouse-1 | (secret) | ClickHouse account name |
| `CLICKHOUSE_PASSWORD` | clickhouse-1 | (secret) | Password for the default user |
| `CLICKHOUSE_REPLICAS` | clickhouse-1 | - | Every replica in the shard |
| `CLICKHOUSE_REPLICA_ID` | clickhouse-1 | 01 | The {replica} macro, unique per replica |
| `PORT` | keeper-1 | 9182 | Readiness endpoint port |
| `KEEPER_HOSTS` | keeper-1 | - | Keeper ensemble, in raft id order |
| `KEEPER_SERVER_ID` | keeper-1 | 1 | Raft id, matches position in KEEPER_HOSTS |
| `PORT` | proxy | 8080 | Caddy listening port |
| `CLICKHOUSE_UPSTREAMS` | proxy | - | Replicas the proxy balances |
| `PORT` | keeper-3 | 9182 | Readiness endpoint port |
| `KEEPER_HOSTS` | keeper-3 | - | Keeper ensemble, in raft id order |
| `KEEPER_SERVER_ID` | keeper-3 | 3 | Raft id, matches position in KEEPER_HOSTS |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/clickhouse-analytics)
