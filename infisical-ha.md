# Deploy Infisical HA on Railway

Platform to securely manage application configuration and secrets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/infisical-ha)

## About

Infisical HA is a highly available, self-hosted deployment of Infisical—the open-source secrets manager for developers and platforms. This Railway template provisions three Infisical Core nodes behind HAProxy, backed by a Patroni‑managed PostgreSQL cluster and Redis with Sentinel, delivering automated failover, redundancy, and zero‑downtime secret access in production.

This template stands up a production-grade HA topology modeled on Infisical’s Linux (HA) reference architecture. It deploys:
- Three Infisical Core services behind a top-level HAProxy
- PostgreSQL HA cluster (3 nodes) managed by Patroni with etcd for leader election and an HAProxy layer for write/read routing
- Redis HA with Sentinel (1 primary, 2 replicas, 3 sentinels) for automated failover

All services communicate over Railway’s private network using internal DNS. Configure SMTP for email/MFA, and optionally map a custom domain/TLS to the HAProxy front-end. The result is resilient, self-hosted secrets management that survives node failures and maintenance windows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-1 | `ghcr.io/railwayapp-templates/postgres-ha/postgres-patroni:17` | Database |
| etcd-2 | `ghcr.io/railwayapp-templates/postgres-ha/etcd:3` | Database |
| Redis Replica 2 | `redis:8.4.0` | Database |
| Redis Replica 1 | `redis:8.4.0` | Database |
| Infisical 1 | `infisical/infisical` | Worker |
| Infisical HAProxy | [kadumedim/infisical-haproxy](https://github.com/kadumedim/infisical-haproxy) | Web service |
| Redis Sentinel 3 | `redis:8.4.0` | Database |
| etcd-1 | `ghcr.io/railwayapp-templates/postgres-ha/etcd:3` | Database |
| HAProxy | `ghcr.io/railwayapp-templates/postgres-ha/haproxy:3` | Database |
| Redis Sentinel 2 | `redis:8.4.0` | Database |
| Infisical 3 | `infisical/infisical` | Worker |
| Redis Primary | `redis:8.4.0` | Database |
| postgres-3 | `ghcr.io/railwayapp-templates/postgres-ha/postgres-patroni:17` | Database |
| Infisical 2 | `infisical/infisical` | Worker |
| postgres-2 | `ghcr.io/railwayapp-templates/postgres-ha/postgres-patroni:17` | Database |
| etcd-3 | `ghcr.io/railwayapp-templates/postgres-ha/etcd:3` | Database |
| Redis Sentinel 1 | `redis:8.4.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PATRONI_TTL` | postgres-1 | 45 |
| `POSTGRES_DB` | postgres-1 | railway |
| `PATRONI_NAME` | postgres-1 | postgres-1 |
| `POSTGRES_USER` | postgres-1 | (secret) |
| `PATRONI_ENABLED` | postgres-1 | true |
| `PATRONI_API_PORT` | postgres-1 | 8008 |
| `PATRONI_LOOP_WAIT` | postgres-1 | 10 |
| `POSTGRES_PASSWORD` | postgres-1 | (secret) |
| `WATCHDOG_CURL_TIMEOUT` | postgres-1 | 5 |
| `PATRONI_SUPERUSER_PASSWORD` | postgres-1 | (secret) |
| `PATRONI_SUPERUSER_USERNAME` | postgres-1 | (secret) |
| `PATRONI_REPLICATION_PASSWORD` | postgres-1 | (secret) |
| `PATRONI_REPLICATION_USERNAME` | postgres-1 | (secret) |
| `WATCHDOG_CURL_CONNECT_TIMEOUT` | postgres-1 | 5 |
| `ETCD_NAME` | etcd-2 | etcd-2 |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd-2 | (secret) |
| `REDISPORT` | Redis Replica 2 | 6379 |
| `REDISUSER` | Redis Replica 2 | default |
| `REDISPASSWORD` | Redis Replica 2 | (secret) |
| `REDIS_PASSWORD` | Redis Replica 2 | (secret) |
| `REDISPORT` | Redis Replica 1 | 6379 |
| `REDISUSER` | Redis Replica 1 | default |
| `REDISPASSWORD` | Redis Replica 1 | (secret) |
| `REDIS_PASSWORD` | Redis Replica 1 | (secret) |
| `HOST` | Infisical 1 | 0.0.0.0 |
| `PORT` | Infisical 1 | 8080 |
| `AUTH_SECRET` | Infisical 1 | (secret) |
| `REDIS_PASSWORD` | Infisical 1 | (secret) |
| `PORT` | Infisical HAProxy | 8080 |
| `STATS_PORT` | Infisical HAProxy | 8404 |
| `RESOLVE_PREFER` | Infisical HAProxy | ipv4 |
| `STATS_PASSWORD` | Infisical HAProxy | (secret) |
| `SENTINEL_PORT` | Redis Sentinel 3 | 26379 |
| `SENTINEL_QUORUM` | Redis Sentinel 3 | 2 |
| `REDIS_PRIMARY_NAME` | Redis Sentinel 3 | myprimary |
| `REDIS_DOWN_AFTER_MS` | Redis Sentinel 3 | 5000 |
| `SENTINEL_PARALLEL_SYNCS` | Redis Sentinel 3 | 1 |
| `REDIS_FAILOVER_TIMEOUT_MS` | Redis Sentinel 3 | 180000 |
| `ETCD_NAME` | etcd-1 | etcd-1 |
| `ETCD_DATA_DIR` | etcd-1 | /var/lib/etcd |
| `ETCD_LISTEN_PEER_URLS` | etcd-1 | http://0.0.0.0:2380 |
| `ETCD_LISTEN_CLIENT_URLS` | etcd-1 | http://0.0.0.0:2379 |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd-1 | (secret) |
| `HAPROXY_MAX_CONN` | HAProxy | 10000 |
| `HAPROXY_CHECK_INTERVAL` | HAProxy | 3s |
| `HAPROXY_TIMEOUT_CLIENT` | HAProxy | 30m |
| `HAPROXY_TIMEOUT_SERVER` | HAProxy | 30m |
| `HAPROXY_TIMEOUT_CONNECT` | HAProxy | 10s |
| `SENTINEL_PORT` | Redis Sentinel 2 | 26379 |
| `SENTINEL_QUORUM` | Redis Sentinel 2 | 2 |
| `REDIS_PRIMARY_NAME` | Redis Sentinel 2 | myprimary |
| `REDIS_DOWN_AFTER_MS` | Redis Sentinel 2 | 5000 |
| `SENTINEL_PARALLEL_SYNCS` | Redis Sentinel 2 | 1 |
| `REDIS_FAILOVER_TIMEOUT_MS` | Redis Sentinel 2 | 180000 |
| `HOST` | Infisical 3 | 0.0.0.0 |
| `PORT` | Infisical 3 | 8080 |
| `AUTH_SECRET` | Infisical 3 | (secret) |
| `REDIS_PASSWORD` | Infisical 3 | (secret) |
| `REDISPORT` | Redis Primary | 6379 |
| `REDISUSER` | Redis Primary | default |
| `REDISPASSWORD` | Redis Primary | (secret) |
| `REDIS_PASSWORD` | Redis Primary | (secret) |
| `PATRONI_NAME` | postgres-3 | postgres-3 |
| `POSTGRES_USER` | postgres-3 | (secret) |
| `POSTGRES_PASSWORD` | postgres-3 | (secret) |
| `PATRONI_SUPERUSER_PASSWORD` | postgres-3 | (secret) |
| `PATRONI_SUPERUSER_USERNAME` | postgres-3 | (secret) |
| `PATRONI_REPLICATION_PASSWORD` | postgres-3 | (secret) |
| `PATRONI_REPLICATION_USERNAME` | postgres-3 | (secret) |
| `HOST` | Infisical 2 | 0.0.0.0 |
| `PORT` | Infisical 2 | 8080 |
| `AUTH_SECRET` | Infisical 2 | (secret) |
| `REDIS_PASSWORD` | Infisical 2 | (secret) |
| `PATRONI_NAME` | postgres-2 | postgres-2 |
| `POSTGRES_USER` | postgres-2 | (secret) |
| `POSTGRES_PASSWORD` | postgres-2 | (secret) |
| `PATRONI_SUPERUSER_PASSWORD` | postgres-2 | (secret) |
| `PATRONI_SUPERUSER_USERNAME` | postgres-2 | (secret) |
| `PATRONI_REPLICATION_PASSWORD` | postgres-2 | (secret) |
| `PATRONI_REPLICATION_USERNAME` | postgres-2 | (secret) |
| `ETCD_NAME` | etcd-3 | etcd-3 |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd-3 | (secret) |
| `SENTINEL_PORT` | Redis Sentinel 1 | 26379 |
| `SENTINEL_QUORUM` | Redis Sentinel 1 | 2 |
| `REDIS_PRIMARY_NAME` | Redis Sentinel 1 | myprimary |
| `REDIS_DOWN_AFTER_MS` | Redis Sentinel 1 | 5000 |
| `SENTINEL_PARALLEL_SYNCS` | Redis Sentinel 1 | 1 |
| `REDIS_FAILOVER_TIMEOUT_MS` | Redis Sentinel 1 | 180000 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/etcd`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --masterauth $MASTER_PASS --replicaof $MASTER_HOST $MASTER_PORT --appendonly yes --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH" --protected-mode no`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'printf "%s\n" \ "protected-mode no" \ "port ${SENTINEL_PORT:-26379}" \ "" \ "sentinel monitor ${REDIS_PRIMARY_NAME} ${MASTER_HOST} ${MASTER_PORT} ${SENTINEL_QUORUM}" \ "sentinel auth-pass ${REDIS_PRIMARY_NAME} ${MASTER_PASS}" \ "sentinel down-after-milliseconds ${REDIS_PRIMARY_NAME} ${REDIS_DOWN_AFTER_MS}" \ "sentinel failover-timeout ${REDIS_PRIMARY_NAME} ${REDIS_FAILOVER_TIMEOUT_MS}" \ "sentinel parallel-syncs ${REDIS_PRIMARY_NAME} ${SENTINEL_PARALLEL_SYNCS}" \ "sentinel resolve-hostnames yes" \ "sentinel announce-hostnames yes" \ > /tmp/sentinel.conf && exec docker-entrypoint.sh redis-server /tmp/sentinel.conf --sentinel'`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/infisical-ha)
