# Deploy Flowise + Postgres on Railway

Flowise with Postgres, persistent storage, and private networking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-postgres)

## About

# Flowise + Postgres Railway Template

This folder tracks a production-minded Flowise template for Railway.

## Stack

- Flowise via the official Docker image
- PostgreSQL on a private Railway service
- Persistent volume for Flowise local storage and credential key material
- Persistent volume for Postgres data
- Railway public domain for the Flowise UI

## Why This Template Should Convert

- Flowise already has strong Railway marketplace demand, but the existing popular template has poor recent deploy success.
- The app is sticky: users store chatflows, credentials, documents, and agent workflows.
- Postgres plus persistent storage makes it safer than the simple SQLite starter pattern.
- The deploy surface is still small: one app service, one database, no custom source needed.

## Runtime Shape

- `flowise`
  - Image: `flowiseai/flowise:latest`
  - Public domain on port `3000`
  - Volume mounted at `/root/.flowise`
- `postgres`
  - Image: `postgres:16-alpine`
  - Private only
  - Volume mounted at `/var/lib/postgresql/data`

## Key Variables

Flowise:

- `PORT=3000`
- `APP_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}`
- `DATABASE_TYPE=postgres`
- `DATABASE_HOST=postgres.railway.internal`
- `DATABASE_PORT=5432`
- `DATABASE_NAME=flowise`
- `DATABASE_USER=flowise`
- `DATABASE_PASSWORD=`
- `DATABASE_SSL=false`
- `STORAGE_TYPE=local`
- `BLOB_STORAGE_PATH=/root/.flowise/storage`
- `SECRETKEY_STORAGE_TYPE=local`
- `SECRETKEY_PATH=/root/.flowise`
- `FLOWISE_SECRETKEY_OVERWRITE=`
- `FLOWISE_USERNAME=`
- `FLOWISE_PASSWORD=`
- `JWT_AUTH_TOKEN_SECRET=`
- `JWT_REFRESH_TOKEN_SECRET=`
- `EXPRESS_SESSION_SECRET=`

Postgres:

- `POSTGRES_DB=flowise`
- `POSTGRES_USER=flowise`
- `POSTGRES_PASSWORD=`
- `PGDATA=/var/lib/postgresql/data/pgdata`

## Notes

- Keep Flowise as a single app instance unless the template is later reworked for shared object storage and queue mode.
- The first deployer should change the generated Flowise username/password after deployment.
- Model provider API keys are intentionally not bundled. Users should add them inside Flowise or as Railway variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:16-alpine` | Database |
| flowise | `flowiseai/flowise:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `DATABASE_USER` | flowise | (secret) |
| `FLOWISE_PASSWORD` | flowise | (secret) |
| `FLOWISE_USERNAME` | flowise | (secret) |
| `DATABASE_PASSWORD` | flowise | (secret) |
| `JWT_AUTH_TOKEN_SECRET` | flowise | (secret) |
| `EXPRESS_SESSION_SECRET` | flowise | (secret) |
| `JWT_REFRESH_TOKEN_SECRET` | flowise | (secret) |
| `FLOWISE_SECRETKEY_OVERWRITE` | flowise | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-postgres)
