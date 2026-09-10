# Deploy phoenix (by arize): LLM Evals and Observability - Open Source on Railway

Observe and Evaluate your models and agents. Self-Host it.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phoenix-by-arize-llm-evals-and-observabi)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/phoenix-by-arize)

Phoenix is Arize's open-source LLM observability platform. It captures OpenTelemetry traces from every LLM call, runs LLM-as-judge evaluations and experiments over datasets, and gives you trace waterfalls, a prompt playground, and embeddings views — a self-hosted control plane for debugging and evaluating AI applications.

Hosting Phoenix on Railway is a single-container deployment: the official `arizephoenix/phoenix` image serves the web UI and OpenTelemetry ingest endpoints (HTTP on port `6006`, gRPC on `4317`). A persistent volume stores your traces, evaluation runs, and datasets in SQLite out of the box — swap in PostgreSQL via environment variables when you outgrow it. Point your applications' OpenInference/OpenTelemetry instrumentors at your Railway URL and traces start flowing immediately. Optional authentication protects the UI and ingest. Scaling is a slider: more RAM/CPU for larger trace volumes, or a lean CPU-only footprint for small teams.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Phoenix | `arizephoenix/phoenix:15.1.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Phoenix | 6006 | PORT |
| `PHOENIX_HOST` | Phoenix | 0.0.0.0 | PHOENIX_HOST |
| `PHOENIX_PORT` | Phoenix | 6006 | PHOENIX_PORT |
| `PHOENIX_SECRET` | Phoenix | (secret) | PHOENIX_SECRET |
| `PHOENIX_ROOT_URL` | Phoenix | - | PHOENIX_ROOT_URL |
| `PHOENIX_GRPC_PORT` | Phoenix | 4317 | PHOENIX_GRPC_PORT |
| `PHOENIX_ENABLE_AUTH` | Phoenix | False | PHOENIX_ENABLE_AUTH |
| `PHOENIX_SQL_DATABASE_URL` | Phoenix | - | PHOENIX_SQL_DATABASE_URL |
| `PHOENIX_TELEMETRY_ENABLED` | Phoenix | False | PHOENIX_TELEMETRY_ENABLED |
| `PHOENIX_USE_SECURE_COOKIES` | Phoenix | True | PHOENIX_USE_SECURE_COOKIES |
| `PHOENIX_CSRF_TRUSTED_ORIGINS` | Phoenix | - | PHOENIX_CSRF_TRUSTED_ORIGINS |
| `PHOENIX_DEFAULT_RETENTION_POLICY_DAYS` | Phoenix | 30 | PHOENIX_DEFAULT_RETENTION_POLICY_DAYS |
| `PHOENIX_ENABLE_STRONG_PASSWORD_POLICY` | Phoenix | (secret) | PHOENIX_ENABLE_STRONG_PASSWORD_POLICY |
| `PHOENIX_DEFAULT_ADMIN_INITIAL_PASSWORD` | Phoenix | (secret) | PHOENIX_DEFAULT_ADMIN_INITIAL_PASSWORD |
| `POSTGRES_DB` | Postgres | railway | DB |
| `DATABASE_URL` | Postgres | - | DBURL |
| `POSTGRES_USER` | Postgres | (secret) | USER |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PW |
| `DATABASE_PUBLIC_URL` | Postgres | - | DB URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/phoenix-by-arize-llm-evals-and-observabi)
