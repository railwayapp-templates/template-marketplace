# Deploy Typesense CJK on Railway

Chinese, Japanese and Korean search with locale tokenizing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-typesense-cjk-search-on-railway)

## About

This Railway template deploys Typesense CJK from Shinyduo/typesense-railway: Typesense 30 behind Caddy. Set per-field locales like zh, ja, or ko for CJK tokenization without space splitting. It suits developers who need instant CJK search without a separate segmenter.

This Railway template builds from the Shinyduo/typesense-railway repo: a Typesense 30 image plus a Caddy proxy on Railway's PORT 8080, forwarding to Typesense on 127.0.0.1:8118. Your zh, ja and ko collection schemas, ICU tokenizers and indexes stay in your Railway volume, so search data stays yours.

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

[View on Railway →](https://railway.com/deploy/deploy-typesense-cjk-search-on-railway)
