# Deploy arize-phoenix-observability on Railway

Self-host Phoenix — OpenTelemetry LLM tracing & evaluation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arize-phoenix-observability)

## About

Arize Phoenix is an open-source LLM observability platform — trace, evaluate, and debug your AI applications with OpenTelemetry-standard instrumentation. See every LLM call, retrieval step, and tool use as a span, run evaluations to catch hallucinations and quality regressions, and experiment with prompts in a built-in playground. Because Phoenix speaks OpenTelemetry, you instrument with the open standard instead of a vendor-locked SDK. This template deploys Phoenix with PostgreSQL, authentication enabled, and durable trace storage — so your LLM observability backend is live and secured in minutes.

---

Phoenix is a capable observability backend, and a few specifics make it a secure, persistent deploy — all handled here.

**OpenTelemetry-native — instrument once, no vendor lock-in.** Phoenix's defining trait is that it ingests standard OpenTelemetry spans via OpenInference instrumentation, so you trace your app with the open OTel standard rather than a proprietary SDK. Instrument with `arize-phoenix-otel` and the OpenInference libraries for your framework (OpenAI, LangChain, LlamaIndex, and more), point them at your Phoenix `/v1/traces` endpoint, and every LLM call, retrieval, and tool step appears as a span — portable across tools.

**PostgreSQL for durable storage — not ephemeral SQLite.** Phoenix defaults to SQLite, which is fine for a local notebook but loses data on a PaaS. This template wires `PHOENIX_SQL_DATABASE_URL` to a managed PostgreSQL, so traces, datasets, experiments, and users persist durably beyond a single process — the right setup once observability is shared across a team or environment.

**Authentication is enabled — secured from the first deploy.** The open-source Phoenix server has no auth by default, so a naive deploy exposes your traces. This template sets `PHOENIX_ENABLE_AUTH=True` with a strong `PHOENIX_SECRET` and secure cookies, and bootstraps an admin via `PHOENIX_DEFAULT_ADMIN_INITIAL_PASSWORD` — sign in as `admin@localhost` with the generated value and change it from your profile. Mint API keys under Settings to authenticate your instrumented apps.

**Memory scales with ingest — size for your span rate.** Phoenix queues up to 20,000 spans in memory by default at roughly 50 KiB per span, so RAM usage scales with how fast your app emits traces. A modest app runs comfortably on a small plan; if you see span backpressure in the logs at high ingest, raise the memory. This is the main operational consideration.

**Evals and experiments built in.** Beyond tracing, Phoenix runs LLM evaluations — hallucination, relevance, toxicity, and custom evals — to score your app's outputs, and includes a prompt-experiment playground and dataset support, so you debug and improve, not just observe.

Typical cost: **~$10–20/month** on Railway for Phoenix and PostgreSQL, scaling with trace volume and memory. Phoenix is open source (Elastic License 2.0) and free to self-host.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| phoenix | `arizephoenix/phoenix` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
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

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/arize-phoenix-observability)
