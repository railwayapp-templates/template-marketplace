# Deploy WHM Scrapper on Railway

Deploy and host a full WHM Scrapper stack with PostgreSQL on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/whm-scrapper)

## About

WHM Scrapper is a full-stack web app for collecting, managing, and serving WHM-related data through a backend API, frontend UI, and PostgreSQL database. This Railway template provisions the complete stack so you can deploy it quickly with minimal manual setup.

Hosting WHM Scrapper on Railway creates a production-ready environment with separate frontend, backend, and PostgreSQL services. Railway handles deployment, private networking, environment variables, and service-to-service communication, which makes it easier to run the project without manually configuring infrastructure. After deployment, you only need to provide the required application variables, confirm database settings, and connect your repository updates if needed. This template is designed to help you launch the application faster and keep the stack organized in one place.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Frontend | [MohamedAymanGalal/whm-domain-inventory](https://github.com/MohamedAymanGalal/whm-domain-inventory) (root: /whm-inventory-standalone/web) | Web service |
| Backend | [MohamedAymanGalal/whm-domain-inventory](https://github.com/MohamedAymanGalal/whm-domain-inventory) (root: /whm-inventory-standalone/api) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | - | app |
| `POSTGRES_USER` | (secret) | postgres |
| `POSTGRES_PASSWORD` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** PHP

[View on Railway →](https://railway.com/template/whm-scrapper)
