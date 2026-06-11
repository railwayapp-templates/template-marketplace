# Deploy NocoDB on Railway

[Jun'26] Open Source Airtable Alternative on PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-starter-pack)

## About

Hosting NocoDB involves running the NocoDB application and connecting it to PostgreSQL as the persistent database layer. In this template, PostgreSQL is used as the primary data store, while NocoDB runs as a standalone application with a public URL.

This setup gives you an open-source Airtable alternative that can be deployed quickly on Railway. PostgreSQL stores the application data reliably, and NocoDB provides a clean browser-based interface for managing that data through tables, views, forms, and collaborative workflows.

A persistent volume can also be attached to NocoDB for uploads and local application files, while PostgreSQL remains the main source of truth for structured data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| NocoDB | `nocodb/nocodb` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | NocoDB | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data/`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/nocodb-starter-pack)
