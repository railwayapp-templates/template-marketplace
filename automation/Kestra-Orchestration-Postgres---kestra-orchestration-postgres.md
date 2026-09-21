# Deploy Kestra Orchestration + Postgres on Railway

Kestra orchestration with Postgres, declarative YAML workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kestra-orchestration-postgres)

## About

Kestra is an open source, event driven orchestration platform. Workflows are declarative YAML files
called flows: each one has an id, a namespace, a list of tasks, and optional inputs, triggers and
error handlers. Kestra schedules them, runs them, keeps the full execution history, and exposes every
UI action as a REST endpoint, so it works equally well as a scheduler, an ETL runner, or the control
plane behind an internal API.

Hosting Kestra means running the standalone server next to PostgreSQL. Postgres holds the flow
repository and the internal message queue; a persistent volume holds internal storage, which is where
task outputs, namespace files, KV entries and auto installed plugins live. This template uses the
official `kestra/kestra:v2.0.2-slim` image, pins `PORT=8080` so Railway's healthcheck reaches `/ping`,
points the JDBC datasource at a private Postgres service over Railway's internal network, and mounts a
volume at `/app/storage`.

Two choices are worth calling out. First, basic auth is enabled by default with a generated password,
so the instance is never briefly open on the public internet. Second, the template ships the slim
image rather than the 3.2 GB image that bundles every plugin: Kestra's plugin auto install fetches
what a flow actually needs from Maven Central on first use and caches it on the volume, which keeps
deploys fast without limiting what you can build.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Kestra | `kestra/kestra:v2.0.2-slim` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | kestra | Database name. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients). |
| `PORT` | Kestra | 8080 | Kestra webserver port. Railway's healthcheck and edge proxy probe $PORT, so keep this equal to MICRONAUT_SERVER_PORT. |
| `KESTRA_URL` | Kestra | - | Public base URL (kestra.url). Used for absolute links in the UI and in notification tasks. |
| `KESTRA_CONFIGURATION` | Kestra | - | Inline Kestra YAML configuration. Sets the Postgres datasource, the Postgres repository and queue, local internal storage at /app/storage, and basic auth. Edit this to add storage backends, secrets managers or plugin settings. |
| `KESTRA_ADMIN_PASSWORD` | Kestra | (secret) | Generated basic auth password. Kestra requires at least 8 characters with an uppercase letter, a lowercase letter and a digit, which the Kestra1 prefix guarantees. |
| `KESTRA_ADMIN_USERNAME` | Kestra | (secret) | Basic auth login for the UI and the REST API. Kestra validates this as an email address, so keep the user@domain form. |
| `MICRONAUT_SERVER_PORT` | Kestra | - | Port Micronaut binds. Micronaut does not read PORT by itself, so it is pinned to the same value Railway probes. |
| `KESTRA_TUTORIAL_FLOWS_ENABLED` | Kestra | true | Loads Kestra's tutorial flows on first start. Set to false for a faster, quieter first boot. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/local/bin/docker-entrypoint.sh server standalone`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/kestra-orchestration-postgres)
