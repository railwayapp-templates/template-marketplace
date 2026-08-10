# Deploy Offen Fair Web Analytics on Railway

Privacy-friendly web analytics with PostgreSQL and generated operator login

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/offen-fair-analytics)

## About

Offen is a fair and privacy-friendly web analytics platform. It provides consent-aware event collection, a user-facing auditorium, and an operator console without depending on a hosted analytics vendor. This template pins Offen `v1.4.2`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.6-alpine` | Database |
| offen | [monotykamary/railway-template-offen](https://github.com/monotykamary/railway-template-offen) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | offen | Database created for Offen. |
| `POSTGRES_USER` | postgres | (secret) | Database user created for Offen. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Database password. Generated for every deployment. |
| `DATABASE_URL` | offen | - | Private PostgreSQL connection used by Offen. |
| `OFFEN_SECRET` | offen | (secret) | Base64 application secret. Generated for every deployment. |
| `OFFEN_ADMIN_EMAIL` | offen | - | Email address for the initial Offen operator. |
| `OFFEN_ACCOUNT_NAME` | offen | My Website | Display name for the initial analytics account. |
| `OFFEN_ADMIN_PASSWORD` | offen | (secret) | Password for the initial Offen operator. Generated for every deployment. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/offen-fair-analytics)
