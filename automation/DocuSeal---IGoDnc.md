# Deploy DocuSeal on Railway

Open-source digital document signing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/IGoDnc)

## About

DocuSeal is an open-source, self-hosted platform for seamless digital document signing. Easily integrate, customize, and deploy with Railway for a hassle-free e-signature experience. Ideal for developers and enterprises seeking a reliable, customizable e-signature solution that integrates seamlessly with existing workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| docuseal-railway | [docusealco/docuseal-railway](https://github.com/docusealco/docuseal-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | docuseal-railway | - | Postgres database URL |
| `SECRET_KEY_BASE` | docuseal-railway | (secret) | App Secret |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/IGoDnc)
