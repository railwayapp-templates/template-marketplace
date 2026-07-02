# Deploy Dragonfly — Redis Replacement, 25x Faster, No Cluster on Railway

Self-host Dragonfly: drop-in Redis replacement, 25x throughput. No cluster.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dragonfly-redis-replacement)

## About

![Dragonfly in-memory datastore](https://raw.githubusercontent.com/INAPP-Mobile/railway-dragonfly/main/og-image.svg)

Dragonfly is the modern in-memory datastore with **30k+ GitHub stars** — a drop-in replacement
for Redis, Memcached, and Valkey that delivers **up to 25x the throughput** on a single node
while using up to 80% fewer resources. Built from scratch in C++ with a multi-threaded,
shared-nothing architecture, Dragonfly scales vertically across every CPU core with no cluster
to manage. It speaks the Redis wire protocol natively, so you switch by changing one connection
string — no code changes, same client libraries, same CLI.

Self-host on Railway for ~$5/month with a persistent volume. One Dragonfly instance can replace
an entire Redis cluster for most production workloads — at a fraction of the memory and compute.

---

Redis and Valkey are single-threaded at the core — scaling them means running a cluster with
network hops, rebalancing, and failover risk. Dragonfly's shared-nothing design gives each shard
its own CPU core with no locks, so it scales by adding cores to one box instead of nodes to a
cluster — dramatically higher throughput at up to 80% lower cost for the same workload.

Railway runs Dragonfly as a managed container with a persistent volume and private networking.
Point your existing Redis client at the Dragonfly host and port, and you're done.

Typical cost: **~$5/month** on Railway's Hobby plan for a Dragonfly instance that can handle
workloads it would take a multi-node Redis cluster to serve. Managed Redis clouds bill per-node
and per-GB; Dragonfly on Railway is flat compute with far more headroom per dollar.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dragonfly | `dragonflydb/dragonfly:v1.27.1` | Database |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dragonfly-redis-replacement)
