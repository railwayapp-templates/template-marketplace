# Deploy PgDog with Postgres on Railway

A high-performance PostgreSQL proxy with pooling, routing, and sharding.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgdog-with-postgres)

## About

PgDog with Postgres deploys a high-performance PostgreSQL proxy together with two PostgreSQL shards on Railway.

PgDog sits between your application and PostgreSQL, providing connection pooling, query routing, authentication, and horizontal sharding while keeping your application connected through the standard PostgreSQL wire protocol.

This template deploys three services:

```text
Application
    │ PostgreSQL Protocol
    ▼
 PgDog :6432
   ├── PostgreSQL Shard 0
   └── PostgreSQL Shard 1
```

PgDog acts as the single PostgreSQL endpoint used by your application.

The two PostgreSQL services run as independent shards, while PgDog routes queries based on the configured sharding key.

PgDog uses PostgreSQL's native wire protocol and works with standard clients and drivers such as:

* `psql`
* Prisma
* Drizzle
* Sequelize
* TypeORM
* Django
* SQLAlchemy
* JDBC
* Go PostgreSQL drivers

PgDog itself does not require a Railway Volume. Persistent database storage is handled by the PostgreSQL services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres-Shard-1 | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| pgdog | `ghcr.io/pgdogdev/pgdog:v0.1.48` | TCP service |
| Postgres-Shard-0 | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres-Shard-1 | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres-Shard-1 | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres-Shard-1 | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres-Shard-1 | (secret) | Password to connect to DB |
| `RUST_LOG` | pgdog | info | PgDog logging level |
| `PGDOG_PORT` | pgdog | 6432 | TCP port PgDog listens on for PostgreSQL connections |
| `PGDOG_USER` | pgdog | (secret) | Username applications use when connecting to PgDog |
| `SHARD_0_HOST` | pgdog | - | Private hostname for PostgreSQL shard 0 |
| `SHARD_0_PORT` | pgdog | - | PostgreSQL port for shard 0 |
| `SHARD_0_USER` | pgdog | (secret) | PostgreSQL user for shard 0 |
| `SHARD_1_HOST` | pgdog | - | Private hostname for PostgreSQL shard 1 |
| `SHARD_1_PORT` | pgdog | - | PostgreSQL port for shard 1 |
| `SHARD_1_USER` | pgdog | (secret) | PostgreSQL user for shard 1 |
| `PGDOG_DATABASE` | pgdog | app | Virtual database name exposed by PgDog |
| `PGDOG_PASSWORD` | pgdog | (secret) | Password applications use when connecting to PgDog |
| `PGDOG_POOL_SIZE` | pgdog | 10 | Maximum backend PostgreSQL connections per pool |
| `SHARDING_COLUMN` | pgdog | tenant_id | Column PgDog uses as the sharding key |
| `SHARD_0_DATABASE` | pgdog | - | Database name for shard 0 |
| `SHARD_0_PASSWORD` | pgdog | (secret) | PostgreSQL password for shard 0 |
| `SHARD_1_DATABASE` | pgdog | - | Database name for shard 1 |
| `SHARD_1_PASSWORD` | pgdog | (secret) | PostgreSQL password for shard 1 |
| `SHARDING_DATA_TYPE` | pgdog | bigint | Data type of the sharding key: bigint, uuid, varchar, or vector |
| `POSTGRES_DB` | Postgres-Shard-0 | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres-Shard-0 | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres-Shard-0 | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres-Shard-0 | (secret) | Password to connect to DB |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'printf "%s\n" "[general]" "host = \"0.0.0.0\"" "port = ${PGDOG_PORT}" "default_pool_size = ${PGDOG_POOL_SIZE}" "" "[[databases]]" "name = \"${PGDOG_DATABASE}\"" "host = \"${SHARD_0_HOST}\"" "port = ${SHARD_0_PORT}" "database_name = \"${SHARD_0_DATABASE}\"" "user = \"${SHARD_0_USER}\"" "password = \"${SHARD_0_PASSWORD}\"" "shard = 0" "" "[[databases]]" "name = \"${PGDOG_DATABASE}\"" "host = \"${SHARD_1_HOST}\"" "port = ${SHARD_1_PORT}" "database_name = \"${SHARD_1_DATABASE}\"" "user = \"${SHARD_1_USER}\"" "password = \"${SHARD_1_PASSWORD}\"" "shard = 1" "" "[[sharded_tables]]" "database = \"${PGDOG_DATABASE}\"" "column = \"${SHARDING_COLUMN}\"" "data_type = \"${SHARDING_DATA_TYPE}\"" > /pgdog/pgdog.toml && printf "%s\n" "[[users]]" "name = \"${PGDOG_USER}\"" "database = \"${PGDOG_DATABASE}\"" "password = \"${PGDOG_PASSWORD}\"" > /pgdog/users.toml && exec /usr/local/bin/pgdog --config /pgdog/pgdog.toml --users /pgdog/users.toml'`
- **TCP Proxies:** 6432

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgdog-with-postgres)
