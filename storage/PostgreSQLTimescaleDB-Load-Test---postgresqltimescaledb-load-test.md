# Deploy PostgreSQL/TimescaleDB Load Test on Railway

🚀 Database performance testing tool with replication lag measurement

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresqltimescaledb-load-test)

## About

**PostgreSQL/TimescaleDB Load Test** is a comprehensive database performance testing tool designed to benchmark your PostgreSQL and TimescaleDB clusters. It measures throughput, latency, and replication lag across multiple test scenarios—from light reads to stress tests—providing detailed statistics including P50, P95, and P99 percentiles.

Deploying this load testing tool on Railway allows you to benchmark your database directly from within the internal network, eliminating external latency and providing accurate performance metrics. The tool automatically connects to your Primary and Replica nodes, runs 10 different test scenarios (simple reads/writes, batch inserts, time-series operations, and aggregation queries), and measures replication lag in real-time. It features Railway-friendly logging that automatically disables ANSI colors, ensuring clean logs in your dashboard. Simply configure the database connection environment variables and deploy—results appear instantly in your logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DB LoadTest | [icueth/railsway-timescaledb-replica](https://github.com/icueth/railsway-timescaledb-replica) (root: /loadtest-db) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_HOST` | your-primary-db.railway.internal | - |
| `DB_NAME` | postgres | Replica (Optional - for lag test) |
| `DB_PORT` | 5432 | - |
| `DB_USER` | (secret) | - |
| `DB_PASSWORD` | (secret) | - |
| `REPLICA_HOST` | your-replica-db.railway.internal | - |
| `REPLICA_PORT` | 5432 | - |
| `ENABLE_REPLICATION_TEST` | true | - |

**Category:** Storage · **Languages:** Go, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/postgresqltimescaledb-load-test)
