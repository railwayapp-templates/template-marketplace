# Deploy Uptrace on Railway

OpenTelemetry APM on ClickHouse: traces, logs, metrics, alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptrace)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/uptrace?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=uptrace)

[Uptrace](https://uptrace.dev/) is an open-source APM built on OpenTelemetry and ClickHouse. It ingests traces, logs, and metrics through the standard OTLP protocol, stores them in a column store built for the job, and gives you distributed tracing, a service graph, dashboards, and alerting behind one UI — no per-seat pricing and no data leaving your Railway project.

**Read this before deploying: OTLP/HTTP is public, OTLP/gRPC is not.** Railway routes one public port per service, and here it serves both the UI and OTLP/HTTP ingest. That covers every OpenTelemetry SDK and the Collector's `otlphttp` exporter over your Railway domain. gRPC ingest listens on `4317` and is reachable from other services in the same project over the private network — from outside, it needs a TCP proxy on that port. If your telemetry comes from outside Railway, use OTLP/HTTP.

Uptrace splits its state across three stores, and this template runs each as its own service so they can be sized and scaled apart. ClickHouse holds the telemetry — spans, logs, and metrics — and is the service that will actually grow; it gets a volume and it is where your storage bill lives. Postgres holds metadata: users, projects, dashboards, and alert rules, and stays small. Redis is a pure cache with no volume at all, because losing it costs one cold query rather than any data. The Uptrace service itself is stateless.

The whole configuration is one `config.yml` baked into a thin wrapper image, and every value that varies per deploy is an environment variable — Uptrace expands `${VAR}` in that file itself, so there is no entrypoint script and nothing is generated at build time. Wiring between the four services is done with Railway reference variables, so passwords are generated once and never typed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | [nomideusz/uptrace-railway](https://github.com/nomideusz/uptrace-railway) (root: /clickhouse) | Database |
| uptrace | [nomideusz/uptrace-railway](https://github.com/nomideusz/uptrace-railway) (root: /uptrace) | Web service |
| redis | [nomideusz/uptrace-railway](https://github.com/nomideusz/uptrace-railway) (root: /redis) | Worker |
| postgres | [nomideusz/uptrace-railway](https://github.com/nomideusz/uptrace-railway) (root: /postgres) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Auto-generated telemetry database password. |
| `PORT` | uptrace | 8080 | Port serving the UI and OTLP/HTTP ingest. Railway routes here. Don't change. |
| `REDIS_ADDR` | uptrace | - | Redis address. Wired automatically — don't change. |
| `POSTGRES_DB` | uptrace | uptrace | Postgres database. Must match the postgres service — don't change. |
| `CLICKHOUSE_DB` | uptrace | uptrace | ClickHouse database. Must match the clickhouse service — don't change. |
| `POSTGRES_ADDR` | uptrace | - | Postgres address. Wired automatically — don't change. |
| `POSTGRES_USER` | uptrace | (secret) | Postgres user. Must match the postgres service — don't change. |
| `REDIS_PASSWORD` | uptrace | (secret) | Redis password. Wired automatically — don't change. |
| `UPTRACE_SECRET` | uptrace | (secret) | Auto-generated key for signing sessions and tokens. |
| `CLICKHOUSE_ADDR` | uptrace | - | ClickHouse native address. Wired automatically — don't change. |
| `CLICKHOUSE_USER` | uptrace | (secret) | ClickHouse user. Must match the clickhouse service — don't change. |
| `UPTRACE_SITE_URL` | uptrace | - | Public base URL, wired to your Railway domain. Don't change. |
| `POSTGRES_PASSWORD` | uptrace | (secret) | Postgres password. Wired automatically — don't change. |
| `CLICKHOUSE_PASSWORD` | uptrace | (secret) | ClickHouse password. Wired automatically — don't change. |
| `UPTRACE_ADMIN_EMAIL` | uptrace | admin@example.com | Your login email. The admin account is created on first boot only. |
| `UPTRACE_PROJECT_TOKEN` | uptrace | (secret) | Ingest token for the seeded project. Your DSN is https://<this token>@<your domain>. |
| `UPTRACE_ADMIN_PASSWORD` | uptrace | (secret) | Auto-generated login password. Copy it from here to sign in, then change it in the UI. |
| `UPTRACE_SELF_MONITORING_DISABLED` | uptrace | true | Uptrace tracing itself. Off because an idle instance writes ~1.3M spans/day. Set false to enable. |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated cache password. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated metadata database password. |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/uptrace)
