# Deploy Gauzy ERP on Railway

Open source ERP, CRM and HRM platform. One-click deploy with PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gauzy-erp)

## About

Gauzy is an open source business management platform (ERP, CRM, HRM, ATS and project management) built by Ever. This template deploys the full stack in one click: the Gauzy API, the Gauzy web app, and a PostgreSQL database, with all secrets and the admin password generated per deploy.

Gauzy is a NestJS API plus an Angular web app backed by PostgreSQL. On first boot the API runs its database migrations and seeds a default tenant, so the first deploy takes a couple of minutes before the healthcheck goes green. Uploads are stored on a persistent volume attached to the API service. Outbound email (invites, confirmations) is off until you add your own SMTP settings to the api service variables: MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD and MAIL_FROM_ADDRESS.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| webapp | `ghcr.io/ever-co/gauzy-webapp@sha256:dfe1ae5e057c12ebaff562310c9b670d9fde71fae481f1891194454da1bd57b4` | Web service |
| api | `ghcr.io/ever-co/gauzy-api@sha256:b99003e2c3f575b615a693af6d94887ae6a9de31c5a488f5dcc64800ec14a33e` | Web service |
| db | `postgres:17-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEMO` | webapp | false | - |
| `PORT` | webapp | 4200 | - |
| `API_PORT` | webapp | 3000 | - |
| `WEB_HOST` | webapp | webapp | - |
| `WEB_PORT` | webapp | 4200 | - |
| `FILE_PROVIDER` | webapp | LOCAL | - |
| `DEFAULT_CURRENCY` | webapp | USD | - |
| `PLATFORM_WEBSITE_URL` | webapp | https://gauzy.co | - |
| `PLATFORM_WEBSITE_DOWNLOAD_URL` | webapp | https://gauzy.co/downloads | - |
| `DEMO` | api | false | - |
| `PORT` | api | 3000 | - |
| `DB_ORM` | api | typeorm | - |
| `DB_NAME` | api | gauzy | - |
| `DB_PORT` | api | 5432 | - |
| `DB_TYPE` | api | postgres | - |
| `DB_USER` | api | (secret) | - |
| `API_HOST` | api | :: | - |
| `API_PORT` | api | 3000 | - |
| `APP_NAME` | api | Gauzy | - |
| `NODE_ENV` | api | production | - |
| `IS_DOCKER` | api | true | - |
| `DB_LOGGING` | api | error | - |
| `JWT_SECRET` | api | (secret) | - |
| `APP_SIGNATURE` | api | Gauzy | - |
| `FILE_PROVIDER` | api | LOCAL | - |
| `REDIS_ENABLED` | api | false | - |
| `DB_SYNCHRONIZE` | api | false | - |
| `GAUZY_USER_PATH` | api | /data | - |
| `ALLOW_SUPER_ADMIN_ROLE` | api | true | - |
| `DEMO_SUPER_ADMIN_EMAIL` | api | admin@ever.co | Login email of the super admin created on first boot. Pair it with the generated DEMO_SUPER_ADMIN_PASSWORD below. |
| `EXPRESS_SESSION_SECRET` | api | (secret) | - |
| `JWT_REFRESH_TOKEN_SECRET` | api | (secret) | - |
| `DEMO_SUPER_ADMIN_PASSWORD` | api | (secret) | Login password of the super admin created on first boot. Generated per deploy; change it after first login. |
| `JWT_VERIFICATION_TOKEN_SECRET` | api | (secret) | - |
| `POSTGRES_DB` | db | gauzy | - |
| `POSTGRES_USER` | db | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "cd /srv/gauzy && envsubst < replacements.sed > replacements_values.sed && sed -i -f replacements_values.sed *.js && sed 's/listen 4200;/listen 4200; listen [::]:4200;/' /etc/nginx/conf.d/prod.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gauzy-erp)
