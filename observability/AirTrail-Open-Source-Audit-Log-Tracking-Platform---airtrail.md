# Deploy AirTrail (Open-Source Audit Log & Tracking Platform) on Railway

AirTrail (Track App Events & Audit Changes) Self Host [Mar ’26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/airtrail)

## About

AirTrail is a modern, open-source **personal flight tracking system** available on GitHub. It allows aviation enthusiasts, pilots, and frequent travelers to record, visualize, and analyze their flight journeys in real-time. Unlike conventional flight tracking platforms that only provide limited access or are restricted to commercial airlines, **AirTrail empowers users to own and control their flight data** - making it ideal for private pilots, hobbyists, or anyone interested in personal aviation analytics.

Hosting AirTrail on **Railway** ensures that all your flight data, maps, and configurations remain entirely in your control. You don’t rely on third-party services or commercial APIs that could limit access to your historical flight data. By self-hosting AirTrail, you get **privacy-first flight analytics** and the ability to scale your system as your data grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| johly/airtrail:latest | `johly/airtrail:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_PASSWORD` | johly/airtrail:latest | (secret) | - |
| `DB_USERNAME` | johly/airtrail:latest | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/template/airtrail)
