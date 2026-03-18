# Deploy Keystone on Railway

The superpowered CMS for developers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/h6W0gR)

## About

# Keystone Project Starter

Keystone helps you build faster and scale further than any other CMS or App Framework. Describe your schema, and you get a powerful GraphQL API & beautiful Management UI for content and data.

No boilerplate or bootstrapping – only elegant APIs to help you ship the code that matters, without sacrificing the flexibility or power of a bespoke back-end.

Features include:
- Built-in authentication system
- GraphQL API
- PostgreSQL database support
- Admin UI for content management
- Customizable data schema
- Ready for any frontend (Next.js, React, etc.)

Perfect for blogs, e-commerce, or any content-driven application. Fork the github repo in template to customize the schema, add your own models, or modify the authentication system to match your needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Keystone.js | [kadumedim/keystone.js-template](https://github.com/kadumedim/keystone.js-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DATABASE_URL` | Keystone.js | - | Postgres db url |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/h6W0gR)
