# Deploy Unleash | Open-Source LaunchDarkly, FlagSmith Alternative on Railway

Self Host Unleash, control feature releases without touching your codebase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/unleash)

## About

Self-host Unleash — the most popular open-source feature flag platform on GitHub, with over 18 million Docker pulls — on Railway in minutes. This template deploys the full Unleash stack: the `unleashorg/unleash-server` container wired to a managed PostgreSQL database, giving you a production-ready feature management instance without any manual infrastructure work.

Run Unleash on Railway and get gradual rollouts, kill switches, targeting strategies, and A/B testing under your own roof — with no data ever leaving your environment.

![Unleash dashboard screenshot](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773509647/nleash_railway_architecture_bsleaf.png)

Unleash is a feature management platform that lets you decouple deployments from feature releases. Instead of redeploying code to toggle behaviour, you flip flags in the Unleash UI and your applications respond instantly via the SDK.

**Key features:**
- Gradual rollouts by percentage, user ID, or custom strategy
- Kill switches for instant rollback without a redeploy
- Targeting by user segments, IP ranges, and custom context fields
- 12+ official SDKs (Go, Java, Node.js, Python, Ruby, Rust, .NET, PHP) and 10+ community SDKs
- Integrations with Slack, Datadog, Prometheus, Sentry, Jira, and Microsoft Teams
- Privacy-first: flag evaluation happens in your app — end-user data never reaches Unleash

**Architecture:** The Unleash server (Node.js) connects to PostgreSQL over Railway's private network. SDKs in your application poll or stream flag state directly from the Unleash server. No Redis or cache layer is required for the open-source tier.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Unleash | `unleashorg/unleash-server:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Unleash | 4242 | HTTP server listening port |
| `LOG_LEVEL` | Unleash | info | Logging verbosity level |
| `UNLEASH_URL` | Unleash | - | Public URL of Unleash instance |
| `DATABASE_HOST` | Unleash | - | Hostname of Postgres database |
| `DATABASE_NAME` | Unleash | - | Database name used by Unleash |
| `DATABASE_PORT` | Unleash | - | Port of Postgres database server |
| `DATABASE_PASSWORD` | Unleash | (secret) | Password for Postgres authentication |
| `DATABASE_USERNAME` | Unleash | (secret) | Username for Postgres authentication |
| `DATABASE_POOL_IDLE_TIMEOUT_MS` | Unleash | 25000 | Idle timeout for DB connections |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/template/unleash)
