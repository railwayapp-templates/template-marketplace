# Deploy Ownstate on Railway

Self-hosted institutional memory and context for secure AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ownstate)

## About

Ownstate is a self-hosted institutional memory and context layer for AI agents. It records evidence, resolves repository and project scope, retrieves relevant knowledge, and keeps durable state outside any individual model runtime.

This template deploys the complete production topology: a public Rust API, a private background worker, and a private PostgreSQL 18 database with pgvector. Railway generates independent API, admin, and database credentials, connects services over its private network, and attaches persistent volumes for database data and Fastembed model caches. The API runs migrations and exposes `/ready` for deployment health checks. The worker processes asynchronous knowledge jobs without a public endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | [aibunny/ownstate](https://github.com/aibunny/ownstate) | Database |
| pgvector | `pgvector/pgvector:pg18` | Database |
| API | [aibunny/ownstate](https://github.com/aibunny/ownstate) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RUST_LOG` | Worker | info | Application log filter. Keep info unless troubleshooting. |
| `OWNSTATE_PROCESS` | Worker | worker | Selects the worker process in the unified Ownstate image. |
| `OWNSTATE_AUTO_MIGRATE` | Worker | false | Keeps migrations with the API to avoid concurrent migration runs. |
| `OWNSTATE_DATABASE_URL` | Worker | - | Private pgvector connection supplied by the database service. |
| `OWNSTATE_WORKER_POLL_MS` | Worker | 1000 | Milliseconds between background job queue polls. |
| `OWNSTATE_DEPLOYMENT_MODE` | Worker | personal | Personal mode provides secure single-owner defaults. |
| `OWNSTATE_API_SERVICE_HOST` | Worker | - | Private API reference that enforces deployment ordering. |
| `OWNSTATE_EMBEDDING_PROVIDER` | Worker | fastembed | Uses local Fastembed embeddings without a model API key. |
| `OWNSTATE_MAX_CLASSIFICATION` | Worker | CONFIDENTIAL | Highest classification the worker may process. |
| `OWNSTATE_MAX_DB_CONNECTIONS` | Worker | 5 | Database pool limit sized for a small Railway deployment. |
| `OWNSTATE_EMBEDDING_CACHE_DIR` | Worker | /app/.fastembed_cache | Persistent directory for downloaded embedding models. |
| `POSTGRES_DB` | pgvector | ownstate | Database name used by Ownstate. |
| `DATABASE_URL` | pgvector | - | Private PostgreSQL connection assembled from generated values. |
| `POSTGRES_USER` | pgvector | (secret) | Dedicated PostgreSQL user for Ownstate. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Generated password for the private database. |
| `RUST_LOG` | API | info | Application log filter. Keep info unless troubleshooting. |
| `OWNSTATE_PROCESS` | API | api | Selects the API process in the unified Ownstate image. |
| `OWNSTATE_API_TOKEN` | API | (secret) | Generated bearer token for routine API clients. |
| `OWNSTATE_ADMIN_TOKEN` | API | (secret) | Generated token reserved for explicit human administration. |
| `OWNSTATE_AUTO_MIGRATE` | API | true | Runs pending database migrations when the API starts. |
| `OWNSTATE_DATABASE_URL` | API | - | Private pgvector connection supplied by the database service. |
| `OWNSTATE_DEPLOYMENT_MODE` | API | personal | Personal mode provides secure single-owner defaults. |
| `OWNSTATE_EMBEDDING_PROVIDER` | API | fastembed | Uses local Fastembed embeddings without a model API key. |
| `OWNSTATE_MAX_CLASSIFICATION` | API | CONFIDENTIAL | Highest classification the deployment may return. |
| `OWNSTATE_MAX_DB_CONNECTIONS` | API | 5 | Database pool limit sized for a small Railway deployment. |
| `OWNSTATE_EMBEDDING_CACHE_DIR` | API | /app/.fastembed_cache | Persistent directory for downloaded embedding models. |

## Configuration

- **Volume:** `/app/.fastembed_cache`
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Rust, PLpgSQL, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ownstate)
