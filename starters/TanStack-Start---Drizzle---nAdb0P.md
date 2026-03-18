# Deploy TanStack Start - Drizzle on Railway

A simple TanStack Start template with Drizzle to help you ship faster

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nAdb0P)

## About

A simple TanStack Start template with TanStack Query and Drizzle preconfigured. Start building instantly with a simple foundation and customize to your needs.

### Highlights
- TanStack Start
- TanStack Query
- Drizzle
- Postgres

 **Note: _If opting to use API Routes, you must fetch through a server function to gain the full benefits of private networking_**

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nAdb0P?referralCode=EmK2DS)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| tanstack-start-query-drizzle-tem | [alex-delia/tanstack-start-query-drizzle-template](https://github.com/alex-delia/tanstack-start-query-drizzle-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `HOST` | tanstack-start-query-drizzle-tem | :: |
| `PORT` | tanstack-start-query-drizzle-tem | 8080 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node .output/server/index.mjs`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/nAdb0P)
