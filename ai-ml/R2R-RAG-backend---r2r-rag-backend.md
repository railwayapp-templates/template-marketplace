# Deploy R2R RAG backend on Railway

Authenticated R2R retrieval with pgvector ingestion and cited RAG.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/r2r-rag-backend)

## About

Deploy an authenticated R2R retrieval API and dashboard with durable pgvector storage and private graph clustering. The template pins every runtime image, generates administrator and database secrets, and keeps PostgreSQL off the public Internet.

R2R is an MIT-licensed retrieval system for document ingestion, hybrid search, knowledge graphs, and retrieval-augmented generation through a REST API. This template uses R2R 3.6.5's standard single-replica configuration: files, chunks, vectors, users, and metadata live in PostgreSQL while orchestration runs in the API process.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| R2R Dashboard | `sciphiai/r2r-dashboard:1.0.3@sha256:ba9bcb43c5e7d7d4eb9fe38970f976f6a0842297f3da078cb6223d1f078741d1` | Web service |
| R2R API | [tech-progress/railway-template-r2r](https://github.com/tech-progress/railway-template-r2r) (branch: release-v1) (root: /) | Web service |
| R2R PostgreSQL | `pgvector/pgvector:pg16@sha256:a36250871de0833b8757561c72f2477ef1ddd1101afa4e617fb552e0de514c6b` | Database |
| R2R Graph Clustering | `ragtoriches/cluster-prod@sha256:53bcbcc114fe08906b6df6b4d3863644145b1efa240fd6643ef65986593938b6` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | R2R Dashboard | 3000 | Railway HTTP routing port for the dashboard. |
| `NEXT_PUBLIC_R2R_DEFAULT_EMAIL` | R2R Dashboard | admin@example.com | Non-secret administrator email shown by the dashboard login form. |
| `NEXT_PUBLIC_R2R_DEPLOYMENT_URL` | R2R Dashboard | - | Public HTTPS URL of the R2R API used by browser clients. |
| `R2R_DASHBOARD_DISABLE_TELEMETRY` | R2R Dashboard | true | Disables dashboard telemetry for this self-hosted deployment. |
| `NEXT_PUBLIC_R2R_DEFAULT_PASSWORD` | R2R Dashboard | (secret) | Intentionally blank because NEXT_PUBLIC values are visible to every browser. |
| `PORT` | R2R API | 7272 | Railway HTTP routing port for the R2R API. |
| `R2R_HOST` | R2R API | 0.0.0.0 | Network interface on which R2R accepts requests. |
| `R2R_PORT` | R2R API | 7272 | R2R API listening port. |
| `R2R_LOG_LEVEL` | R2R API | INFO | R2R application logging level. |
| `OPENAI_API_KEY` | R2R API | (secret) | Required OpenAI API key for embeddings, ingestion summaries, retrieval, and RAG answers. |
| `R2R_SECRET_KEY` | R2R API | (secret) | Generated signing key for R2R authentication tokens. |
| `OPENAI_API_BASE` | R2R API | - | Optional OpenAI-compatible base URL used by LiteLLM embeddings; leave blank for OpenAI. |
| `OPENAI_BASE_URL` | R2R API | - | Optional OpenAI-compatible base URL used by the OpenAI completion client; keep aligned with OPENAI_API_BASE. |
| `R2R_ADMIN_EMAIL` | R2R API | admin@example.com | Initial administrator email used to sign in to the dashboard and API. |
| `R2R_PROJECT_NAME` | R2R API | railway_r2r | PostgreSQL schema namespace used by this R2R deployment. |
| `R2R_POSTGRES_HOST` | R2R API | - | Private Railway hostname of the PostgreSQL service. |
| `R2R_POSTGRES_PORT` | R2R API | 5432 | Private PostgreSQL port. |
| `R2R_POSTGRES_USER` | R2R API | (secret) | Database role referenced from PostgreSQL. |
| `R2R_ADMIN_PASSWORD` | R2R API | (secret) | Generated initial administrator password; read it from this service after deployment. |
| `R2R_POSTGRES_DBNAME` | R2R API | - | Database name referenced from PostgreSQL. |
| `R2R_POSTGRES_PASSWORD` | R2R API | (secret) | Database password referenced from PostgreSQL and redacted from R2R startup logs. |
| `CLUSTERING_SERVICE_URL` | R2R API | - | Private graph-clustering service endpoint. |
| `HATCHET_CLIENT_TLS_STRATEGY` | R2R API | none | Compatibility setting for R2R's simple local orchestration mode. |
| `R2R_POSTGRES_MAX_CONNECTIONS` | R2R API | 64 | R2R database pool ceiling for this single-replica topology. |
| `R2R_POSTGRES_STATEMENT_CACHE_SIZE` | R2R API | 100 | Prepared-statement cache size per R2R database connection. |
| `POSTGRES_DB` | R2R PostgreSQL | r2r | Database used by R2R for documents, chunks, vectors, files, users, and metadata. |
| `POSTGRES_USER` | R2R PostgreSQL | (secret) | PostgreSQL role used only by the private R2R service. |
| `POSTGRES_PASSWORD` | R2R PostgreSQL | (secret) | Generated PostgreSQL password shared with R2R through a service reference. |
| `PORT` | R2R Graph Clustering | 7276 | Railway health-routing port for the private graph-clustering service. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/v3/health`
- **Start command:** `/bin/sh -ec 'exec docker-entrypoint.sh postgres -c max_connections=256'`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`

**Category:** AI/ML · **Languages:** Shell, Python, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/r2r-rag-backend)
