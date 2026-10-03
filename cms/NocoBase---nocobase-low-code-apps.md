# Deploy NocoBase on Railway

Host NocoBase [Oct'26] — build CRMs and internal tools on Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocobase-low-code-apps)

## About

NocoBase is an open-source no-code platform for building internal business applications — a self-hosted alternative to Retool, Budibase and Appsmith. Model your data as collections, assemble pages from blocks, wire up workflows and roles, extend anything through plugins. This template runs it with managed Postgres, a volume that keeps your installed plugins, and the two secrets and one timezone setting that are permanent in practice.

NocoBase is forgiving to run and unforgiving about three decisions made at deploy time. All three are cheap to get right now and expensive to change later.

**The default root account exists before you ever log in.** NocoBase ships a documented default administrator, and `INIT_ROOT_EMAIL` and `INIT_ROOT_PASSWORD` take effect on first boot only — once that user row is in Postgres, changing the variables does nothing. Deploy with the defaults and your public URL is protected by credentials published in the docs. Set your own before the first deploy.

**Two encryption secrets, and only one is recoverable.** `APP_KEY` signs sessions, so rotating it logs everyone out and they sign back in. `ENCRYPTION_FIELD_KEY` encrypts the contents of encrypted fields, and rotating or losing it makes that data unreadable in a way no database backup alone can fix. Treat it like a private key and store a copy wherever you keep your dumps.

**Installed plugins live on the volume, not in the image.** NocoBase's whole model is extension, and plugins added through the UI are written to `/app/nocobase/storage` rather than baked into the container. Without a volume, every redeploy returns a stock install with a database full of collections referencing plugins that are no longer there — which fails more confusingly than simply losing data.

**Every enabled plugin loads into one Node process.** Memory binds before CPU. A handful of plugins and a couple of editors is comfortable around 4 GB and cramped at 1 GB — and enabling plugins is exactly what users do without weighing the resource cost.

**`TZ` is set once in practice.** The container timezone governs how date fields are written. Change it after people have entered data and existing values are reinterpreted rather than converted, shifting every historical date by the offset. Pick the timezone your team works in before anyone enters a record.

**Pick the image variant deliberately.** The `-full` tag bundles database clients and LibreOffice for PDF template printing; it is far larger and wants more memory. Without PDF generation, the standard image deploys faster and costs less to run.

Typical cost: **~$25–45/month** for NocoBase and Postgres at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. The spread is almost entirely memory — this is a plugin-loading Node process, not a lightweight service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Nocobase | `nocobase/nocobase:latest-full` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `TZ` | Nocobase | Etc/UTC | TZ |
| `PORT` | Nocobase | 13000 | PORT |
| `APP_ENV` | Nocobase | production | APP_ENV |
| `APP_KEY` | Nocobase | - | APP_KEY |
| `DB_HOST` | Nocobase | - | DB_HOST |
| `DB_PORT` | Nocobase | 5432 | DB_PORT |
| `DB_USER` | Nocobase | (secret) | DB_USER |
| `INIT_LANG` | Nocobase | en-US | INIT_LANG |
| `DB_DIALECT` | Nocobase | postgres | DB_DIALECT |
| `DB_DATABASE` | Nocobase | - | DB_DATABASE |
| `DB_PASSWORD` | Nocobase | (secret) | DB_PASSWORD |
| `INIT_ROOT_EMAIL` | Nocobase | - | Create Admin email (first boot) |
| `INIT_ROOT_NICKNAME` | Nocobase | Super Admin | INIT_ROOT_NICKNAME |
| `INIT_ROOT_PASSWORD` | Nocobase | (secret) | Create Admin password (first boot) |
| `INIT_ROOT_USERNAME` | Nocobase | (secret) | Create Admin username |
| `ENCRYPTION_FIELD_KEY` | Nocobase | - | ENCRYPTION_FIELD_KEY |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/nocobase/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/nocobase-low-code-apps)
