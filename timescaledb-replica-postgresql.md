# Deploy 🚀 TimescaleDB HA (Primary + Replica) on Railway

🚀 TimescaleDB HA: Primary + Replica with Pgpool Load Balancer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/timescaledb-replica-postgresql)

## About

**TimescaleDB Replica** is an enterprise-grade time-series database solution built on PostgreSQL 17. It combines the power of SQL with high-availability (HA) architecture, featuring a primary-replica pair and a centralized proxy for intelligent connection management, ensuring your time-series workloads are always fast, stable, and resilient.

Deploying this TimescaleDB cluster on Railway provides an out-of-the-box production environment without the operational overhead. This template utilizes a robust 3-node architecture: a **Primary** node for write operations, a **Replica** node for real-time data synchronization and heavy reads, and a **Pgpool-II Proxy** that acts as the intelligent gateway. The system includes an automated setup that handles replication slots, credential synchronization, and health monitoring. It also features a zero-config "Auto-Tuning" mechanism that optimizes your database parameters based on your assigned Railway resources, guaranteeing peak performance from the moment of deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| timescale-proxy | [icueth/railsway-timescaledb-replica](https://github.com/icueth/railsway-timescaledb-replica) (root: /proxy) | TCP service |
| timescale-primary | [icueth/railsway-timescaledb-replica](https://github.com/icueth/railsway-timescaledb-replica) | Database |
| timescale-replica | [icueth/railsway-timescaledb-replica](https://github.com/icueth/railsway-timescaledb-replica) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NODE_ROLE` | timescale-proxy | PROXY |
| `POSTGRES_USER` | timescale-proxy | (secret) |
| `POSTGRES_PASSWORD` | timescale-proxy | (secret) |
| `TZ` | timescale-primary | Asia/Bangkok |
| `NODE_ROLE` | timescale-primary | PRIMARY |
| `POSTGRES_DB` | timescale-primary | postgres |
| `POSTGRES_USER` | timescale-primary | (secret) |
| `TS_TUNE_CORES` | timescale-primary | 2 |
| `TS_TUNE_MEMORY` | timescale-primary | 2GB |
| `POSTGRES_PASSWORD` | timescale-primary | (secret) |
| `NODE_ROLE` | timescale-replica | REPLICA |
| `POSTGRES_USER` | timescale-replica | (secret) |
| `POSTGRES_PASSWORD` | timescale-replica | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Shell, Go, Dockerfile

[View on Railway →](https://railway.com/template/timescaledb-replica-postgresql)
