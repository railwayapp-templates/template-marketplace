# Deploy Phoenix | Open Source LLM Observability on Railway on Railway

Self-host Arize Phoenix LLM. Tracing, evals, datasets, experiments & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phoenix)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phoenix?referralCode=QXdhdr)

Self-host Phoenix to gain full visibility into LLM applications — tracing, evaluation, datasets, experiments, and prompt management for any AI stack. Phoenix is the open-source observability layer behind Arize, built on OpenTelemetry so it works with LangChain, LlamaIndex, DSPy, CrewAI, OpenAI Agents SDK, and any framework that emits OpenInference spans.

This template deploys Phoenix on Railway as a single container (`arizephoenix/phoenix:15.1.0`) backed by a managed Railway Postgres for durable trace, dataset, and experiment storage. Authentication is enabled, secure cookies are on, and a strong-password policy is active by default — so the deploy is production-ready the moment it goes live.

Phoenix is an open-source AI/LLM observability platform from Arize that captures every span in your model call graph — prompts, tool calls, retrieval steps, agent decisions — and lets you evaluate, debug, and iterate on them. It runs as a single Python service that doubles as an OTLP collector and a web UI, persists data to a relational store, and ships with built-in LLM-as-judge evaluators for relevance, hallucination, Q&amp;A correctness, and toxicity.

Key features:
- OpenTelemetry-based tracing for any LLM framework via the OpenInference auto-instrumentors
- Built-in evals: RAG relevance, hallucination detection, Q&amp;A correctness, custom evaluators
- Datasets and experiments for repeatable prompt and model comparison
- Prompt playground with versioning and template management
- Cost, latency, and token analytics on every trace
- Local username/password auth with brute-force protection out of the box

This template runs Phoenix in single-container mode with Postgres as the backing store — no Redis, no separate worker, no shared volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Phoenix | `arizephoenix/phoenix:15.1.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Phoenix | 6006 | HTTP server listening port |
| `PHOENIX_HOST` | Phoenix | 0.0.0.0 | Bind on all interfaces |
| `PHOENIX_PORT` | Phoenix | 6006 | Phoenix UI/OTLP HTTP port |
| `PHOENIX_SECRET` | Phoenix | (secret) | JWT signing key |
| `PHOENIX_ROOT_URL` | Phoenix | - | Public origin for cookies/CSRF |
| `PHOENIX_GRPC_PORT` | Phoenix | 4317 | OTLP/gRPC collector port (internal) |
| `PHOENIX_ENABLE_AUTH` | Phoenix | True | Turn on built-in auth |
| `PHOENIX_SQL_DATABASE_URL` | Phoenix | - | Postgres connection string |
| `PHOENIX_TELEMETRY_ENABLED` | Phoenix | False | Disable upstream analytics |
| `PHOENIX_USE_SECURE_COOKIES` | Phoenix | True | Required behind HTTPS |
| `PHOENIX_CSRF_TRUSTED_ORIGINS` | Phoenix | - | Trusted origin allowlist |
| `PHOENIX_DEFAULT_RETENTION_POLICY_DAYS` | Phoenix | 30 | Trace retention window |
| `PHOENIX_ENABLE_STRONG_PASSWORD_POLICY` | Phoenix | (secret) | 12+ chars with class rules |
| `PHOENIX_DEFAULT_ADMIN_INITIAL_PASSWORD` | Phoenix | (secret) | Bootstrap-only admin password. The default email is: admin@localhost |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/phoenix)
