# Deploy Typesense Nested Fields on Railway

object and nested field schemas

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-nested-fields)

## About

Typesense Nested Fields lets you index objects and arrays of objects so InstantSearch can filter and facet nested attributes without flattening every path. This Railway listing runs official typesense/typesense:30.2 on port 8108 with a /data volume, TYPESENSE_API_KEY, and --enable-cors.

There's a moment when flattening document fields stops working. You've got a product with `variants` — each holding price, color, size, stock. Flatten into `variants_0_price`, `variants_1_color`, and the schema breaks the moment a seller adds a third variant. Typesense nested fields exist for this: you define objects and arrays of objects in your collection schema, index them as structured nested documents, and filter or facet on `variants.color` or `variants.price` directly.

Hosting on Railway means running the official `typesense/typesense:30.2` Docker image with a persistent volume for `/data`. Railway handles restarts, logs, health checks, and scaling. The API listens on port 8108; a health check there tells Railway when the node is ready.

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

[View on Railway →](https://railway.com/deploy/typesense-nested-fields)
