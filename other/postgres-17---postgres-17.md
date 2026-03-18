# Deploy postgres-17 on Railway

Deploy and Host postgres-17 with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-17)

## About

PostgreSQL 17 is the latest major release of the world's most advanced open-source relational database. It features significant performance improvements, enhanced SQL/JSON capabilities, improved vacuum performance, and new security features including the ability to set transaction timeouts for better resource management.

PostgreSQL 17 on Railway provides a fully managed database solution with automatic SSL encryption, built-in connection pooling, and seamless scaling. This template uses the official PostgreSQL 17 Docker image with Railway-specific optimizations for security and performance. It includes automatic backup configurations, connection string generation, and integrates perfectly with Railway's infrastructure. The deployment handles all initialization parameters, creates both internal and public connection URLs, and provides monitoring through Railway's dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-17 | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/postgres-17)
