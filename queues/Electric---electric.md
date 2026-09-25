# Deploy Electric on Railway

ElectricSQL 1.8 Postgres sync engine that streams shapes over HTTP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/electric)

## About

Electric is a Postgres sync engine. It reads changes through logical replication and streams subsets of your data, called shapes, to web and mobile clients over plain HTTP, with initial snapshots and live updates. It powers local-first apps and works with TanStack DB, React hooks and any HTTP client, behind your own API.

This template deploys Electric v1.8.1 from the official image with a Railway Postgres database started with `wal_level=logical`. Shape logs are cached on a Railway volume so they survive redeploys. Every shape request must include the generated `ELECTRIC_SECRET`, so keep it on your backend and proxy shape requests through your API rather than calling Electric from the browser. Electric listens on IPv4 and IPv6, so your API can reach it over the private network. Usage reporting is off. It fits the Hobby plan for small datasets. Add a proxy route in your API that appends the secret and checks the user's access first.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| electric | `electricsql/electric:1.8.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | electric | 3000 |
| `ELECTRIC_SECRET` | electric | (secret) |
| `ELECTRIC_STORAGE_DIR` | electric | /var/lib/electric/persistent |
| `ELECTRIC_LISTEN_ON_IPV6` | electric | true |
| `ELECTRIC_USAGE_REPORTING` | electric | false |

## Configuration

- **Start command:** `/usr/bin/tini -g -- /usr/local/bin/wrapper.sh postgres -p 5432 -c wal_level=logical`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/electric/persistent`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/electric)
