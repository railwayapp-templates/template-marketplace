# Deploy NocoBase | Open-Source No-Code Platform, Airtable Alternative on Railway

Self Host Nocobase. Build custom CRMs, ERPs, & internal tools for business

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocobase)

## About

Deploy NocoBase on Railway to get a production-ready no-code/low-code platform for building custom business applications. Self-host NocoBase with full control over your data, plugins, and workflows — no vendor lock-in, no recurring SaaS fees.

This Railway template pre-configures NocoBase with a PostgreSQL database, persistent storage for uploads and plugins, and a public domain with HTTPS. The deployment includes the `latest-full` image with database clients and LibreOffice for PDF template printing.

NocoBase is an open-source no-code/low-code platform built on a plugin-based microkernel architecture. Unlike spreadsheet-style tools, NocoBase separates data models from UI presentation — enabling complex, multi-page business applications with different views, forms, and dashboards for the same underlying data.

- **Data model-driven architecture** — define collections and relationships first, then build unlimited UI blocks on top
- **Plugin ecosystem** — 100+ official plugins for workflows, charts, authentication, API integrations, file storage, and more
- **WYSIWYG page builder** — drag-and-drop blocks including tables, forms, Kanban boards, calendars, Gantt charts, and maps
- **Role-based access control** — granular permissions at field, collection, and action levels
- **Workflow automation** — trigger-based workflows with conditions, loops, parallel branches, and approval chains
- **AI employee integration** — built-in AI assistant for data querying and task automation
- **REST API and webhooks** — programmatic access to all data and events

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| NocoBase | `nocobase/nocobase:latest-full` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `TZ` | NocoBase | Etc/UTC | Container timezone |
| `PORT` | NocoBase | 13000 | Gateway HTTP server port |
| `APP_ENV` | NocoBase | production | Application environment mode |
| `APP_KEY` | NocoBase | - | Token encryption key |
| `DB_HOST` | NocoBase | - | PostgreSQL hostname |
| `DB_PORT` | NocoBase | 5432 | PostgreSQL port |
| `DB_USER` | NocoBase | (secret) | Database username |
| `INIT_LANG` | NocoBase | en-US | Initial UI language |
| `DB_DIALECT` | NocoBase | postgres | Database engine type |
| `DB_DATABASE` | NocoBase | - | Database name |
| `DB_PASSWORD` | NocoBase | (secret) | Database password |
| `INIT_ROOT_EMAIL` | NocoBase | - | Create Admin email (first boot) |
| `INIT_ROOT_NICKNAME` | NocoBase | Super Admin | Admin display name |
| `INIT_ROOT_PASSWORD` | NocoBase | (secret) | Create Admin password (first boot) |
| `INIT_ROOT_USERNAME` | NocoBase | (secret) | Create Admin username |
| `ENCRYPTION_FIELD_KEY` | NocoBase | - | Field-level encryption key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'rm -f /etc/nginx/conf.d/default.conf && /app/docker-entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/nocobase/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/nocobase)
