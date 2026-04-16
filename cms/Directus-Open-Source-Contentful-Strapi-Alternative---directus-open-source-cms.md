# Deploy Directus | Open-Source Contentful & Strapi Alternative on Railway

Self Host Directus. Headless CMS, DAM, and automation engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/directus-open-source-cms)

## About

Deploy Directus on Railway to get a fully managed headless CMS with a visual data studio, REST and GraphQL APIs, and granular role-based access control. Self-host Directus on Railway with a pre-configured PostgreSQL database and persistent file storage — no Docker knowledge required.

This template deploys two services: the Directus application server (`directus/directus:latest`) and a PostgreSQL 18 database with SSL. File uploads are persisted to a Railway volume mounted at `/directus/uploads`.

![Directus Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776268577/directus-railway-arch_ivgqo8.png)

Directus is an open-source data platform that wraps any SQL database with a real-time API and an intuitive no-code app. Unlike traditional CMS platforms, Directus doesn't impose a content model — it mirrors your database schema directly, giving you full control over your data architecture.

Key features:

- **REST + GraphQL APIs** auto-generated from your database schema
- **Data Studio** — drag-and-drop interface for managing content, files, and users
- **Flows** — visual automation engine with triggers, conditions, and operations
- **Granular permissions** — field-level access control with configurable roles
- **File storage** — built-in DAM with image transformations and metadata
- **Extensions** — custom modules, interfaces, displays, hooks, and endpoints via TypeScript/JavaScript

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Directus | `directus/directus:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Directus | 8055 | HTTP server listening port |
| `SECRET` | Directus | (secret) | Application secret key for security |
| `DB_HOST` | Directus | - | Postgres internal hostname |
| `DB_PORT` | Directus | - | Postgres service port |
| `DB_USER` | Directus | (secret) | Postgres username reference |
| `DB_CLIENT` | Directus | pg | Database client type postgres |
| `PUBLIC_URL` | Directus | https://directus-production-fb01.up.railway.app | Public base URL for instance |
| `ADMIN_EMAIL` | Directus | - | Admin email for initial login |
| `DB_DATABASE` | Directus | - | Postgres database name reference |
| `DB_PASSWORD` | Directus | (secret) | Postgres password reference |
| `ADMIN_PASSWORD` | Directus | (secret) | Admin password for dashboard access |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/directus/uploads`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/directus-open-source-cms)
