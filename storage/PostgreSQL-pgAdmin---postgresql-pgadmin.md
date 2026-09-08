# Deploy PostgreSQL + pgAdmin on Railway

PostgreSQL database with the pgAdmin web console attached to it

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-pgadmin)

## About

PostgreSQL is the relational database most teams reach for when they want SQL, transactions and a type system they can extend — JSON documents, full-text search and vector similarity all live in one engine. pgAdmin is the project's own web console: a schema browser, a query tool with an editable results grid, live dashboards, and property editors for every PostgreSQL object type. Together they are what a developer needs on day one — a database to write to, and somewhere to look at it without a desktop client.

Self-host PostgreSQL on Railway with the console already attached. **postgres** is a PostgreSQL 18 server on its own volume, with TLS enabled, pgvector installed and pgBackRest archiving continuously to an object-storage bucket; **pgadmin** runs the console, holds the public URL, and is pre-registered against the database over private networking, so the server appears in the browser tree already connected. The database is reachable from your other Railway services by internal hostname and from your laptop through a TCP endpoint, so `psql`, Prisma or Django connects as soon as the deploy finishes.

![Diagram of the pgAdmin and PostgreSQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788793316/postgresql-pgadmin-architecture.png)

PostgreSQL is an ACID-compliant relational database with more than thirty years behind it, under the permissive PostgreSQL Licence. Teams self-host it to keep data on infrastructure they control, to run extensions a managed provider will not install, and to avoid per-connection pricing. pgAdmin comes from the same community and tracks new features as they ship.

Key features:

- SQL with window functions, CTEs, `JSONB`, arrays, ranges and full-text search
- Extensions — `pgvector`, `pg_stat_statements`, `pg_trgm`, `hstore`, `uuid-ossp` and the rest of the trusted set
- Logical and streaming replication, and point-in-time recovery from archived WAL
- pgAdmin's query tool, ERD designer, schema diff, grant wizard and live dashboards

Two services make this up. **postgres** owns the data: a volume, TLS certificates generated on first boot, and a background worker pushing WAL segments and scheduled base backups to the bucket. **pgadmin** owns the browser experience, keeping its configuration — users, saved queries, registered servers — in a `pgadmin` database on the same server, with a volume for sessions and file storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgadmin | [gridalpha/pgadmin-railway](https://github.com/gridalpha/pgadmin-railway) | Web service |
| postgres | [gridalpha/postgresql-railway](https://github.com/gridalpha/postgresql-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | pgadmin | 8080 | HTTP server listening port |
| `PGADMIN_SERVER_NAME` | pgadmin | PostgreSQL | Label for the pre-registered server |
| `PGADMIN_DATABASE_URL` | pgadmin | - | Holds pgAdmin's configuration database |
| `PGADMIN_DEFAULT_EMAIL` | pgadmin | admin@yourdomain.dev | Console login; change to your address |
| `PGADMIN_SERVER_SSLMODE` | pgadmin | require | Encrypt the console's own connection |
| `PGADMIN_DEFAULT_PASSWORD` | pgadmin | (secret) | Console password, readable here after deploy |
| `PGADMIN_CONFIG_PROXY_X_FOR_COUNT` | pgadmin | 2 | Forwarded-for hops to the real client |
| `PGADMIN_CONFIG_MAX_LOGIN_ATTEMPTS` | pgadmin | (secret) | Lockout threshold; default 3 is unrecoverable |
| `PGADMIN_CONFIG_SESSION_COOKIE_SECURE` | pgadmin | True | Session cookie over HTTPS only |
| `PORT` | postgres | 8080 | Port the health endpoint listens on |
| `POSTGRES_DB` | postgres | railway | Database created on first boot |
| `DATABASE_URL` | postgres | - | Private connection string |
| `LOG_TO_STDOUT` | postgres | true | Send the server log to stdout, not stderr |
| `POSTGRES_HOST` | postgres | postgres.railway.internal | Private hostname for other services |
| `POSTGRES_PORT` | postgres | 5432 | PostgreSQL listening port |
| `POSTGRES_USER` | postgres | (secret) | Superuser created on first boot |
| `WAL_ARCHIVE_KEY` | postgres | - | Bucket access key |
| `WAL_ARCHIVE_PATH` | postgres | /pgbackrest | Prefix inside the bucket |
| `POSTGRES_PASSWORD` | postgres | (secret) | Superuser password, read on first boot |
| `WAL_ARCHIVE_BUCKET` | postgres | - | Turns pgBackRest archiving on |
| `WAL_ARCHIVE_REGION` | postgres | - | Bucket region |
| `WAL_ARCHIVE_SECRET` | postgres | (secret) | Bucket secret key |
| `DATABASE_PUBLIC_URL` | postgres | - | External connection string |
| `WAL_ARCHIVE_ENDPOINT` | postgres | - | Object storage endpoint |

## Configuration

- **Healthcheck:** `/misc/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/pgadmin`
- **Healthcheck:** `/healthz`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/postgresql-pgadmin)
