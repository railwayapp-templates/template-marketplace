# Deploy R2R | The most advanced AI retrieval system by SciPhi on Railway

Self-Host R2R. Agentic RAG, hybrid search, document management with API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/r2r)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/r2r?referralCode=QXdhdr)

Deploy R2R on Railway to run your own production-ready RAG engine with a RESTful API, hybrid search, knowledge graphs, and a management dashboard. Self-host R2R and keep full control of your data and retrieval pipeline.

This template pre-configures the R2R API server (`sciphiai/r2r:latest`), R2R Dashboard (`sciphiai/r2r-dashboard:1.0.3`), PostgreSQL with pgvector (`pgvector/pgvector:pg16`), and a graph-clustering service (`ragtoriches/cluster-prod`). Internal services communicate over Railway's private network.

![R2R Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777646273/1a1e194a-75da-4c20-97e8-cd4489b2cdc1.png)

R2R (Retrieval to Response) is an open-source (MIT) agentic RAG engine by SciPhi with 18k+ GitHub stars, backed by Y Combinator. It provides a complete API-first platform for production-grade retrieval.

Key features:

- **Multimodal ingestion** -- PDFs, Markdown, images, audio, and JSON
- **Hybrid search** -- semantic vector search plus keyword search with reciprocal rank fusion
- **Knowledge graphs** -- automatic entity and relationship extraction via Graph RAG
- **Deep Research API** -- multi-step reasoning across your knowledgebase and the web
- **User and document management** -- built-in auth, collections, per-user scoping
- **RESTful API** -- Python and TypeScript SDKs included

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| graph-clustering | `ragtoriches/cluster-prod` | Worker |
| pgvector | `pgvector/pgvector:pg18` | Web service |
| R2R-API | `sciphiai/r2r:latest` | Web service |
| R2R-Dashboard | `sciphiai/r2r-dashboard:1.0.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pgvector | railway | Name of the database created on startup. |
| `DATABASE_URL` | pgvector | - | Full public connection string for Postgres. |
| `POSTGRES_USER` | pgvector | (secret) | Postgres superuser name. |
| `PGHOST_PRIVATE` | pgvector | - | Private internal domain for Postgres in Railway. |
| `PGPORT_PRIVATE` | pgvector | 5432 | Private internal port for Postgres. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password for the Postgres superuser. |
| `DATABASE_URL_PRIVATE` | pgvector | - | Full private connection string for internal services. |
| `PORT` | R2R-API | 7272 | Railway port detection |
| `R2R_HOST` | R2R-API | 0.0.0.0 | Bind to all interfaces |
| `R2R_PORT` | R2R-API | 7272 | API server listening port |
| `R2R_LOG_LEVEL` | R2R-API | INFO | Logging verbosity |
| `R2R_SECRET_KEY` | R2R-API | (secret) | API encryption signing key |
| `R2R_PROJECT_NAME` | R2R-API | r2r_default | Project namespace |
| `R2R_POSTGRES_HOST` | R2R-API | - | Internal Postgres hostname |
| `R2R_POSTGRES_PORT` | R2R-API | 5432 | Postgres connection port |
| `R2R_POSTGRES_USER` | R2R-API | (secret) | Postgres user reference |
| `R2R_POSTGRES_DBNAME` | R2R-API | - | Postgres database name |
| `R2R_POSTGRES_PASSWORD` | R2R-API | (secret) | Postgres password reference |
| `CLUSTERING_SERVICE_URL` | R2R-API | - | Graph clustering endpoint |
| `HATCHET_CLIENT_TLS_STRATEGY` | R2R-API | none | Disable Hatchet TLS |
| `R2R_POSTGRES_MAX_CONNECTIONS` | R2R-API | 256 | Connection pool limit |
| `PORT` | R2R-Dashboard | 3000 | Dashboard listening port |
| `NEXT_PUBLIC_R2R_DEFAULT_EMAIL` | R2R-Dashboard | admin@example.com | Dashboard default login email |
| `NEXT_PUBLIC_R2R_DEPLOYMENT_URL` | R2R-Dashboard | - | R2R API URL for dashboard |
| `NEXT_PUBLIC_R2R_DEFAULT_PASSWORD` | R2R-Dashboard | (secret) | Dashboard default login password |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/r2r)
