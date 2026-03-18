# Deploy Valkey on Railway

An open source, Redis compatible, in-memory data store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pQYeJx)

## About

Valkey is a high-performance data structure server that primarily serves key/value workloads. It supports a wide range of native structures and an extensible plugin system for adding new data structures and access patterns.

Hosting Valkey involves deploying a high-performance in-memory data structure server that acts as a database, cache, and message broker. Valkey requires minimal configuration for basic deployments and runs on port 6379 by default. It can be configured for data persistence, clustering, and high availability depending on your application needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VALKEY_URL` | - | Private database URL |
| `VALKEY_HOST` | - | Private hostname |
| `VALKEY_PORT` | 6379 | Private port |
| `VALKEY_USER` | (secret) | Default username |
| `VALKEY_PASSWORD` | (secret) | Authentication password |
| `VALKEY_PUBLIC_URL` | - | Public database URL |
| `VALKEY_PUBLIC_HOST` | - | Public hostname |
| `VALKEY_PUBLIC_PORT` | - | Public port |

## Configuration

- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pQYeJx)
