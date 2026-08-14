# Deploy pgvector on Railway

Pinecone Alternative. Database for embeddings, search and AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgvector-railway)

## About

pgvector is the open-source PostgreSQL extension that turns Postgres into a vector database. It adds `vector`, `halfvec`, `sparsevec` and `bit` column types plus HNSW and IVFFlat approximate-nearest-neighbour indexes, so embeddings live in the same tables and transactions as the rows they describe. With ~22.5k GitHub stars, a permissive PostgreSQL License and clients for 40+ languages, it is the default retrieval layer for RAG, semantic search and AI agents that need memory.

Self-host pgvector on Railway as one service on the official `pgvector/pgvector:0.8.6-pg18` image — PostgreSQL 18.4 with pgvector 0.8.6 — plus a persistent volume and a TCP proxy. A boot script reads the container's real cgroup limits at every start and derives `shared_buffers`, `effective_cache_size`, `maintenance_work_mem`, `work_mem` and parallel worker counts from them, generates a TLS keypair, and pre-creates the `vector` and `pg_stat_statements` extensions. Services in the project connect privately at `${{RAILWAY_PRIVATE_DOMAIN}}:5432`; laptops use the proxy with `sslmode=require`.

![pgvector Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786642726/583c6167-97fc-4fd8-9803-3ee35fec9115.png)

Vectors are just another Postgres column type, so you filter by tenant, join to metadata, enforce row-level security and rank by cosine distance in one query — and the embedding and its source row commit or roll back together, which no standalone vector store offers.

- `vector`/`halfvec` to 16,000 dimensions, `sparsevec` and `bit` for sparse and binary data
- HNSW and IVFFlat indexes, plus exact search with no index at all
- Distance operators for L2 `&lt;-&gt;`, cosine `&lt;=&gt;`, inner product `&lt;#&gt;`, L1, Hamming and Jaccard
- `halfvec` roughly halves index size — 22 MB against 39 MB on identical data
- `vector` is enabled in `template1`, so every new database inherits it

The topology is one service, one volume, no pooler and no sidecars. The volume mounts at `/var/lib/postgresql`: PostgreSQL 18 moved `PGDATA` to `/var/lib/postgresql/18/docker`, so the old PG≤17 path `/var/lib/postgresql/data` silently gives an ephemeral database. PG18 also turns on data checksums.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:0.8.6-pg18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BOOT_SH` | <boot script> | Container-aware tuning and TLS script |
| `APP_DB_USER` | (secret) | Least-privilege application role |
| `POSTGRES_DB` | railway | Database created on first boot |
| `DATABASE_URL` | - | Private app connection string |
| `POSTGRES_USER` | (secret) | Superuser role name |
| `APP_DB_PASSWORD` | (secret) | Application role password |
| `POSTGRES_PASSWORD` | (secret) | Superuser password |
| `DATABASE_ADMIN_URL` | - | Superuser string, private only |
| `DATABASE_PUBLIC_URL` | - | Public TCP proxy string |

## Configuration

- **Start command:** `/bin/bash -c 'printf "%s" "$BOOT_SH" > /tmp/boot.sh && exec bash /tmp/boot.sh'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgvector-railway)
