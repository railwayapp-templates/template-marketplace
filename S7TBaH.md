# Deploy Apache Superset on Railway

Data Visualization and Data Exploration | Looker, Tableau alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/S7TBaH)

## About

Superset is a modern data exploration and data visualization platform. Superset can replace or augment proprietary business intelligence tools for many teams. Superset integrates well with a variety of data sources.

- Create a new project using the template
- Fill out the admin username, email and password

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| apache-superset | [ju-li/apache-superset-railway](https://github.com/ju-li/apache-superset-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | apache-superset | 8088 | - |
| `SECRET_KEY` | apache-superset | (secret) | - |
| `ADMIN_PASSWORD` | apache-superset | (secret) | - |
| `ADMIN_USERNAME` | apache-superset | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell, Python

[View on Railway →](https://railway.com/template/S7TBaH)
