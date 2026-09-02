# Deploy PgDog on Railway

Fast PostgreSQL proxy with connection pooling and query routing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgdog)

## About

PgDog is a high-performance PostgreSQL proxy and connection pooler built in Rust. It sits between applications and PostgreSQL to manage connections, authentication, transaction pooling, routing, load balancing, and advanced database architectures.

This Railway template deploys PgDog as a standalone service connected to an existing PostgreSQL database hosted on Railway or another provider.

Hosting PgDog on Railway adds a dedicated PostgreSQL proxy and connection-pooling layer between your applications and an existing PostgreSQL database.

The architecture is simple:

```text
Application
    │ PostgreSQL Protocol
    ▼
 PgDog :6432
    │ PostgreSQL Protocol
    ▼
Existing PostgreSQL
```

PgDog uses PostgreSQL's native wire protocol and works with standard clients and drivers, including:

* `psql`
* Prisma
* Drizzle
* Sequelize
* TypeORM
* Django
* SQLAlchemy
* JDBC
* Go PostgreSQL drivers
* Other PostgreSQL-compatible clients

This template deploys **PgDog only**. PostgreSQL itself is not included.

You can connect PgDog to PostgreSQL hosted on:

* Railway PostgreSQL
* Amazon RDS
* Amazon Aurora PostgreSQL
* Google Cloud SQL
* Azure Database for PostgreSQL
* Supabase
* Neon
* Self-hosted PostgreSQL
* Other PostgreSQL-compatible providers

Backend connection details are supplied through environment variables during deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgdog | `ghcr.io/pgdogdev/pgdog:v0.1.48` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RUST_LOG` | info | PgDog logging level |
| `PGDOG_PORT` | 6432 | TCP port PgDog listens on for PostgreSQL client connections |
| `PGDOG_USER` | (secret) | Username clients use when connecting to PgDog |
| `POSTGRES_HOST` | - | Hostname of the upstream PostgreSQL server |
| `POSTGRES_PORT` | 5432 | Port of the upstream PostgreSQL server |
| `POSTGRES_USER` | (secret) | Username PgDog uses to connect to PostgreSQL |
| `PGDOG_DATABASE` | - | Virtual database name exposed by PgDog to clients |
| `PGDOG_PASSWORD` | (secret) | Password clients use when connecting to PgDog |
| `PGDOG_POOL_SIZE` | 10 | Maximum PostgreSQL backend connections for this pool |
| `POSTGRES_DATABASE` | - | Actual database name on the upstream PostgreSQL server |
| `POSTGRES_PASSWORD` | (secret) | Password PgDog uses to connect to PostgreSQL |

## Configuration

- **Start command:** `/bin/sh -c 'printf "%s\n" "[general]" "host = \"0.0.0.0\"" "port = ${PGDOG_PORT}" "default_pool_size = ${PGDOG_POOL_SIZE}" "" "[[databases]]" "name = \"${PGDOG_DATABASE}\"" "host = \"${POSTGRES_HOST}\"" "port = ${POSTGRES_PORT}" "database_name = \"${POSTGRES_DATABASE}\"" > /pgdog/pgdog.toml && printf "%s\n" "[[users]]" "name = \"${PGDOG_USER}\"" "database = \"${PGDOG_DATABASE}\"" "password = \"${PGDOG_PASSWORD}\"" "server_user = \"${POSTGRES_USER}\"" "server_password = \"${POSTGRES_PASSWORD}\"" "pool_size = ${PGDOG_POOL_SIZE}" > /pgdog/users.toml && exec /usr/local/bin/pgdog --config /pgdog/pgdog.toml --users /pgdog/users.toml'`
- **TCP Proxies:** 6432

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgdog)
