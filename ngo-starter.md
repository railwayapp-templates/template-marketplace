# Deploy NGO Starter on Railway

A small Next + Payload starter for NGOs and agencies.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ngo-starter)

## About

NGO Starter is a modern, full-stack template designed for non-profit organizations. Based on the official Payload template, it provides a ready-to-use website with CMS, blog, news, projects, and user management, built with Next.js, Payload CMS, and Tailwind CSS. Easily customizable and scalable for any NGO or community project.

Hosting NGO Starter involves deploying both the frontend (built with Next.js) and the backend (powered by Payload CMS) on a platform that supports Node.js environments. You'll set up a Postgres database, deploy the code from GitHub, and configure environment variables

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NGOStarter | [roicort/NGOStarter](https://github.com/roicort/NGOStarter) | Web service |
| Postgres | `postgis/postgis:17-3.5-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CRON_SECRET` | NGOStarter | (secret) | - |
| `PAYLOAD_SECRET` | NGOStarter | (secret) | - |
| `PREVIEW_SECRET` | NGOStarter | (secret) | - |
| `DISABLE_MIGRATIONS` | NGOStarter | False | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/public/media`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** TypeScript, JavaScript, Dockerfile, CSS, SCSS, Shell

[View on Railway →](https://railway.com/template/ngo-starter)
