# Deploy Trino on Railway

Distributed SQL query engine for databases, data lakes, and analytics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trino)

## About

Trino is a distributed SQL query engine designed for fast analytics across multiple data sources. It lets you query databases, data lakes, object storage, and other systems using a single SQL interface without moving all data into one central database first.

Hosting Trino on Railway gives you a distributed query engine with one coordinator and multiple worker nodes.

This template uses a coordinator and three workers. The coordinator accepts queries, manages query planning, and schedules work, while the workers execute query tasks in parallel.

Trino does not act as the primary storage layer. Instead, it connects to external systems through catalogs and connectors, allowing you to query PostgreSQL, MySQL, Iceberg, Hive, Kafka, object storage, and many other supported data sources from one SQL engine.

The worker nodes communicate with the coordinator through Railway's private network, while only the coordinator needs to be exposed publicly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trino-worker-3 | `trinodb/trino:483` | Worker |
| trino-coordinator | `trinodb/trino:483` | Web service |
| trino-worker-2 | `trinodb/trino:483` | Worker |
| trino-worker-1 | `trinodb/trino:483` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | trino-worker-3 | 8080 | Internal Trino HTTP port |
| `TRINO_NODE_ID` | trino-worker-3 | worker-3 | Unique worker identifier |
| `TRINO_ENVIRONMENT` | trino-worker-3 | - | Same cluster environment |
| `PORT` | trino-coordinator | 8080 | Trino HTTP and Web UI port |
| `TRINO_NODE_ID` | trino-coordinator | coordinator | Unique persistent node identifier |
| `TRINO_ENVIRONMENT` | trino-coordinator | production | Shared environment name across all cluster nodes |
| `CATALOG_MANAGEMENT` | trino-coordinator | dynamic | Allow CREATE CATALOG and DROP CATALOG |
| `PORT` | trino-worker-2 | 8080 | Internal Trino HTTP port |
| `TRINO_NODE_ID` | trino-worker-2 | worker-2 | Unique worker identifier |
| `TRINO_ENVIRONMENT` | trino-worker-2 | - | Same cluster environment |
| `PORT` | trino-worker-1 | 8080 | Internal Trino HTTP port |
| `TRINO_NODE_ID` | trino-worker-1 | worker-1 | Unique persistent node identifier |
| `TRINO_ENVIRONMENT` | trino-worker-1 | - | Same environment as coordinator |

## Configuration

- **Start command:** `/bin/bash -c 'printf "%s\n" "coordinator=false" "http-server.http.port=8080" "discovery.uri=http://trino-coordinator.railway.internal:8080" > /etc/trino/config.properties; printf "%s\n" "node.environment=${TRINO_ENVIRONMENT}" "node.id=${TRINO_NODE_ID}" "node.data-dir=/data/trino" > /etc/trino/node.properties; exec /usr/lib/trino/bin/run-trino'`
- **Start command:** `/bin/bash -c 'printf "%s\n" "coordinator=true" "node-scheduler.include-coordinator=false" "http-server.http.port=8080" "http-server.process-forwarded=true" "discovery.uri=http://trino-coordinator.railway.internal:8080" "catalog.management=dynamic" > /etc/trino/config.properties; printf "%s\n" "node.environment=${TRINO_ENVIRONMENT}" "node.id=${TRINO_NODE_ID}" "node.data-dir=/data/trino" > /etc/trino/node.properties; exec /usr/lib/trino/bin/run-trino'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/trino/catalog`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/trino)
