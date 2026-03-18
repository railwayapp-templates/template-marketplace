# Deploy ChromaDB on Railway

Official Docker image - AI vector database for RAG, LLMs & hybrid search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chromadb-1)

## About

<img alt="ChromaDB" height="96" width="96" src="https://raw.githubusercontent.com/ACT900/chromadb-railway/main/Chroma-Svg-Logo.svg">

  # Deploy and Host ChromaDB with Railway

  ChromaDB is the open-source vector database built for AI.

  Deploy v1.5.0 in under 2 minutes using the official Docker image (3.9M+ pulls).

  One service, one volume, no auth proxy.

  Runs on private networking so your data stays internal and traffic between services is free.

  ## About Hosting ChromaDB

  ChromaDB is purpose-built for AI applications. Its Rust core delivers up to 4x faster writes and queries, scaling from prototype to
  billions of embeddings without switching databases. It ships with hybrid search combining vector similarity, full-text, BM25, and
  SPLADE through Reciprocal Rank Fusion for better retrieval quality out of the box. Multi-modal support means text, image, and audio
  embeddings live in a single collection. This template deploys the official chromadb/chroma image directly from Docker Hub with no
  forks, no modifications, and no custom code. Data persists to a Railway Volume at `/data` and survives restarts and redeploys
  automatically.

  ## Common Use Cases

  - **RAG pipelines** - Store document embeddings and retrieve high-relevance context for LLM prompts
  - **Hybrid search** - Combine semantic similarity with keyword matching for better results than either alone
  - **LLM memory** - Give AI agents persistent long-term memory across conversations
  - **Multimodal search** - Query text, image, and audio embeddings from a single collection
  - **Recommendation engines** - Surface similar content at scale using embedding similarity

  ## Dependencies for ChromaDB Hosting

  - Official Docker image: [chromadb/chroma v1.5.0](https://hub.docker.com/r/chromadb/chroma) (3.9M+ pulls)
  - Railway Volume at `/data` for persistent storage
  - Private networking only, never exposed to the public internet
  - No external databases or additional services required

  ### Deployment Dependencies

  - [ChromaDB Documentation](https://docs.trychroma.com)
  - [ChromaDB GitHub](https://github.com/chroma-core/chroma) (22K+ stars)
  - [ChromaDB Python Client](https://pypi.org/project/chromadb/)
  - [ChromaDB JavaScript Client](https://www.npmjs.com/package/chromadb)

  ### Implementation Details

  Connect from any service in your Railway project:

```python
  import chromadb

  client = chromadb.HttpClient(host="chromadb.railway.internal", port=8000)
  collection = client.get_or_create_collection("my_embeddings")
  ```

### Why Deploy ChromaDB on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal
  with configuration, while allowing you to vertically and horizontally scale it.

  By deploying ChromaDB on Railway, you are one step closer to supporting a complete full-stack AI application with minimal burden.
  Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chroma Database | [ACT900/chromadb-railway](https://github.com/ACT900/chromadb-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Railway reverse proxy port — must match CHROMA_HOST_PORT for traffic routing |
| `IS_PERSISTENT` | TRUE | Store all data to disk at "/data" volume for persistence across restarts and redeployments |
| `CHROMA_WORKERS` | 1 | Number of Uvicorn workers — increase for higher throughput under heavy concurrent load |
| `CHROMA_HOST_ADDR` | :: | Bind address — :: listens on all interfaces (IPv4 and IPv6) for Railway networking |
| `CHROMA_HOST_PORT` | - | ChromaDB HTTP server port — must match PORT variable |
| `ANONYMIZED_TELEMETRY` | false | Disable anonymous usage telemetry sent to the Chroma team |
| `CHROMA_TIMEOUT_KEEP_ALIVE` | 30 | HTTP keep-alive timeout in seconds — increase if clients hold long connections |

## Configuration

- **Healthcheck:** `/api/v2/heartbeat`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/chromadb-1)
