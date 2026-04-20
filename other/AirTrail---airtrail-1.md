# Deploy AirTrail on Railway

A modern, open-source personal flight tracking system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/airtrail-1)

## About

AirTrail is a modern, open-source system to map your flights. It gives you a beautiful world map of every flight you've taken, detailed statistics and much more with no ads or trackers.

Whether you choose to self-host or utilize cloud-based deployment, AirTrail provides a robust solution for mapping and tracking your flights. By deploying on Railway, you can leverage managed infrastructure to ensure scalability, reliability, and ease of maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AirTrail | `johly/airtrail:dev` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | AirTrail | 3000 | - |
| `ORIGIN` | AirTrail | - | The domain you will be accessing AirTrail from. |
| `UPLOAD_LOCATION` | AirTrail | /app/uploads | Path to store uploaded files (e.g., airline icons) |
| `POSTGRES_DB` | Postgres | airtrail | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/airtrail-1)
