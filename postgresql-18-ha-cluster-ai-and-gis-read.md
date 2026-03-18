# Deploy 🚀 PostgreSQL 18 HA Cluster (AI & GIS Ready) on Railway

🚀 Postgres 18 HA Cluster with AI, GIS, and Cron Extensions. Ready to scale

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgresql-18-ha-cluster-ai-and-gis-read)

## About

PostgreSQL 18 HA Cluster is a production-ready, high-availability database setup featuring automatic failover, streaming replication, and load balancing via Pgpool-II. Pre-configured with pgvector for AI/ML embeddings, PostGIS for geospatial data, pg_cron for scheduled jobs, and pg_partman for table partitioning. Zero-config deployment — just set your password and go!

This template deploys a complete 3-node PostgreSQL cluster: a Primary (read/write), a Replica (read-only with streaming replication), and a Proxy (Pgpool-II for load balancing and automatic failover). All nodes are pre-configured with enterprise-grade extensions and security settings. The setup handles replication slots, user synchronization, and health checks automatically. Simply configure `POSTGRES_PASSWORD`, and optionally `POSTGRES_USER` and `POSTGRES_DB`, then deploy. The cluster initializes itself, creates replication users, and starts streaming data between nodes within seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-18-primary | [icueth/railsway-timescaledb-replica](https://github.com/icueth/railsway-timescaledb-replica) (root: /postgresql-18-ha) | Database |
| postgres-18-proxy | [icueth/railsway-timescaledb-replica](https://github.com/icueth/railsway-timescaledb-replica) (root: /postgresql-18-ha) | TCP service |
| postgres-18-replica | [icueth/railsway-timescaledb-replica](https://github.com/icueth/railsway-timescaledb-replica) (root: /postgresql-18-ha) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `TZ` | postgres-18-primary | Asia/Bangkok |
| `NODE_ROLE` | postgres-18-primary | PRIMARY |
| `POSTGRES_DB` | postgres-18-primary | postgres |
| `POSTGRES_USER` | postgres-18-primary | (secret) |
| `POSTGRES_PASSWORD` | postgres-18-primary | (secret) |
| `NODE_ROLE` | postgres-18-proxy | PROXY |
| `POSTGRES_USER` | postgres-18-proxy | (secret) |
| `POSTGRES_PASSWORD` | postgres-18-proxy | (secret) |
| `NODE_ROLE` | postgres-18-replica | REPLICA |
| `POSTGRES_USER` | postgres-18-replica | (secret) |
| `POSTGRES_PASSWORD` | postgres-18-replica | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 5432

**Category:** Other · **Languages:** Go, Shell, Dockerfile

[View on Railway →](https://railway.com/template/postgresql-18-ha-cluster-ai-and-gis-read)
