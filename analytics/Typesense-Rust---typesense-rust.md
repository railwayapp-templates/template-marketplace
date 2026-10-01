# Deploy Typesense Rust on Railway

community Rust client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-rust)

## About

The first time you point a Rust binary at `localhost:8108` and watch a query return in 3 milliseconds, you understand why people self-host Typesense despite Algolia's polish. The Rust client is thin by design: it wraps `reqwest` and `tokio` calls against the JSON REST API on port 8108. You get async I/O, connection pooling, and typed errors without fighting an abstraction layer. The Railway template ships the official `typesense/typesense:30.2` Docker image with a persistent volume mounted at `/data`.

Railway runs the container, but the operational model is one binary, one volume, one port. Pin the image to `typesense/typesense:30.2`, mount a persistent volume at `/data`, expose port 8108. The engine holds the index in RAM, persists snapshots to the volume, and restarts in seconds.

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

[View on Railway →](https://railway.com/deploy/typesense-rust)
