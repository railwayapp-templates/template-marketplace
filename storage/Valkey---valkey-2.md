# Deploy Valkey on Railway

Open-source Redis-compatible in-memory database with auth and persistence.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/valkey-2)

## About

Valkey is a high-performance, open-source in-memory data store, born as a community-driven fork of Redis and backed by the Linux Foundation. It's fully compatible with the Redis protocol and clients, making it a drop-in replacement for caching, session storage, queues, and real-time data workloads, with sub-millisecond latency.

Hosting Valkey means running a persistent, password-protected in-memory database that your applications can reach quickly and securely. This template deploys the official `valkey/valkey` Docker image with authentication enabled out of the box: a random 32-character password is generated automatically on deploy, and the server starts with the port and credentials already wired up. Your other Railway services connect over the private network using the provided `VALKEY_URL`, while an optional TCP proxy exposes a public URL for external access. Attach a volume at `/data` to persist your data across redeployments. No manual configuration, no Dockerfiles, and no server maintenance required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VALKEY_HOST` | - | Private Hostname |
| `VALKEY_PORT` | 6379 | Private Port |
| `VALKEY_USER` | (secret) | Valkey Username |
| `VALKEY_PASSWORD` | (secret) | Valkey Password |
| `VALKEY_PUBLIC_HOST` | - | Public Hostname |
| `VALKEY_PUBLIC_PORT` | - | Public Port |
| `VALKEY_DATABASE_URL` | - | Private Database URL |
| `VALKEY_PUBLIC_DATABASE_URL` | - | Public Database URL |

## Configuration

- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/valkey-2)
