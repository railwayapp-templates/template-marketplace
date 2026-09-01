# Deploy arize-phoenix on Railway

AI Observability & Evaluation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/PTHRoq)

## About

Phoenix is an open-source AI observability platform designed for experimentation, evaluation, and troubleshooting. It ingests OpenTelemetry traces from your LLM and agent applications, then adds LLM-as-a-judge evaluations, versioned datasets, experiments, a prompt playground, and prompt management, all in one UI. Phoenix is vendor and language agnostic, with out-of-the-box support for popular frameworks and LLM providers.

Phoenix ships as a prebuilt image on [Docker Hub](https://hub.docker.com/r/arizephoenix/phoenix), so Railway deploys it without a build step. The container serves the UI and REST API on port `6006` and accepts OTLP/gRPC spans on `4317`, binding to `0.0.0.0` by default. Railway's filesystem is ephemeral, so attach a Postgres service and point `PHOENIX_SQL_DATABASE_URL` at it — Phoenix runs its own migrations on startup. Enable authentication with `PHOENIX_ENABLE_AUTH` and a `PHOENIX_SECRET` of at least 32 characters containing a digit and a lowercase letter. Span-heavy queries want memory, so avoid the smallest instance sizes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| arize-phoenix | `arizephoenix/phoenix:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | arize-phoenix | 6006 | - |
| `PHOENIX_SECRET` | arize-phoenix | (secret) | The secret used to sign keys. Should be kept private. E.x. 3413f9a7735bb780c6b8e4db7d946a492b64d26112a955cdea6a797f4c833593 |
| `PHOENIX_ENABLE_AUTH` | arize-phoenix | True | Enable authentication |
| `PHOENIX_SMTP_HOSTNAME` | arize-phoenix | smtp.sendgrid.net | The SMTP mail service hostname |
| `PHOENIX_SMTP_PASSWORD` | arize-phoenix | (secret) | The password to connect to the SMTP for sending emails |
| `PHOENIX_SMTP_USERNAME` | arize-phoenix | (secret) | the username to use with the smtp server |
| `PHOENIX_SQL_DATABASE_URL` | arize-phoenix | - | The URL to the postgres database |
| `PHOENIX_USE_SECURE_COOKIES` | arize-phoenix | True | Use secure cookies for authentication |
| `PHOENIX_SQL_DATABASE_SCHEMA` | arize-phoenix | phoenix | The database schema name |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/PTHRoq)
