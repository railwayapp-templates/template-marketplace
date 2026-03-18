# Deploy SurrealDB 3.x on Railway

A scalable, distributed, collaborative, document-graph database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/surrealdb-3x)

## About

SurrealDB 3.x can be hosted in several ways depending on your application's scale and infrastructure requirements. As the multi-model database for AI agents, it is designed to run anywhere — from embedded edge devices and browsers through to fully managed cloud deployments. It supports single-node operation for development and small workloads, and scales to distributed cluster mode for high-availability production environments.

SurrealDB 3.x supports TiKV as a distributed storage backend for clustered deployments, and RocksDB or in-memory storage for single-node use. It exposes a stateless HTTP and WebSocket API, making it straightforward to place behind a reverse proxy (Nginx, Caddy) or load balancer, and it integrates natively with SurrealDB Cloud for fully managed, serverless hosting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SurrealDB 3.x (Latest) | `surrealdb/surrealdb:v3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | The internal port railway will route external traffic to |
| `SURREAL_LOG` | trace | The logging level for the database server |
| `SURREAL_URL` | - | Public database URL |
| `SURREAL_BIND` | - | The hostname or ip address to listen for connections on |
| `SURREAL_HOST` | - | Public database hostname |
| `SURREAL_PASS` | - | The password for the initial database user |
| `SURREAL_PATH` | - | Database path used for storing data |
| `SURREAL_PORT` | 443 | Public database port |
| `SURREAL_USER` | (secret) | The username for the initial database user |
| `SURREAL_PRIVATE_URL` | - | Private database URL |
| `SURREAL_PRIVATE_HOST` | - | Private database hostname |
| `SURREAL_PRIVATE_PORT` | 8000 | The Private port that Surreal runs on |
| `SURREAL_CAPS_ALLOW_ALL` | true | Allow all capabilities |

## Configuration

- **Start command:** `/surreal start --deny-guests --no-banner`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/surrealdb-3x)
