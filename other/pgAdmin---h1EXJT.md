# Deploy pgAdmin on Railway

The most popular admin web interface for PostgreSQL databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/h1EXJT)

## About

### Overview
This template deploys [pgAdmin](https://www.pgadmin.org), the most popular open-source administration and development platform for PostgreSQL databases.

See [this page](https://www.pgadmin.org/features) for the complete feature set, and [this page](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html#environment-variables) for additional environment variables that can be configured during/after deployment to enhance pgAdmin capabilities.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgadmin | `dpage/pgadmin4` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5050 | - |
| `PGADMIN_LISTEN_PORT` | 5050 | Port that the server listens on |
| `PGADMIN_DEFAULT_EMAIL` | - | Email address used when setting up the initial administrator account to login to pgAdmin. |
| `PGADMIN_LISTEN_ADDRESS` | 0.0.0.0 | Local address that the servers listens on |
| `PGADMIN_DISABLE_POSTFIX` | True | Whether to use built-in Postfix server or an external mail server. |
| `PGADMIN_DEFAULT_PASSWORD` | (secret) | Password used when setting up the initial administrator account to login to pgAdmin. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/h1EXJT)
