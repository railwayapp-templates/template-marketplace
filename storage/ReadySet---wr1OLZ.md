# Deploy ReadySet on Railway

A lightweight caching engine for Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wr1OLZ)

## About

<p align="center">
# ReadySet + Postgres
  <img width="40%" src="https://user-images.githubusercontent.com/38481289/172237414-023c0b04-c597-44b7-8b14-b5b0c382dc07.png">
</p>

[ReadySet](https://readyset.io) is a transparent database cache for Postgres &amp; MySQL that gives you the performance and scalability of an in-memory key-value store without requiring that you rewrite your app or manually handle cache invalidation.

## Features
- Pre-Configured Postgres 16 Database
- ReadySet

## How to use
- Deploy the template
- Connect to the ReadySet enhanced database by [referencing](https://docs.railway.app/develop/variables#reference-variables) the `READYSET_DATABASE_PRIVATE_URL` or `READYSET_DATABASE_URL` variables.
- [Start caching queries](https://docs.readyset.io/get-started/cache)

## Limitations
- No SSL due to a limitation of the platform

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17` | Database |
| ReadySet | `readysettech/readyset` | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PORT` | ReadySet | 5433 | The port for ReadySet to listen on |
| `STANDALONE` | ReadySet | true | Run ReadySet as a single process |
| `LISTEN_ADDRESS` | ReadySet | - | The address for ReadySet to listen on |
| `UPSTREAM_DB_URL` | ReadySet | - | Connection string to the regular Postgres instance |
| `DISABLE_TELEMETRY` | ReadySet | true | Disables telemtry |
| `READYSET_DATABASE_URL` | ReadySet | - | URL to connect to your ReadySet enhanced database |
| `READYSET_DATABASE_PRIVATE_URL` | ReadySet | - | URL to connect to your ReadySet enhanced database |
| `DISABLE_UPSTREAM_SSL_VERIFICATION` | ReadySet | true | Disable upstream SSL verification |

## Configuration

- **Start command:** `docker-entrypoint.sh postgres -c wal_level=logical --port=5432`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 5433

**Category:** Storage

[View on Railway →](https://railway.com/deploy/wr1OLZ)
