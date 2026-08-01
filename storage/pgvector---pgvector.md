# Deploy pgvector on Railway

pgvector [Jul '26] (Vector Search Inside PostgreSQL) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgvector)

## About

pgvector adds vector similarity search directly to PostgreSQL. No separate database, no new query language, embeddings live in the same tables as the rest of your application data, queried with SQL you already know.

Pinecone's Standard plan carries a $50/month minimum before any usage charges. Supabase's Pro plan runs $25/month with only 8GB of included database storage before overages kick in. pgvector self-hosted on Railway means your vector search runs inside a Postgres instance you already control, no separate managed vector database bill, no second system to keep synchronized with your primary data, and no data ever leaves infrastructure you own.

The bigger reason teams choose pgvector over a dedicated vector database isn't just cost, though. It's operational simplicity. Running a separate vector database means a second system to back up, monitor, secure, and keep in sync with your primary application data, and a whole class of bugs where the two drift apart. pgvector sidesteps that entirely: your embeddings are just another column type in a table you already have, backed up the same way, transactionally consistent with everything else in that row.

It's worth being direct about when pgvector is and isn't the right call. If vector search is a supporting feature of a larger application, recommendations, semantic search over your existing content, RAG over your own data, pgvector is very often the simpler, better choice. If vector search is your entire product and you're operating at a scale where a dedicated engine's specific performance characteristics genuinely matter, a purpose-built vector database like Qdrant is worth the added operational complexity. Most teams building most applications are in the first category far more often than the second.

This isn't a fringe or unproven approach either. pgvector has become the default way most Postgres-based teams add vector search, popular enough that it's the extension Supabase built its own AI features around, and it's actively maintained with regular releases keeping pace with newer index types and distance functions as the vector search space itself evolves.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector-railway | [shruti060701/pgvector-railway](https://github.com/shruti060701/pgvector-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database name created on startup. |
| `DATABASE_URL` | - | Full connection string for other services in the same project to connect to this database over Railway's private network. |
| `POSTGRES_USER` | (secret) | Superuser username for the database. |
| `POSTGRES_PASSWORD` | (secret) | Superuser password. Auto-generated per deploy. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/pgvector)
