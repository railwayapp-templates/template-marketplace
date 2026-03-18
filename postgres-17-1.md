# Deploy Postgres 17 on Railway

Deploy and Host Postgres 17 with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgres-17-1)

## About

**Postgres 17** is the latest release of the PostgreSQL relational database management system, known for its robustness, extensibility, and advanced SQL compliance. This version introduces improved performance, enhanced security features, and additional SQL capabilities, making it suitable for modern data-driven applications of any scale.

Hosting Postgres 17 involves provisioning a managed PostgreSQL instance, configuring storage, networking, and security settings, and ensuring automated backups and updates. Deploying on a platform like Railway abstracts away much of the operational complexity, providing developers with easy access to database endpoints, monitoring, and scaling options. With minimal setup, you can focus on building your application while Railway manages infrastructure, uptime, and maintenance for your database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/postgres-17-1)
