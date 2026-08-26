# Deploy ChromaDB on Railway

Vector database that stores documents and finds similar ones

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chromadb-vector)

## About

ChromaDB is an open-source embeddings database — the storage layer retrieval-augmented generation, semantic search and agent memory are built on. You hand it documents with their vectors, and it returns the nearest matches to a query vector in milliseconds, with metadata filters applied in the same call. Teams use it for product docs behind a support bot, or the memory an agent reads before it answers.

This template runs ChromaDB as a client-server deployment rather than an embedded library. The `chroma` service runs the official `chromadb/chroma` image with a 5 GB volume at `/data`, holding its SQLite metadata store and HNSW index files, and has no public domain. In front sits `gateway`, a Caddy proxy from [gridalpha/chromadb-railway](https://github.com/gridalpha/chromadb-railway), which owns the public URL and checks credentials before anything reaches the database. That split matters: open-source Chroma ships no authentication, and its own guide says the basic stack "doesn't support any kind of authentication" and to put it behind an authenticating proxy. Self-host ChromaDB this way and it is reachable only through a credential you control.

![Chroma server behind a Caddy gateway on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787655721/chromadb-architecture.png)

Chroma is an Apache-2.0 embeddings database from [chroma-core/chroma](https://github.com/chroma-core/chroma), rewritten in Rust for the 1.x line. A single-node server keeps collection metadata in SQLite and each collection's vectors in an HNSW index, held in memory while in use and persisted to disk. Self-host it when the embeddings come from data you would rather not send to a managed service, when you want a fixed monthly cost instead of per-gigabyte charges, or when the database should sit on the app's private network.

- Collections with per-record documents, metadata and optional URIs
- Vector search with metadata filters and full-text conditions in one query
- Cosine, squared L2 and inner-product spaces, with tunable HNSW parameters
- Python, TypeScript and Rust clients, plus LangChain and LlamaIndex integrations
- A generated OpenAPI schema and Swagger UI served by the database itself

`chroma` is the database and stays private; its volume is the only durable state. `gateway` is a stock Caddy build whose entrypoint hashes your password at boot and installs two routes — an exact bearer-token match for API clients, checked first so SDKs never meet an authentication challenge, and basic auth for everything else, which lets a browser use the API explorer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | [gridalpha/chromadb-railway](https://github.com/gridalpha/chromadb-railway) | Web service |
| chroma | `chromadb/chroma:1.5.9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CHROMA_TOKEN` | gateway | (secret) | Bearer token for API clients |
| `CHROMA_PASSWORD` | gateway | (secret) | Basic auth password, hashed at boot |
| `CHROMA_UPSTREAM` | gateway | - | Private address of the database |
| `CHROMA_USERNAME` | gateway | (secret) | Basic auth username |
| `PORT` | chroma | 8000 | Port Railway health checks probe |
| `CHROMA_PORT` | chroma | 8000 | Chroma server listening port |
| `CHROMA_ALLOW_RESET` | chroma | false | Blocks the destructive reset endpoint |
| `CHROMA_PERSIST_PATH` | chroma | /data | Data directory on the volume |
| `CHROMA_LISTEN_ADDRESS` | chroma | :: | Dual-stack bind for private networking |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/v2/healthcheck`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/chromadb-vector)
