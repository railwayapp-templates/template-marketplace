# Deploy Strapi on Railway

Headless CMS for modern apps, deployed instantly on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strapi-1)

## About

This template combines **Strapi** with **PostgreSQL** for a complete headless CMS solution. Strapi provides a customizable admin panel for content management, while PostgreSQL offers reliable and scalable data storage — both optimized for deployment on Railway.

![Strapi Preview](https://pickcms.com/wp-content/uploads/2024/09/strapi-cms.jpg)

Railway makes hosting Strapi effortless by bundling it with a PostgreSQL database and all required configurations. With private networking enabled by default, Strapi connects securely to Postgres without incurring extra egress costs. Deployment takes only a few minutes, and your CMS will be ready to integrate with any frontend framework, from React and Next.js to mobile apps. With minimal setup, you can scale both your app and database as your project grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| strapi | [railwayapp-templates/strapi](https://github.com/railwayapp-templates/strapi) | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | strapi | :: | - |
| `BROWSER` | strapi | false | Secrets |
| `JWT_SECRET` | strapi | (secret) | - |
| `API_TOKEN_SALT` | strapi | (secret) | - |
| `ADMIN_JWT_SECRET` | strapi | (secret) | - |
| `DATABASE_PUBLIC_URL` | strapi | - | Strapi Settings |
| `TRANSFER_TOKEN_SALT` | strapi | (secret) | Database |
| `STRAPI_TELEMETRY_DISABLED` | strapi | true | - |
| `STRAPI_DISABLE_UPDATE_NOTIFICATION` | strapi | true | - |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/strapi-1)
