# Deploy Redis HA on Railway

Redis HA cluster with colocated Sentinel and HAProxy entry point

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-ha)

## About

# Redis HA

A highly available Redis cluster using:
- **Redis + Sentinel (colocated)** on each node (ports 6379 / 26379)
- **HAProxy** for client connections, routing writes to the node reporting `role:master`

## Architecture

- **Redis-1 (Primary)**: Current master (may change after failover)
- **Redis-2+ (Replicas)**: Streaming replicas that promote on primary loss
- **Redis HA (Edge)**: HAProxy entry point — use this for all client connections

Minimum 3 Redis nodes: Sentinel requires a majority to authorize failover, so a 2-node
cluster split-brains on a symmetric partition. 3 nodes (quorum 2) tolerate 1 node loss.

## Connecting

Use the `REDIS_URL` or `REDIS_PUBLIC_URL` from the "Redis HA" (HAProxy) service.
Do not connect directly to individual Redis nodes.

## Scaling

- **Replicas**: scale from 2-5 using the cluster overview
- Sentinel quorum is `ceil(nodes/2)` - defaults are sized for 3 total nodes

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis HA | `ghcr.io/railwayapp-templates/redis-ha/haproxy:3.2-alpine` | Database |
| Redis-1 | `ghcr.io/railwayapp-templates/redis-ha/redis-sentinel:7-bookworm` | Database |
| Redis-2 | `ghcr.io/railwayapp-templates/redis-ha/redis-sentinel:7-bookworm` | Database |
| Redis-3 | `ghcr.io/railwayapp-templates/redis-ha/redis-sentinel:7-bookworm` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PORT` | Redis HA | 6379 |
| `REDIS_PASSWORD` | Redis HA | (secret) |
| `HAPROXY_MAX_CONN` | Redis HA | 10000 |
| `HAPROXY_TIMEOUT_CHECK` | Redis HA | 3s |
| `HAPROXY_CHECK_INTERVAL` | Redis HA | 3s |
| `HAPROXY_TIMEOUT_CLIENT` | Redis HA | 30m |
| `HAPROXY_TIMEOUT_SERVER` | Redis HA | 30m |
| `HAPROXY_CHECK_DOWNINTER` | Redis HA | 500ms |
| `HAPROXY_CHECK_FASTINTER` | Redis HA | 500ms |
| `HAPROXY_TIMEOUT_CONNECT` | Redis HA | 10s |
| `REDIS_PORT` | Redis-1 | 6379 |
| `HEALTH_PORT` | Redis-1 | 8080 |
| `SENTINEL_PORT` | Redis-1 | 26379 |
| `REDIS_PASSWORD` | Redis-1 | (secret) |
| `SENTINEL_QUORUM` | Redis-1 | 2 |
| `REDIS_APPENDONLY` | Redis-1 | yes |
| `SENTINEL_ENABLED` | Redis-1 | true |
| `REDIS_MASTER_NAME` | Redis-1 | mymaster |
| `REDIS_PARALLEL_SYNCS` | Redis-1 | 1 |
| `SENTINEL_DOWN_AFTER_MS` | Redis-1 | 5000 |
| `REDIS_MIN_REPLICAS_MAX_LAG` | Redis-1 | 10 |
| `SENTINEL_RESOLVE_HOSTNAMES` | Redis-1 | yes |
| `REDIS_MIN_REPLICAS_TO_WRITE` | Redis-1 | 1 |
| `SENTINEL_ANNOUNCE_HOSTNAMES` | Redis-1 | yes |
| `SENTINEL_FAILOVER_TIMEOUT_MS` | Redis-1 | 30000 |
| `SENTINEL_PORT` | Redis-2 | 26379 |
| `REDIS_PASSWORD` | Redis-2 | (secret) |
| `SENTINEL_ENABLED` | Redis-2 | true |
| `SENTINEL_PORT` | Redis-3 | 26379 |
| `REDIS_PASSWORD` | Redis-3 | (secret) |
| `SENTINEL_ENABLED` | Redis-3 | true |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-ha)
