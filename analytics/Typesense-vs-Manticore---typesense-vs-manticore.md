# Deploy Typesense vs Manticore on Railway

Typesense vs Manticore Search bake-off

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-manticore)

## About

You hit save and search still shows yesterday’s SKU, so you start comparing engines. Typesense lands index updates in under a second with typo tolerance out of the box. Manticore, the Sphinx fork, gives raw full‑text throughput over huge datasets but demands SQL‑era tuning. On Railway, the Typesense template feels like an afternoon setup; Manticore stays an option for disk‑heavy workloads.

Typesense (GPL‑3.0) and Manticore (GPL‑2.0) are self‑hostable. Railway's one‑click template pins `typesense/typesense:30.2`, volume at `/data`, required API key, health on 8108. Manticore has no template.

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

[View on Railway →](https://railway.com/deploy/typesense-vs-manticore)
