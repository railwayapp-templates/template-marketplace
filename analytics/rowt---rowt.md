# Deploy rowt on Railway

Self hosted and developer friendly mobile linking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rowt)

## About

Drop-in Infrastructure for Analytics and Deeplinking

This template hosts rowt server created using [create-rowt-server](https://github.com/Rowt-Deeplinks/create-rowt-server)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rowt | [DaniAkash/rowt](https://github.com/DaniAkash/rowt) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rowt | 3000 | - |
| `ROWT_DB_SSL` | rowt | true | - |
| `ROWT_DB_TYPE` | rowt | postgres | Database type |
| `ROWT_ADMIN_UUID` | rowt | - | Single Tenant Admin UUID (single-tenant mode only) |
| `ROWT_JWT_SECRET` | rowt | (secret) | JWT Secret to sign tokens |
| `ROWT_ADMIN_EMAIL` | rowt | - | Single Tenant Admin Email (single-tenant mode only) |
| `ROWT_TENANT_MODE` | rowt | - | Rowt Server Configuration: `single-tenant` or `multi-tenant` |
| `ROWT_DATABASE_URL` | rowt | - | Postgres DB URL |
| `ROWT_ADMIN_PASSWORD` | rowt | (secret) | Single Tenant Admin Password (single-tenant mode only) |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** TypeScript, HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/rowt)
