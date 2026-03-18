# Deploy nocobase on Railway

No-code/low-code platform for building apps. Alternative to Retool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/j5tXQu)

## About

## Post-Installation Instructions

The initial admin account and password are `admin@nocobase.com` and `admin123`.

Be sure to change the account and password after installation!

## Distinctive features

### 1. Data model-driven

Most form-, table-, or process-driven no-code products create data structures directly in the user interface, such as Airtable, where adding a new column to a table is adding a new field. This has the advantage of simplicity of use, but the disadvantage of limited functionality and flexibility to meet the needs of more complex scenarios.

NocoBase adopts the design idea of separating the data structure from the user interface, allowing you to create any number of blocks (data views) for the data collections, with different type, styles, content, and actions in each block. This balances the simplicity of no-code operation with the flexibility of native development.

![model](https://static-docs.nocobase.com/model.png)

### 2. What you see is what you get

NocoBase enables the development of complex and distinctive business systems, but this does not mean that complex and specialized operations are required. With a single click, configuration options are displayed on the usage interface, and administrators with system configuration privileges can directly configure the user interface in a WYSIWYG manner.

![wysiwyg](https://static-docs.nocobase.com/wysiwyg.gif)

### 3. Everything is implemented as plugins

NocoBase adopts plugin architecture, all new functions can be realized by developing and installing plugins, and expanding the functions is as easy as installing an APP on your phone.

![plugins](https://static-docs.nocobase.com/plugins.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nocobase/nocobase:latest | `nocobase/nocobase:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | nocobase/nocobase:latest | 13000 | - |
| `DB_USER` | nocobase/nocobase:latest | (secret) | - |
| `DB_DIALECT` | nocobase/nocobase:latest | postgres | - |
| `DB_PASSWORD` | nocobase/nocobase:latest | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/nocobase/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/j5tXQu)
