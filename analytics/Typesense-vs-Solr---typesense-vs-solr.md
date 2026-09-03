# Deploy Typesense vs Solr on Railway

Typesense as a modern Solr alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-vs-solr)

## About

This template deploys a self hosted Typesense instant search engine on Railway as a lightweight, developer-friendly alternative to Apache Solr, with a persistent volume, typo-tolerant search, and a one-click deploy.

Typesense is a modern, open-source, typo-tolerant instant search engine built for speed and developer happiness. It is often positioned as a lightweight, self-hostable alternative to Apache Solr, which has long been the heavyweight in the open-source search world. While Solr is powerful, it carries a significant operational burden: complex configuration, JVM tuning, schema management, and a steep learning curve. Typesense strips away that complexity, offering a single binary, a simple HTTP API, and instant, relevant search results out of the box.

This Railway template deploys Typesense using the official Docker image `typesense/typesense:30.2`. It is designed for developers who want the power of a dedicated search engine without the overhead of managing Solr clusters. On Railway, you get a managed container platform that handles infrastructure, scaling, and networking, so you can focus on buildi

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

[View on Railway →](https://railway.com/deploy/typesense-vs-solr)
