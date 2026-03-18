# Deploy Redis HA (w/ Sentinel) on Railway

One-click Redis replica set with Sentinel for automated failover

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/redis-ha-w-sentinel)

## About

Redis HA with Sentinel is an open-source topology that provides automated failover for a single-writer Redis setup. Three Sentinel processes monitor a Redis primary and its replicas; if the primary becomes unavailable, a replica is promoted to master and the others are reconfigured automatically. Clients discover the current master via Sentinel, not a fixed hostname.

This template deploys a production-ready, Sentinel-managed Redis stack on Railway. It provisions three Redis services (1 primary + 2 replicas), plus three Redis Sentinel services (port 26379) for monitoring and automated failover. All services communicate over Railway’s private network using internal DNS and shared credentials referenced via service variables. On failover, a replica is promoted to master and the returning old primary rejoins as a replica (no automatic “failback”). Clients should be Sentinel-aware to always route writes to the current master. Obs: TCP Proxy is already exposed on sentinels.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis Replica 1 | `redis:8.4.0` | Database |
| Redis Sentinel 1 | `redis:8.4.0` | Database |
| Redis Sentinel 2 | `redis:8.4.0` | Database |
| Redis Primary | `redis:8.4.0` | Database |
| Redis Replica 2 | `redis:8.4.0` | Database |
| Redis Sentinel 3 | `redis:8.4.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis Replica 1 | 6379 |
| `REDISUSER` | Redis Replica 1 | default |
| `REDISPASSWORD` | Redis Replica 1 | (secret) |
| `REDIS_PASSWORD` | Redis Replica 1 | (secret) |
| `SENTINEL_PORT` | Redis Sentinel 1 | 26379 |
| `SENTINEL_QUORUM` | Redis Sentinel 1 | 2 |
| `REDIS_PRIMARY_NAME` | Redis Sentinel 1 | myprimary |
| `REDIS_DOWN_AFTER_MS` | Redis Sentinel 1 | 5000 |
| `SENTINEL_PARALLEL_SYNCS` | Redis Sentinel 1 | 1 |
| `REDIS_FAILOVER_TIMEOUT_MS` | Redis Sentinel 1 | 180000 |
| `SENTINEL_PORT` | Redis Sentinel 2 | 26379 |
| `SENTINEL_QUORUM` | Redis Sentinel 2 | 2 |
| `REDIS_PRIMARY_NAME` | Redis Sentinel 2 | myprimary |
| `REDIS_DOWN_AFTER_MS` | Redis Sentinel 2 | 5000 |
| `SENTINEL_PARALLEL_SYNCS` | Redis Sentinel 2 | 1 |
| `REDIS_FAILOVER_TIMEOUT_MS` | Redis Sentinel 2 | 180000 |
| `REDISPORT` | Redis Primary | 6379 |
| `REDISUSER` | Redis Primary | default |
| `REDISPASSWORD` | Redis Primary | (secret) |
| `REDIS_PASSWORD` | Redis Primary | (secret) |
| `REDISPORT` | Redis Replica 2 | 6379 |
| `REDISUSER` | Redis Replica 2 | default |
| `REDISPASSWORD` | Redis Replica 2 | (secret) |
| `REDIS_PASSWORD` | Redis Replica 2 | (secret) |
| `SENTINEL_PORT` | Redis Sentinel 3 | 26379 |
| `SENTINEL_QUORUM` | Redis Sentinel 3 | 2 |
| `REDIS_PRIMARY_NAME` | Redis Sentinel 3 | myprimary |
| `REDIS_DOWN_AFTER_MS` | Redis Sentinel 3 | 5000 |
| `SENTINEL_PARALLEL_SYNCS` | Redis Sentinel 3 | 1 |
| `REDIS_FAILOVER_TIMEOUT_MS` | Redis Sentinel 3 | 180000 |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --masterauth $MASTER_PASS --replicaof $MASTER_HOST $MASTER_PORT --appendonly yes --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH" --protected-mode no`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'printf "%s\n" \ "protected-mode no" \ "port ${SENTINEL_PORT:-26379}" \ "" \ "sentinel monitor ${REDIS_PRIMARY_NAME} ${MASTER_HOST} ${MASTER_PORT} ${SENTINEL_QUORUM}" \ "sentinel auth-pass ${REDIS_PRIMARY_NAME} ${MASTER_PASS}" \ "sentinel down-after-milliseconds ${REDIS_PRIMARY_NAME} ${REDIS_DOWN_AFTER_MS}" \ "sentinel failover-timeout ${REDIS_PRIMARY_NAME} ${REDIS_FAILOVER_TIMEOUT_MS}" \ "sentinel parallel-syncs ${REDIS_PRIMARY_NAME} ${SENTINEL_PARALLEL_SYNCS}" \ "sentinel resolve-hostnames yes" \ "sentinel announce-hostnames yes" \ > /tmp/sentinel.conf && exec docker-entrypoint.sh redis-server /tmp/sentinel.conf --sentinel'`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Storage

[View on Railway →](https://railway.com/template/redis-ha-w-sentinel)
