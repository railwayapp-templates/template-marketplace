# Deploy CockroachDB (Insecure mode) on Railway

SQL database designed for high availability, scalability and resilience.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cockroachdb-insecure-mode)

## About

CockroachDB is a resilient, PostgreSQL‑compatible distributed SQL database built for correctness and scale. This template runs a single node in insecure mode for development and testing on Railway: data persists on a volume, SQL is reachable via a TCP proxy, and the Admin UI is publicly available on port 8080.

This template provisions a self‑hosted CockroachDB container with a persistent volume, starts the node with the `--insecure` flag (no TLS and no authentication), exposes the Admin UI publicly on port 8080, and makes the SQL port (26257) reachable through Railway’s TCP proxy. It is intended for non‑production use such as local development, demos, or CI environments. In insecure mode, anyone who can reach the service can access your cluster. For production, use a secure, multi‑node CockroachDB deployment with TLS and role‑based authentication. Learn more in the official docs: https://www.cockroachlabs.com/docs/v25.4/deploy-cockroachdb-on-premises-insecure

Important: Insecure mode allows the following:
- Your cluster is open to any client that can access any node's IP addresses.
- Any user, even root, can log in without providing a password.
- Any user, connecting as root, can read or write any data in your cluster.
- There is no network encryption or authentication, and thus no confidentiality.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CockroachDB | `cockroachdb/cockroach` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Start command:** `cockroach start-single-node --insecure --store=/cockroach/cockroach-data --sql-addr=0.0.0.0:26257 --listen-addr=0.0.0.0:26258 --http-addr=0.0.0.0:8080 --cache=64MiB --max-sql-memory=128MiB`
- **Healthcheck:** `/health?ready=1`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cockroach/cockroach-data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/cockroachdb-insecure-mode)
