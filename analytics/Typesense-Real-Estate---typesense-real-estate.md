# Deploy Typesense Real Estate on Railway

listings, map radius, and facet filters

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-real-estate)

## About

Typesense Real Estate is Typesense OSS on Railway, set up for property portals: typo-tolerant address lookup, map radius and polygon filters, and price, beds, and baths facets that update while the buyer is still typing.

A property search box that returns typo-tolerant hits in 40 ms stops being a feature and becomes the product. Self-hosted Typesense does that for listings: addresses, neighborhoods, price bands, bedrooms.

Typesense handles structured and free-text fields: a geopoint for radius and polygon filters, integers for price and beds, strings with typo tolerance. It is in-memory, so RAM is the number you size.

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

[View on Railway →](https://railway.com/deploy/typesense-real-estate)
