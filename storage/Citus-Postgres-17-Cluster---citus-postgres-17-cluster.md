# Deploy Citus Postgres 17 Cluster on Railway

Deploy and host a Citus Postgres 17 Cluster with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/citus-postgres-17-cluster)

## About

A Citus cluster is a horizontally scalable PostgreSQL deployment powered by the Citus extension. It distributes tables across many worker nodes, enabling high performance for large datasets, parallel query execution, and multi-node transactional workloads — all while keeping the familiar PostgreSQL interface.

Hosting a Citus Postgres 17 Cluster involves deploying a coordinator node and a set of worker nodes, all running Postgres 17 with the Citus extension enabled. The coordinator routes queries and keeps metadata, while workers store shard data and execute operations in parallel. Deploying this on Railway automates the creation, networking, and lifecycle management of each node. With Railway’s environment variables, service linking, and orchestration tools, you can set up a distributed Postgres system with minimal configuration and scale nodes up or down as needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker2 | [castab/citus-postgres-17-ssl](https://github.com/castab/citus-postgres-17-ssl) (root: worker) | Database |
| coordinator | [castab/citus-postgres-17-ssl](https://github.com/castab/citus-postgres-17-ssl) (root: coordinator) | Database |
| worker1 | [castab/citus-postgres-17-ssl](https://github.com/castab/citus-postgres-17-ssl) (root: worker) | Database |
| registrar | [castab/citus-postgres-17-ssl](https://github.com/castab/citus-postgres-17-ssl) (root: registrar) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | worker2 | postgres |
| `POSTGRES_USER` | worker2 | (secret) |
| `POSTGRES_PASSWORD` | worker2 | (secret) |
| `POSTGRES_DB` | coordinator | postgres |
| `POSTGRES_USER` | coordinator | (secret) |
| `POSTGRES_PASSWORD` | coordinator | (secret) |
| `POSTGRES_DB` | worker1 | postgres |
| `POSTGRES_USER` | worker1 | (secret) |
| `POSTGRES_PASSWORD` | worker1 | (secret) |
| `POSTGRES_USER` | registrar | (secret) |
| `COORDINATOR_HOST` | registrar | coordinator.railway.internal |
| `POSTGRES_PASSWORD` | registrar | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 5432

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/citus-postgres-17-cluster)
