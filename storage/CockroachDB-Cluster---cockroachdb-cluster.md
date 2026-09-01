# Deploy CockroachDB Cluster on Railway

Always-on distributed SQL with 3-node replication and automatic failover.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cockroachdb-cluster)

## About

CockroachDB is a distributed SQL database built for resilient and horizontally scalable applications. This template deploys a 3-node CockroachDB cluster behind HAProxy, combining PostgreSQL-compatible SQL, replicated storage, distributed consensus, persistent volumes, and a built-in DB Console.

Hosting CockroachDB Cluster on Railway gives you three peer database nodes connected through Railway's private network, with HAProxy providing a stable SQL entry point.

Each CockroachDB node stores data on its own persistent Railway Volume. SQL clients connect through HAProxy, while the CockroachDB DB Console is exposed separately for monitoring cluster health, SQL activity, storage, and node status.

This architecture better represents CockroachDB's native distributed design than a single-node deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cockroach-3 | `cockroachdb/cockroach:latest` | Database |
| cockroach-lb | `haproxy:3.2-alpine` | TCP service |
| cockroach-2 | `cockroachdb/cockroach:latest` | Database |
| cockroach-1 | `cockroachdb/cockroach:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SQL_PORT` | cockroach-3 | 26257 | CockroachDB SQL and node communication port |
| `HTTP_PORT` | cockroach-3 | 8080 | Internal DB Console port |
| `COCKROACH_JOIN` | cockroach-3 | - | Cluster join addresses |
| `COCKROACH_NODE` | cockroach-3 | - | Private hostname for this CockroachDB node |
| `COCKROACH_STORE` | cockroach-3 | /cockroach/cockroach-data | Persistent node storage |
| `PORT` | cockroach-lb | 26257 | Public TCP port for PostgreSQL-compatible CockroachDB connections |
| `COCKROACH_NODE_1` | cockroach-lb | - | Private hostname of CockroachDB node 1 |
| `COCKROACH_NODE_2` | cockroach-lb | - | Private hostname of CockroachDB node 2 |
| `COCKROACH_NODE_3` | cockroach-lb | - | Private hostname of CockroachDB node 3 |
| `COCKROACH_SQL_PORT` | cockroach-lb | 26257 | Internal SQL port used by all CockroachDB nodes |
| `COCKROACH_HTTP_PORT` | cockroach-lb | 8080 | Internal CockroachDB health and DB Console port |
| `SQL_PORT` | cockroach-2 | 26257 | CockroachDB SQL and node communication port |
| `HTTP_PORT` | cockroach-2 | 8080 | Internal DB Console port |
| `COCKROACH_JOIN` | cockroach-2 | - | Cluster join addresses |
| `COCKROACH_NODE` | cockroach-2 | - | Private hostname for this CockroachDB node |
| `COCKROACH_STORE` | cockroach-2 | /cockroach/cockroach-data | Persistent node storage |
| `SQL_PORT` | cockroach-1 | 26257 | CockroachDB SQL and node communication port |
| `HTTP_PORT` | cockroach-1 | 8080 | CockroachDB DB Console port |
| `COCKROACH_JOIN` | cockroach-1 | - | Cluster join addresses |
| `COCKROACH_NODE` | cockroach-1 | - | Private hostname for this CockroachDB node |
| `COCKROACH_STORE` | cockroach-1 | /cockroach/cockroach-data | Persistent node storage |

## Configuration

- **Start command:** `/bin/bash -c 'exec cockroach start --insecure --store="$COCKROACH_STORE" --listen-addr=0.0.0.0:"$SQL_PORT" --advertise-addr="$COCKROACH_NODE:$SQL_PORT" --http-addr=0.0.0.0:"$HTTP_PORT" --join="$COCKROACH_JOIN"'`
- **Volume:** `/cockroach/cockroach-data`
- **Start command:** `/bin/sh -c 'printf "%s\n" "global" "    log stdout format raw local0" "    maxconn 4096" "" "defaults" "    log global" "    mode tcp" "    option log-health-checks" "    timeout connect 5s" "    timeout client 1h" "    timeout server 1h" "" "listen cockroachdb" "    bind *:${PORT}" "    mode tcp" "    balance leastconn" "    option tcp-check" "    server cockroach1 ${COCKROACH_NODE_1}:${COCKROACH_SQL_PORT} check inter 5s fall 3 rise 2" "    server cockroach2 ${COCKROACH_NODE_2}:${COCKROACH_SQL_PORT} check inter 5s fall 3 rise 2" "    server cockroach3 ${COCKROACH_NODE_3}:${COCKROACH_SQL_PORT} check inter 5s fall 3 rise 2" > /tmp/haproxy.cfg; exec haproxy -W -db -f /tmp/haproxy.cfg'`
- **TCP Proxies:** 26257
- **Start command:** `/bin/bash -c 'cockroach start --insecure --store="$COCKROACH_STORE" --listen-addr=0.0.0.0:"$SQL_PORT" --advertise-addr="$COCKROACH_NODE:$SQL_PORT" --http-addr=0.0.0.0:"$HTTP_PORT" --join="$COCKROACH_JOIN" & PID=$!; sleep 8; cockroach init --insecure --host=127.0.0.1:"$SQL_PORT" || true; wait "$PID"'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cockroachdb-cluster)
