# Deploy Typesense Filtering on Railway

filter_by, facets, and pinned hits

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-filtering)

## About

The first time I wired up faceted search on Railway, I stared at zero facet counts because I forgot `facet: true` in the schema. Filtering requires declaring filterable and facetable fields at index time. Typesense handles it with `filter_by`, `facet_by`, and `pinned_hits`, but only when the schema, API key, CORS, and volume are set right. On Railway, pin `typesense/typesense:30.2`, mount `/data` on a volume, and start with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`. Lose the API key and every request fails until you rotate it and update clients. Pinned hits that don’t match the current filter are silently dropped — a gotcha you learn by running it.

This Railway template runs a single-node Typesense instance with the official Docker image. It’s not a cluster; horizontal scaling needs a separate Typesense cluster and load balancer. You get a search server on port 8108, a persistent volume for `/data`, the API key as an env var, and CORS for browser InstantSearch. The template assumes you know filtering and faceting are core, not add-ons.
Operational sweet spot: a dataset that fits in RAM. Typesense is in-memory, so `filter_by` and facet counts are computed in RAM, not disk. That keeps filtered queries fast — often under 10 ms for tens of thousands of records — but RAM must exceed index size plus overhead. 512 MB handles ~100k–200k small docs; 2 GB handles a few hundred thousand. Exceed RAM and latency collapses. The healthcheck on 8108 restarts a hung process, but the index only survives if the volume is intact. Keep that volume.

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

[View on Railway →](https://railway.com/deploy/typesense-filtering)
