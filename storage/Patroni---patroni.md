# Deploy Patroni on Railway

Patroni is a template for high availability (HA) PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/patroni)

## About

Patroni is a template for high availability (HA) PostgreSQL solutions using Python. Database engineers, DBAs, DevOps engineers, and SREs who are looking to quickly deploy HA PostgreSQL in datacenters - or anywhere else - will hopefully find it useful.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Patroni Worker 1 | [patroni/patroni](https://github.com/patroni/patroni) | Database |
| ETCD Worker 3 | [patroni/patroni](https://github.com/patroni/patroni) | Database |
| Patroni Worker 3 | [patroni/patroni](https://github.com/patroni/patroni) | Database |
| HAProxy | [thesamgordon/patroni-haproxy](https://github.com/thesamgordon/patroni-haproxy) | TCP service |
| ETCD Worker 2 | [patroni/patroni](https://github.com/patroni/patroni) | Database |
| Patroni Worker 2 | [patroni/patroni](https://github.com/patroni/patroni) | Database |
| ETCD Worker 1 | [patroni/patroni](https://github.com/patroni/patroni) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PATRONI_NAME` | Patroni Worker 1 | patroni1 | - |
| `PATRONI_SCOPE` | Patroni Worker 1 | batman | - |
| `PATRONI_NAMESPACE` | Patroni Worker 1 | /service | - |
| `PATRONI_admin_OPTIONS` | Patroni Worker 1 | createdb, createrole | - |
| `PATRONI_RESTAPI_LISTEN` | Patroni Worker 1 | 0.0.0.0:8008 | - |
| `PATRONI_admin_PASSWORD` | Patroni Worker 1 | (secret) | - |
| `PATRONI_RESTAPI_PASSWORD` | Patroni Worker 1 | (secret) | - |
| `PATRONI_RESTAPI_USERNAME` | Patroni Worker 1 | (secret) | - |
| `PATRONI_POSTGRESQL_LISTEN` | Patroni Worker 1 | [::]:5432 | - |
| `PATRONI_SUPERUSER_PASSWORD` | Patroni Worker 1 | (secret) | Postgres password. Please note this cannot be changed. |
| `PATRONI_SUPERUSER_USERNAME` | Patroni Worker 1 | (secret) | Postgres username. Please note this cannot be changed. |
| `PATRONI_POSTGRESQL_DATA_DIR` | Patroni Worker 1 | /data/data | - |
| `PATRONI_REPLICATION_PASSWORD` | Patroni Worker 1 | (secret) | - |
| `PATRONI_REPLICATION_USERNAME` | Patroni Worker 1 | (secret) | - |
| `PATRONI_POSTGRESQL_AUTHENTICATION_REPLICATION_PASSWORD` | Patroni Worker 1 | (secret) | - |
| `PATRONI_POSTGRESQL_AUTHENTICATION_REPLICATION_USERNAME` | Patroni Worker 1 | (secret) | - |
| `ETCD_DATA_DIR` | ETCD Worker 3 | /var/lib/etcd | - |
| `ETCD_LISTEN_PEER_URLS` | ETCD Worker 3 | http://0.0.0.0:2380 | - |
| `ETCD_LISTEN_CLIENT_URLS` | ETCD Worker 3 | http://0.0.0.0:2379 | - |
| `ETCD_INITIAL_CLUSTER_STATE` | ETCD Worker 3 | new | - |
| `ETCD_INITIAL_CLUSTER_TOKEN` | ETCD Worker 3 | (secret) | - |
| `PATRONI_NAME` | Patroni Worker 3 | patroni1 | - |
| `PATRONI_SCOPE` | Patroni Worker 3 | batman | - |
| `PATRONI_NAMESPACE` | Patroni Worker 3 | /service | - |
| `PATRONI_admin_OPTIONS` | Patroni Worker 3 | createdb, createrole | - |
| `PATRONI_RESTAPI_LISTEN` | Patroni Worker 3 | 0.0.0.0:8008 | - |
| `PATRONI_admin_PASSWORD` | Patroni Worker 3 | (secret) | - |
| `PATRONI_RESTAPI_PASSWORD` | Patroni Worker 3 | (secret) | - |
| `PATRONI_RESTAPI_USERNAME` | Patroni Worker 3 | (secret) | - |
| `PATRONI_POSTGRESQL_LISTEN` | Patroni Worker 3 | [::]:5432 | - |
| `PATRONI_SUPERUSER_PASSWORD` | Patroni Worker 3 | (secret) | - |
| `PATRONI_SUPERUSER_USERNAME` | Patroni Worker 3 | (secret) | - |
| `PATRONI_POSTGRESQL_DATA_DIR` | Patroni Worker 3 | /data/data | - |
| `PATRONI_REPLICATION_PASSWORD` | Patroni Worker 3 | (secret) | - |
| `PATRONI_REPLICATION_USERNAME` | Patroni Worker 3 | (secret) | - |
| `PATRONI_POSTGRESQL_AUTHENTICATION_REPLICATION_PASSWORD` | Patroni Worker 3 | (secret) | - |
| `PATRONI_POSTGRESQL_AUTHENTICATION_REPLICATION_USERNAME` | Patroni Worker 3 | (secret) | - |
| `STATS_PASSWORD` | HAProxy | (secret) | Statistics page password hosted on port 7000. |
| `ETCD_DATA_DIR` | ETCD Worker 2 | /var/lib/etcd | - |
| `ETCD_LISTEN_PEER_URLS` | ETCD Worker 2 | http://0.0.0.0:2380 | - |
| `ETCD_LISTEN_CLIENT_URLS` | ETCD Worker 2 | http://0.0.0.0:2379 | - |
| `ETCD_INITIAL_CLUSTER_STATE` | ETCD Worker 2 | new | - |
| `ETCD_INITIAL_CLUSTER_TOKEN` | ETCD Worker 2 | (secret) | - |
| `PATRONI_NAME` | Patroni Worker 2 | patroni1 | - |
| `PATRONI_SCOPE` | Patroni Worker 2 | batman | - |
| `PATRONI_NAMESPACE` | Patroni Worker 2 | /service | - |
| `PATRONI_admin_OPTIONS` | Patroni Worker 2 | createdb, createrole | - |
| `PATRONI_RESTAPI_LISTEN` | Patroni Worker 2 | 0.0.0.0:8008 | - |
| `PATRONI_admin_PASSWORD` | Patroni Worker 2 | (secret) | - |
| `PATRONI_RESTAPI_PASSWORD` | Patroni Worker 2 | (secret) | - |
| `PATRONI_RESTAPI_USERNAME` | Patroni Worker 2 | (secret) | - |
| `PATRONI_POSTGRESQL_LISTEN` | Patroni Worker 2 | [::]:5432 | - |
| `PATRONI_SUPERUSER_PASSWORD` | Patroni Worker 2 | (secret) | - |
| `PATRONI_SUPERUSER_USERNAME` | Patroni Worker 2 | (secret) | - |
| `PATRONI_POSTGRESQL_DATA_DIR` | Patroni Worker 2 | /data/data | - |
| `PATRONI_REPLICATION_PASSWORD` | Patroni Worker 2 | (secret) | - |
| `PATRONI_REPLICATION_USERNAME` | Patroni Worker 2 | (secret) | - |
| `PATRONI_POSTGRESQL_AUTHENTICATION_REPLICATION_PASSWORD` | Patroni Worker 2 | (secret) | - |
| `PATRONI_POSTGRESQL_AUTHENTICATION_REPLICATION_USERNAME` | Patroni Worker 2 | (secret) | - |
| `ETCD_DATA_DIR` | ETCD Worker 1 | /var/lib/etcd | - |
| `ETCD_LISTEN_PEER_URLS` | ETCD Worker 1 | http://0.0.0.0:2380 | - |
| `ETCD_LISTEN_CLIENT_URLS` | ETCD Worker 1 | http://0.0.0.0:2379 | - |
| `ETCD_INITIAL_CLUSTER_STATE` | ETCD Worker 1 | new | - |
| `ETCD_INITIAL_CLUSTER_TOKEN` | ETCD Worker 1 | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c 'chown -R 999:999 /data && apt update && apt install gosu && export DOCKER_IP=$(hostname -I | tr " " "\n" | grep -E "^fd12:" | head -1) && export PATRONI_NAME=$(hostname) PATRONI_RESTAPI_CONNECT_ADDRESS=$DOCKER_IP:8008 PATRONI_POSTGRESQL_CONNECT_ADDRESS=$DOCKER_IP:5432 && exec gosu postgres dumb-init python3 /patroni.py postgres0.yml'`
- **Volume:** `/data`
- **Start command:** `etcd --name etcd3`
- **Volume:** `/var/lib/etcd`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5000
- **Start command:** `etcd --name etcd2`
- **Start command:** `etcd --name etcd1`

**Category:** Storage · **Languages:** Python, Gherkin, Dockerfile, Shell, Clojure

[View on Railway →](https://railway.com/deploy/patroni)
