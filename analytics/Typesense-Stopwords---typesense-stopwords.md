# Deploy Typesense Stopwords on Railway

stopword sets for cleaner query tokens

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-stopwords)

## About

Typesense Stopwords drops noise tokens like "the" and "a" via stopword sets so ranking focuses on real query terms. This Railway listing runs official typesense/typesense:30.2 on port 8108 with a /data volume, TYPESENSE_API_KEY, and --enable-cors.

Stopwords are noise tokens like "the," "in," or "a" that bloat an index and muddy ranking. Typesense lets you manage them as explicit stopword sets per collection, per locale, or per tenant. You tweak them via API without redeploying. On Railway, the stopword sets live on a persistent volume alongside the index, so changes survive restarts. No external config service needed.

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

[View on Railway →](https://railway.com/deploy/typesense-stopwords)
