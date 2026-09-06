# Deploy Typesense Synonyms on Railway

merchandising synonyms and overrides

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-synonyms)

## About

Deploy Typesense on Railway for merchandising synonyms, aliases, and search overrides — steer queries without Algolia per-search billing.

Typesense Synonyms is a self-hosted instant search deployment focused on merchandising synonyms, aliases, and search overrides. It runs the official Typesense Docker image on Railway, giving you a dedicated search node you control end to end. You define multi-way synonym groups, one-way aliases, and overrides that pin, hide, or boost products. All configuration lives in a Typesense collection schema and is queryable through the REST API on port 8108.

Railway handles container orchestration, health checks, log streaming, and volume persistence. You bring the Typesense image, set the API key, mount a volume at /data, and Railway keeps the node running. Typesense is in-memory, so RAM allocation directly determines how much of your catalog you can index. A small catalog fits in 512 MB; a large catalog with rich synonym sets needs 2 GB or more. Railway lets you resize the service vertically without re-provisioning infrastructure.

This is not a managed Typesense Cloud account. It is the open-source Typesense server, GPL-3.0 licensed, running as a single Docker container with a persistent volume. You own the data, API key, schemas, and synonym configuration. You also own backups and key rotation.

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

[View on Railway →](https://railway.com/deploy/typesense-synonyms)
