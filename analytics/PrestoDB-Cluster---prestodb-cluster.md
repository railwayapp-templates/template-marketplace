# Deploy PrestoDB Cluster on Railway

Analyze data faster with distributed SQL across multiple worker nodes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prestodb-cluster)

## About

PrestoDB is a distributed SQL query engine designed for fast analytics across multiple data sources. This template deploys one coordinator and three workers, allowing analytical queries to be planned centrally and executed in parallel across multiple compute nodes.

Hosting PrestoDB Cluster on Railway gives you a distributed analytical query layer without requiring Presto to store the underlying data itself.

The coordinator accepts SQL queries, creates execution plans, schedules work, and exposes the Presto Web UI. Three worker nodes execute query tasks in parallel and communicate with the coordinator through Railway's private network.

PrestoDB connects to external systems through catalogs and connectors, making it useful for querying databases, warehouses, and data lakes through a single SQL interface.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| presto-worker-1 | `prestodb/presto:0.299` | Worker |
| presto-coordinator | `prestodb/presto:0.299` | Web service |
| presto-worker-2 | `prestodb/presto:0.299` | Worker |
| presto-worker-3 | `prestodb/presto:0.299` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | presto-worker-1 | 8080 | Internal Presto HTTP port |
| `PRESTO_NODE_ID` | presto-worker-1 | presto-worker-1 | Unique node ID; adjust per worker |
| `QUERY_MAX_MEMORY` | presto-worker-1 | - | Distributed query memory limit |
| `PRESTO_ENVIRONMENT` | presto-worker-1 | - | Shared cluster environment |
| `PRESTO_DISCOVERY_URI` | presto-worker-1 | - | Coordinator discovery endpoint |
| `QUERY_MAX_MEMORY_PER_NODE` | presto-worker-1 | - | User memory limit per worker |
| `QUERY_MAX_TOTAL_MEMORY_PER_NODE` | presto-worker-1 | - | Total query memory limit per worker |
| `PORT` | presto-coordinator | 8080 | Presto HTTP, client, and Web UI port |
| `PRESTO_NODE_ID` | presto-coordinator | presto-coordinator | Unique and stable coordinator node ID |
| `QUERY_MAX_MEMORY` | presto-coordinator | 2GB | Maximum distributed user memory per query across the cluster |
| `PRESTO_ENVIRONMENT` | presto-coordinator | production | Shared environment name across all cluster nodes |
| `PRESTO_DISCOVERY_URI` | presto-coordinator | - | Coordinator discovery endpoint |
| `QUERY_MAX_MEMORY_PER_NODE` | presto-coordinator | 256MB | Maximum user memory a query can use on each node |
| `QUERY_MAX_TOTAL_MEMORY_PER_NODE` | presto-coordinator | 512MB | Maximum total query memory per node including revocable memory |
| `PORT` | presto-worker-2 | 8080 | Internal Presto HTTP port |
| `PRESTO_NODE_ID` | presto-worker-2 | presto-worker-2 | Unique node ID; adjust per worker |
| `QUERY_MAX_MEMORY` | presto-worker-2 | - | Distributed query memory limit |
| `PRESTO_ENVIRONMENT` | presto-worker-2 | - | Shared cluster environment |
| `PRESTO_DISCOVERY_URI` | presto-worker-2 | - | Coordinator discovery endpoint |
| `QUERY_MAX_MEMORY_PER_NODE` | presto-worker-2 | - | User memory limit per worker |
| `QUERY_MAX_TOTAL_MEMORY_PER_NODE` | presto-worker-2 | - | Total query memory limit per worker |
| `PORT` | presto-worker-3 | 8080 | Internal Presto HTTP port |
| `PRESTO_NODE_ID` | presto-worker-3 | presto-worker-3 | Unique node ID; adjust per worker |
| `QUERY_MAX_MEMORY` | presto-worker-3 | - | Distributed query memory limit |
| `PRESTO_ENVIRONMENT` | presto-worker-3 | - | Shared cluster environment |
| `PRESTO_DISCOVERY_URI` | presto-worker-3 | - | Coordinator discovery endpoint |
| `QUERY_MAX_MEMORY_PER_NODE` | presto-worker-3 | - | User memory limit per worker |
| `QUERY_MAX_TOTAL_MEMORY_PER_NODE` | presto-worker-3 | - | Total query memory limit per worker |

## Configuration

- **Start command:** `/bin/bash -c 'printf "%s\n" "coordinator=false" "http-server.http.port=${PORT}" "query.max-memory=${QUERY_MAX_MEMORY}" "query.max-memory-per-node=${QUERY_MAX_MEMORY_PER_NODE}" "query.max-total-memory-per-node=${QUERY_MAX_TOTAL_MEMORY_PER_NODE}" "discovery.uri=${PRESTO_DISCOVERY_URI}" > /opt/presto-server/etc/config.properties; printf "%s\n" "node.environment=${PRESTO_ENVIRONMENT}" "node.id=${PRESTO_NODE_ID}" "node.data-dir=/var/presto/data" > /opt/presto-server/etc/node.properties; printf "%s\n" "com.facebook.presto=WARN" > /opt/presto-server/etc/log.properties; exec /opt/presto-server/bin/launcher run'`
- **Start command:** `/bin/bash -c 'printf "%s\n" "coordinator=true" "node-scheduler.include-coordinator=false" "http-server.http.port=${PORT}" "query.max-memory=${QUERY_MAX_MEMORY}" "query.max-memory-per-node=${QUERY_MAX_MEMORY_PER_NODE}" "query.max-total-memory-per-node=${QUERY_MAX_TOTAL_MEMORY_PER_NODE}" "discovery-server.enabled=true" "discovery.uri=${PRESTO_DISCOVERY_URI}" > /opt/presto-server/etc/config.properties; printf "%s\n" "node.environment=${PRESTO_ENVIRONMENT}" "node.id=${PRESTO_NODE_ID}" "node.data-dir=/var/presto/data" > /opt/presto-server/etc/node.properties; printf "%s\n" "com.facebook.presto=WARN" > /opt/presto-server/etc/log.properties; exec /opt/presto-server/bin/launcher run'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/prestodb-cluster)
