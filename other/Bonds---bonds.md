# Deploy Bonds on Railway

Deploy Bonds with PostgreSQL, generated secrets, and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bonds)

## About

Deploy Bonds with PostgreSQL and persistent application storage.

This template runs Bonds behind Railway HTTPS and connects it to PostgreSQL over the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Bonds | [jonahsnider/bonds-railway](https://github.com/jonahsnider/bonds-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `JWT_SECRET` | Bonds | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/bonds)
