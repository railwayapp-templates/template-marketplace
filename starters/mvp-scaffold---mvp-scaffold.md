# Deploy mvp-scaffold on Railway

A one-click template for web-app scaffold

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mvp-scaffold)

## About

This is a one-click template to spin up a frontend, backend (api), a database, and a database GUI all connected to each other and ready to go!

* The official source code for this repo is a public github template from Larza Intelligence, Inc. The recommended way to deploy this project is to create your own repo from our template and set it as the github target in your own new Railway Project deployed from this template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| drizzle-team/gateway:latest | `ghcr.io/drizzle-team/gateway:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| backend | [Larza-Intelligence-Inc/mvp-scaffold](https://github.com/Larza-Intelligence-Inc/mvp-scaffold) (root: /backend) | Web service |
| frontend | [Larza-Intelligence-Inc/mvp-scaffold](https://github.com/Larza-Intelligence-Inc/mvp-scaffold) (root: /frontend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MASTERPASS` | drizzle-team/gateway:latest | 9yy3xwhxj34tozui10b8k7hlc6nubrvj | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | backend | 3001 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/mvp-scaffold)
