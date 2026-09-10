# Deploy Laminar on Railway

Self-hosted LLM tracing, search and evaluation on ClickHouse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/laminar)

## About

[Laminar](https://github.com/lmnr-ai/lmnr) is an open-source observability and
evaluation platform for LLM applications. It ingests OpenTelemetry traces from
your agents, stores them in ClickHouse, and gives you a UI to search, inspect,
tag and evaluate them, alongside a SQL query engine over your own trace data.

Laminar is five cooperating services, and this template runs and wires all of
them: the Next.js web app, the Rust API server that accepts OpenTelemetry and
answers queries, ClickHouse for spans and traces, Quickwit for full-text search
over prompts and completions, and PostgreSQL for projects, users and API keys.
It runs Laminar's `LITE` configuration, which removes the runtime dependency on
RabbitMQ and Redis. The web app applies the schema migrations for both
databases and creates the search indexes on its first boot, so there is no
migration step to run. All three data stores stay on Railway's private network
with a volume each, every secret is generated, and the two public services get
their own HTTPS domain.

Two things are specific to hosting it. Laminar's API server binds IPv4 only on
all of its ports while Railway's private network is IPv6, so its wrapper runs
two small bridges that let the web app reach the API and the realtime stream
privately. And Laminar's realtime endpoint has no authentication of its own,
because upstream expects the web app in front of it to provide that, so this
template never gives it a public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | [RockinPaul/lmnr_railway_template](https://github.com/RockinPaul/lmnr_railway_template) (root: frontend) | Web service |
| postgres | [RockinPaul/lmnr_railway_template](https://github.com/RockinPaul/lmnr_railway_template) (root: postgres) | Database |
| quickwit | [RockinPaul/lmnr_railway_template](https://github.com/RockinPaul/lmnr_railway_template) (root: quickwit) | Database |
| clickhouse | [RockinPaul/lmnr_railway_template](https://github.com/RockinPaul/lmnr_railway_template) (root: clickhouse) | Database |
| app-server | [RockinPaul/lmnr_railway_template](https://github.com/RockinPaul/lmnr_railway_template) (root: app-server) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AEAD_SECRET_KEY` | frontend | (secret) |
| `NEXTAUTH_SECRET` | frontend | (secret) |
| `AUTH_GITHUB_SECRET` | frontend | (secret) |
| `CLICKHOUSE_PASSWORD` | frontend | (secret) |
| `SHARED_SECRET_TOKEN` | frontend | (secret) |
| `CLICKHOUSE_RO_PASSWORD` | frontend | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `AEAD_SECRET_KEY` | app-server | (secret) |
| `CLICKHOUSE_PASSWORD` | app-server | (secret) |
| `SHARED_SECRET_TOKEN` | app-server | (secret) |
| `CLICKHOUSE_RO_PASSWORD` | app-server | (secret) |

## Configuration

- **Healthcheck:** `/api/auth/ok`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/qwdata`
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/health`

**Category:** Observability · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/laminar)
