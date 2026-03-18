# Deploy Medusa Store template (Admin, Backend, Database, Storefront) on Railway

Vite + React + PostgreSQL + Next JS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-store-template-admin-backend-data)

## About

Medusa Store template offers a fully modular e-commerce foundation: an admin dashboard for product and order management, a backend exposing powerful APIs, a flexible database, and a customizable storefront. Built headless for flexibility, it lets developers adapt frontend and backend independently, perfect for modern online stores.

Hosting and deploying the Medusa Store template involves launching its backend API, admin dashboard, storefront frontend, and supporting services (Postgres, Redis) on a platform like Railway. The template is preconfigured for seamless deployment, including automated admin setup, API key management, health checks, and bundled plugins (Stripe, email). Railway manages cloud hosting and infrastructure, so configuring environment variables, databases, and services is straightforward. With a single click, both admin and store are synced to the backend, minimizing manual setup and enabling rapid, production-ready e-commerce deployment for teams or side projects.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| medusa-admin | [md-alexkumar/medusa-admin](https://github.com/md-alexkumar/medusa-admin) | Web service |
| medusa-backend | [md-alexkumar/medusa-backend](https://github.com/md-alexkumar/medusa-backend) | Web service |
| medusa-storefront | [md-alexkumar/medusa-storefront](https://github.com/md-alexkumar/medusa-storefront) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDIS_URL` | medusa-backend | redis://localhost:6379 | - |
| `JWT_SECRET` | medusa-backend | (secret) | - |
| `COOKIE_SECRET` | medusa-backend | (secret) | - |
| `MEDUSA_ADMIN_EMAIL` | medusa-backend | admin@medusa.com | - |
| `MEDUSA_ADMIN_PASSWORD` | medusa-backend | (secret) | - |
| `REVALIDATE_SECRET` | medusa-storefront | (secret) | - |
| `NEXT_PUBLIC_DEFAULT_REGION` | medusa-storefront | us | Default value |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | medusa-storefront | pk_test | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/medusa-store-template-admin-backend-data)
