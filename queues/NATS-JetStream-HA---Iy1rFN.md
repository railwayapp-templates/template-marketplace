# Deploy NATS JetStream HA on Railway

NATS JetStream cluster with 3 servers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Iy1rFN)

## About

One click deployment for a NATS JetStream cluster with 3 servers.

NATS is a simple, secure and performant communications system for digital systems, services and devices. NATS is part of the Cloud Native Computing Foundation (CNCF). NATS has over 40 client language implementations, and its server can run on-premise, in the cloud, at the edge, and even on a Raspberry Pi. NATS can secure and simplify design and operation of modern distributed systems.

For more information, check out https://nats.io.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server-1 | `ghcr.io/jri98/nats-jetstream-ha:main` | Database |
| server-2 | `ghcr.io/jri98/nats-jetstream-ha:main` | Database |
| server-3 | `ghcr.io/jri98/nats-jetstream-ha:main` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SERVER_NAME` | server-1 | - | Unique name of the server in the cluster. |
| `CLUSTER_ROUTES_SEED` | server-1 | nats://localhost:6222 | Routes for bootstrapping the cluster. |
| `JETSTREAM_STORE_DIR` | server-1 | - | Directory for the JetStream store. |
| `SERVER_NAME` | server-2 | - | Unique name of the server in the cluster. |
| `CLUSTER_ROUTES_SEED` | server-2 | - | Routes for bootstrapping the cluster. |
| `JETSTREAM_STORE_DIR` | server-2 | - | Directory for the JetStream store. |
| `SERVER_NAME` | server-3 | - | Unique name of the server in the cluster. |
| `CLUSTER_ROUTES_SEED` | server-3 | - | Routes for bootstrapping the cluster. |
| `JETSTREAM_STORE_DIR` | server-3 | - | Directory for the JetStream store. |

## Configuration

- **Volume:** `/nats`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/Iy1rFN)
