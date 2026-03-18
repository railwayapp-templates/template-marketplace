# Deploy Patroni (PostgreSQL High Availability) on Railway

Patroni PostgreSQL High Availability Cluster

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/patroni-1)

## About

Patroni is an open-source tool for managing highly available PostgreSQL clusters. It handles automatic failover, leader election, and streaming replication using a distributed configuration store (etcd), ensuring your database stays online even when nodes fail.

Hosting Patroni requires orchestrating multiple components: a distributed configuration store (etcd cluster) for leader election and cluster state, multiple PostgreSQL instances managed by Patroni agents, and a load balancer to route traffic to the correct primary/replica nodes. This template automates the entire setup with 3 etcd nodes for consensus, 2 PostgreSQL/Patroni nodes for data redundancy, and HAProxy for intelligent connection routing. All services communicate securely via Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| etcd2 | `quay.io/coreos/etcd:v3.5.12` | Database |
| patroni2 | [utsav-pal/Patroni-PostgreSQL-High-Availability](https://github.com/utsav-pal/Patroni-PostgreSQL-High-Availability) (root: /patroni) | Database |
| etcd3 | `quay.io/coreos/etcd:v3.5.12` | Database |
| haproxy | [utsav-pal/Patroni-PostgreSQL-High-Availability](https://github.com/utsav-pal/Patroni-PostgreSQL-High-Availability) (root: /haproxy) | Worker |
| etcd1 | `quay.io/coreos/etcd:v3.5.12` | Database |
| patroni1 | [utsav-pal/Patroni-PostgreSQL-High-Availability](https://github.com/utsav-pal/Patroni-PostgreSQL-High-Availability) (root: /patroni) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ETCD_NAME` | etcd2 | etcd2 | Unique name for this etcd node (Required) |
| `ETCD_DATA_DIR` | etcd2 | /var/lib/etcd | Directory where etcd stores data (Required) |
| `ETCD_INITIAL_CLUSTER` | etcd2 | etcd1=http://etcd1.railway.internal:2380,etcd2=http://etcd2.railway.internal:2380,etcd3=http://etcd3.railway.internal:2380 | Initial cluster configuration (Required) |
| `ETCD_LISTEN_PEER_URLS` | etcd2 | http://0.0.0.0:2380 | Peer connection endpoints (Required) |
| `ETCD_LISTEN_CLIENT_URLS` | etcd2 | http://0.0.0.0:2379 | Client connection endpoints (Required) |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd2 | - | Advertised client URLs (Required) |
| `ETCD_INITIAL_CLUSTER_STATE` | etcd2 | new | Cluster state new or existing (Required) |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd2 | (secret) | Shared token from etcd1 (Required) |
| `ETCD_INITIAL_ADVERTISE_PEER_URLS` | etcd2 | - | Advertised peer URLs (Required) |
| `PATRONI_NAME` | patroni2 | patroni2 | Unique name for this Patroni node (Required) |
| `PATRONI_SCOPE` | patroni2 | postgres-ha | Cluster name for Patroni (Required) |
| `PATRONI_ETCD3_HOSTS` | patroni2 | etcd1.railway.internal:2379,etcd2.railway.internal:2379,etcd3.railway.internal:2379 | etcd cluster hosts (Required) |
| `PATRONI_SUPERUSER_PASSWORD` | patroni2 | (secret) | Shared password from patroni1 (Required) |
| `PATRONI_SUPERUSER_USERNAME` | patroni2 | (secret) | PostgreSQL superuser username (Required) |
| `PATRONI_REPLICATION_PASSWORD` | patroni2 | (secret) | Shared password from patroni1 (Required) |
| `PATRONI_REPLICATION_USERNAME` | patroni2 | (secret) | Replication user for streaming (Required) |
| `ETCD_NAME` | etcd3 | etcd3 | Unique name for this etcd node (Required) |
| `ETCD_DATA_DIR` | etcd3 | /var/lib/etcd | Directory where etcd stores data (Required) |
| `ETCD_INITIAL_CLUSTER` | etcd3 | etcd1=http://etcd1.railway.internal:2380,etcd2=http://etcd2.railway.internal:2380,etcd3=http://etcd3.railway.internal:2380 | Initial cluster configuration (Required) |
| `ETCD_LISTEN_PEER_URLS` | etcd3 | http://0.0.0.0:2380 | Peer connection endpoints (Required) |
| `ETCD_LISTEN_CLIENT_URLS` | etcd3 | http://0.0.0.0:2379 | Client connection endpoints (Required) |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd3 | - | Advertised client URLs (Required) |
| `ETCD_INITIAL_CLUSTER_STATE` | etcd3 | new | Cluster state new or existing (Required) |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd3 | (secret) | Shared token from etcd1 (Required) |
| `ETCD_INITIAL_ADVERTISE_PEER_URLS` | etcd3 | - | Advertised peer URLs (Required) |
| `PATRONI1_HOST` | haproxy | patroni1.railway.internal | Hostname of first Patroni node (Required) |
| `PATRONI2_HOST` | haproxy | patroni2.railway.internal | Hostname of second Patroni node (Required) |
| `ETCD_NAME` | etcd1 | etcd1 | Unique name for this etcd node (Required) |
| `ETCD_DATA_DIR` | etcd1 | /var/lib/etcd | Directory where etcd stores data (Required) |
| `ETCD_INITIAL_CLUSTER` | etcd1 | etcd1=http://etcd1.railway.internal:2380,etcd2=http://etcd2.railway.internal:2380,etcd3=http://etcd3.railway.internal:2380 | Initial cluster configuration (Required) |
| `ETCD_LISTEN_PEER_URLS` | etcd1 | http://0.0.0.0:2380 | Peer connection endpoints (Required) |
| `ETCD_LISTEN_CLIENT_URLS` | etcd1 | http://0.0.0.0:2379 | Client connection endpoints (Required) |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd1 | - | Advertised client URLs (Required) |
| `ETCD_INITIAL_CLUSTER_STATE` | etcd1 | new | Cluster state new or existing (Required) |
| `ETCD_INITIAL_CLUSTER_TOKEN` | etcd1 | (secret) | Unique cluster token (Required) |
| `ETCD_INITIAL_ADVERTISE_PEER_URLS` | etcd1 | - | Advertised peer URLs (Required) |
| `PATRONI_NAME` | patroni1 | patroni1 | Unique name for this Patroni node (Required) |
| `PATRONI_SCOPE` | patroni1 | postgres-ha | Cluster name for Patroni (Required) |
| `PATRONI_ETCD3_HOSTS` | patroni1 | etcd1.railway.internal:2379,etcd2.railway.internal:2379,etcd3.railway.internal:2379 | etcd cluster hosts (Required) |
| `PATRONI_SUPERUSER_PASSWORD` | patroni1 | (secret) | PostgreSQL superuser password (Required) |
| `PATRONI_SUPERUSER_USERNAME` | patroni1 | (secret) | PostgreSQL superuser username (Required) |
| `PATRONI_REPLICATION_PASSWORD` | patroni1 | (secret) | Replication user password (Required) |
| `PATRONI_REPLICATION_USERNAME` | patroni1 | (secret) | Replication user for streaming (Required) |

## Configuration

- **Volume:** `/var/lib/etcd`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/patroni-1)
