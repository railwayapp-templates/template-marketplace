# Deploy CalendarForge Cloud on Railway

Self-hosted calendar API, date planning, PostgreSQL & Railway deployment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calendarforge-cloud)

## About

CalendarForge Cloud is an independent open-source calendar planning studio and API by Ethan, maker of [Make a Calendar](https://make-a-calendar.com/). Version 0.1.0 provides Gregorian calendars, US observed holidays, business-day math, 4-4-5 retail periods, JSON/CSV/ICS exports, and PostgreSQL project APIs. Source: [GitHub](https://github.com/makeacalendar/make-a-calendar-calendarforge).

**Live resources:** [Open the CalendarForge demo](https://soothing-analysis-production-bd03.up.railway.app/) · [API and developer documentation](https://soothing-analysis-production-bd03.up.railway.app/docs) · [OpenAPI schema](https://soothing-analysis-production-bd03.up.railway.app/api/openapi) · [Health check](https://soothing-analysis-production-bd03.up.railway.app/api/v1/health) · [Public calendar resource directory](https://soothing-analysis-production-bd03.up.railway.app/resources).

This template creates a Next.js web service and a private PostgreSQL database in your Railway workspace. Railway builds the web app from the public repository. The app's `DATABASE_URL` references the database's private connection. Enter a strong, unique `CALENDARFORGE_API_TOKEN` when Railway prompts you; keep it private and send it only over TLS. This token protects PostgreSQL project endpoints. Calendar events in the public demo are saved in the current browser and do not share the template deployment's database. Review your Railway plan and current usage before leaving services running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CalendarForge Web | [makeacalendar/make-a-calendar-calendarforge](https://github.com/makeacalendar/make-a-calendar-calendarforge) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | CalendarForge Web | - | Automatically linked to the private PostgreSQL service created by this template. Leave unchanged unless you reconfigure the database connection. |
| `CALENDARFORGE_API_TOKEN` | CalendarForge Web | (secret) | Enter a long, random secret unique to this deployment. Store it securely and do not expose it in browser code. Required only for the PostgreSQL project API. |
| `POSTGRES_DB` | Postgres | railway | Initial database name created by the PostgreSQL image, for example calendarforge. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL assembled from the generated host, port, database user, database name, and password. |
| `POSTGRES_USER` | Postgres | (secret) | Initial database login role created by the PostgreSQL image, for example calendarforge. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. Keep the secret reference; do not share or expose this value. |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/calendarforge-cloud)
