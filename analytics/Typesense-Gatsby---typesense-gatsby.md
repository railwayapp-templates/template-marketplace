# Deploy Typesense Gatsby on Railway

Gatsby site search with Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-gatsby)

## About

Gatsby ships static HTML, and gatsby-plugin-typesense turns that into a searchable Typesense collection after each build. The plugin scans `public/` for elements with `data-typesense-field` attributes, creates a timestamped collection, then atomically flips an alias so readers never see a half-built index.

This stack is two parts: a Typesense server on Railway and the Gatsby plugin running post-build wherever you build. Railway handles the server side — Docker image, volume, health checks — while your Gatsby build pushes documents over HTTP. The plugin does not need GraphQL or frontmatter.

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

[View on Railway →](https://railway.com/deploy/typesense-gatsby)
