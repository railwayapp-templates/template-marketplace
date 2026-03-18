# Deploy Cusdis on Railway

Lightweight, privacy-friendly alternative to Disqus

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Vpmder)

## About

## Overview

Cusdis is an open-source, lightweight (~5kb gzip), privacy-friendly alternative to Disqus. This template allows you to host Cusdis on Railway with minimal fuss.

## Highlights

- Lightweight comment widget, with i18n, dark mode
- Email notifications
- Webhooks
- Universal embed code
- One-click import data from Disqus
- Moderation dashboard
- Integrations

## Learn More

- [GitHub](https://github.com/djyde/cusdis)
- [Documentation](https://cusdis.com/doc#/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| cusdis | [djyde/cusdis](https://github.com/djyde/cusdis) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | cusdis | 3000 | - |
| `DB_TYPE` | cusdis | pgsql | - |
| `PASSWORD` | cusdis | (secret) | Login password. |
| `USERNAME` | cusdis | (secret) | Login username. |
| `JWT_SECRET` | cusdis | (secret) | A secret key to encrypt JWT tokens. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** TypeScript, JavaScript, Svelte, HTML, Dockerfile, CSS

[View on Railway →](https://railway.com/template/Vpmder)
