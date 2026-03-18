# Deploy Blazor + PostgreSQL Starter on Railway

Full-stack Blazor Server + PostgreSQL with Entity Framework Core

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/blazor-postgresql--1)

## About

A production-ready full-stack template combining Blazor Server with PostgreSQL database. Build modern web applications with C# and .NET 9, featuring Entity Framework Core, automatic database migrations, and a working CRUD demo. Deploy in 2 minutes with zero configuration required.

Deploying Blazor + PostgreSQL Starter involves a multi-stage Docker build that compiles your .NET 9 application and provisions a PostgreSQL database. Railway automatically connects the services, runs Entity Framework Core migrations on startup, and configures health monitoring. The template includes a working CRUD demo at `/database` that demonstrates real-time database operations with type-safe LINQ queries. Public networking is pre-configured with automatic SSL, and the app scales vertically with your traffic. The entire stack—Blazor Server UI, ASP.NET Core backend, SignalR real-time updates, and PostgreSQL database—deploys together in a single click.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| blazor-postgres-starter | [TrailBlazors/blazor-postgres-starter](https://github.com/TrailBlazors/blazor-postgres-starter) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `Database_URL` | blazor-postgres-starter | - | URL to Postgres |
| `ASPNETCORE_ENVIRONMENT` | blazor-postgres-starter | Production | Determines which environment ASP.NET is running in |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, CSS, C#, Dockerfile

[View on Railway →](https://railway.com/deploy/blazor-postgresql--1)
