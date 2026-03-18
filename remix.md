# Deploy Remix Indie Stack on Railway

An example Remix paired with a PostgresSQL Database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/remix)

## About

## Overview

Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, slick, and resilient user experience. 

## Highlights

- Deploy Remix’s “Indie Stack” app with a Postgres Database
- Get a working app with Prisma, Tailwind, and Cypress tests

## Learn More

View the indie stack app at [https://github.com/remix-run/indie-stack](https://github.com/remix-run/indie-stack)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Frontend | [railwayapp-starters/indie-stack](https://github.com/railwayapp-starters/indie-stack) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SESSION_SECRET` | Frontend | (secret) | A random string used to generate secrets. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/template/remix)
