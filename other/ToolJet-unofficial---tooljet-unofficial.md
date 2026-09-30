# Deploy ToolJet (unofficial) on Railway

Open-source low-code internal tools, CE build (unofficial ToolJet)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tooljet-unofficial)

## About

ToolJet is an open-source low-code platform for building internal tools: a drag-and-drop UI builder on top of your databases and APIs. This is an unofficial template, not affiliated with ToolJet. It deploys the Community Edition image `tooljet/tooljet-ce` pinned to v3.20.235-lts (source: https://github.com/ToolJet/ToolJet, AGPL-3.0). Enterprise-only features are not part of the Community Edition.

The template runs three services: ToolJet CE, PostgreSQL 16 (one volume) and PostgREST v12.2.0 (powers the built-in ToolJet Database). Redis runs inside the ToolJet container and is not persisted. The first admin account is created for you at first start: the email you enter in `SEED_EMAIL` plus a generated `SEED_PASSWORD`, so nobody can claim the instance by being first on the URL. The seed prints the admin password to the deploy logs, so anyone who can read the project's logs or variables can see it: change it after your first login. The first start runs 220+ database migrations and can take several minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tooljet-db | `postgres:16.15` | Database |
| tooljet | `tooljet/tooljet-ce:v3.20.235-lts` | Web service |
| tooljet-postgrest | `postgrest/postgrest:v12.2.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_USER` | tooljet-db | (secret) | Superuser of the bundled Postgres; do not change. |
| `POSTGRES_PASSWORD` | tooljet-db | (secret) | Auto-generated password of the bundled Postgres. |
| `PORT` | tooljet | 3000 | Port the ToolJet server listens on; keep 3000. |
| `PG_DB` | tooljet | tooljet_production | Name of the ToolJet application database on the bundled Postgres; do not change. |
| `PG_HOST` | tooljet | - | Internal connection to the bundled Postgres service; do not change. |
| `PG_PASS` | tooljet | - | Auto-generated password of the bundled Postgres. |
| `PG_PORT` | tooljet | 5432 | Port of the bundled Postgres; do not change. |
| `PG_USER` | tooljet | (secret) | Superuser of the bundled Postgres; do not change. |
| `PGRST_HOST` | tooljet | - | Internal connection to the bundled PostgREST service; do not change. |
| `SEED_EMAIL` | tooljet | - | Email address of the first admin account (your login). Enter it before deploying. |
| `TOOLJET_DB` | tooljet | tooljet_db | Name of the ToolJet Database (built-in tables) on the bundled Postgres; do not change. |
| `SERVE_CLIENT` | tooljet | true | true makes the server also serve the web UI; keep true. |
| `TOOLJET_HOST` | tooljet | - | Public https URL of this instance (Railway domain by default). |
| `SEED_PASSWORD` | tooljet | (secret) | Auto-generated first admin password (also printed once in deploy logs by the seed). Change it after login. |
| `SEED_LAST_NAME` | tooljet | User | Last name of the first admin account. |
| `SEED_WORKSPACE` | tooljet | My workspace | Name of the first workspace, created on first start. |
| `SECRET_KEY_BASE` | tooljet | (secret) | Auto-generated secret for session cookies. Do not change or share. |
| `SEED_FIRST_NAME` | tooljet | Admin | First name of the first admin account. |
| `TOOLJET_DB_HOST` | tooljet | - | Internal connection to the bundled Postgres service; do not change. |
| `TOOLJET_DB_PASS` | tooljet | - | Auto-generated password of the bundled Postgres. |
| `TOOLJET_DB_PORT` | tooljet | 5432 | Port of the bundled Postgres; do not change. |
| `TOOLJET_DB_USER` | tooljet | (secret) | Superuser of the bundled Postgres; do not change. |
| `PGRST_JWT_SECRET` | tooljet | (secret) | Auto-generated secret shared by ToolJet and PostgREST (ToolJet Database). |
| `CHECK_FOR_UPDATES` | tooljet | false | false stops ToolJet checking for new versions. |
| `LOCKBOX_MASTER_KEY` | tooljet | - | Auto-generated key encrypting saved data-source credentials. Back it up; never change it. |
| `DISABLE_TOOLJET_TELEMETRY` | tooljet | true | true stops usage telemetry being sent to ToolJet. |
| `PGRST_DB_URI` | tooljet-postgrest | - | Internal connection string to the bundled Postgres (ToolJet Database); do not change. |
| `PGRST_JWT_SECRET` | tooljet-postgrest | (secret) | Auto-generated secret shared by ToolJet and PostgREST (ToolJet Database). |
| `PGRST_SERVER_HOST` | tooljet-postgrest | *6 | Bind address; *6 listens on IPv4 and IPv6 for the private network. |
| `PGRST_SERVER_PORT` | tooljet-postgrest | 3000 | Port PostgREST listens on internally; do not change. |
| `PGRST_DB_PRE_CONFIG` | tooljet-postgrest | postgrest.pre_config | Function created by ToolJet migrations that supplies PostgREST config; do not change. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "/app/server/entrypoint.sh npm run db:seed:prod && exec npm run start:prod"`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/tooljet-unofficial)
