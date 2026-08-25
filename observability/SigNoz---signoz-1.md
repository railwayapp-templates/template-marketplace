# Deploy SigNoz on Railway

Observability tool for your app's traces, metrics and logs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/signoz-1)

## About

SigNoz is an open-source, OpenTelemetry-native observability platform that keeps traces, metrics and logs in one place instead of three. Teams run it as a self-hosted alternative to Datadog and New Relic: APM, distributed tracing, log search, dashboards and alerting, all queried out of a ClickHouse column store that stays fast on high-cardinality data. Because it speaks OpenTelemetry natively, any language SDK you already run can point at it without a proprietary agent.

Deploy SigNoz on Railway and you get the full production topology, not a single container: the SigNoz app (UI, query API and OpAMP server), an OpenTelemetry Collector receiving OTLP over gRPC and HTTP, a one-shot schema migrator for the ClickHouse tables, ClickHouse as the telemetry store, a ClickHouse Keeper node, and a managed Postgres for users, dashboards and alert rules. Your apps send telemetry to the collector, it writes into ClickHouse, and the UI reads back from it. Self-host SigNoz on Railway without wiring six containers together by hand.

![Diagram of the six SigNoz services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787427639/signoz-architecture.png)

SigNoz answers a question most teams hit around their second production incident: why does understanding one request mean opening three tools? It stores traces, metrics and logs in the same ClickHouse database, so a slow endpoint on a dashboard leads to the spans behind it and the logs those spans emitted. Teams self-host it to keep telemetry on their own infrastructure and avoid per-host billing.

- OpenTelemetry-native ingestion — no proprietary agent, no vendor SDK
- APM with latency percentiles, error rates, Apdex and database breakdowns
- Distributed tracing with flamegraphs, trace funnels and span search
- Log management with severity filtering, live tail and parsing pipelines
- Dashboards and alerting to Slack, PagerDuty, webhooks or email

The Railway architecture splits the work the way SigNoz's own installer does. **SigNoz** serves the UI and query API and pushes log-parsing pipelines to the collector over OpAMP. The **OTel Collector** is the only ingest path; it batches spans, derives span metrics and writes to ClickHouse. The **Schema Migrator** runs once per deploy to create and upgrade ClickHouse tables. **ClickHouse** stores the telemetry, with **ClickHouse Keeper** coordinating its distributed DDL, and **Postgres** holds accounts, dashboards and alert rules.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | [gridalpha/signoz-railway](https://github.com/gridalpha/signoz-railway) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| clickhouse-keeper | [gridalpha/signoz-railway](https://github.com/gridalpha/signoz-railway) | Database |
| schema-migrator | [gridalpha/signoz-railway](https://github.com/gridalpha/signoz-railway) | Worker |
| signoz | [gridalpha/signoz-railway](https://github.com/gridalpha/signoz-railway) | Web service |
| otel-collector | [gridalpha/signoz-railway](https://github.com/gridalpha/signoz-railway) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | clickhouse | 8123 | HTTP port probed by the health check |
| `KEEPER_HOST` | clickhouse | - | Private Keeper hostname |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for the default account |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | clickhouse-keeper | 9182 | HTTP control port for readiness |
| `CLICKHOUSE_HOST` | schema-migrator | - | Private telemetry store hostname |
| `CLICKHOUSE_PASSWORD` | schema-migrator | (secret) | Shared ClickHouse credential |
| `PORT` | signoz | 8080 | Health-check port for the API server |
| `CLICKHOUSE_HOST` | signoz | - | Private telemetry store hostname |
| `CLICKHOUSE_PASSWORD` | signoz | (secret) | Shared ClickHouse credential |
| `SIGNOZ_USER_ROOT_EMAIL` | signoz | admin@example.com | Admin login email |
| `SIGNOZ_USER_ROOT_ENABLED` | signoz | true | Create the admin account at boot |
| `SIGNOZ_USER_ROOT_ORG_NAME` | signoz | default | Organisation name created at boot |
| `SIGNOZ_USER_ROOT_PASSWORD` | signoz | (secret) | Admin password, needs a symbol |
| `SIGNOZ_GLOBAL_EXTERNAL__URL` | signoz | - | Public URL used in alert links |
| `SIGNOZ_TOKENIZER_JWT_SECRET` | signoz | (secret) | Signs session tokens |
| `SIGNOZ_GLOBAL_INGESTION__URL` | signoz | - | Ingest URL shown in onboarding |
| `SIGNOZ_SQLSTORE_POSTGRES_DSN` | signoz | - | Metastore connection string |
| `PORT` | otel-collector | 13133 | Anonymous health-check port |
| `SIGNOZ_HOST` | otel-collector | - | OpAMP server hostname |
| `OTLP_PASSWORD` | otel-collector | (secret) | Basic-auth password for OTLP ingest |
| `OTLP_USERNAME` | otel-collector | (secret) | Basic-auth user for OTLP ingest |
| `CLICKHOUSE_HOST` | otel-collector | - | Private telemetry store hostname |
| `CLICKHOUSE_PASSWORD` | otel-collector | (secret) | Shared ClickHouse credential |
| `LOW_CARDINAL_EXCEPTION_GROUPING` | otel-collector | false | Group exceptions with lower cardinality |

## Configuration

- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ready`
- **Volume:** `/var/lib/clickhouse-keeper`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/signoz`
- **Healthcheck:** `/`
- **TCP Proxies:** 4317

**Category:** Observability · **Languages:** Shell, Dockerfile, Go Template

[View on Railway →](https://railway.com/deploy/signoz-1)
