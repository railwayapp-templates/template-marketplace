# Deploy CakeCRM on Railway

The simple CRM. Free · Open source · Self-hosted

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cakecrm)

## About

CakeCRM is a free, open-source CRM with an AI sales assistant built in. Contacts, companies, a drag-and-drop pipeline, todos and reports, each on one screen, for a small team that wants a CRM it actually opens. It is fully usable with no AI key; add one in the app and the assistant appears.

CakeCRM is one web service (FastAPI serving a built React app) and a PostgreSQL database. This template deploys both and wires them together: Postgres injects `DATABASE_URL`, Railway generates `JWT_SECRET`, and a persistent volume at `/app/backend/data` keeps the signing secret and the encryption key for stored credentials across redeploys, so nobody is signed out when you ship an update. The only value you provide is `AUTH_PASSWORD`. On first start the app creates one admin account (`admin@cakecrm.local`, or `ADMIN_EMAIL` if you set it) and offers to load a small fictional dataset so you can see the pipeline with something in it. Health is checked at `/api/health`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| CakeCRM | [wwilson1017/CakeCRM](https://github.com/wwilson1017/CakeCRM) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | CakeCRM |  8000 | Port Selection Variable |
| `ADMIN_NAME` | CakeCRM | Admin | Name of admin user, probably you.  |
| `JWT_SECRET` | CakeCRM | (secret) | jwt secret, automatic |
| `ADMIN_EMAIL` | CakeCRM | admin@cakecrm.local | email addy for admin user, probably you. |
| `DATABASE_URL` | CakeCRM | - | Postgres database link. |
| `AUTH_PASSWORD` | CakeCRM | (secret) | admin password.  |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** Other · **Languages:** Python, TypeScript, CSS, HTML, Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/cakecrm)
