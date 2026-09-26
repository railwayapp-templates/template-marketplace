# Deploy Typesense Python on Railway

official Python client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-python)

## About

First time I wired Typesense into a Django API, I burned twenty minutes wondering why the Python client timed out — the container was bound to localhost inside its own network namespace. Railway fixes that by giving your service a public hostname and routing traffic straight to port 8108. Typesense is an in-memory, typo‑tolerant search engine under GPL-3.0. The `typesense-python` client is a thin HTTP wrapper installed with `pip install typesense`; it runs in your app process, not inside the Typesense container. Deployment shape: one Railway service running `typesense/typesense:30.2`, a volume at `/data`, `TYPESENSE_API_KEY` set, API on port 8108. RAM is your ceiling because Typesense keeps the index in memory.

Hosting open‑source Typesense on Railway means real search without per‑query billing. The Python client talks HTTPS like a managed service, but the index lives on your infrastructure. Railway handles container runtime, proxy, TLS, and volume persistence. Because Typesense is in‑memory, you can’t compensate low RAM with more CPU — the index won’t load. Health checks hit `GET /health` on port 8108. The Python library mirrors the server API: collections, documents, synonyms, overrides, search all map cleanly.

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

[View on Railway →](https://railway.com/deploy/typesense-python)
