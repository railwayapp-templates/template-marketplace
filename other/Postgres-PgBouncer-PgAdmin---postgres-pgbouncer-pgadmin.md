# Deploy Postgres + PgBouncer + PgAdmin on Railway

Deploy and Host Postgres + PgBouncer + PgAdmin with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-pgbouncer-pgadmin)

## About

This stack combines PostgreSQL (the core relational database), PgBouncer (a lightweight connection pooler to manage high volumes of database connections), and PgAdmin (a web-based GUI for administration). Together, they provide a production-ready database environment that is scalable, efficient, and easy to manage visually.

Deploying this trio involves orchestrating three distinct services to work in harmony. The Postgres instance serves as the persistent data store. PgBouncer sits in front of it, acting as a "gatekeeper" that maintains a pool of reusable connections, preventing the overhead of creating new processes for every client request—essential for serverless or high-traffic apps. Finally, PgAdmin is deployed as a separate web service that connects to the database, allowing you to run queries and manage schemas via a browser. On Railway, these are typically linked via a private network, ensuring secure and low-latency communication between the components.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PgBouncer | `railwayapp/pgbouncer:latest` | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| PgAdmin | `dpage/pgadmin4:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRESQL_PORT` | PgBouncer | 5432 | - |
| `PGBOUNCER_POOL_MODE` | PgBouncer | transaction | - |
| `POSTGRESQL_PASSWORD` | PgBouncer | (secret) | - |
| `POSTGRESQL_USERNAME` | PgBouncer | (secret) | - |
| `PGBOUNCER_LISTEN_ADDRESS` | PgBouncer | * | - |
| `PGBOUNCER_MAX_CLIENT_CONN` | PgBouncer | 120 | - |
| `PGBOUNCER_DEFAULT_POOL_SIZE` | PgBouncer | 20 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | PgAdmin | 5050 | Web UI Port |
| `PG_SERVER_HOST` | PgAdmin | - | Postgres Server Host |
| `PG_SERVER_PORT` | PgAdmin | - | Postgres Server Port |
| `PG_SERVER_USER` | PgAdmin | (secret) | Postgres Server User |
| `PGADMIN_DEFAULT_DB` | PgAdmin | - | Default database |
| `PG_SERVER_DATABASE` | PgAdmin | - | Postgres database |
| `PG_SERVER_PASSWORD` | PgAdmin | (secret) | - |
| `PGADMIN_LISTEN_PORT` | PgAdmin | 5050 | - |
| `PGADMIN_DEFAULT_EMAIL` | PgAdmin | - | Email address to login in with |
| `PGADMIN_LISTEN_ADDRESS` | PgAdmin | 0.0.0.0 | - |
| `PGADMIN_DISABLE_POSTFIX` | PgAdmin | false | set to true if you want to use your own stmp server |
| `PGADMIN_DEFAULT_PASSWORD` | PgAdmin | (secret) | Password to use for web UI |

## Configuration

- **TCP Proxies:** 6432
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/postgres-pgbouncer-pgadmin)
