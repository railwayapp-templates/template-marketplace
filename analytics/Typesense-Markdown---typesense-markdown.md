# Deploy Typesense Markdown on Railway

index markdown and MDX into Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-markdown)

## About

MDX.

Typesense Markdown Search is a deployment pattern that indexes raw Markdown and MDX files into a typo-tolerant instant search index using the open-source Typesense engine. You run a self-hosted Typesense node on Railway, parse Markdown frontmatter and content, and push structured documents. The result is Algolia-quality search for Docusaurus, Nextra, Astro, VitePress, Hugo, MkDocs, or any static site generator.

Railway provides Docker-native hosting with persistent volumes, environment variables, health checks, and scaling. You deploy the official `typesense/typesense:30.2` image, attach a `/data` volume, set `TYPESENSE_API_KEY`, and expose port `8108`. The index lives in RAM for sub-50ms queries; snapshots persist to disk.

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

[View on Railway →](https://railway.com/deploy/typesense-markdown)
