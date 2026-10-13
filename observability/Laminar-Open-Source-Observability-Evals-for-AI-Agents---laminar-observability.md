# Deploy Laminar | Open-Source Observability & Evals for AI Agents on Railway

Tracing, evals and SQL over agent traces, on ClickHouse, self-hosted

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/laminar-observability)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/laminar-observability?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=laminar-observability)

[Laminar](https://laminar.sh/) is the open-source observability and evals platform for AI agents: OpenTelemetry-native tracing of every LLM call, tool call and agent step, evaluations, datasets, labeling queues and a SQL editor over all of your traces. This template runs Laminar's own app server and dashboard with ClickHouse and Postgres, behind one public URL.

The stack is five services: Laminar (the public gateway), Frontend, AppServer, ClickHouse and Postgres.

- **Upstream's own images, pinned.** The dashboard and the Rust app server run from the official `ghcr.io/lmnr-ai` images at release v0.3.0, with ClickHouse 26.5 and Postgres 16, as in upstream's self-host compose. Nothing moves until you bump a tag.
- **One URL for the dashboard and the SDKs.** The Laminar service is a small Caddy gateway. It sends `/v1/*` (SDK and OpenTelemetry ingestion, authenticated with project API keys) to the app server and everything else to the dashboard. The app server itself has no public address: its internal dashboard API has no authentication of its own, so it stays on the private network.
- **A login in front of the dashboard.** Self-hosted Laminar signs anyone in with just an email address, no password. The gateway puts a password prompt in front of the dashboard, with a password generated for your deploy. Only SDK traffic with a valid project API key gets past it without one.
- **Migrations on every boot.** The dashboard runs the Postgres and ClickHouse migrations when it starts, and the app server waits for it. Upgrading is bumping the image tags.
- **Every secret generated.** Postgres and ClickHouse passwords, the session secret and the 32-byte key that encrypts stored LLM provider keys are generated per deploy. None of upstream's sample values from its `.env` file are used.
- **A quiet ClickHouse.** Upstream's ClickHouse settings are applied at start, the internal metric tables that write every few seconds are off, and logs go to Railway's log view instead of gigabytes of files on the container disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Frontend | `ghcr.io/lmnr-ai/frontend:v0.3.0` | Worker |
| AppServer | `ghcr.io/lmnr-ai/app-server:v0.3.0` | Worker |
| Postgres | `postgres:16.15` | Database |
| ClickHouse | `clickhouse/clickhouse-server:26.5.7.64` | Database |
| Laminar | `caddy:2.11.7-alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Frontend | 5667 | Port the dashboard listens on - leave as is |
| `HOSTNAME` | Frontend | :: | Listen on IPv6 and IPv4 so Railway's private network can reach it |
| `BACKEND_URL` | Frontend | - | App server HTTP API on the private network |
| `ENVIRONMENT` | Frontend | LITE | Self-hosted mode without RabbitMQ; also runs the Postgres and ClickHouse migrations on boot |
| `LLM_API_KEY` | Frontend | (secret) | Optional: API key for LLM_PROVIDER |
| `DATABASE_URL` | Frontend | - | Postgres on the private network |
| `LLM_PROVIDER` | Frontend | - | Optional: openai, gemini, bedrock, azure_chat_completions, ... for the AI features (chat with a trace, SQL with AI) |
| `NEXTAUTH_URL` | Frontend | - | Public URL of the dashboard - set it to your custom domain after adding one |
| `BACKEND_RT_URL` | Frontend | - | App server realtime (live trace updates) on the private network |
| `CLICKHOUSE_URL` | Frontend | - | ClickHouse HTTP interface on the private network |
| `AEAD_SECRET_KEY` | Frontend | (secret) | Auto-generated 32-byte key (64 hex characters) that encrypts stored provider API keys - never change it after the first boot |
| `CLICKHOUSE_USER` | Frontend | (secret) | ClickHouse user |
| `NEXTAUTH_SECRET` | Frontend | (secret) | Auto-generated secret that signs sessions and invitation links |
| `NEXT_PUBLIC_URL` | Frontend | - | Public URL of the dashboard - keep equal to NEXTAUTH_URL |
| `CLICKHOUSE_RO_USER` | Frontend | (secret) | User for the SQL editor's queries (same user, as in upstream's compose) |
| `CLICKHOUSE_PASSWORD` | Frontend | (secret) | ClickHouse password |
| `PUBLIC_API_BASE_URL` | Frontend | - | API URL shown in the dashboard (dataset downloads) |
| `CLICKHOUSE_RO_PASSWORD` | Frontend | (secret) | Password for the SQL editor's user |
| `PORT` | AppServer | 8000 | HTTP API port (SDK, OTLP/HTTP, dashboard backend) - leave as is |
| `GRPC_PORT` | AppServer | 8001 | OTLP/gRPC port, private network only |
| `ENVIRONMENT` | AppServer | LITE | Self-hosted mode without RabbitMQ |
| `DATABASE_URL` | AppServer | - | Postgres on the private network |
| `CLICKHOUSE_URL` | AppServer | - | ClickHouse HTTP interface on the private network |
| `AEAD_SECRET_KEY` | AppServer | (secret) | Same encryption key as the dashboard |
| `CLICKHOUSE_USER` | AppServer | (secret) | ClickHouse user |
| `QUICKWIT_ENABLED` | AppServer | false | Full-text search needs Quickwit, which this template leaves out (see README) |
| `NEXT_INTERNAL_URL` | AppServer | - | Dashboard on the private network; CLI tokens are verified against its keys (unset, the app server would trust laminar.sh's keys) |
| `CLICKHOUSE_RO_USER` | AppServer | (secret) | User for the SQL editor's queries (same user, as in upstream's compose) |
| `CLICKHOUSE_PASSWORD` | AppServer | (secret) | ClickHouse password |
| `CLICKHOUSE_RO_PASSWORD` | AppServer | (secret) | Password for the SQL editor's user |
| `POSTGRES_DB` | Postgres | laminar | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `MALLOC_CONF` | ClickHouse | thp:never | Keeps jemalloc off transparent huge pages; without it idle ClickHouse memory creeps up on Railway |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Auto-generated ClickHouse password |
| `PORT` | Laminar | 8080 | Port Railway routes to - leave as is |
| `FRONTEND_HOST` | Laminar | - | Dashboard on the private network |
| `APP_SERVER_HOST` | Laminar | - | App server on the private network (receives /v1/* SDK and OTLP traffic) |
| `LAMINAR_PASSWORD` | Laminar | (secret) | Auto-generated password for the dashboard's login prompt |
| `LAMINAR_USERNAME` | Laminar | (secret) | Username for the dashboard's login prompt |

## Configuration

- **Healthcheck:** `/sign-in`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'printf "<clickhouse><profiles><default><date_time_input_format>best_effort</date_time_input_format></default></profiles></clickhouse>" > /etc/clickhouse-server/users.d/laminar.xml && R=; for t in trace_log text_log part_log metric_log asynchronous_metric_log background_schedule_pool_log query_metric_log query_thread_log query_views_log session_log crash_log opentelemetry_span_log zookeeper_log blob_storage_log processors_profile_log asynchronous_insert_log error_log latency_log; do R="$R<$t remove=\"1\"/>"; done && printf "<clickhouse><logger><level>warning</level><console>1</console><size>10M</size><count>1</count></logger>%s<query_log><ttl>event_date + INTERVAL 3 DAY DELETE</ttl></query_log></clickhouse>" "$R" > /etc/clickhouse-server/config.d/laminar.xml && exec /entrypoint.sh'`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c 'HASH=$(caddy hash-password --plaintext "$LAMINAR_PASSWORD") && printf ":%s {\n handle /healthz {\n  respond 200\n }\n handle /v1/* {\n  reverse_proxy %s:8000\n }\n handle {\n  basic_auth {\n   %s %s\n  }\n  reverse_proxy %s:5667 {\n   header_up -Authorization\n  }\n }\n}\n" "$PORT" "$APP_SERVER_HOST" "$LAMINAR_USERNAME" "$HASH" "$FRONTEND_HOST" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/laminar-observability)
