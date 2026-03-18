# Deploy Wiki.js (Open-Source Wiki & Documentation Platform) on Railway

Wiki.js [Mar ’26] (Create, Edit & Share Knowledge Bases) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wikijs)

## About

Wiki.js is a powerful, modern, and open-source wiki software built to help individuals, teams, and organizations create and manage knowledge bases effortlessly. It is designed with a beautiful interface, strong performance, and extensive customization options.

You can self-host Wiki.js on Railway to maintain full control over your knowledge base and data. Hosting Wiki.js on Railway provides all the flexibility of a self-managed platform with the simplicity of a managed deployment environment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wikijs | `requarks/wiki:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_TYPE` | wikijs | postgres |
| `DB_USER` | wikijs | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wikijs)
