# Deploy 🚀 Redis HA Cluster (Sentinel) on Railway

🚀 High-Availability Redis featuring Master-Replica with Redis Sentinel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/redis-ha-cluster-sentinel)

## About

**Redis HA Cluster** is a production-ready, high-availability Redis deployment featuring Master-Replica replication with Redis Sentinel for automatic failover. This template provides enterprise-grade caching, session storage, and real-time messaging with zero-downtime failover capabilities.

Deploying this Redis cluster on Railway provides an instant production environment with automatic failover. The template includes three nodes: a **Master** for read/write operations, a **Replica** for read scaling and data redundancy, and a **Sentinel** that monitors the cluster and automatically promotes the replica if the master fails. All nodes feature auto-tuning based on Railway resources, ensuring optimal memory usage without manual configuration. Simply set your password and deploy—the cluster handles all internal communication automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-sentinel | [icueth/railway-template-redis-ha-cluster](https://github.com/icueth/railway-template-redis-ha-cluster) (root: /redis-sentinel) | TCP service |
| redis-replica | [icueth/railway-template-redis-ha-cluster](https://github.com/icueth/railway-template-redis-ha-cluster) (root: /redis-replica) | Worker |
| redis-master | [icueth/railway-template-redis-ha-cluster](https://github.com/icueth/railway-template-redis-ha-cluster) (root: /redis-master) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | redis-sentinel | (secret) |
| `REDIS_PASSWORD` | redis-replica | (secret) |
| `REDIS_PASSWORD` | redis-master | (secret) |

## Configuration

- **TCP Proxies:** 26379

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/redis-ha-cluster-sentinel)
