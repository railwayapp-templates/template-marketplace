# Deploy TaxHacker on Railway

TaxHacker is a self-hosted accounting app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/taxhacker)

## About

Hosting TaxHacker on Railway involves deploying a single web application backed by a lightweight datastore and optional persistent storage for configuration or uploaded files. Railway handles the application runtime, networking, and environment variable management, allowing you to focus on configuration rather than infrastructure. Depending on the TaxHacker setup, you may use an embedded database (such as SQLite) or connect to a managed PostgreSQL instance provided by Railway. Once deployed, TaxHacker is accessible via a public Railway domain and can be scaled vertically as usage grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| TaxHacker | `ghcr.io/vas3k/taxhacker:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | TaxHacker | 7331 |
| `UPLOAD_PATH` | TaxHacker | ./data/uploads |
| `DISABLE_SIGNUP` | TaxHacker | false |
| `GOOGLE_API_KEY` | TaxHacker | (secret) |
| `OPENAI_API_KEY` | TaxHacker | (secret) |
| `MISTRAL_API_KEY` | TaxHacker | (secret) |
| `SELF_HOSTED_MODE` | TaxHacker | true |
| `STRIPE_SECRET_KEY` | TaxHacker | (secret) |
| `BETTER_AUTH_SECRET` | TaxHacker | (secret) |
| `STRIPE_WEBHOOK_SECRET` | TaxHacker | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/taxhacker)
