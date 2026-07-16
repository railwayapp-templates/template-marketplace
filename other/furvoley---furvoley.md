# Deploy furvoley on Railway

Furvoley is a full-stack management CRM for sports clubs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/furvoley)

## About

Furvoley is a full-stack management CRM for sports clubs. It handles members and squads, recurring dues through Stripe Connect, double-entry accounting and invoicing, events with convocations and attendance, a club store, a member portal, and WhatsApp automations — all from a single Next.js app backed by PostgreSQL.

Furvoley ships as a Dockerized Next.js 16 app that needs a PostgreSQL database, a stable public URL, and a handful of secrets. The start script runs `prisma db push` and bootstraps the admin user on every boot, so the schema converges without a manual migration step. Stripe webhooks self-register from the public URL the first time the CRM is opened, and a scheduled job calls `/api/jobs/billing` to issue recurring dues. Optional extras add moving parts: a mounted volume to persist the Hermes WhatsApp agent session, and a second service running the same image as a central portal when you host several clubs from one deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| portal | [carbollo/furvoley-admin](https://github.com/carbollo/furvoley-admin) | Web service |
| Postgres-9NHM | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| crm-mt | [carbollo/furvoley-admin](https://github.com/carbollo/furvoley-admin) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MT_APP_URL` | portal | url base | url base |
| `DATABASE_URL` | portal | - | la base de datos postgres |
| `PORTAL_SSO_SECRET` | portal | (secret) | clave de 64 digitos  |
| `PORTAL_TENANT_MODE` | portal | true | - |
| `TENANT_DB_BASE_URL` | portal | - | la base de datos otra vez |
| `HERMES_GATEWAY_BOOT` | portal | false | - |
| `PORTAL_CENTRAL_HOST` | portal | true | - |
| `PORTAL_ADMIN_PASSWORD` | portal | (secret) | contraseña admin dominio mas /furvoley-config |
| `POSTGRES_DB` | Postgres-9NHM | - | Database |
| `POSTGRES_USER` | Postgres-9NHM | (secret) | user |
| `POSTGRES_PASSWORD` | Postgres-9NHM | (secret) | - |
| `CRON_SECRET` | crm-mt | (secret) | clave cron secreta |
| `MULTITENANT` | crm-mt | true | - |
| `TENANT_STRICT` | crm-mt | true | - |
| `APIWASS_API_KEY` | crm-mt | (secret) | la api key de apiwass |
| `APIWASS_BASE_URL` | crm-mt | https://apiwass.com/api | - |
| `PORTAL_SSO_SECRET` | crm-mt | (secret) | clave de 64 digitos aleatoria |
| `TENANT_DB_BASE_URL` | crm-mt | - | base de datos postgress |
| `HERMES_GATEWAY_BOOT` | crm-mt | false | - |
| `TENANT_ALLOW_OVERRIDE` | crm-mt | true | - |
| `ATTENDANCE_CRON_INTERVAL_MS` | crm-mt | 900000 | cron intervalue |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/furvoley)
