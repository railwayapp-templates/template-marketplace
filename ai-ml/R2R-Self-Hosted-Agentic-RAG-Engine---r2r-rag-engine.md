# Deploy R2R — Self-Hosted Agentic RAG Engine on Railway

Self-host R2R — agentic RAG, hybrid search & knowledge graphs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/r2r-rag-engine)

## About

R2R is the most advanced open-source AI retrieval system — a production-ready RAG engine by SciPhi that goes far beyond simple vector search. It combines hybrid search (semantic plus keyword), automatic knowledge-graph construction, agentic multi-step research, and full document management, all behind a clean REST API with a management dashboard — the "Supabase for RAG," a complete retrieval backend for your AI apps. This template deploys R2R's full stack — API server, dashboard, pgvector database, and graph clustering — pre-wired, so you have a serious RAG engine running in minutes.

---

R2R is a sophisticated, multi-service retrieval platform, and the value is in getting it wired correctly — all handled here.

**Four services, pre-wired — the hard part done.** R2R isn't a single container: it needs the API server, the dashboard, a pgvector database, and a dedicated graph-clustering service, all connected. This template wires them over the private network so ingestion, search, agentic RAG, and knowledge-graph building work immediately, instead of assembling four services and their connections by hand.

**pgvector, not standard Postgres.** R2R stores vector embeddings, documents, and graph data in PostgreSQL via the pgvector extension, which Railway's managed Postgres doesn't include — so this template uses the `pgvector/pgvector:pg16` image with a dedicated volume. This is what powers R2R's hybrid semantic-plus-keyword search.

**Agentic RAG and knowledge graphs — the real differentiator.** Beyond retrieving chunks, R2R can run an agent that performs multi-step research over your documents with citations, and it automatically constructs knowledge graphs from your corpus, so retrieval understands entities and relationships, not just text similarity. It's a full retrieval *system*, not just a database.

**Bring your own LLM key.** Add `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` on the R2R service, and it uses them for embeddings, generation, and the research agent. You pick the provider and pay it directly, with your documents and pipeline staying on your infrastructure.

**Sign in with your dashboard credentials.** After deploy, open the R2R Dashboard URL and sign in with the default credentials from `NEXT_PUBLIC_R2R_DEFAULT_EMAIL` and `NEXT_PUBLIC_R2R_DEFAULT_PASSWORD` — set strong values before deploying. From there, ingest documents, run searches, and manage users.

**Build on the REST API.** R2R exposes everything through a versioned REST API (default port 7272) — ingestion, search, RAG, and agent endpoints — with Python and JavaScript SDKs, so your apps call one retrieval backend instead of stitching together embedding, storage, and generation.

Typical cost: **~$15–25/month** on Railway for the four services, plus your LLM provider usage. R2R is open source (Apache/MIT components) and free to self-host.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18` | Database |
| R2R-Dashboard | `sciphiai/r2r-dashboard:1.0.3` | Web service |
| R2R-API | `sciphiai/r2r:latest` | Worker |
| graph-clustering | `ragtoriches/cluster-prod` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | pgvector | railway |
| `POSTGRES_USER` | pgvector | (secret) |
| `PGPORT_PRIVATE` | pgvector | 5432 |
| `POSTGRES_PASSWORD` | pgvector | (secret) |
| `PORT` | R2R-Dashboard | 3000 |
| `NEXT_PUBLIC_R2R_DEFAULT_EMAIL` | R2R-Dashboard | admin@example.com |
| `NEXT_PUBLIC_R2R_DEFAULT_PASSWORD` | R2R-Dashboard | (secret) |
| `PORT` | R2R-API | 7272 |
| `R2R_HOST` | R2R-API | 0.0.0.0 |
| `R2R_PORT` | R2R-API | 7272 |
| `R2R_LOG_LEVEL` | R2R-API | INFO |
| `R2R_SECRET_KEY` | R2R-API | (secret) |
| `R2R_PROJECT_NAME` | R2R-API | r2r_default |
| `R2R_POSTGRES_PORT` | R2R-API | 5432 |
| `R2R_POSTGRES_USER` | R2R-API | (secret) |
| `R2R_POSTGRES_PASSWORD` | R2R-API | (secret) |
| `HATCHET_CLIENT_TLS_STRATEGY` | R2R-API | none |
| `R2R_POSTGRES_MAX_CONNECTIONS` | R2R-API | 256 |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/r2r-rag-engine)
