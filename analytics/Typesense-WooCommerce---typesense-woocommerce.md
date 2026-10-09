# Deploy Typesense WooCommerce on Railway

WooCommerce product search on Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-woocommerce)

## About

Picture a shopper typing "blu linen shrt" into a WooCommerce store with 20,000 variable products and getting nothing back, because the default search is a MySQL `LIKE` scan over `wp_posts` and `wp_postmeta`. This template runs the Typesense server that fixes that: typo-tolerant product search with price, category, and attribute facets, on Railway, while your store stays where it lives.

Typesense holds your catalog in RAM and returns results under 50ms with typo tolerance and facets.

The official image is a single binary on port 8108. Attach a volume to `/data`, set `TYPESENSE_API_KEY`, and you have a search API.

Railway bills for the CPU, RAM, and volume the container actually uses, so you scale RAM with SKU count instead of guessing at per-request fees.

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

[View on Railway →](https://railway.com/deploy/typesense-woocommerce)
