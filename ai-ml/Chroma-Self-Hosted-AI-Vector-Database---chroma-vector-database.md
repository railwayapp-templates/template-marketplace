# Deploy Chroma — Self-Hosted AI Vector Database on Railway

Self-host Chroma — vector database for RAG & semantic search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chroma-vector-database)

## About

Chroma is the open-source, AI-native vector database — a self-hosted Pinecone alternative for storing and searching embeddings, and the backbone of RAG pipelines, semantic search, and LLM memory. It's the default vector store in LangChain tutorials and natively integrated with LlamaIndex and Haystack, so it drops into almost any AI stack. This template deploys the official Chroma image with a persistent volume and token authentication already configured — the two things a naive Chroma deploy gets wrong — so your embeddings survive redeploys and your database isn't left open.

---

Chroma is simple to run, but two specifics separate a working production instance from a broken or insecure one — both handled here.

**Persist the volume, or you lose your entire database on redeploy.** This is the number-one Chroma production failure: without a mounted volume, all embeddings and the SQLite metadata live in the container filesystem and are wiped on every redeploy. This template mounts a volume at the persist directory and sets `IS_PERSISTENT=TRUE`, so your collections and vectors survive deployments. Re-embedding a large corpus is slow and costly — this is the setting that prevents that pain.

**Token auth is off by default — this template turns it on.** Out of the box, Chroma runs with no authentication, so a public deployment is an open, writable vector database anyone can read or overwrite. This template sets `CHROMA_SERVER_AUTHN_PROVIDER` to the token provider and generates a secret `CHROMA_SERVER_AUTHN_CREDENTIALS` bearer token, so only clients sending that token in the `Authorization` header can connect.

**It binds to all interfaces for Railway.** `CHROMA_SERVER_HOST=0.0.0.0` lets Railway route traffic, with automatic HTTPS on the public endpoint. For service-to-service use, connect over Railway's private network to keep traffic internal and free.

**Drops into LangChain and LlamaIndex.** Chroma is the de facto default vector store for both. Install `langchain-chroma` or `llama-index-vector-stores-chroma`, point the host at your Railway domain, pass your bearer token, and your RAG pipeline has a persistent, self-hosted vector store — no per-vector cloud fees. `ANONYMIZED_TELEMETRY=FALSE` disables Chroma's anonymous usage reporting.

Typical cost: **~$5–10/month** on Railway for the service and storage, scaling with your embedding volume. Chroma is Apache-2.0 licensed and free — versus Pinecone's per-vector, per-query pricing that climbs fast as your data grows.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chroma | `chromadb/chroma:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `CHROMA_HOST` | 0.0.0.0 |
| `CHROMA_SERVER_AUTHN_PROVIDER` | chromadb.auth.token_authn.TokenAuthenticationServerProvider |
| `CHROMA_SERVER_AUTHN_CREDENTIALS` | (secret) |
| `CHROMA_SERVER_CORS_ALLOW_ORIGINS` | ["*"] |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/chroma-vector-database)
