# Deploy ReadySet [Updated Mar ’26] on Railway

ReadySet [Mar ’26] (Speed Up Queries & Scale Databases Fast) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/readyset)

## About

Readyset is an open-source acceleration engine designed to make your database queries lightning-fast without changing your existing code. It works as a caching layer that sits between your application and the database, automatically transforming slow queries into fast, precomputed results. Available on GitHub, Readyset is engineered for real-time applications like dashboards, APIs, and live data apps, providing low-latency query results while keeping full SQL compatibility.

You can self-host Readyset to retain full control over your database acceleration layer. Hosting it on Railway means you can deploy, scale, and manage Readyset easily in the cloud with zero manual server setup.

Railway makes it simple to self-host Readyset in a few clicks. You can deploy Readyset alongside your PostgreSQL or MySQL database to enjoy blazing-fast query results and improved app responsiveness. Readyset converts complex SQL queries into materialized views automatically, caching results in memory or persistent storage for ultra-fast reads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| readyset | `readysettech/readyset:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | readyset | 5433 |
| `STANDALONE` | readyset | true |
| `DISABLE_TELEMETRY` | readyset | true |
| `DISABLE_UPSTREAM_SSL_VERIFICATION` | readyset | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/readyset)
