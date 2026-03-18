# Deploy all-star-fashion-template on Railway

Deploy and Host all-star-fashion-template with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/all-star-fashion-template)

## About

**all-star-fashion-template** is a modern fashion website template built with Deno and the Fresh framework. It provides a fast, server-side rendered web application structure for fashion brands, online boutiques, or style portfolios, featuring responsive UI components and scalable architecture for modern web development.

Hosting all-star-fashion-template involves deploying a full-stack web application powered by Deno and the Fresh framework. Fresh is a modern framework designed for high-performance server-side rendering with islands of interactivity, allowing developers to ship minimal JavaScript while still supporting dynamic UI components.

When deployed on Railway, the application runs using the Deno runtime and serves pages through Fresh’s file-based routing system. The project structure typically includes routes, reusable components, islands for client-side interactivity, and static assets such as images and styles. Railway manages the runtime environment, deployment pipeline, and scaling, making it easy to run a Fresh application in production without complex infrastructure configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| all-star-fashion | [maithanhduyan/all-star-fashion](https://github.com/maithanhduyan/all-star-fashion) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ADMIN_EMAIL` | all-star-fashion | admin@allstarfashion.vn | - |
| `DATABASE_NAME` | all-star-fashion | railway | - |
| `DATABASE_USER` | all-star-fashion | (secret) | - |
| `ADMIN_PASSWORD` | all-star-fashion | (secret) | - |
| `DATABASE_PASSWORD` | all-star-fashion | (secret) | - |
| `DEFAULT_SHIPPING_FEE` | all-star-fashion | 30000 | - |
| `FREE_SHIPPING_THRESHOLD` | all-star-fashion | 1000000 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, Shell, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/all-star-fashion-template)
