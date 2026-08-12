# Deploy S4N Donate System on Railway

S4N Donate manages sponsorships and payments with PostgreSQL and gateways.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/s4n-donate-system)

## About

S4N Donate System is a donation and sponsorship management application with an administrative dashboard and payment integrations. It uses PostgreSQL to persist application and sponsorship data and supports ECPay and O'Pay payment providers. The application also provides JWT-based authentication and configurable administrator credentials for dashboard access.

Hosting S4N Donate System on Railway involves running the application and PostgreSQL database as separate Railway services. The application uses the `lokisalmonneko/s4n-donate-system:latest` Docker image and listens on port `3000`. PostgreSQL runs from the `postgres:15-alpine` image and uses persistent storage mounted at `/var/lib/postgresql/data` to retain sponsorship records and application data. The application connects to PostgreSQL through the `DATABASE_URL` Railway reference variable. Railway provides the public HTTPS domain used by the application through `RAILWAY_PUBLIC_DOMAIN`, while the database can remain private and accessible through Railway's internal networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| s4n-donate-system | `lokisalmonneko/s4n-donate-system:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `HOST` | s4n-donate-system | 0.0.0.0 | - |
| `PORT` | s4n-donate-system | 3000 | - |
| `JWT_SECRET` | s4n-donate-system | (secret) | - |
| `ECPAY_HASH_IV` | s4n-donate-system | } | - |
| `ADMIN_PASSWORD` | s4n-donate-system | (secret) | - |
| `ADMIN_USERNAME` | s4n-donate-system | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/s4n-donate-system)
