# Deploy NATS Server with JetStream, WebSockets, and Flexible Authentication on Railway

This NATS Server is configured for production environments.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nats-server-with-jetstream-websockets-an)

## About

What is NATS Server Cluster with JetStream and Granular Authentication?

NATS is a high-performance, open-source messaging system designed for cloud-native applications. This project is a production-ready Docker image that bundles **Core NATS**, **JetStream** (for durable messaging and streaming), and a segregated **WebSockets endpoint**. It provides a robust, production-ready environment engineered for high-scale, low-latency microservice and client communication, fully configured via environment variables and **enforcing Username/Password authentication** for granular security.

Hosting this NATS container on Railway simplifies security by utilizing the platform's **TLS/SSL proxy termination**, allowing NATS to run internally without managing certificates. Achieving high availability requires creating a cluster of at least three nodes. **One node uses the `ws/Dockerfile` (WebSockets enabled), and two use the `server/Dockerfile` (WebSockets disabled).** A persistent volume is mandatory for the `/data` directory to ensure JetStream's data durability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nats-seed-ws | [Tyrcode/nats-ws](https://github.com/Tyrcode/nats-ws) (root: /ws) | Web service |
| nats-server-2 | [Tyrcode/nats-ws](https://github.com/Tyrcode/nats-ws) (root: /server) | Database |
| nats-server-1 | [Tyrcode/nats-ws](https://github.com/Tyrcode/nats-ws) (root: /server) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MS_USER` | nats-seed-ws | (secret) | User authentication tcp server |
| `WS_USER` | nats-seed-ws | (secret) | Username for the WebSocket connection |
| `DEBUG_MODE` | nats-seed-ws | false | Set to true to activate debug mode |
| `TRACE_MODE` | nats-seed-ws | false | Set to true to activate trace mode |
| `MS_PASSWORD` | nats-seed-ws | (secret) | Password authentication tcp server |
| `SERVER_NAME` | nats-seed-ws | - | Name server |
| `WS_PASSWORD` | nats-seed-ws | (secret) | Password for the WebSocket connection |
| `ALLOWED_ORIGINS` | nats-seed-ws | - | Comma-separated list of WEB domains (e.g., https://app.com,https://test.com). Necessary for CORS in browsers. Only for web apps. |
| `JETSTREAM_STORE` | nats-seed-ws | - | Memory usage Jetstream |
| `MAX_CONNECTIONS` | nats-seed-ws | 1000 | Define the maximum number of connections |
| `MAX_PAYLOAD_SIZE` | nats-seed-ws | 1048576 | Defines the maximum size of the payload in bytes. |
| `MAX_PENDING_SIZE` | nats-seed-ws | 10485760 | Define maximum size of pending messages |
| `CLUSTER_ROUTES_SEED` | nats-seed-ws | nats://localhost:6222 | URL of the seed nodes for the cluster |
| `MS_USER` | nats-server-2 | (secret) | User authentication tcp server |
| `DEBUG_MODE` | nats-server-2 | false | Set to true to activate debug mode |
| `TRACE_MODE` | nats-server-2 | false | Set to true to activate trace mode |
| `MS_PASSWORD` | nats-server-2 | (secret) | Password authentication tcp server |
| `SERVER_NAME` | nats-server-2 | - | Name server |
| `JETSTREAM_STORE` | nats-server-2 | - | Memory usage Jetstream |
| `MAX_CONNECTIONS` | nats-server-2 | 1000 | Define the maximum number of connections |
| `MAX_PAYLOAD_SIZE` | nats-server-2 | 1048576 | Defines the maximum size of the payload in bytes. |
| `MAX_PENDING_SIZE` | nats-server-2 | 10485760 | Define maximum size of pending messages |
| `CLUSTER_ROUTES_SEED` | nats-server-2 | - | URL of the seed nodes for the cluster |
| `MS_USER` | nats-server-1 | (secret) | User authentication tcp server |
| `DEBUG_MODE` | nats-server-1 | false | Set to true to activate debug mode |
| `TRACE_MODE` | nats-server-1 | false | Set to true to activate trace mode |
| `MS_PASSWORD` | nats-server-1 | (secret) | Password authentication tcp server |
| `SERVER_NAME` | nats-server-1 | - | Name server |
| `JETSTREAM_STORE` | nats-server-1 | - | Memory usage Jetstream |
| `MAX_CONNECTIONS` | nats-server-1 | 1000 | Define the maximum number of connections |
| `MAX_PAYLOAD_SIZE` | nats-server-1 | 1048576 | Defines the maximum size of the payload in bytes. |
| `MAX_PENDING_SIZE` | nats-server-1 | 10485760 | Define maximum size of pending messages |
| `CLUSTER_ROUTES_SEED` | nats-server-1 | - | URL of the seed nodes for the cluster |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/nats`

**Category:** Queues

[View on Railway →](https://railway.com/template/nats-server-with-jetstream-websockets-an)
