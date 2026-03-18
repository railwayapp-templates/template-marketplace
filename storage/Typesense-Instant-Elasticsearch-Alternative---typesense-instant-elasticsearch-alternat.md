# Deploy Typesense – Instant Elasticsearch Alternative on Railway

Typesense [Meilisearch/Algolia/Elasticsearch Alternative], Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/typesense-instant-elasticsearch-alternat)

## About

Typesense is an open-source, typo-tolerant search engine designed for instant, relevant, and developer-friendly search experiences. Built for speed and simplicity, Typesense delivers millisecond search responses with minimal configuration. It’s a lightweight yet powerful alternative to Elasticsearch, ideal for modern applications that need fast full-text search without operational complexity.

Hosting Typesense on Railway allows you to deploy a production-ready, high-performance search engine in minutes—without managing infrastructure manually. Unlike Elasticsearch, which requires JVM tuning, cluster management, and complex configuration, Typesense is lightweight, easy to configure, and optimized for instant search use cases.

With Railway, you can:

- Deploy Typesense with persistent storage
-Secure your search instance with API keys
-Scale vertically as your dataset grows
-Monitor usage and manage environment variables easily

Whether you're building a SaaS platform, marketplace, e-commerce store, AI-powered search, or internal dashboard, Railway simplifies the operational overhead so you can focus on product development instead of DevOps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway-template | [sahilrupani/typesense-railway-template](https://github.com/sahilrupani/typesense-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Private Port |
| `TYPESENSE_URL` | - | Private URL to access Typesense |
| `TYPESENSE_API_KEY` | (secret) | Secret API Key |
| `TYPESENSE_DATA_DIR` | - | The location to store persistent data |
| `TYPESENSE_PUBLIC_URL` | - | Public URL to access Typesense |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | Set this value according to your plan.Recommended max values: Trial = 8, Hobby = 64, Pro = 200 (Absolute Max) |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | Set this value according to your plan.Recommended max values: Trial = 4, Hobby = 32, Pro = 128 (Absolute Max) |

## Configuration

- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/typesense-instant-elasticsearch-alternat)
