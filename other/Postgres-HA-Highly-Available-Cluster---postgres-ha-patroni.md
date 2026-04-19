# Deploy Postgres HA | Highly Available Cluster on Railway

Self-host PostgreSQL HA with 0 downtime, auto failover using Patroni & etcd

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-ha-patroni)

## About

Deploy PostgreSQL with automatic failover using Patroni on Railway. This template provisions a production-ready, 7-service HA cluster: 3 etcd nodes for distributed consensus, 3 PostgreSQL nodes managed by Patroni for streaming replication and automatic leader election, and an HAProxy load balancer that routes read-write traffic to the current primary and read-only queries to replicas.

Self-host PostgreSQL HA with Patroni on Railway to get sub-30-second automatic failover, zero-downtime maintenance windows, and horizontal read scaling — all without managing bare-metal servers or writing custom failover scripts.

Patroni is a Python-based high availability solution for PostgreSQL that automates cluster management, failover, and replication using a distributed consensus store (etcd, Consul, or ZooKeeper). Originally created by Zalando, it is the most widely adopted PostgreSQL HA framework in production environments.

Key features:
- **Automatic failover** with configurable TTL and loop wait — RTO consistently 20–30 seconds
- **Streaming replication** with synchronous or asynchronous modes
- **REST API** for cluster state inspection and manual switchover/failover
- **etcd-backed consensus** — no split-brain scenarios
- **HAProxy integration** — transparent connection routing based on Patroni health checks
- **Self-healing** — automatically reinitializes failed nodes from the current primary

The architecture uses etcd (3-node quorum) for leader election, Patroni as a sidecar daemon on each PostgreSQL node, and HAProxy for TCP load balancing based on Patroni's health endpoints.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| etcd-3 | `ghcr.io/railwayapp-templates/postgres-ha/etcd:3.6.6` | Database |
| Haproxy | `ghcr.io/railwayapp-templates/postgres-ha/haproxy:3.2` | Database |
| postgres-2 | `ghcr.io/railwayapp-templates/postgres-ha/postgres-patroni:17` | Database |
| etcd-2 | `ghcr.io/railwayapp-templates/postgres-ha/etcd:3.6.6` | Database |
| postgres-1 | `ghcr.io/railwayapp-templates/postgres-ha/postgres-patroni:17` | Database |
| postgres-3 | `ghcr.io/railwayapp-templates/postgres-ha/postgres-patroni:17` | Database |
| etcd-1 | `ghcr.io/railwayapp-templates/postgres-ha/etcd:3.6.6` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ETCD_NAME` | etcd-3 | etcd-3 | Unique etcd node name |
| `ETCD_INITIAL_CLUSTER` | etcd-3 | - | All etcd peer URLs |
| `ETCD_LISTEN_PEER_URLS` | etcd-3 | http://0.0.0.0:2380 | Peer listen address |
| `ETCD_LISTEN_CLIENT_URLS` | etcd-3 | http://0.0.0.0:2379 | Client listen address |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd-3 | - | Advertised client URL |
| `ETCD_INITIAL_ADVERTISE_PEER_URLS` | etcd-3 | - | This node's peer URL |
| `POSTGRES_USER` | Haproxy | (secret) | Health check database user |
| `POSTGRES_NODES` | Haproxy | - | Patroni node addresses |
| `HAPROXY_MAX_CONN` | Haproxy | 1000 | Maximum concurrent connections |
| `POSTGRES_PASSWORD` | Haproxy | (secret) | Health check database password |
| `HAPROXY_CHECK_INTERVAL` | Haproxy | 3s | Health check interval |
| `HAPROXY_TIMEOUT_CLIENT` | Haproxy | 30m | Client idle timeout |
| `HAPROXY_TIMEOUT_SERVER` | Haproxy | 30m | Server idle timeout |
| `HAPROXY_TIMEOUT_CONNECT` | Haproxy | 10s | Connection timeout |
| `PATRONI_TTL` | postgres-2 | 45 | Leader TTL in seconds |
| `POSTGRES_DB` | postgres-2 | railway | Default database name |
| `PATRONI_NAME` | postgres-2 | postgres-2 | Unique Patroni node name |
| `PATRONI_SCOPE` | postgres-2 | railway-pg-ha | Cluster name (must match all nodes) |
| `POSTGRES_USER` | postgres-2 | (secret) | Application database user |
| `PATRONI_ENABLED` | postgres-2 | true | Enable Patroni HA mode |
| `PATRONI_LOOP_WAIT` | postgres-2 | 10 | Health check interval seconds |
| `POSTGRES_PASSWORD` | postgres-2 | (secret) | Shared application password |
| `PATRONI_ETCD3_HOSTS` | postgres-2 | - | etcd endpoints |
| `PATRONI_RETRY_TIMEOUT` | postgres-2 | 17 | Retry timeout seconds |
| `PATRONI_SUPERUSER_PASSWORD` | postgres-2 | (secret) | Shared superuser password |
| `PATRONI_SUPERUSER_USERNAME` | postgres-2 | (secret) | PostgreSQL superuser name |
| `PATRONI_POSTGRESQL_DATA_DIR` | postgres-2 | /var/lib/postgresql/data/pgdata | Patroni data directory |
| `PATRONI_REPLICATION_PASSWORD` | postgres-2 | (secret) | Shared replication password |
| `PATRONI_REPLICATION_USERNAME` | postgres-2 | (secret) | Streaming replication user |
| `ETCD_NAME` | etcd-2 | etcd-2 | Unique etcd node name |
| `ETCD_INITIAL_CLUSTER` | etcd-2 | - | All etcd peer URLs |
| `ETCD_LISTEN_PEER_URLS` | etcd-2 | http://0.0.0.0:2380 | Peer listen address |
| `ETCD_LISTEN_CLIENT_URLS` | etcd-2 | http://0.0.0.0:2379 | Client listen address |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd-2 | - | Advertised client URL |
| `ETCD_INITIAL_ADVERTISE_PEER_URLS` | etcd-2 | - | This node's peer URL |
| `PATRONI_TTL` | postgres-1 | 45 | Leader TTL in seconds |
| `POSTGRES_DB` | postgres-1 | railway | Default database name |
| `PATRONI_NAME` | postgres-1 | postgres-1 | Unique Patroni node name |
| `PATRONI_SCOPE` | postgres-1 | railway-pg-ha | Cluster name (must match all nodes) |
| `POSTGRES_USER` | postgres-1 | (secret) | Application database user |
| `PATRONI_ENABLED` | postgres-1 | true | Enable Patroni HA mode |
| `PATRONI_LOOP_WAIT` | postgres-1 | 10 | Health check interval seconds |
| `POSTGRES_PASSWORD` | postgres-1 | (secret) | Application database password |
| `PATRONI_ETCD3_HOSTS` | postgres-1 | - | etcd endpoints |
| `PATRONI_RETRY_TIMEOUT` | postgres-1 | 17 | Retry timeout seconds |
| `PATRONI_SUPERUSER_PASSWORD` | postgres-1 | (secret) | PostgreSQL superuser password |
| `PATRONI_SUPERUSER_USERNAME` | postgres-1 | (secret) | PostgreSQL superuser name |
| `PATRONI_POSTGRESQL_DATA_DIR` | postgres-1 | /var/lib/postgresql/data/pgdata | Patroni data directory |
| `PATRONI_REPLICATION_PASSWORD` | postgres-1 | (secret) | Streaming replication password |
| `PATRONI_REPLICATION_USERNAME` | postgres-1 | (secret) | Streaming replication user |
| `PATRONI_TTL` | postgres-3 | 45 | Leader TTL in seconds |
| `POSTGRES_DB` | postgres-3 | railway | Default database name |
| `PATRONI_NAME` | postgres-3 | postgres-3 | Unique Patroni node name |
| `PATRONI_SCOPE` | postgres-3 | railway-pg-ha | Cluster name (must match all nodes) |
| `POSTGRES_USER` | postgres-3 | (secret) | Application database user |
| `PATRONI_ENABLED` | postgres-3 | true | Enable Patroni HA mode |
| `PATRONI_LOOP_WAIT` | postgres-3 | 10 | Health check interval seconds |
| `POSTGRES_PASSWORD` | postgres-3 | (secret) | Shared application password |
| `PATRONI_ETCD3_HOSTS` | postgres-3 | - | etcd endpoints |
| `PATRONI_RETRY_TIMEOUT` | postgres-3 | 17 | Retry timeout seconds |
| `PATRONI_SUPERUSER_PASSWORD` | postgres-3 | (secret) | Shared superuser password |
| `PATRONI_SUPERUSER_USERNAME` | postgres-3 | (secret) | PostgreSQL superuser name |
| `PATRONI_POSTGRESQL_DATA_DIR` | postgres-3 | /var/lib/postgresql/data/pgdata | Patroni data directory |
| `PATRONI_REPLICATION_PASSWORD` | postgres-3 | (secret) | Shared replication password |
| `PATRONI_REPLICATION_USERNAME` | postgres-3 | (secret) | Streaming replication user |
| `ETCD_NAME` | etcd-1 | etcd-1 | Unique etcd node name |
| `ETCD_INITIAL_CLUSTER` | etcd-1 | - | All etcd peer URLs |
| `ETCD_LISTEN_PEER_URLS` | etcd-1 | http://0.0.0.0:2380 | Peer listen address |
| `ETCD_LISTEN_CLIENT_URLS` | etcd-1 | http://0.0.0.0:2379 | Client listen address |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd-1 | - | Advertised client URL |
| `ETCD_INITIAL_ADVERTISE_PEER_URLS` | etcd-1 | - | This node's peer URL |

## Configuration

- **Volume:** `/var/lib/etcd`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/postgres-ha-patroni)
