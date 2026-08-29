# Deploy PostgreSQL with Extensions on Railway

PostgreSQL with SSL and dynamic extensions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-with-extensions)

## About

Build a customized PostgreSQL image on Railway with the APT packages, extension repositories, database extensions, and preload libraries your application requires. The template adds the same managed TLS and persistent-volume protections as the standard image.

This template builds from the project source so Railway can install PostgreSQL extension packages before deployment. You provide comma-separated build arguments for Debian packages and optional third-party APT repositories, then choose which extensions to create when a new database is initialized. This supports packages such as PostGIS, pgvector, TimescaleDB, and pg_cron without maintaining a separate Dockerfile.

The resulting image generates a private CA and a CA-signed server certificate for Railway's private and public database hostnames. It validates and renews certificates on startup, preserves a healthy CA across deployments, validates the mounted PostgreSQL data version, and serializes access to the persistent volume during overlapping deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | [ncontiero/postgres-ssl](https://github.com/ncontiero/postgres-ssl) (root: with-extensions) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `SSL_REQUIRE` | false | Set to true to reject plaintext TCP database and replication connections. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB. |
| `PG_APT_PACKAGES` | - | A comma-separated list of APT package names for the extensions (e.g., postgresql-18-postgis-3,timescaledb-2-postgresql-18). |
| `PG_DB_EXTENSIONS` | - | A comma-separated list of extension names to enable in the database (e.g., postgis,pg_cron,timescaledb). |
| `POSTGRES_VERSION` | 18.6 | Specifies the base PostgreSQL version to use when building the image. |
| `SSL_CA_CERT_DAYS` | 3650 | Private Certificate Authority validity in days. |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB. |
| `PG_EXTENSION_REPOS` | - | A comma-separated list of APT repository URLs to add (e.g., https://packagecloud.io/timescale/timescaledb/debian/ trixie main). |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PG_EXTENSION_REPO_KEYS` | - | A comma-separated list of GPG key URLs corresponding to PG_EXTENSION_REPOS. |
| `RUNTIME_LOCK_WAIT_SECONDS` | 300 | Maximum time to wait for a previous deployment to release the volume. |
| `PG_SHARED_PRELOAD_LIBRARIES` | - | A comma-separated list of shared libraries to preload (e.g., timescaledb). |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage · **Languages:** Shell, TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/postgresql-with-extensions)
