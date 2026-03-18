# Deploy Next.js on Railway

A minimal NextJS application with Prisma ORM and PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nextjs)

## About

Next.js is a React-based web framework that enables developers to build fast, production-ready applications with features such as server-side rendering, static site generation, API routes, and optimized performance out of the box. It is commonly used for modern web applications that require both frontend and backend capabilities in a single framework.

Hosting Next.js involves building the application, serving pre-rendered pages, and optionally running server-side logic such as API routes or middleware. Depending on the configuration, Next.js can run as a static site or as a full server-rendered application. A proper hosting setup must handle environment variables, build-time compilation, runtime execution, and scalability. Railway simplifies this by handling the build and runtime separation automatically, allowing developers to focus on application logic instead of infrastructure setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Next.js x Prisma | [codestorm-official/nextjs-prisma](https://github.com/codestorm-official/nextjs-prisma) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS

[View on Railway →](https://railway.com/template/nextjs)
