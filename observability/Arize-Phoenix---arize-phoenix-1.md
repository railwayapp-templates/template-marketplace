# Deploy Arize Phoenix on Railway

Open-source LLM tracing, evals and observability, backed by Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arize-phoenix-1)

## About

Phoenix is an open-source observability platform for LLM applications. It collects OpenTelemetry traces, runs evals, and gives you a UI to inspect prompts, retrieval, tool calls, and latency, without sending data to a third-party SaaS.

Hosting Phoenix means running the tracing UI next to PostgreSQL so traces survive redeploys. This template pins `arizephoenix/phoenix:version-20.9.0`. The official Docker image is distroless: there is no shell, so this template does not wrap a custom entrypoint. Phoenix reads `PHOENIX_PORT` (not only Railway's `PORT`), and a Kubernetes-style `tcp://` value will crash startup. This template pins both `PORT` and `PHOENIX_PORT` to `6006`, binds `PHOENIX_HOST=::` for dual-stack healthchecks, stores data in Postgres, enables auth, and exposes OTLP/HTTP on 6006 plus a TCP proxy for gRPC on 4317.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Phoenix | `arizephoenix/phoenix:version-20.9.0` | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Phoenix | 6006 | Port Railway's healthcheck and edge proxy probe. Must equal PHOENIX_PORT. |
| `PHOENIX_HOST` | Phoenix | :: | Bind address. '::' makes Phoenix listen on IPv4 and IPv6 so Railway healthchecks and private networking both work. |
| `PHOENIX_PORT` | Phoenix | 6006 | HTTP port for the UI, REST API and OTLP/HTTP (/v1/traces). Integer only. |
| `PHOENIX_SECRET` | Phoenix | (secret) | Signs auth tokens. Must be 32+ chars with a digit and a lowercase letter (a 64-char hex string satisfies this). |
| `PHOENIX_GRPC_PORT` | Phoenix | 4317 | OTLP gRPC collector port (exposed through the TCP proxy). |
| `PHOENIX_ENABLE_AUTH` | Phoenix | true | Require login. First login: admin@localhost / admin, then you are forced to set a new password. |
| `PHOENIX_SQL_DATABASE_URL` | Phoenix | - | Postgres connection string. Phoenix runs migrations on boot. |
| `PHOENIX_TELEMETRY_ENABLED` | Phoenix | false | Opt out of upstream usage telemetry. |
| `PHOENIX_USE_SECURE_COOKIES` | Phoenix | true | Secure cookies for the HTTPS Railway domain. |
| `POSTGRES_DB` | Postgres | phoenix | Database name. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients). |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 4317
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/arize-phoenix-1)
