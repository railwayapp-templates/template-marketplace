# Deploy NextJS Prisma on Railway

An example NextJS app using Prisma

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/HRZqTF)

## About

## Overview

Deploy a [NextJS](https://nextjs.org/) todo app that uses [Prisma](https://www.prisma.io/) to store todos in a PostgreSQL database.

## Highlights

- Prisma
- NextJS
- Postgres
- TypeScript

## Learn More

View the official [NextJS](https://nextjs.org/) and [Prisma](https://www.prisma.io/) websites.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| nextjs | [railwayapp-templates/nextjs-prisma](https://github.com/railwayapp-templates/nextjs-prisma) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | - | Railway Private Domain |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | - | URL to connect to Postgres database |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Tags:** typescript, frontend, web · **Languages:** TypeScript, CSS

[View on Railway →](https://railway.com/template/HRZqTF)
