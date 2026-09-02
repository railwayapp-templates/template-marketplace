# Deploy PgBouncer with Postgres on Railway

A PostgreSQL database with lightweight connection pooling via PgBouncer.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgbouncer-with-postgres)

## About

PgBouncer with Postgres deploys a lightweight PostgreSQL connection pooler together with a Railway PostgreSQL database.

PgBouncer sits between your application and PostgreSQL, reducing connection overhead and allowing many client connections to share a smaller number of backend database connections.

This template deploys two services:

```text
Application
    │ PostgreSQL Protocol
    ▼
PgBouncer :6432
    │ Railway Private Network
    ▼
PostgreSQL :5432
```

PgBouncer acts as the database endpoint used by your application, while PostgreSQL stores the actual application data.

The PostgreSQL service uses Railway-managed persistent storage. PgBouncer itself does not require a Railway Volume.

PgBouncer works with standard PostgreSQL clients and drivers, including:

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

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| PgBouncer  | `ghcr.io/cloudnative-pg/pgbouncer:1.25.2` | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `POOL_MODE` | PgBouncer  | transaction | PgBouncer pooling mode: session, transaction, or statement |
| `POSTGRES_HOST` | PgBouncer  | - | Private hostname of the Railway PostgreSQL service |
| `POSTGRES_PORT` | PgBouncer  | - | PostgreSQL port provided by Railway |
| `POSTGRES_USER` | PgBouncer  | (secret) | PostgreSQL backend username provided by Railway |
| `PGBOUNCER_PORT` | PgBouncer  | 6432 | TCP port PgBouncer listens on for PostgreSQL connections |
| `PGBOUNCER_USER` | PgBouncer  | (secret) | Username applications use when connecting through PgBouncer |
| `MAX_CLIENT_CONN` | PgBouncer  | 100 | Maximum simultaneous client connections accepted by PgBouncer |
| `DEFAULT_POOL_SIZE` | PgBouncer  | 20 | Maximum backend PostgreSQL connections per pool |
| `POSTGRES_DATABASE` | PgBouncer  | - | PostgreSQL database name provided by Railway |
| `POSTGRES_PASSWORD` | PgBouncer  | (secret) | PostgreSQL backend password provided by Railway |
| `PGBOUNCER_DATABASE` | PgBouncer  | app | Virtual database name applications use when connecting through PgBouncer |
| `PGBOUNCER_PASSWORD` | PgBouncer  | (secret) | Password applications use when connecting through PgBouncer |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'printf "%s\n" "[databases]" "${PGBOUNCER_DATABASE} = host=${POSTGRES_HOST} port=${POSTGRES_PORT} dbname=${POSTGRES_DATABASE} user=${POSTGRES_USER} password=${POSTGRES_PASSWORD}" "" "[pgbouncer]" "listen_addr = 0.0.0.0" "listen_port = ${PGBOUNCER_PORT}" "auth_type = plain" "auth_file = /tmp/userlist.txt" "pool_mode = ${POOL_MODE}" "default_pool_size = ${DEFAULT_POOL_SIZE}" "max_client_conn = ${MAX_CLIENT_CONN}" > /tmp/pgbouncer.ini && printf "\"%s\" \"%s\"\n" "${PGBOUNCER_USER}" "${PGBOUNCER_PASSWORD}" > /tmp/userlist.txt && exec pgbouncer /tmp/pgbouncer.ini'`
- **TCP Proxies:** 6432

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgbouncer-with-postgres)
