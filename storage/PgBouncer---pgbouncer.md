# Deploy PgBouncer on Railway

A simple PostgreSQL pooler to reduce database connection overhead.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgbouncer)

## About

PgBouncer is a lightweight PostgreSQL connection pooler designed to reduce database connection overhead and improve connection efficiency between applications and PostgreSQL.

This Railway template deploys PgBouncer as a standalone TCP service that connects to an existing PostgreSQL database.

Hosting PgBouncer on Railway adds a dedicated connection-pooling layer between your application and PostgreSQL.

```text
Application
    │ PostgreSQL Protocol
    ▼
PgBouncer :6432
    │ PostgreSQL Protocol
    ▼
Existing PostgreSQL
```

PgBouncer accepts standard PostgreSQL connections and reuses a smaller number of backend database connections.

It works with standard PostgreSQL clients and frameworks, including:

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

This template deploys **PgBouncer only**. An existing PostgreSQL database is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgbouncer | `ghcr.io/cloudnative-pg/pgbouncer:1.25.2` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POOL_MODE` | transaction | Pooling mode: session, transaction, or statement |
| `POSTGRES_HOST` | - | Hostname of the upstream PostgreSQL server |
| `POSTGRES_PORT` | 5432 | Port of the upstream PostgreSQL server |
| `POSTGRES_USER` | (secret) | Username PgBouncer uses to connect to PostgreSQL |
| `PGBOUNCER_PORT` | 6432 | TCP port PgBouncer listens on for PostgreSQL connections |
| `PGBOUNCER_USER` | (secret) | Username clients use when connecting through PgBouncer |
| `MAX_CLIENT_CONN` | 100 | Maximum simultaneous client connections accepted by PgBouncer |
| `DEFAULT_POOL_SIZE` | 20 | Maximum backend PostgreSQL connections per database/user pool |
| `POSTGRES_DATABASE` | - | Actual database name on the upstream PostgreSQL server |
| `POSTGRES_PASSWORD` | (secret) | Password PgBouncer uses to connect to PostgreSQL |
| `PGBOUNCER_DATABASE` | - | Virtual database name exposed by PgBouncer |
| `PGBOUNCER_PASSWORD` | (secret) | Password clients use when connecting through PgBouncer |

## Configuration

- **Start command:** `/bin/sh -c 'printf "%s\n" "[databases]" "${PGBOUNCER_DATABASE} = host=${POSTGRES_HOST} port=${POSTGRES_PORT} dbname=${POSTGRES_DATABASE} user=${POSTGRES_USER} password=${POSTGRES_PASSWORD}" "" "[pgbouncer]" "listen_addr = 0.0.0.0" "listen_port = ${PGBOUNCER_PORT}" "auth_type = plain" "auth_file = /tmp/userlist.txt" "pool_mode = ${POOL_MODE}" "default_pool_size = ${DEFAULT_POOL_SIZE}" "max_client_conn = ${MAX_CLIENT_CONN}" > /tmp/pgbouncer.ini && printf "\"%s\" \"%s\"\n" "${PGBOUNCER_USER}" "${PGBOUNCER_PASSWORD}" > /tmp/userlist.txt && exec pgbouncer /tmp/pgbouncer.ini'`
- **TCP Proxies:** 6432

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgbouncer)
