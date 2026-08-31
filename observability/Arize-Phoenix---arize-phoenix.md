# Deploy Arize Phoenix on Railway

LLM observability. Tracing and evaluation tool using OpenTelemetry

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arize-phoenix)

## About

Arize Phoenix is an AI observability platform for teams building with large language models. It collects OpenTelemetry traces from your agents, RAG pipelines and chat apps, lets you inspect every span — the prompt that went out, the documents a retriever returned, the tokens burned, the call that errored — and turns the interesting ones into datasets. It answers the question a generic APM cannot: not "was the request slow?" but "was the answer any good, and which step made it bad?".

Self-host Phoenix on Railway and your traces sit in your own Postgres, not a vendor's tenant. This template runs the official `arizephoenix/phoenix` image alongside a Railway-managed PostgreSQL database. The web UI, REST and GraphQL APIs, remote MCP server and the OTLP-over-HTTP collector all answer on the generated public domain, while a Railway TCP proxy carries the OTLP gRPC collector on port 4317. Authentication is on before the first request, and everything is written to Postgres, so the app service holds no state and redeploys cleanly.

![Diagram of the Phoenix and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788077786/arize-phoenix-architecture.png)

Your app emits OpenTelemetry spans annotated with the OpenInference conventions — prompts, completions, retrieved documents, token counts, tool calls — and Phoenix stores, indexes and renders them. Self-hosting matters because those spans hold your users' questions and your system prompts, exactly the data most teams would rather not send to a third party. What you get:

- **Tracing** for agents, RAG pipelines and completion calls, vendor-agnostic via OpenTelemetry
- **Evaluation** with LLM-as-a-judge evaluators for hallucination, relevance and retrieval quality
- **Datasets and experiments** — capture spans as examples, re-run prompt or model changes, compare scores
- **Prompt management** with versioning, tagging and a playground for replaying calls
- **Human annotations** on spans, and a remote MCP server at `/mcp`

Two Railway services back all of it. Phoenix serves HTTP on 6006 and gRPC on 4317, health-checked on `/readyz`, which verifies the database connection rather than merely that the process is alive. PostgreSQL is the system of record for every project, span, annotation and dataset.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| phoenix | `arizephoenix/phoenix` | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | phoenix | 6006 | Port Railway health-checks |
| `PHOENIX_HOST` | phoenix | 0.0.0.0 | Listen address inside the container |
| `PHOENIX_PORT` | phoenix | 6006 | HTTP server and OTLP HTTP collector |
| `PHOENIX_SECRET` | phoenix | (secret) | JWT signing key, digit plus lowercase |
| `PHOENIX_ROOT_URL` | phoenix | - | Public base URL |
| `PHOENIX_GRPC_PORT` | phoenix | 4317 | OTLP gRPC collector port |
| `PHOENIX_ENABLE_AUTH` | phoenix | true | Require login on every surface |
| `PHOENIX_POSTGRES_DB` | phoenix | - | Database name |
| `PHOENIX_ADMIN_SECRET` | phoenix | (secret) | System-user bearer token |
| `PHOENIX_POSTGRES_HOST` | phoenix | - | Private Postgres hostname |
| `PHOENIX_POSTGRES_PORT` | phoenix | - | Postgres port |
| `PHOENIX_POSTGRES_USER` | phoenix | (secret) | Postgres username |
| `PHOENIX_POSTGRES_PASSWORD` | phoenix | (secret) | Postgres password |
| `PHOENIX_USE_SECURE_COOKIES` | phoenix | true | Secure flag on auth cookies |
| `PHOENIX_CSRF_TRUSTED_ORIGINS` | phoenix | - | CSRF origin allow-list |
| `PHOENIX_DEFAULT_RETENTION_POLICY_DAYS` | phoenix | 30 | Trace retention, first boot only |
| `PHOENIX_ENABLE_STRONG_PASSWORD_POLICY` | phoenix | (secret) | Enforce 12-char mixed passwords |
| `PHOENIX_DEFAULT_ADMIN_INITIAL_PASSWORD` | phoenix | (secret) | First-login admin password, override at deploy |
| `PHOENIX_DATABASE_ALLOCATED_STORAGE_CAPACITY_GIBIBYTES` | phoenix | 5 | Matches Postgres volume size |
| `PHOENIX_DATABASE_USAGE_INSERTION_BLOCKING_THRESHOLD_PERCENTAGE` | phoenix | 90 | Stop writes before disk fills |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 4317
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/arize-phoenix)
