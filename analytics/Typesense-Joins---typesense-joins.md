# Deploy Typesense Joins on Railway

join-related documents across collections

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-joins)

## About

Typesense Joins is for teams tired of a second round-trip just to show a category name next to a product. This Railway listing runs the official `typesense/typesense:30.2` image on port 8108 with a `/data` volume, `TYPESENSE_API_KEY`, and `--enable-cors`.

Typesense joins collapse the classic N+1 search pattern into one API call: your UI fetches products, then fires a second round-trip for category names or author bios. Joins let you reference document IDs across collections and fetch related docs inline with `include_fields: $categories(title, slug)`. On Railway, run the official `typesense/typesense:30.2` image; joins are built into the GPL-3.0 engine, no add-on or separate service.

Joins are reference lookups, not SQL-style arbitrary predicates. You can fetch and filter on documents in a related collection, but there are no arbitrary predicates or aggregations across tables. That constraint keeps Typesense in-memory and fast on a single Railway container.

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

[View on Railway →](https://railway.com/deploy/typesense-joins)
