# Deploy NocoDB [Updated Jul '26] on Railway

NocoDB [Jul '26] (Open-Source Database UI & No-Code Automation) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-updated-jul-26)

## About

NocoDB is the open-source Airtable alternative that turns your database into a smart spreadsheet. Self-host on Railway to keep your data under your control, avoid SaaS vendor lock-in, and get started in under five minutes.

Airtable's pricing scales with your headcount, not your usage - a five-person team on Airtable Business pays $1,200 a year for what is, underneath the polish, a set of database tables. NocoDB gives you the same spreadsheet-over-database experience without the per-seat tax, because you're paying for the compute you actually use on Railway, not a subscription tier gated by feature flags.

The bigger reason teams choose self-hosting isn't the money, though - it's where the data lives. Client records, internal operations data, anything under an NDA or compliance requirement: with NocoDB self-hosted, that data sits in a Postgres database you control, not a third-party's multi-tenant cluster.

NocoDB's real differentiator versus most "spreadsheet UI over a database" tools is that it isn't limited to one database engine. It connects to PostgreSQL, MySQL, SQLite, MariaDB, SQL Server, and other ODBC-compatible databases - so if your team already has data in an existing production database, NocoDB can put a collaborative UI on top of it directly, rather than requiring a migration into a new proprietary format first.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| nocodb-railway | [shruti060701/nocodb-railway](https://github.com/shruti060701/nocodb-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database name created on startup. |
| `DATABASE_URL` | Postgres | - | Standard connection string. Not directly used by NocoDB (which needs the `NC_DB` query-string format instead), but other tools/clients may still expect it. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the Postgres superuser account. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated superuser password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public/external connection string for reaching this database from outside Railway's network (e.g. a local GUI client). |
| `NC_DB` | nocodb-railway | - | Connection string for NocoDB's meta database (table schemas, views, user accounts). **Uses NocoDB's own query-string format, not a standard Postgres URL** — verified against the vendor's real docker-compose example, and confirmed working on a real live deploy (the app started cleanly and a real CSV import succeeded against this exact string). Getting this format wrong is a silent failure mode worth flagging clearly to anyone editing this later. |
| `NC_SITE_URL` | nocodb-railway | - | Public-facing URL, used for invitation links and password-reset emails. Uses Railway's dynamic domain reference so it resolves correctly for every future deployer, not just this test instance. |
| `NC_AUTH_JWT_SECRET` | nocodb-railway | (secret) | Secret key for JWT token generation and session validation. Auto-generated per deployment. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/nocodb-updated-jul-26)
