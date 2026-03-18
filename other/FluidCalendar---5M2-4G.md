# Deploy FluidCalendar on Railway

The open-source intelligent calendar that adapts to your workflow.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/5M2-4G)

## About

An open-source alternative to Motion, designed for intelligent task scheduling and calendar management. FluidCalendar helps you stay on top of your tasks with smart scheduling capabilities, calendar integration, and customizable workflows.

To integrate Google Calendar, set the `GOOGLE_CLIENT_ID` AND `GOOGLE_CLIENT_SECRET` environment variables (preset blank in template, optional)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| eibrahim/fluid-calendar:latest | `eibrahim/fluid-calendar:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXTAUTH_URL` | eibrahim/fluid-calendar:latest | http://localhost:3000 | - |
| `RESEND_API_KEY` | eibrahim/fluid-calendar:latest | (secret) | - |
| `NEXTAUTH_SECRET` | eibrahim/fluid-calendar:latest | (secret) | - |
| `NEXT_PUBLIC_APP_URL` | eibrahim/fluid-calendar:latest | http://localhost:3000 | - |
| `GOOGLE_CLIENT_SECRET` | eibrahim/fluid-calendar:latest | (secret) | - |
| `NEXT_PUBLIC_SITE_URL` | eibrahim/fluid-calendar:latest | http://localhost:3000 | - |
| `NEXT_PUBLIC_ENABLE_SAAS_FEATURES` | eibrahim/fluid-calendar:latest | false | - |
| `POSTGRES_DB` | Postgres | fluid_calendar | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/5M2-4G)
