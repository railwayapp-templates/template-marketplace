# Deploy frc-attendance on Railway

An attendance website, built for FRC.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frc-attendance)

## About

frc-attendance is an attendance tracing software for FRC teams. This template deploys the API, static website (which are bundled together in a docker container), along with a PostgreSQL database.

frc-attendance is a project backed by Nuxt 3 for the frontend and Rust's poem-web framework for the backend. The frontend, which leverages static site generation, is bundled together in a docker container which this template pulls. This template also sets up a PostgreSQL database for storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| onlycs/attendance | `ghcr.io/onlycs/attendance:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | onlycs/attendance | - | Timezone, in the database timezone format. See documentation for more information. |
| `JWT_SECRET` | onlycs/attendance | (secret) | Long, random password. You do not need to remember this |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/frc-attendance)
