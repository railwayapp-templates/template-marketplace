# Deploy Typesense In-Memory on Railway

in-memory search, size RAM to data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-in-memory)

## About

The first time you point a Typesense node at a 40 GB index with only 8 GB of RAM, you'll learn that "in-memory" is an architectural contract, not a phrase. The node OOM-kills mid-query, your search box goes silent, and logs show a kernel message that reads like a ransom note. This guide avoids that scene on Railway.

Typesense In-Memory is the same GPL-3.0 Typesense engine, but every document and inverted index lives in RAM. No lazy paging from disk when a user types "sweater" and expects results before the next keystroke. On Railway, you pay for compute that keeps the dataset resident.

The tradeoff: sub-10ms p95 latency for filtered searches, but RAM must cover peak index size. Typesense's in-memory inverted index typically consumes 1.5x to 2x raw JSON size, more with faceting and stemming. A 5 GB corpus often needs 8-10 GB RAM. Deploy with official typesense/typesense:30.2, port 8108, persistent volume at /data. The volume holds snapshots, not a RAM substitute.

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

[View on Railway →](https://railway.com/deploy/typesense-in-memory)
