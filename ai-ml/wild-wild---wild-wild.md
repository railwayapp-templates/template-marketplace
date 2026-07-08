# Deploy wild-wild on Railway

Plug your AI agents into any provider.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wild-wild)

## About

Manifest is an open-source AI provider gateway for agents and apps. Connect API keys, subscriptions, local models, and custom OpenAI-compatible providers behind one endpoint and dashboard, so your agents can use the right provider without being locked into one platform.

Hosting Manifest on Railway runs the Manifest web app/API alongside a managed PostgreSQL database. Railway handles the container runtime, public HTTPS networking, environment variables, health checks, and database provisioning. Manifest stores provider connections, routing configuration, usage data, and dashboard state in Postgres, while the app exposes an OpenAI-compatible endpoint and browser dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| manifestdotbuild/manifest | `manifestdotbuild/manifest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | manifestdotbuild/manifest | 2099 | - |
| `MANIFEST_MODE` | manifestdotbuild/manifest | selfhosted | - |
| `BETTER_AUTH_SECRET` | manifestdotbuild/manifest | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/wild-wild)
