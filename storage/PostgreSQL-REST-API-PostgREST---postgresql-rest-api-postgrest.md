# Deploy PostgreSQL REST API (PostgREST) on Railway

Deploy a REST API on top of PostgreSQL using PostgREST.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-rest-api-postgrest)

## About

Hosting PostgREST involves running the PostgREST server alongside a PostgreSQL database and configuring the connection using environment variables. Instead of writing a traditional backend, the database schema and permissions define how the API behaves.

On Railway, PostgREST runs as a containerized service and connects to a managed PostgreSQL instance over Railway’s private network. This makes it easy to deploy a production-ready REST API with minimal setup while keeping database access centralized and controlled.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| postgrest-railway | [BigDaddyAman/postgrest-railway](https://github.com/BigDaddyAman/postgrest-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | postgrest-railway | 3000 | - |
| `PGRST_DB_SCHEMA` | postgrest-railway | public | - |
| `PGRST_DB_ANON_ROLE` | postgrest-railway | postgres | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/postgresql-rest-api-postgrest)
