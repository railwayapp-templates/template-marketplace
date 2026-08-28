# Deploy Strapi 5 on Railway

A popular self-hosted "headless" CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/e10OW1)

## About

Strapi 5 is the leading open-source headless CMS. It gives you a customizable admin panel and auto-generated REST and GraphQL APIs, so you can model content once and deliver it to any frontend — websites, mobile apps, or anything else that speaks HTTP.

This template deploys the latest Strapi 5 (TypeScript) together with a PostgreSQL database, pre-wired and ready to use. All required secrets (`APP_KEYS`, `JWT_SECRET`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`) are generated automatically at deploy time. Strapi connects to Postgres over Railway's [private network](https://docs.railway.com/reference/private-networking), so no database traffic touches the public internet and you save on [egress fees](https://docs.railway.com/reference/pricing). The deployment is health-checked against Strapi's built-in `/_health` endpoint, so a release only goes live once the app is actually up. After the first deploy, open `/admin` on your service domain to create your admin user and start modeling content.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| railway.app-strapi | [szilardkoppel/railway.app-strapi](https://github.com/szilardkoppel/railway.app-strapi) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | railway.app-strapi | :: | - |
| `BROWSER` | railway.app-strapi | false | - |
| `JWT_SECRET` | railway.app-strapi | (secret) | - |
| `API_TOKEN_SALT` | railway.app-strapi | (secret) | - |
| `DATABASE_CLIENT` | railway.app-strapi | postgres | - |
| `ADMIN_JWT_SECRET` | railway.app-strapi | (secret) | - |
| `CLOUDINARY_SECRET` | railway.app-strapi | (secret) | - |
| `TRANSFER_TOKEN_SALT` | railway.app-strapi | (secret) | - |
| `STRAPI_TELEMETRY_DISABLED` | railway.app-strapi | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/e10OW1)
