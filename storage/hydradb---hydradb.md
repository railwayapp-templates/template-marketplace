# Deploy hydradb on Railway

ast graph database on object storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hydradb)

## About

HydraDB is a Rust graph database built on SlateDB for durable OpenCypher workloads. It provides Neo4j-compatible Bolt access and an authenticated HTTP query API, while using object storage as the source of truth and local disk as cache. This template runs one persistent graph node suitable for evaluation and small single-node deployments.

Railway runs the pre-built HydraDB container as one service, routes its HTTP query API through a generated HTTPS domain, and attaches a persistent volume for graph data and cache files. The deployment uses plaintext only inside the container because Railway terminates public TLS at the edge.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/hydradb-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8443 |
| `GRAPH_ID` | default |
| `RUST_LOG` | info |
| `LOCAL_PATH` | /data/store |
| `GRAPH_CELLS` | cell-0 |
| `GRAPH_CELL_ID` | cell-0 |
| `GRAPH_NODE_ID` | node-0 |
| `CLOUD_PROVIDER` | local |
| `RUST_MIN_STACK` | 33554432 |
| `GRAPH_BOLT_ADDR` | 0.0.0.0:7687 |
| `GRAPH_DATA_PATH` | data |
| `GRAPH_HTTP_ADDR` | 0.0.0.0:8443 |
| `GRAPH_NAMESPACE` | default |
| `GRAPH_ADMIN_ADDR` | 0.0.0.0:9090 |
| `GRAPH_AUTH_TOKEN` | (secret) |
| `GRAPH_DATA_CACHE_DIR` | /data/cache |
| `GRAPH_ALLOW_PLAINTEXT` | true |
| `GRAPH_AUTH_TOKEN_FILE` | (secret) |
| `GRAPH_DATA_CACHE_BYTES` | 67108864 |
| `GRAPH_BOLT_NODE_ADDRESSES` | node-0=127.0.0.1:7687 |
| `GRAPH_ADVERTISED_BOLT_ADDR` | 127.0.0.1:7687 |

## Configuration

- **Start command:** `sh -c 'umask 077; mkdir -p /data/store /data/cache; printf "%s\n" "$GRAPH_AUTH_TOKEN" > /data/auth-token; exec /usr/local/bin/graph-node'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/hydradb)
