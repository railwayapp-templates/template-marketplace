# Deploy peppermint on Railway

Docker-compose port for peppermint.sh

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZIVdC1)

## About

Introducing Peppermint, a fully open-source helpdesk solution designed to enhance the user experience for teams currently utilizing costly software alternatives. Our goal is to develop intuitive software that encompasses all the feature-rich components in premium solutions yet remains user-friendly.

Welcome to the documentation for Peppermint.sh, an open-source ticket management platform that empowers you to manage your data effectively and deliver top-tier client support. Explore this documentation to understand how to leverage Peppermint.sh efficiently and develop extensions for its functionality.

This comprehensive guide covers initial setup, practical usage, and advanced development techniques, equipping you to maximize Peppermint's potential.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| peppermint | `pepperlabs/peppermint:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `SECRET` | peppermint | (secret) | - |
| `API_URL` | peppermint | http://server-ip:5003 | - |
| `DB_HOST` | peppermint | peppermint_postgres | - |
| `DB_PASSWORD` | peppermint | (secret) | - |
| `DB_USERNAME` | peppermint | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ZIVdC1)
