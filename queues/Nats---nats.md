# Deploy Nats on Railway

Messaging system for streams, queues and pub/sub between services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nats)

## About

NATS is a messaging system for connecting services, and its JetStream layer turns it into a durable stream and key-value store as well. Publish/subscribe, request/reply, work queues, replayable streams and a distributed KV bucket all arrive over one connection and one wire protocol, from a single Go binary — no ZooKeeper, no plugins, no JVM. It is a CNCF project with clients for over forty languages, reached for when Kafka is too heavy to operate and RabbitMQ's routing machinery is more than you need.

Deploy NATS on Railway as a three-node JetStream cluster rather than a single box. This template runs `nats-1`, `nats-2` and `nats-3` as peers of one cluster, each with its own 5 GB volume, so a stream created with three replicas keeps serving when a node restarts. Every node exposes a TCP endpoint for NATS clients, a WebSocket endpoint for browsers, and a private address other Railway services reach directly. NUI adds a browser UI for streams, buckets and live messages, behind a Caddy gateway holding the password — so you self-host NATS with authentication, persistence and replication already wired together.

![Diagram of three NATS nodes, NUI and a Caddy gateway on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787791266/nats-architecture.png)

NATS lets services talk without knowing where each other are. Publishers send to a subject like `orders.created`; subscribers ask for `orders.>` and get everything beneath it. Because subjects are just strings, adding a consumer never means changing a producer.

Core NATS is fire-and-forget and extremely fast. JetStream adds the durable half: a stream captures messages matching a subject pattern and holds them on disk, consumers track their own position, and a message is redelivered until acknowledged. The same subsystem backs key-value and object stores, so configuration and small blobs live alongside your events.

Key features:

- Subject-based pub/sub with wildcards, request/reply and queue groups
- JetStream durable streams with replay and at-least-once delivery
- Key-value and object stores on the same replication
- Raft clustering with per-stream replica counts
- Accounts for multi-tenant isolation, with per-account permissions
- WebSocket, MQTT and leaf-node support

The architecture has three tiers. The `nats` services are the cluster: they connect over the private network on port 6222, elect a Raft leader and replicate every stream you mark `R3`. `nui` talks to the cluster like any other client. `gateway` is a Caddy proxy holding the basic-auth credential — NUI has no login of its own, so it stays private behind it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nats-3 | [gridalpha/nats-railway](https://github.com/gridalpha/nats-railway) | TCP service |
| nui | [gridalpha/nats-railway](https://github.com/gridalpha/nats-railway) | Database |
| gateway | [gridalpha/nats-railway](https://github.com/gridalpha/nats-railway) | Web service |
| nats-1 | [gridalpha/nats-railway](https://github.com/gridalpha/nats-railway) | TCP service |
| nats-2 | [gridalpha/nats-railway](https://github.com/gridalpha/nats-railway) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | nats-3 | 8222 | Monitoring port Railway health-checks |
| `NATS_PASSWORD` | nats-3 | (secret) | Password for the APP account |
| `NATS_ROUTE_HOSTS` | nats-3 | - | Cluster peer list |
| `NATS_SYS_PASSWORD` | nats-3 | (secret) | Password for the SYS account |
| `NATS_CLUSTER_PASSWORD` | nats-3 | (secret) | Shared cluster route password |
| `PORT` | nui | 31311 | HTTP port Railway health-checks |
| `NATS_PASSWORD` | nui | (secret) | Seeds the saved cluster connection |
| `PORT` | gateway | 8080 | HTTP port serving the management UI |
| `GATEWAY_USER` | gateway | (secret) | Username for the management UI |
| `NUI_UPSTREAM` | gateway | - | Private address of the UI |
| `GATEWAY_PASSWORD` | gateway | (secret) | Password for the management UI |
| `PORT` | nats-1 | 8222 | Monitoring port Railway health-checks |
| `NATS_PASSWORD` | nats-1 | (secret) | Password for the APP account |
| `NATS_ROUTE_HOSTS` | nats-1 | - | Cluster peer list |
| `NATS_SYS_PASSWORD` | nats-1 | (secret) | Password for the SYS account |
| `NATS_CLUSTER_PASSWORD` | nats-1 | (secret) | Shared cluster route password |
| `PORT` | nats-2 | 8222 | Monitoring port Railway health-checks |
| `NATS_PASSWORD` | nats-2 | (secret) | Password for the APP account |
| `NATS_ROUTE_HOSTS` | nats-2 | - | Cluster peer list |
| `NATS_SYS_PASSWORD` | nats-2 | (secret) | Password for the SYS account |
| `NATS_CLUSTER_PASSWORD` | nats-2 | (secret) | Shared cluster route password |

## Configuration

- **Healthcheck:** `/varz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 4222
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Volume:** `/db`
- **Healthcheck:** `/healthz`

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nats)
