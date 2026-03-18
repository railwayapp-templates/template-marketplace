# Deploy Evershop on Railway

🛍️ Typescript E-commerce Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evershop)

## About

Evershop is a modern, open-source TypeScript e-commerce platform built with Node.js, React, GraphQL, and PostgreSQL. Designed for developers, it delivers a modular, fully customizable architecture with essential commerce features including product management, streamlined checkout, payment gateway integrations (Stripe, PayPal, Cash on Delivery), and server-side rendering for optimal performance and SEO. With its extensible theme system and GraphQL API, Evershop enables building tailored shopping experiences without vendor lock-in.

Deploying Evershop on Railway is a truly one-click experience. Simply provide your store name, admin email, and password—Railway handles everything else automatically. The platform provisions a PostgreSQL database, configures all necessary environment variables for database connections and session management, builds the application, and deploys your fully functional online store with automatic SSL and custom domain support. No manual server configuration, dependency installation, or infrastructure management required. Your store goes live in minutes, complete with the admin panel accessible at `/admin` and built-in monitoring—eliminating the weeks typically spent on traditional e-commerce deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Evershop | `evershop/evershop:1.2.2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_USER` | Evershop | (secret) | - |
| `ADMIN_NAME` | Evershop | - | The default admin user will be created with this username |
| `ADMIN_EMAIL` | Evershop | - | The admin email |
| `DB_PASSWORD` | Evershop | (secret) | - |
| `ADMIN_PASSWORD` | Evershop | (secret) | The admin password |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/evershop)
