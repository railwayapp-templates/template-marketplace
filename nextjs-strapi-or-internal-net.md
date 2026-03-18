# Deploy Next.js - Strapi | Internal Network on Railway

This template for connect next.js and strapi with internal network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nextjs-strapi-or-internal-net)

## About

This template deploys a full-stack web application connecting **Next.js v16** and **Strapi v5** via Railway's secure **Private Networking**. It is optimized for high performance and reduced bandwidth costs by routing server-to-server traffic internally, bypassing the public internet.

Hosting this stack on Railway provides a production-ready environment where your frontend (Next.js) and backend (Strapi + PostgreSQL) live in the same private network.

The key advantage of this template is its configuration: **It utilizes Railway's internal DNS**. Instead of fetching data via a public URL (e.g., `https://api.site.com`), the Next.js server communicates with Strapi via the private internal address (e.g., `http://strapi.railway.internal:1337`). This architecture offers three major benefits:
1.  **Zero Latency:** Communication happens within the same data center network.
2.  **Cost Efficiency:** Internal traffic does not count towards public egress limits.
3.  **Enhanced Security:** Backend API endpoints stay protected within the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| strapi | [compbyter/strapi-private-network](https://github.com/compbyter/strapi-private-network) | TCP service |
| frontend | [compbyter/next-private-network](https://github.com/compbyter/next-private-network) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | strapi | :: | - |
| `PORT` | strapi | 1337 | - |
| `NODE_ENV` | strapi | production | - |
| `JWT_SECRET` | strapi | (secret) | - |
| `API_TOKEN_SALT` | strapi | (secret) | - |
| `DATABASE_CLIENT` | strapi | postgres | - |
| `ADMIN_JWT_SECRET` | strapi | (secret) | - |
| `TRANSFER_TOKEN_SALT` | strapi | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1337

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/template/nextjs-strapi-or-internal-net)
