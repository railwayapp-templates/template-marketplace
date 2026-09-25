# Deploy PgDog on Railway

PgDog 0.1 Postgres connection pooler and load balancer, with Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgdog-1)

## About

PgDog is a modern PostgreSQL connection pooler, load balancer and sharding proxy written in Rust. Applications connect to it like a normal Postgres server, and it multiplexes many client connections onto a small pool of server connections with transaction pooling, health checks and failover. It is a newer alternative to PgBouncer.

This template deploys PgDog v0.1.59 from the official image in front of a Railway Postgres database. The start command writes the pooler and user config from Railway references, so the database and credentials are wired up automatically, with a pool of 20 server connections. Apps connect to PgDog over the private network on port 6432 with the normal Postgres credentials, and external clients use the Railway TCP proxy. An admin database with its own generated password shows pools and statistics. PgDog keeps no state, so it needs no volume and fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgdog | `ghcr.io/pgdogdev/pgdog:v0.1.59` | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | pgdog | 8080 |
| `PGDOG_POOL_SIZE` | pgdog | 20 |
| `PGDOG_ADMIN_PASSWORD` | pgdog | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `sh -c 'printf "[general]\nhost = \"::\"\nport = 6432\nhealthcheck_port = 8080\ndefault_pool_size = %s\n\n[admin]\nname = \"admin\"\nuser = \"admin\"\npassword = \"%s\"\n\n[[databases]]\nname = \"%s\"\nhost = \"%s\"\nport = %s\ndatabase_name = \"%s\"\n" "$PGDOG_POOL_SIZE" "$PGDOG_ADMIN_PASSWORD" "$PGDATABASE" "$PGHOST" "$PGPORT" "$PGDATABASE" > /tmp/pgdog.toml && printf "[[users]]\nname = \"%s\"\npassword = \"%s\"\ndatabase = \"%s\"\n" "$PGUSER" "$PGPASSWORD" "$PGDATABASE" > /tmp/users.toml && exec pgdog --config /tmp/pgdog.toml --users /tmp/users.toml run'`
- **Healthcheck:** `/`
- **TCP Proxies:** 6432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgdog-1)
