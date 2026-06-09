# Deploy documenso on Railway

The Open Source DocuSign Alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/DjrRRX)

## About

## Overview

Documenso aims to be the world's most trusted document-signing tool.  You can think of it as a self-hosted alternative to DocuSign.

## Highlights
- Deploy production-ready documenso instance with PostgreSQL for free.
- One-click deploys with the required PostgreSQL database automatically provisioned

## Learn More
- [Documenso](https://documenso.com)
- [Github](https://github.com/documenso/documenso)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| documenso-web | [documenso/documenso](https://github.com/documenso/documenso) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `NEXTAUTH_SECRET` | documenso-web | (secret) | Encrypts the session JWT (auto-generated) |
| `NEXT_PRIVATE_SMTP_HOST` | documenso-web | - | SMTP host |
| `NEXT_PRIVATE_SMTP_PORT` | documenso-web | - | SMTP port (587 or 465) |
| `NEXT_PUBLIC_WEBAPP_URL` | documenso-web | - | Public URL |
| `NEXT_PRIVATE_DATABASE_URL` | documenso-web | - | Database URL |
| `NEXT_PRIVATE_SMTP_PASSWORD` | documenso-web | (secret) | SMTP password |
| `NEXT_PRIVATE_SMTP_USERNAME` | documenso-web | (secret) | SMTP username |
| `NEXT_PRIVATE_ENCRYPTION_KEY` | documenso-web | - | Auto-generated 32-char secret |
| `NEXT_PRIVATE_SMTP_FROM_NAME` | documenso-web | Documenso | Sender display name |
| `NEXT_PRIVATE_SMTP_FROM_ADDRESS` | documenso-web | - | Sender email address |
| `NEXT_PRIVATE_DIRECT_DATABASE_URL` | documenso-web | - | Direct Database URL |
| `NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY` | documenso-web | - | Auto-generated 32-char secret |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, MDX, JavaScript, Shell, CSS, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/DjrRRX)
