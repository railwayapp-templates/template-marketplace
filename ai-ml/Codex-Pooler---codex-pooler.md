# Deploy Codex Pooler on Railway

Self-hosted Codex gateway with pooled accounts and OpenAI-compatible APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codex-pooler)

## About

Codex Pooler is a self-hosted gateway for pooling Codex accounts and exposing OpenAI-compatible APIs. This Railway template provisions the application together with a persistent PostgreSQL database, generated encryption secrets, public HTTPS networking, health checks, database migrations, and the bundled OpenAI pricing snapshot.

Hosting Codex Pooler gives teams and automated agents a central service for managing upstream Codex identities, organizing them into pools, and routing compatible API traffic. The template uses the project's official container image and a private Railway connection to PostgreSQL. On every deployment, the application applies its idempotent database migrations and imports the bundled pricing data before starting the web server. Railway supplies the public domain, persistent database volume, generated application secrets, service health monitoring, and automatic restart behavior. After deployment, visit the generated application URL and complete the owner bootstrap flow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| codex-pooler | `ghcr.io/icoretech/codex-pooler:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created when PostgreSQL initializes. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL for application services. |
| `POSTGRES_USER` | Postgres | (secret) | Administrator role created when PostgreSQL initializes. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for the PostgreSQL administrator role. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public TCP proxy connection URL for external database clients. |
| `PORT` | codex-pooler | 4000 | HTTP port used by the Phoenix web server. |
| `PHX_HOST` | codex-pooler | - | Public hostname used to generate HTTPS URLs. |
| `ECTO_IPV6` | codex-pooler | false | Enables IPv6 sockets for PostgreSQL connections when set to true. |
| `OBAN_MODE` | codex-pooler | all | Runs web, scheduler, and background jobs together in this service. |
| `POOL_SIZE` | codex-pooler | 10 | Maximum PostgreSQL connections in the application pool. |
| `PHX_SERVER` | codex-pooler | true | Starts the Phoenix HTTP endpoint in the release. |
| `DATABASE_URL` | codex-pooler | - | Private PostgreSQL connection URL supplied by the Postgres service. |
| `SECRET_KEY_BASE` | codex-pooler | (secret) | Generated secret used to sign and encrypt Phoenix data. |
| `OBAN_JOBS_QUEUE_LIMIT` | codex-pooler | 8 | Maximum number of concurrent Oban jobs. |
| `CODEX_POOLER_TOTP_KEY_VERSION` | codex-pooler | v1 | Version label for the TOTP encryption key. |
| `CODEX_POOLER_TOTP_ENCRYPTION_KEY` | codex-pooler | - | Generated 32-byte key used to encrypt operator TOTP secrets. |
| `CODEX_POOLER_UPSTREAM_SECRET_KEY` | codex-pooler | (secret) | Generated 32-byte key used to encrypt upstream credentials. |
| `CODEX_POOLER_OPERATOR_LOGIN_BASE_URL` | codex-pooler | (secret) | Public base URL used for operator login links and redirects. |
| `CODEX_POOLER_UPSTREAM_SECRET_KEY_VERSION` | codex-pooler | (secret) | Version label for the upstream credential encryption key. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -lc 'set -e; env -u PHX_SERVER /app/bin/codex_pooler eval "CodexPooler.Release.migrate()"; env -u PHX_SERVER /app/bin/codex_pooler eval "CodexPooler.Release.import_openai_pricing_from_priv()"; exec /app/bin/codex_pooler start'`
- **Healthcheck:** `/metrics`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/codex-pooler)
