# Deploy Teable (Open-Source Airtable Alternative) on Railway

Teable [Mar ’26] (Airtable & Baserow alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable)

## About

Teable is a modern, open-source Airtable alternative available on GitHub, designed to provide flexible and scalable database management with a spreadsheet-like interface. With Teable, users gain full control over their data and workflows, supported by an active developer community and extensive documentation on the official Teable docs.

You can self host Teable to manage all your projects, data, and team workflows entirely under your control, without depending on third-party platforms. By deploying Teable with Docker, you get the same ease of use as Airtable but with self-hosted flexibility. Hosting on Railway makes this process simple: it removes the complexities of infrastructure management and lets you scale instantly while keeping your Teable environment private and secure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| teable | `teableio/teable` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | teable | 3000 |
| `BRAND_NAME` | teable | Teable |
| `NEXT_ENV_IMAGES_ALL_REMOTE` | teable | true |
| `ENABLEALPINEPRIVATE_NETWORKING` | teable | true |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/teable)
