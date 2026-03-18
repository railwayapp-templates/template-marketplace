# Deploy EverShop on Railway

Deploy and Host EverShop with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evershop-1)

## About

EverShop is an open-source e-commerce platform built with React, GraphQL, and Node.js. It provides a modern storefront, powerful admin panel, and flexible GraphQL API — all deployable with one click on Railway.

This template deploys a production-ready e-commerce stack:

- **EverShop**: Full-featured e-commerce platform with React SSR storefront, admin dashboard, and GraphQL API
- **PostgreSQL**: Primary database for products, orders, customers, and all application data
- **Persistent Storage**: Railway volume for product images and uploaded files
- **Auto-Setup**: Initial admin user and optional demo data created automatically on first deploy
- **Email Support**: Optional SendGrid or Resend integration for order confirmations, welcome emails, and password resets

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| EverShop | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: /solutions/evershop/evershop) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_USER` | EverShop | (secret) | - |
| `ADMIN_NAME` | EverShop | Admin | - |
| `DB_PASSWORD` | EverShop | (secret) | - |
| `ADMIN_PASSWORD` | EverShop | (secret) | - |
| `SEED_DEMO_DATA` | EverShop | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/evershop-1)
