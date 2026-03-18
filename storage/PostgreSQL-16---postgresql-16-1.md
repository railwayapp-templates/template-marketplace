# Deploy PostgreSQL 16 on Railway

PostgreSQL 16 - Open source database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgresql-16-1)

## About

Postgres 16 is a powerful, open-source relational database system that builds upon decades of engineering excellence. Known for its stability, extensibility, and performance, version 16 introduces query parallelization improvements, enhanced logical replication, and better performance for workloads with JSON and partitioned tables.

Hosting Postgres 16 on **Railway** means you can focus on building your application without worrying about the operational overhead. Railway takes care of infrastructure provisioning, automatic backups, scaling, and monitoring. All through an intuitive interface or the Railway CLI.

Deploying Postgres 16 provides a reliable foundation for modern apps, whether you’re running microservices, analytics pipelines, or enterprise-grade workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

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

**Category:** Storage

[View on Railway →](https://railway.com/template/postgresql-16-1)
