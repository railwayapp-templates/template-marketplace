# Deploy Postgres HA on Railway

A Patroni based High Availability Postgres using etcd

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-ha)

## About

Patroni based High Availability system for Postgres

Replicates all data from primary to 2 secondary postgres nodes. Managed by Patroni to ensure there is only one leader at a time, using etcd as distributed consensus primitive for election.

Automatically fails over to a secondary if primary is unavailable (while invalidating primary's lease on writes).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| etcd-2 | `ghcr.io/railwayapp-templates/postgres-ha/etcd:3` | Database |
| Postgres-3 | `ghcr.io/railwayapp-templates/postgres-ha/postgres-patroni:18` | Database |
| Postgres-1 | `ghcr.io/railwayapp-templates/postgres-ha/postgres-patroni:18` | Database |
| Postgres HA | `ghcr.io/railwayapp-templates/postgres-ha/haproxy:3` | Database |
| etcd-3 | `ghcr.io/railwayapp-templates/postgres-ha/etcd:3` | Database |
| etcd-1 | `ghcr.io/railwayapp-templates/postgres-ha/etcd:3` | Database |
| Postgres-2 | `ghcr.io/railwayapp-templates/postgres-ha/postgres-patroni:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ETCD_NAME` | etcd-2 | etcd-2 |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd-2 | (secret) |
| `PATRONI_NAME` | Postgres-3 | postgres-3 |
| `POSTGRES_USER` | Postgres-3 | (secret) |
| `POSTGRES_PASSWORD` | Postgres-3 | (secret) |
| `PATRONI_WAIT_FOR_LEADER` | Postgres-3 | true |
| `PATRONI_SUPERUSER_PASSWORD` | Postgres-3 | (secret) |
| `PATRONI_SUPERUSER_USERNAME` | Postgres-3 | (secret) |
| `PATRONI_REPLICATION_PASSWORD` | Postgres-3 | (secret) |
| `PATRONI_REPLICATION_USERNAME` | Postgres-3 | (secret) |
| `PATRONI_TTL` | Postgres-1 | 45 |
| `POSTGRES_DB` | Postgres-1 | railway |
| `PATRONI_NAME` | Postgres-1 | postgres-1 |
| `POSTGRES_USER` | Postgres-1 | (secret) |
| `PATRONI_ENABLED` | Postgres-1 | true |
| `PATRONI_API_PORT` | Postgres-1 | 8008 |
| `PATRONI_LOOP_WAIT` | Postgres-1 | 10 |
| `POSTGRES_PASSWORD` | Postgres-1 | (secret) |
| `WATCHDOG_CURL_TIMEOUT` | Postgres-1 | 5 |
| `PATRONI_SUPERUSER_PASSWORD` | Postgres-1 | (secret) |
| `PATRONI_SUPERUSER_USERNAME` | Postgres-1 | (secret) |
| `PATRONI_ADOPT_EXISTING_DATA` | Postgres-1 | true |
| `PATRONI_REPLICATION_PASSWORD` | Postgres-1 | (secret) |
| `PATRONI_REPLICATION_USERNAME` | Postgres-1 | (secret) |
| `WATCHDOG_CURL_CONNECT_TIMEOUT` | Postgres-1 | 5 |
| `POSTGRES_USER` | Postgres HA | (secret) |
| `HAPROXY_MAX_CONN` | Postgres HA | 10000 |
| `POSTGRES_PASSWORD` | Postgres HA | (secret) |
| `HAPROXY_HEALTH_PORT` | Postgres HA | 8009 |
| `HAPROXY_TIMEOUT_CHECK` | Postgres HA | 3s |
| `HAPROXY_CHECK_INTERVAL` | Postgres HA | 3s |
| `HAPROXY_TIMEOUT_CLIENT` | Postgres HA | 30m |
| `HAPROXY_TIMEOUT_SERVER` | Postgres HA | 30m |
| `HAPROXY_CHECK_DOWNINTER` | Postgres HA | 500ms |
| `HAPROXY_CHECK_FASTINTER` | Postgres HA | 500ms |
| `HAPROXY_TIMEOUT_CONNECT` | Postgres HA | 10s |
| `ETCD_NAME` | etcd-3 | etcd-3 |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd-3 | (secret) |
| `ETCD_NAME` | etcd-1 | etcd-1 |
| `ETCD_DATA_DIR` | etcd-1 | /var/lib/etcd |
| `ETCD_LISTEN_PEER_URLS` | etcd-1 | http://0.0.0.0:2380 |
| `ETCD_LISTEN_CLIENT_URLS` | etcd-1 | http://0.0.0.0:2379 |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd-1 | (secret) |
| `PATRONI_NAME` | Postgres-2 | postgres-2 |
| `POSTGRES_USER` | Postgres-2 | (secret) |
| `POSTGRES_PASSWORD` | Postgres-2 | (secret) |
| `PATRONI_WAIT_FOR_LEADER` | Postgres-2 | true |
| `PATRONI_SUPERUSER_PASSWORD` | Postgres-2 | (secret) |
| `PATRONI_SUPERUSER_USERNAME` | Postgres-2 | (secret) |
| `PATRONI_REPLICATION_PASSWORD` | Postgres-2 | (secret) |
| `PATRONI_REPLICATION_USERNAME` | Postgres-2 | (secret) |

## Configuration

- **Volume:** `/var/lib/etcd`
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 5432

**Category:** Other

[View on Railway →](https://railway.com/deploy/postgres-ha)
