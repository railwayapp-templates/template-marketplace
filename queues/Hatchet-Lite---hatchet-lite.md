# Deploy Hatchet Lite on Railway

Hatchet Lite with postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hatchet-lite)

## About

Hatchet Lite is a lightweight, single-image distribution of [Hatchet](https://hatchet.run), an open-source distributed task queue and workflow orchestration engine backed by Y Combinator (W24). It bundles the Hatchet engine, REST API, gRPC server, admin CLI, and an embedded RabbitMQ broker into one container — ideal for development, testing, and low-to-medium throughput production workloads.

Deploying hatchet-lite requires a running PostgreSQL database for persisting task state, workflow definitions, and execution history. This template provisions both services on Railway: a Postgres instance using Railway's SSL-enabled image and a hatchet-lite container from the official Hatchet registry. Railway handles networking between the two services automatically, so hatchet-lite can connect to Postgres via an internal `DATABASE_URL` without any manual configuration. The template lets you set an admin email address during deployment and automatically generates a secure admin password — no default credentials to worry about. The hatchet-lite image exposes a web dashboard on port 8888 and a gRPC endpoint on port 7077 for worker connections.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hatchet-lite | `ghcr.io/hatchet-dev/hatchet/hatchet-lite` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | hatchet-lite | 8888 |
| `ADMIN_PASSWORD` | hatchet-lite | (secret) |
| `SERVER_GRPC_PORT` | hatchet-lite | 7077 |
| `SERVER_GRPC_INSECURE` | hatchet-lite | t |
| `SERVER_GRPC_BIND_ADDRESS` | hatchet-lite | 0.0.0.0 |
| `SERVER_AUTH_COOKIE_SECRETS` | hatchet-lite | (secret) |
| `SERVER_AUTH_COOKIE_INSECURE` | hatchet-lite | t |
| `SERVER_DEFAULT_ENGINE_VERSION` | hatchet-lite | V1 |
| `SERVER_AUTH_SET_EMAIL_VERIFIED` | hatchet-lite | t |
| `POSTGRES_DB` | postgres | railway |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/hatchet-lite)
