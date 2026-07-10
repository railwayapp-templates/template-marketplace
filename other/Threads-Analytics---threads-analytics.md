# Deploy Threads Analytics on Railway

A self-hosted Threads analytics dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/threads-analytics)

## About

Threads Analytics is a self-hosted analytics dashboard for Meta Threads that helps creators and businesses monitor post performance. Connect your Threads access token to explore engagement metrics, visual analytics, trending posts, posting recommendations, and multi-account insights through a secure, password-protected web interface.

Hosting Threads Analytics on Railway provides a fully managed environment for running your analytics dashboard without maintaining servers or infrastructure. Railway automatically deploys the application from the provided Docker image or repository, provisions networking with HTTPS, and simplifies environment variable management.

Threads Analytics requires a PostgreSQL database to store account information, encrypted access tokens, and analytics data. Railway makes it easy to add a PostgreSQL service and securely reference its connection string. The application is exposed through an HTTP proxy with a generated Railway domain, allowing secure access from anywhere. As your usage grows, Railway can scale the application while keeping deployment and configuration simple.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ridemountainpig/threads-analytics | `ghcr.io/ridemountainpig/threads-analytics` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_PASSWORD` | ridemountainpig/threads-analytics | (secret) | App Password |
| `DATABASE_URL` | ridemountainpig/threads-analytics | - | Postgres Database URL |
| `TOKEN_ENCRYPTION_KEY` | ridemountainpig/threads-analytics | (secret) | Token Encryption Key, generate with: openssl rand -hex 32 |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/threads-analytics)
