# Deploy vchord-suite on Railway

One-click PostgreSQL with VectorChord, BM25, and hybrid search.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vchord-suite)

## About

VectorChord Suite is a PostgreSQL distribution with built-in vector search and BM25 full-text search. It includes `vchord` for IVF+RaBitQ vector indexes that scale to billions of vectors, `pg_tokenizer` for text tokenization, and `vchord_bm25` for hybrid search—all with pgvector compatibility.

Hosting VectorChord Suite requires a PostgreSQL-compatible environment with persistent storage for your vector data. This template pre-configures all four extensions (vchord, pg_tokenizer, vchord_bm25, vector) and initializes them on first boot. Unlike standard pgvector HNSW indexes which require significant RAM, VectorChord's IVF+RaBitQ indexes use disk-based quantization, making it cost-effective to scale to millions of vectors without expensive memory upgrades.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vchord-suite-railway | [nilum-ai/vchord-suite-railway](https://github.com/nilum-ai/vchord-suite-railway) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/vchord-suite)
