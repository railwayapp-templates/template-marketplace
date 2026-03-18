# Deploy dynamic-job-runner on Railway

A .NET Scheduler easy to use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dynamic-job-runner)

## About

**Dynamic Job Runner App** is a web application designed to schedule, execute, and manage dynamic jobs using Cron expressions. It includes advanced features like real-time job interruption and is optimized for tasks requiring concurrent processing or scheduled intervals, such as:

- Sending emails.
- Running automated scripts.
- Managing background operations.

---

- **ASP.NET Core 8.0** – Framework for building the web application.
- **Quartz.NET** – Job scheduling and execution engine.
- **PostgreSQL** – Database for task storage and retrieval.
- **Entity Framework Core** – ORM for data access and modeling.
- **Razor Pages & Bootstrap** – For building a responsive and polished UI.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dynamic-job-runner | [enzoaf99/dynamic-job-runner](https://github.com/enzoaf99/dynamic-job-runner) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_PASSWORD` | dynamic-job-runner | (secret) | - |
| `AUTH_USERNAME` | dynamic-job-runner | (secret) | - |
| `ASPNETCORE_URLS` | dynamic-job-runner | http://+:80 | - |
| `ASPNETCORE_ENVIRONMENT` | dynamic-job-runner | Development | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues · **Languages:** C#, HTML, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/dynamic-job-runner)
