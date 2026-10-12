# Deploy SigNoz v0.145 APM for Railway Apps on Railway

Logs, traces and metrics in one OpenTelemetry-native Datadog alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/signoz-v0145-apm-for-railway-apps)

## About

SigNoz is an open-source, OpenTelemetry-native observability platform for application traces, metrics and logs. This community template runs the complete self-hosted stack on Railway — UI, OTel Collector, ClickHouse and ClickHouse Keeper — so the other services in your project can send telemetry over the private network within minutes.

A working SigNoz installation is more than one container. Telemetry arrives at the SigNoz OpenTelemetry Collector, which writes it into ClickHouse; ClickHouse needs ClickHouse Keeper for its replicated tables and cluster DDL; a one-shot migrator creates and upgrades the schema; and the SigNoz server provides the query API, dashboards, alerting and the web UI. This template wires all of that together with pinned versions, generated credentials, persistent volumes and health checks. The admin account is created from variables, public OTLP endpoints are protected by a bearer token, and services inside your Railway project can send data to the collector's private address without any token.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| otel-collector | [baranberkay96/signoz-railway](https://github.com/baranberkay96/signoz-railway) (branch: main) (root: /services/otel-collector) | TCP service |
| schema-migrator | `signoz/signoz-otel-collector:v0.144.13` | Worker |
| signoz | `signoz/signoz:v0.145.0` | Web service |
| clickhouse-keeper | [baranberkay96/signoz-railway](https://github.com/baranberkay96/signoz-railway) (branch: main) (root: /services/clickhouse-keeper) | Database |
| clickhouse | [baranberkay96/signoz-railway](https://github.com/baranberkay96/signoz-railway) (branch: main) (root: /services/clickhouse) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | otel-collector | 13133 | Health-check port (Railway probes / on it). |
| `SIGNOZ_HOST` | otel-collector | - | SigNoz private hostname for the OpAMP channel (log pipelines). |
| `CLICKHOUSE_DSN` | otel-collector | - | ClickHouse DSN the exporters write to. |
| `OTLP_PUBLIC_TOKEN` | otel-collector | (secret) | Bearer token required on the PUBLIC OTLP endpoints (domain / TCP proxy). |
| `SIGNOZ_OTEL_COLLECTOR_TIMEOUT` | otel-collector | 10m | How long start-up waits for the schema migration. |
| `LOW_CARDINAL_EXCEPTION_GROUPING` | otel-collector | false | Group exceptions by type+service only (lower cardinality). |
| `SIGNOZ_OTEL_COLLECTOR_TIMEOUT` | schema-migrator | 10m | How long each migrate step waits for ClickHouse. |
| `SIGNOZ_OTEL_COLLECTOR_CLICKHOUSE_DSN` | schema-migrator | - | ClickHouse DSN the migrations run against. |
| `SIGNOZ_OTEL_COLLECTOR_CLICKHOUSE_CLUSTER` | schema-migrator | cluster | Cluster name defined in the ClickHouse config. |
| `SIGNOZ_OTEL_COLLECTOR_CLICKHOUSE_REPLICATION` | schema-migrator | true | Create Replicated tables (upstream default; uses Keeper). |
| `PORT` | signoz | 8080 | SigNoz UI/API port. |
| `SIGNOZ_USER_ROOT_EMAIL` | signoz | - | REQUIRED: email you will log in with as admin. |
| `SIGNOZ_SQLSTORE_PROVIDER` | signoz | sqlite | Metadata store (users, dashboards, alerts). SQLite on the service volume. |
| `SIGNOZ_USER_ROOT_ENABLED` | signoz | true | Provision the admin (root) user at start-up instead of an open sign-up page. |
| `SIGNOZ_USER_ROOT_ORG_NAME` | signoz | default | Organisation created for the admin user. |
| `SIGNOZ_USER_ROOT_PASSWORD` | signoz | (secret) | Admin password (generated; meets SigNoz complexity rules). Read it from Variables. |
| `SIGNOZ_GLOBAL_EXTERNAL__URL` | signoz | - | Public URL of the UI (used in links). |
| `SIGNOZ_SQLSTORE_SQLITE_PATH` | signoz | /var/lib/signoz/signoz.db | SQLite file on the volume. |
| `SIGNOZ_TOKENIZER_JWT_SECRET` | signoz | (secret) | Signing secret for session tokens. |
| `SIGNOZ_GLOBAL_INGESTION__URL` | signoz | - | OTLP ingest URL shown in onboarding screens. |
| `SIGNOZ_STATSREPORTER_ENABLED` | signoz | true | Upstream default. Set false to stop sending usage stats (incl. user emails) to SigNoz Inc. |
| `SIGNOZ_TELEMETRYSTORE_PROVIDER` | signoz | clickhouse | Telemetry store backend. |
| `SIGNOZ_TELEMETRYSTORE_CLICKHOUSE_DSN` | signoz | - | ClickHouse DSN for queries. |
| `SIGNOZ_ALERTMANAGER_SIGNOZ_EXTERNAL__URL` | signoz | - | Base URL used in alert notifications. |
| `SIGNOZ_TELEMETRYSTORE_CLICKHOUSE_CLUSTER` | signoz | cluster | Cluster name defined in the ClickHouse config. |
| `PORT` | clickhouse-keeper | 9182 | Keeper HTTP control port; Railway probes /ready on it. |
| `PORT` | clickhouse | 8123 | ClickHouse HTTP port; Railway probes /ping on it. |
| `CLICKHOUSE_DSN` | clickhouse | - | Native-protocol DSN that SigNoz services reference. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password of the ClickHouse `default` user (alphanumeric so it is DSN-safe). |
| `CLICKHOUSE_KEEPER_HOST` | clickhouse | - | Private hostname of the Keeper service. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 | Lets the default user manage SQL users/roles. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 14317
- **Start command:** `/bin/sh -c '/signoz-otel-collector migrate ready && /signoz-otel-collector migrate bootstrap && /signoz-otel-collector migrate sync up && /signoz-otel-collector migrate async up'`
- **Healthcheck:** `/api/v1/health`
- **Volume:** `/var/lib/signoz`
- **Healthcheck:** `/ready`
- **Volume:** `/var/lib/clickhouse-keeper`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`

**Category:** Observability · **Tags:** observability, apm, opentelemetry, tracing, logs · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/signoz-v0145-apm-for-railway-apps)
