# Deploy ClickHouse Cluster on Railway

3-shard ClickHouse cluster with 2x replication

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/clickhouse-cluster)

## About

ClickHouse is a fast open-source column-oriented database management system that provides high-performance analytics and real-time data processing capabilities. It is designed for online analytical processing (OLAP) workloads and is widely used for data warehousing, business intelligence, and real-time analytics applications that require processing large volumes of data.

Hosting a ClickHouse cluster gives you access to a distributed analytical database capable of handling massive concurrent queries, managing terabyte-scale data persistence, and supporting high availability across multiple nodes. This template provides a pre-configured cluster with 3 shards and 2 replicas per shard, and efficient columnar storage with zstd compression enabled by default. The database excels at real-time analytics, complex aggregation queries, and distributed query processing across cluster nodes. ClickHouse cluster deployments benefit from scalable CPU, RAM, and storage resources while supporting network security through Railway's private network capabilities. Railway provides automated backup systems and comprehensive logging to support your distributed database operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse Keeper K1 | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /clickhouse_keeper) | Database |
| ClickHouse S1R2 | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /clickhouse) | Database |
| ClickHouse S2R1 | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /clickhouse) | Database |
| ClickHouse S2R2 | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /clickhouse) | Database |
| Main Proxy | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /proxy) | TCP service |
| ClickHouse S1R1 | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /clickhouse) | TCP service |
| ClickHouse Keeper K3 | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /clickhouse_keeper) | Database |
| ClickHouse S3R2 | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /clickhouse) | Database |
| ClickHouse S3R1 | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /clickhouse) | Database |
| ClickHouse Keeper K2 | [railwayapp-templates/clickhouse-cluster](https://github.com/railwayapp-templates/clickhouse-cluster) (root: /clickhouse_keeper) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `KEEPER_ID` | ClickHouse Keeper K1 | 1 |
| `PORT` | ClickHouse S1R2 | 8123 |
| `CH_USER` | ClickHouse S1R2 | (secret) |
| `CH_SHARD` | ClickHouse S1R2 | shard_1 |
| `CH_REPLICA` | ClickHouse S1R2 | replica_2 |
| `CH_PASSWORD` | ClickHouse S1R2 | (secret) |
| `PORT` | ClickHouse S2R1 | 8123 |
| `CH_USER` | ClickHouse S2R1 | (secret) |
| `CH_SHARD` | ClickHouse S2R1 | shard_2 |
| `CH_REPLICA` | ClickHouse S2R1 | replica_1 |
| `CH_PASSWORD` | ClickHouse S2R1 | (secret) |
| `PORT` | ClickHouse S2R2 | 8123 |
| `CH_USER` | ClickHouse S2R2 | (secret) |
| `CH_SHARD` | ClickHouse S2R2 | shard_2 |
| `CH_REPLICA` | ClickHouse S2R2 | replica_2 |
| `CH_PASSWORD` | ClickHouse S2R2 | (secret) |
| `HA_PROXY_STATS_PASSWORD` | Main Proxy | (secret) |
| `HA_PROXY_STATS_USERNAME` | Main Proxy | (secret) |
| `PORT` | ClickHouse S1R1 | 8123 |
| `CH_USER` | ClickHouse S1R1 | (secret) |
| `CH_SHARD` | ClickHouse S1R1 | shard_1 |
| `CH_REPLICA` | ClickHouse S1R1 | replica_1 |
| `CH_PASSWORD` | ClickHouse S1R1 | (secret) |
| `KEEPER_ID` | ClickHouse Keeper K3 | 3 |
| `PORT` | ClickHouse S3R2 | 8123 |
| `CH_USER` | ClickHouse S3R2 | (secret) |
| `CH_SHARD` | ClickHouse S3R2 | shard_3 |
| `CH_REPLICA` | ClickHouse S3R2 | replica_2 |
| `CH_PASSWORD` | ClickHouse S3R2 | (secret) |
| `PORT` | ClickHouse S3R1 | 8123 |
| `CH_USER` | ClickHouse S3R1 | (secret) |
| `CH_SHARD` | ClickHouse S3R1 | shard_3 |
| `CH_REPLICA` | ClickHouse S3R1 | replica_1 |
| `CH_PASSWORD` | ClickHouse S3R1 | (secret) |
| `KEEPER_ID` | ClickHouse Keeper K2 | 2 |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/replicas_status`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 9000

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/clickhouse-cluster)
