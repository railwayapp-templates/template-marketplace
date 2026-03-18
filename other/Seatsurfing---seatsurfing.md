# Deploy Seatsurfing on Railway

Deploy and Host Seatsurfing with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seatsurfing)

## About

Seatsurfing is a versatile workplace management platform that enables desk sharing, room reservations, and co-working space management for enterprises. The solution streamlines hot-desking and hybrid work arrangements through an intuitive booking interface.

Seatsurfing offers a robust set of features designed for modern workplace management. The platform includes customizable floor plans with drag-and-drop setup, multi-device access (mobile, desktop, MS Teams, Atlassian Confluence), and advanced booking capabilities. The system supports enterprise-grade user management, reporting tools for space utilization analytics, and scalable architecture that grows from small teams to large organizations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Seatsurfing | `seatsurfing/backend` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PUBLIC_LISTEN_ADDR` | Seatsurfing | [::]:8080 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/seatsurfing)
