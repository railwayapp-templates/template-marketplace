# Deploy NocoDB - Airtable Alternative on Railway

No-code database platform with collaborative views and instant APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-platform)

## About

NocoDB is a self-hostable no-code database platform that turns relational databases into intuitive spreadsheet-like applications. Build tables, forms, Kanban boards, galleries, and powerful data-driven apps while keeping control of your infrastructure and data.

![NocoDB](https://imgur.com/MGb57AR.png)

This template deploys **NocoDB with PostgreSQL**, providing a persistent and flexible foundation for building no-code database applications.

NocoDB provides a familiar spreadsheet-style interface while working with structured relational data. You can create databases from scratch, connect existing PostgreSQL or MySQL databases, organize information using multiple views, collaborate with teams, and access your data through APIs.

PostgreSQL provides persistent database storage, while NocoDB handles the web interface, application logic, collaboration features, and data management experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| NocoDB | `nocodb/nocodb:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | NocoDB | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nocodb-platform)
