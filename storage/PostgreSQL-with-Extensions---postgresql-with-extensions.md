# Deploy PostgreSQL with Extensions on Railway

PostgreSQL with SSL and dynamic extensions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-with-extensions)

## About

A highly customizable PostgreSQL database template equipped with native SSL support. It allows developers to dynamically install Debian APT packages and configure custom PostgreSQL extensions (like PostGIS, pgvector, or TimescaleDB) during deployment, providing a fully tailored and secure database environment for any application.

Hosting this template on Railway means you don't have to worry about writing custom Dockerfiles or managing complex build processes just to get a specific extension working. By providing the desired `PG_APT_PACKAGES` and `PG_DB_EXTENSIONS` environment variables during deployment, the template automatically compiles the correct image, installs all dependencies, and runs the necessary `CREATE EXTENSION` SQL commands upon initialization.

Furthermore, the template generates TLS/SSL certificates internally on startup. This ensures that all connections to the database over the public internet are fully encrypted and secure by default, overcoming common limitations of standard unencrypted database templates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | [ncontiero/postgres-ssl](https://github.com/ncontiero/postgres-ssl) (root: with-extensions) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB. |
| `PG_APT_PACKAGES` | - | A comma-separated list of APT package names for the extensions (e.g., postgresql-18-postgis-3,timescaledb-2-postgresql-18). |
| `PG_DB_EXTENSIONS` | - | A comma-separated list of extension names to enable in the database (e.g., postgis,pg_cron,timescaledb). |
| `POSTGRES_VERSION` | 18.4 | Specifies the base PostgreSQL version to use when building the image. |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB. |
| `PG_EXTENSION_REPOS` | - | A comma-separated list of APT repository URLs to add (e.g., https://packagecloud.io/timescale/timescaledb/debian/ trixie main). |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PG_EXTENSION_REPO_KEYS` | - | A comma-separated list of GPG key URLs corresponding to PG_EXTENSION_REPOS. |
| `PG_SHARED_PRELOAD_LIBRARIES` | - | A comma-separated list of shared libraries to preload (e.g., timescaledb). |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage · **Languages:** Shell, Dockerfile, TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/postgresql-with-extensions)
