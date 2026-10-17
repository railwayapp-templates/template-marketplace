# Deploy Homebox on Railway

Home inventory and asset tracker with optional Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homebox-3)

## About

Homebox (sysadminsmedia/homebox) is a self-hosted home inventory and asset tracker. This template adds stable generated secrets, a registration lock you can switch on after your first signup, and an optional Postgres database.

Hosting Homebox on Railway means running the official image ghcr.io/sysadminsmedia/homebox:0.26.2 (via the Dockerfile in the homebox folder) on port 7745 with a volume mounted at /data and /api/v1/status as the health check. The template generates HBOX_AUTH_API_KEY_PEPPER, which must never change, sets HBOX_WEB_PORT and PORT to 7745, uses SQLite (HBOX_DATABASE_DRIVER=sqlite3) by default and sets the timezone. HBOX_OPTIONS_ALLOW_REGISTRATION is true for the first signup; after you create your account, set it to false to lock registration. To use Postgres instead, set HBOX_DATABASE_DRIVER=postgres and the HBOX_DATABASE_HOST, PORT, USERNAME, PASSWORD and DATABASE variables from the Postgres service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-templates | [prime3679/railway-templates](https://github.com/prime3679/railway-templates) (root: /homebox) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | America/New_York | Timezone used by the application. |
| `PORT` | 7745 | HTTP port for Railway networking; must match the public networking port. |
| `HBOX_WEB_PORT` | 7745 | Port the Homebox web server listens on. |
| `HBOX_DATABASE_DRIVER` | sqlite3 | Database driver: sqlite3 by default, or postgres with a Postgres service. |
| `HBOX_AUTH_API_KEY_PEPPER` | (secret) | Stable secret pepper for API keys. Generated automatically and must never change. |
| `HBOX_OPTIONS_ALLOW_REGISTRATION` | true | Set to true for the first signup, then change to false to lock registration. |

## Configuration

- **Healthcheck:** `/api/v1/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/homebox-3)
