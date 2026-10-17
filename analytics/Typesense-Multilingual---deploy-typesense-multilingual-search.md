# Deploy Typesense Multilingual on Railway

Locale-aware multilingual search with Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-typesense-multilingual-search)

## About

One search box, several languages. This template runs Typesense 30.2 on Railway with a persistent volume, so you can give German, Japanese, and English fields their own locale and query them together.

Run a Japanese catalog through an English tokenizer and words that never had spaces get treated as one giant token, so partial matches just vanish. Typesense fixes that at the tokenizer level, not with a query-time bandage.

Set a `locale` parameter on a schema field and Typesense tokenizes that field the way the language expects.

On Railway, this is a single C++ server process with an in-memory index and a snapshot on disk.

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

[View on Railway →](https://railway.com/deploy/deploy-typesense-multilingual-search)
