# Deploy HyperDX on Railway

ClickHouse observability: logs, traces, metrics, session replay.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hyperdx)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/hyperdx?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=hyperdx)

[HyperDX](https://hyperdx.io/) — the open-source core of ClickHouse's ClickStack — unifies logs, traces, metrics, session replay, and errors over ClickHouse. It correlates a browser session with the exact backend trace and the logs around it, so a bug report turns into a root cause without hopping between four tools.

**Read this before deploying: ingest stays closed until you create your account.** The collector pulls its pipeline over OpAMP from the app, and that pipeline is keyed to your team's ingestion API key — which does not exist until the first user registers. Until then the collector runs but never opens its OTLP ports, and telemetry sent to it is refused. Open the app's domain and register first; ingest comes up within about half a minute.

This template runs four services so each can be sized on its own. ClickHouse holds the telemetry and is the one that grows — it gets a volume and it is where your storage bill lives. MongoDB holds metadata: users, dashboards, saved searches, and alert rules, and stays small. The collector is the ingest edge, taking OTLP over HTTP and gRPC and writing to ClickHouse. The app serves the UI, the API, and the OpAMP server that hands the collector its config — three listeners in one container, only one of which needs a domain.

Two services get public domains here, which is unusual and deliberate: the app's for people, and the collector's for telemetry. Keeping them apart means your ingest endpoint is not the same hostname as your dashboard, and either can be swapped for a custom domain without touching the other.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [nomideusz/hyperdx-railway](https://github.com/nomideusz/hyperdx-railway) (root: /app) | Web service |
| otel-collector | [nomideusz/hyperdx-railway](https://github.com/nomideusz/hyperdx-railway) (root: /otel-collector) | Web service |
| mongo | [nomideusz/hyperdx-railway](https://github.com/nomideusz/hyperdx-railway) (root: /mongo) | Database |
| clickhouse | [nomideusz/hyperdx-railway](https://github.com/nomideusz/hyperdx-railway) (root: /clickhouse) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | app | 8080 | UI port Railway routes to. Must match HYPERDX_APP_PORT — don't change. |
| `MONGO_URI` | app | - | Metadata database connection string. Wired automatically — don't change. |
| `OPAMP_PORT` | app | 4320 | OpAMP port the collector pulls its pipeline config from. Don't change. |
| `SERVER_URL` | app | http://127.0.0.1:8000 | Where the UI reaches the API, in-container. Don't change. |
| `FRONTEND_URL` | app | - | Public base URL, wired to your Railway domain. Don't change. |
| `HYPERDX_APP_URL` | app | - | Public base URL, wired to your Railway domain. Don't change. |
| `HYPERDX_API_PORT` | app | 8000 | API port inside the container, reached over loopback only. Don't change. |
| `HYPERDX_APP_PORT` | app | 8080 | Next.js UI port inside the container. Don't change. |
| `HYPERDX_LOG_LEVEL` | app | info | Log verbosity: debug, info, warn, error. |
| `DEFAULT_CONNECTIONS` | app | - | The bundled ClickHouse, pre-selected on first login. Wired automatically — don't change. |
| `USAGE_STATS_ENABLED` | app | false | Anonymous usage reporting to HyperDX. Off by default. |
| `EXPRESS_SESSION_SECRET` | app | (secret) | Auto-generated key for signing login sessions. |
| `PORT` | otel-collector | 4318 | OTLP/HTTP port Railway routes to. The image exposes five ports; this pins the right one. Don't change. |
| `CLICKHOUSE_USER` | otel-collector | (secret) | ClickHouse user. Must match the clickhouse service — don't change. |
| `OPAMP_SERVER_URL` | otel-collector | - | Where the collector fetches its pipeline config. Wired automatically — don't change. |
| `HYPERDX_LOG_LEVEL` | otel-collector | info | Log verbosity: debug, info, warn, error. |
| `CLICKHOUSE_ENDPOINT` | otel-collector | - | ClickHouse native endpoint. Wired automatically — don't change. |
| `CLICKHOUSE_PASSWORD` | otel-collector | (secret) | ClickHouse password. Wired automatically — don't change. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Auto-generated metadata database password. |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | Metadata database user. Must match the app's MONGO_URI — don't change. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Auto-generated telemetry database password. |

## Configuration

- **Healthcheck:** `/api/installation`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/db`
- **Volume:** `/var/lib/clickhouse`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/hyperdx)
