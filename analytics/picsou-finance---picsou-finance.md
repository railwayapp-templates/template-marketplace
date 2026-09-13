# Deploy picsou-finance on Railway

Personal finance dashboard Track bank accounts, brokerage, crypto

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/picsou-finance)

## About

Picsou is a self-hosted personal-finance dashboard for individuals and families. It aggregates bank, brokerage, crypto, property, debt, and net-worth data in one private interface, with goals, sharing, imports, live prices, optional bank synchronization, and two-factor authentication. A guided setup wizard creates the first administrator and configures security.

Railway runs the published Picsou container image alongside managed PostgreSQL. The all-in-one image serves the React interface through Nginx and proxies API requests to Spring Boot, while Railway provides HTTPS, deployment automation, and persistent database storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| picsou-app | `ghcr.io/zoeille/picsou-finance:1.0.17` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | picsou-app | 8080 |
| `JWT_SECRET` | picsou-app | (secret) |
| `TR_AUTH_URL` | picsou-app | http://127.0.0.1:8001 |
| `APP_USERNAME` | picsou-app | (secret) |
| `HSTS_ENABLED` | picsou-app | false |
| `AMUNDI_AUTH_URL` | picsou-app | http://127.0.0.1:8001 |
| `BOURSO_AUTH_URL` | picsou-app | http://127.0.0.1:8001 |
| `APP_PASSWORD_HASH` | picsou-app | (secret) |
| `BOURSE_DIRECT_AUTH_URL` | picsou-app | http://127.0.0.1:8001 |
| `SPRING_PROFILES_ACTIVE` | picsou-app | prod |
| `SPRING_DATASOURCE_PASSWORD` | picsou-app | (secret) |
| `SPRING_DATASOURCE_USERNAME` | picsou-app | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/picsou-finance)
