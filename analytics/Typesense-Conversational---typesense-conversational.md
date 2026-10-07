# Deploy Typesense Conversational on Railway

conversational search notes on Typesense

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-conversational)

## About

A customer types "which of your tents survive real wind?" into your help widget. Keyword search shrugs. Conversational search pulls the five most relevant product pages, hands them to an LLM, and replies with an answer that cites your own catalog. Then they ask "and the cheaper one?" and it still knows what "one" means. This template gives you that loop on a single Typesense node you own.

Typesense is GPL-3.0 open-source search, and its conversational mode is retrieval-augmented generation built into the server. You don't need a separate vector database, an orchestration framework, or a session store. Typesense runs the hybrid search, builds the prompt from the top hits, calls your LLM, and writes each turn to a history collection.

This template runs the official `typesense/typesense:30.2` image on port 8108 with a Railway volume at `/data`. You bring the LLM key; everything else lives in one container.

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

[View on Railway →](https://railway.com/deploy/typesense-conversational)
