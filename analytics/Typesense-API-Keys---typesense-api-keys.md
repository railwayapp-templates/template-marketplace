# Deploy Typesense API Keys on Railway

scoped keys and multi-tenant search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-api-keys)

## About

.

Typesense API Keys is a deployment template that packages the open-source Typesense instant search engine with a focus on scoped API keys and multi-tenant search isolation. Instead of relying on a single admin key for all reads and writes, this template lets you generate granular, expiring, collection-scoped keys that restrict search to specific tenants, datasets, or fields. Running Typesense API Keys on Railway means you control the full key lifecycle: create keys with `actions: ["documents:search"]`, bind them to a collection alias, set an expiration timestamp, and revoke them instantly when a tenant leaves. The template uses the official `typesense/typesense:30.2` Docker image, starts the server with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`, and persists the `/data` volume on Railway so API key metadata and search indexes survive restarts and deploys.

Typesense is GPL-3.0 licensed, so you own the binaries, data directory, key store, and network path. On Railway, the service runs as a single container with an internal hostname, an exposed `8108` port, and a persistent volume. You can mount the same volume across redeploys, clone the service for staging, or add a second replica for high availability. The `TYPESENSE_API_KEY` environment variable is the bootstrap admin key: Typesense requires it at startup and refuses to boot without it. That single secret unlocks every scoped key you will later mint via the REST API. Losing it means losing administrative access, so Railway's encrypted environment variable store is your first line of defense.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway | [Shinyduo/typesense-railway](https://github.com/Shinyduo/typesense-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | PORT |
| `TYPESENSE_URL` | - | TYPESENSE_URL |
| `TYPESENSE_API_KEY` | (secret) | TYPESENSE_API_KEY |
| `TYPESENSE_DATA_DIR` | - | TYPESENSE_DATA_DIR |
| `TYPESENSE_PUBLIC_URL` | - | TYPESENSE_PUBLIC_URL |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | TYPESENSE_THREAD_POOL_SIZE |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense-api-keys)
