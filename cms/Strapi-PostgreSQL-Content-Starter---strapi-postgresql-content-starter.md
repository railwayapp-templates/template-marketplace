# Deploy Strapi PostgreSQL Content Starter on Railway

Headless CMS with private Postgres, generated keys and persistent uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/strapi-postgresql-content-starter)

## About

Headless CMS with private Postgres, generated keys and persistent uploads.

This deployment fork provisions Postgres, Strapi. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl@sha256:87184beace8ec657a760401a466a13c5b689066b31b77993103b4771933a9d31` | Database |
| Strapi | [railwayapp-templates/strapi](https://github.com/railwayapp-templates/strapi) (branch: main) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `URL` | Strapi | - | Public URL of the server |
| `HOST` | Strapi | :: | - |
| `BROWSER` | Strapi | false | Open the admin panel in the browser after startup |
| `APP_KEYS` | Strapi | - | Declare session keys, which is used by the session middleware for the Users & Permissions plugin and the Documentation plugin |
| `JWT_SECRET` | Strapi | (secret) | A random string used to create new JWTs |
| `DATABASE_URL` | Strapi | - | Private database URL |
| `API_TOKEN_SALT` | Strapi | (secret) | Hash salt used to generate API tokens |
| `ENCRYPTION_KEY` | Strapi | - | Used for Strapi secrets encryption keys |
| `ADMIN_JWT_SECRET` | Strapi | (secret) | Secret used to encode JWT tokens |
| `DATABASE_PUBLIC_URL` | Strapi | - | Public database URL |
| `TRANSFER_TOKEN_SALT` | Strapi | (secret) | Salt used to generate Transfer tokens |
| `RAILPACK_NODE_VERSION` | Strapi | 22 | - |
| `STRAPI_TELEMETRY_DISABLED` | Strapi | true | Don't send telemetry usage data to Strapi |
| `STRAPI_DISABLE_UPDATE_NOTIFICATION` | Strapi | true | Don't show the notification message about updating strapi in the terminal |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'node -e '"'"'const fs=require("node:fs");const p="config/database.js";fs.writeFileSync(p,fs.readFileSync(p,"utf8").replace(/debug:\s*true/g,"debug: false"));'"'"' && exec npm run start'`
- **Healthcheck:** `/admin`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/public/uploads`

**Category:** CMS · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/strapi-postgresql-content-starter)
