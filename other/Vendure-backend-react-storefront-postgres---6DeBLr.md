# Deploy Vendure backend, react storefront, postgres on Railway

Backend, Admin dashboard and Webshop in one package

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/6DeBLr)

## About

This template deploys a Vendure 3.5.0 monorepo-backed e-commerce stack with a Remix storefront on Railway. It connects a Postgres database and a React-based storefront, providing a ready-to-run, end-to-end setup that minimizes manual configuration. Version 3.5.0 is integrated and production-ready for quick prototyping and development.

This boilerplate provides a complete Vendure backend, an admin dashboard, and a Remix storefront, all wired to a PostgreSQL database and Redis for caching. It includes preconfigured Stripe payments and a ready-to-run railway deployment flow. The setup is aimed at fast experimentation and learning, not a production-ready storefront out of the box. If you encounter issues, please report them on GitHub to help improve the template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vendure-backend | [rpuls/vendure-boilerplate](https://github.com/rpuls/vendure-boilerplate) (root: /vendure-backend) | Web service |
| vendure-storefront | [rpuls/vendure-boilerplate](https://github.com/rpuls/vendure-boilerplate) (root: /vendure-storefront) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_ENV` | vendure-backend | production | - |
| `DB_SCHEMA` | vendure-backend | public | - |
| `DB_PASSWORD` | vendure-backend | (secret) | - |
| `DB_USERNAME` | vendure-backend | (secret) | - |
| `COOKIE_SECRET` | vendure-backend | (secret) | - |
| `SUPERADMIN_PASSWORD` | vendure-backend | (secret) | - |
| `SUPERADMIN_USERNAME` | vendure-backend | (secret) | - |
| `TEMPLATE_REPORTER_URL` | vendure-backend | https://railway-template-reporter-production.up.railway.app | Used for analytics - detele to opt out |
| `RAILWAY` | vendure-storefront | 1 | - |
| `NODE_ENV` | vendure-storefront | production | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `PGPRIVATEPORT` | Postgres | 5432 | - |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/vendure-assets`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, Handlebars, JavaScript

[View on Railway →](https://railway.com/deploy/6DeBLr)
