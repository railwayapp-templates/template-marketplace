# Deploy Monoscope on Railway

API-first monitoring and observability platform for engineers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/monoscope)

## About

Monoscope is an open-source observability platform. It ingests logs, traces, and metrics over HTTP and OpenTelemetry, stores them in TimescaleDB, and lets you query in natural language. This template self-hosts the official compose stack on Railway — the Haskell server (`ghcr.io/monoscope-tech/monoscope:latest`) plus TimescaleDB 2.29 on PostgreSQL 18.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/monoscope)

Hosting Monoscope means running two containers on Railway’s private network: a public app (HTTP UI + API on `$PORT`, OTLP gRPC on `4317`) and TimescaleDB for metadata and telemetry. Railway terminates TLS, so the app speaks HTTP inside the container (`HOST_URL` is still the public `https://` origin). You attach one volume — TimescaleDB at `/var/lib/postgresql` — generate `POSTGRES_PASSWORD` once on `timescaledb`, point `DATABASE_URL` and `TIMEFUSION_PG_URL` at `timescaledb.railway.internal`, and let the entrypoint wait over IPv6, then exec `monoscope-server`. Migrations run on boot (`MIGRATE_AND_INITIALIZE_ON_START=True`). First boot can take a few minutes. After that, log in with basic auth and send OTLP to the private gRPC port.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| monoscope | [OpenSource-Templates/Monoscope](https://github.com/OpenSource-Templates/Monoscope) (root: /monoscope) | Web service |
| timescaledb | [OpenSource-Templates/Monoscope](https://github.com/OpenSource-Templates/Monoscope) (root: /timescaledb) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DOMAIN` | monoscope | - | Public domain where Betterlytics is accessible. Railway automatically provides this domain. |
| `DB_HOST` | monoscope | - | Private DNS used by the IPv6 wait-for probe. |
| `DB_PORT` | monoscope | 5432 | TimescaleDB port on the private network. |
| `HOST_URL` | monoscope | - | Public HTTPS origin. Railway terminates TLS; the container speaks HTTP. |
| `GRPC_PORT` | monoscope | 4317 | In-container OTLP gRPC port. Not the public HTTP PORT. |
| `LOG_LEVEL` | monoscope | Info | Production log level. Trace is too noisy. |
| `ENVIRONMENT` | monoscope | PROD | Deployment environment: DEV, STAGING, or PROD. |
| `DATABASE_URL` | monoscope | - | libpq keyword form — safe with IPv6 hostnames and unescaped passwords. |
| `AUTH0_CALLBACK` | monoscope | - | Auth0 callback. Used only if Auth0 is configured. |
| `MIGRATIONS_DIR` | monoscope | /opt/monoscope/static/migrations/ | Migration path inside the image. |
| `SHOW_DEMO_PROJECT` | monoscope | False | Hide the bundled demo project. |
| `TIMEFUSION_PG_URL` | monoscope | - | Second pool; same TimescaleDB. The process always opens this pool. |
| `BASIC_AUTH_ENABLED` | monoscope | True | Enable self-host username/password login. |
| `SLACK_REDIRECT_URI` | monoscope | - | Slack OAuth callback. Used only if Slack is configured. |
| `BASIC_AUTH_PASSWORD` | monoscope | (secret) | Generated once on this service. Copy from Variables after deploy. |
| `BASIC_AUTH_USERNAME` | monoscope | (secret) | First UI login username. |
| `LOGGING_DESTINATION` | monoscope | StdOut | Send application logs to container stdout. |
| `AUTH0_LOGOUT_REDIRECT` | monoscope | - | Auth0 logout target. Used only if Auth0 is configured. |
| `ENABLE_PUBSUB_SERVICE` | monoscope | False | No Kafka or Pub/Sub in this kit. |
| `ENABLE_BACKGROUND_JOBS` | monoscope | True | Anomaly detection, reports, and maintenance jobs. |
| `ENABLE_TIMEFUSION_READS` | monoscope | False | Query TimescaleDB, not TimeFusion. |
| `ENABLE_OTLP_GRPC_SERVICE` | monoscope | True | Bind the OpenTelemetry gRPC listener on GRPC_PORT. |
| `ENABLE_TIMEFUSION_WRITES` | monoscope | False | TimeFusion is not deployed in this kit. |
| `ENABLE_BROWSER_MONITORING` | monoscope | True | Show browser spans in the UI. |
| `API_KEY_ENCRYPTION_SECRET_KEY` | monoscope | (secret) | Encrypts stored API keys. Min 32 chars. Do not rotate casually. |
| `MIGRATE_AND_INITIALIZE_ON_START` | monoscope | True | Run SQL migrations on boot before serving traffic. |
| `ENABLE_POSTGRES_TELEMETRY_WRITES` | monoscope | True | Write logs, traces, and metrics into TimescaleDB. |
| `TZ` | timescaledb | UTC | Database timezone. |
| `POSTGRES_DB` | timescaledb | monoscope | Database name. Keep in sync with DATABASE_URL on monoscope. |
| `POSTGRES_USER` | timescaledb | (secret) | Superuser. Keep in sync with DATABASE_URL on monoscope. |
| `POSTGRES_PASSWORD` | timescaledb | (secret) | Generated once on this service. Referenced by monoscope. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/monoscope)
