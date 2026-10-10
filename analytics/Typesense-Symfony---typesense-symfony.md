# Deploy Typesense Symfony on Railway

Symfony SEAL adapter for Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-symfony)

## About

Symfony apps that want Algolia-class typeahead without SaaS metering usually land on SEAL — the PHP search abstraction — pointed at Typesense. This listing is Typesense OSS on Railway for Symfony with `cmsig/seal-symfony-bundle` and `cmsig/seal-typesense-adapter` (DSN like `typesense://$TYPESENSE_API_KEY@host:8108`).

The first time I wired Typesense into Symfony, the hard part wasn't the engine — it was picking where the node lived. Typesense is GPL-3.0, in-memory, instant. Symfony SEAL defines indexes in PHP, pushes documents from Doctrine entities, and returns typed results. Railway runs it as a first-class service; your app can share the project or live elsewhere.

Gotcha: Typesense keeps the whole index in RAM, so node memory caps document count. Start small (1 GB) and scale vertically. Pin `typesense/typesense:30.2`. Skip `latest` — majors can break schemas.

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

[View on Railway →](https://railway.com/deploy/typesense-symfony)
