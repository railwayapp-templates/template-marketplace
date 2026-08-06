# Deploy Qdrant — High-Performance Vector Database on Railway

Self-host Qdrant — fast vector search at scale for RAG & AI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdrant-vector-search)

## About

Qdrant is the high-performance, open-source vector database — a Rust-built Pinecone and Milvus alternative engineered for speed and scale, handling billions of vectors with advanced payload filtering, quantization, and hybrid search. It's the vector store teams reach for when they need production-grade throughput for RAG, semantic search, recommendations, and agent memory. This template deploys the official Qdrant image with a persistent volume, both API ports exposed, and API-key auth configured — so vectors survive redeploys, your client connects, and the instance isn't left open.

---

Qdrant is a single fast binary, but three specifics decide whether it works in production — all handled here.

**Persist the volume, or you lose everything on redeploy.** Qdrant writes vector indexes and payload data to `/qdrant/storage`. By default that lives in the container filesystem and disappears on restart — a disaster in production. This template mounts a persistent volume there, so collections and vectors survive redeploys.

**Both ports must be exposed — gRPC is the most common gotcha.** Qdrant serves its REST API and dashboard on `6333` and gRPC on `6334`. The Python and other SDK clients default to gRPC, so if `6334` isn't exposed you get "connection refused" — the single most common Qdrant setup bug. This template exposes both, so the SDKs connect without the usual debugging.

**Set the API key — Qdrant is open by default.** Without `QDRANT__SERVICE__API_KEY`, any process that can reach the instance has full read/write access to your vectors. This template generates a strong key; pass it in the `api-key` header from your clients and keep it secret.

**Built for scale — with the knobs to prove it.** Qdrant's edge over simpler vector stores is production performance: payload filtering runs *inside* the vector query (no separate metadata store), scalar or product quantization cuts memory 4–8× with minimal recall loss, and HNSW parameters tune the speed/accuracy trade-off per collection. It handles billions of vectors on modest hardware.

**Drops into LangChain, LlamaIndex, and n8n.** Qdrant integrates natively with the major AI frameworks and has an n8n node for automation. Point the host at your Railway domain, pass the API key, and it's your production vector store. Connect other Railway services over the private network on `6333` to keep traffic internal.

Typical cost: **~$5–10/month** on Railway for the service plus storage, scaling with your vector volume. Qdrant is Apache-2.0 licensed and free — versus Pinecone's per-read/query billing that compounds as traffic grows.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Qdrant | `qdrant/qdrant` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 6333 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/qdrant-vector-search)
