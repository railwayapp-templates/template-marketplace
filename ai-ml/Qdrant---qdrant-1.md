# Deploy Qdrant on Railway

Qdrant [Jul '26] (Open-Source Vector Database for AI & Search) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdrant-1)

## About

Qdrant is the open-source, Rust-based vector database purpose-built for semantic search, recommendation engines, and retrieval-augmented generation. If you're building anything that needs to find "similar" content by meaning rather than exact keyword match, this is the infrastructure piece underneath it.

Pinecone's Standard plan carries a $50/month minimum before usage, then $0.33/GB/month for storage, $4 per million write units, $16 per million read units on top. A RAG application with real traffic, ingesting documents, running searches on every user query, can rack up meaningful cost fast under that model, and the bill grows with usage, not with value delivered. Qdrant self-hosted on Railway costs a flat infrastructure fee regardless of how many reads or writes you run against it, so the math only gets better as your application actually gets used.

The bigger reason to self-host a vector database specifically isn't just the pricing model, though. Your embeddings encode the actual content of whatever you're building on, documents, conversations, user behavior. Handing that to a third-party managed service means trusting their infrastructure with a compressed representation of your entire dataset. Self-hosting keeps that data on infrastructure you control, which matters more for a vector database than it might for a simpler tool, since embeddings are effectively derived from your most sensitive content.

It's worth being specific about what makes Qdrant different from just "another database you could self-host": it's written in Rust and built from the ground up for approximate nearest-neighbor search at scale, using HNSW indexing. That's not a general-purpose database with vector search bolted on, it's the actual core design, which is why it stays fast even as collections grow into the millions of vectors.

This isn't a small or unproven project either. Qdrant has crossed 34,000 GitHub stars, one of the default choices developers reach for when a project outgrows a simple in-memory similarity search. That track record matters: a vector database under a production RAG pipeline is infrastructure you want to trust, not discover has a bug three months in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qdrant-railway | [shruti060701/qdrant-railway](https://github.com/shruti060701/qdrant-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes external traffic to. This is nginx's port, not Qdrant's own 6333, since nginx sits in front to redirect the bare domain root to `/dashboard` (see Dockerfile/nginx-redirect.conf). Must be an explicit Railway variable, this project has confirmed the hard way (Metabase, Postiz, Vaultwarden, 9Router, WordPress) that a Dockerfile-only default alone doesn't reliably get picked up by Railway's edge routing. |
| `QDRANT__SERVICE__HOST` | 0.0.0.0 | Binds Qdrant's own server to all network interfaces. Note this single setting covers both the REST and gRPC ports together, confirmed via Qdrant's config source, they can't be bound separately. |
| `QDRANT__SERVICE__API_KEY` | (secret) | **Critical, confirmed via Qdrant's own config source: without this set, every REST/gRPC request succeeds with zero authentication.** Never mark this optional or leave it blank on a service with a public domain. |
| `QDRANT__SERVICE__GRPC_PORT` | 6334 | gRPC API port, used by client libraries that support it. Unchanged, still directly reachable. |
| `QDRANT__SERVICE__HTTP_PORT` | 6333 | Qdrant's own REST API port. Unchanged from a bare Qdrant install, still directly reachable on Railway's private network. |
| `QDRANT__STORAGE__STORAGE_PATH` | /qdrant/storage | Directory where collections and vectors are stored. Must match the Railway volume mount path exactly. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/qdrant-1)
