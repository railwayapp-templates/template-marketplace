# Deploy Weaviate | Pinecone, Qdrant, Pgvector Alternative on Railway

Self Host Weaviate. Built-in support for vectorization (using OpenAI, etc.)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/weaviate-vector-database)

## About

This Railway template deploys a **Weaviate vector database** — ready for semantic search, RAG pipelines, and AI-powered apps — with a single click. 

---

Weaviate is an **open-source vector database** built for AI and machine learning workloads. It stores data objects alongside their vector embeddings, enabling semantic search, Retrieval-Augmented Generation (RAG), and recommendation systems without complex integration layers.

Key features:
- **Hybrid search** — combine vector similarity search with BM25 keyword search using a single `alpha` parameter
- **GraphQL + REST + gRPC APIs** — query your data from any language or toolchain
- **Schema-based data model** — define collections with typed properties for rich filtering alongside vector search
- **Built-in vectorizer modules** — optionally let Weaviate call OpenAI, Cohere, or Hugging Face to generate embeddings at import time
- **RBAC + API key auth** — fine-grained access control out of the box
- **HNSW indexing** — fast approximate nearest-neighbour search that scales logarithmically

This template ships with `DEFAULT_VECTORIZER_MODULE="none"`, meaning you bring your own vectors. This keeps the setup self-contained and works with any embedding model or provider. See the environment variable section below for how to add an external vectorizer.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Weaviate | `semitechnologies/weaviate` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP API port for Weaviate |
| `ENABLE_MODULES` | - | Additional Weaviate modules to enable |
| `CLUSTER_HOSTNAME` | node1 | Hostname used for cluster node |
| `QUERY_DEFAULTS_LIMIT` | 25 | Default maximum results per query |
| `PERSISTENCE_DATA_PATH` | - | Directory storing vector database data |
| `AUTHORIZATION_ENABLE_RBAC` | true | Enable role-based access control |
| `DEFAULT_VECTORIZER_MODULE` | none | Disable automatic text vectorization |
| `AUTHENTICATION_APIKEY_USERS` | admin | Users mapped to API keys |
| `AUTHENTICATION_APIKEY_ENABLED` | true | Enable API key authentication |
| `AUTHORIZATION_RBAC_ROOT_USERS` | admin | Root users with full permissions |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | - | Allowed API keys for access |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | false | Disable anonymous API access |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/weaviate`

**Category:** Storage

[View on Railway →](https://railway.com/template/weaviate-vector-database)
