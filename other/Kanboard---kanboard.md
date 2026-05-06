# Deploy Kanboard on Railway

kanboard template with PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kanboard)

## About

# Kanboard on Railway

This template deploys the official **`kanboard/kanboard`** image on Railway and uses **PostgreSQL** as the database. It also enables installing plugins from the web interface and **persists installed plugins across restarts and redeployments**.

## Required environment variables

Provide only the following variables in your Railway service:

```env
# Enable plugin installation from the Kanboard UI
PLUGIN_INSTALLER="true"

# Public base URL of your Kanboard instance (Railway injects the domain)
KANBOARD_URL="https://${{RAILWAY_PUBLIC_DOMAIN}}"

# PostgreSQL connection URL (from the Railway Postgres plugin)
DATABASE_URL="postgres://${{Postgres.PGUSER}}:${{Postgres.PGPASSWORD}}@${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}"
```

> **Note:** Railway sets `PORT` automatically; no change is required in Kanboard for listening ports.

## What this template includes

- **Official image** `kanboard/kanboard` (no custom forks).
- **PostgreSQL** as the application database via Railway’s managed plugin.
- **Plugin installer enabled** (from the Kanboard UI).
- **Persistent plugins**: plugins installed from the UI are saved to the app’s data storage so they survive service restarts and redeployments. No extra action is needed on your side.

## Quick start

1. Create a new Railway project from this template.
2. Deploy and open your public URL (the admin default is `admin` / `admin`).

## Operational notes

- You can keep `PLUGIN_INSTALLER="true"` while you add or update plugins, then switch it to `"false"` later for stricter security if desired.
- If you configure email notifications later, add the standard `MAIL_*` variables in Railway (SMTP host, port, user, password, encryption, and from address).
- Backups: snapshot the PostgreSQL database from Railway and, if needed, export board/task data from Kanboard’s UI.

---

## 🧑‍💼 Default Account

After deployment, log in with:

```
Username: admin
Password: admin
```

You can change this password anytime at:

```
https://${{RAILWAY_PUBLIC_DOMAIN}}/user/1/password
```

---

For further configuration options, consult the official documentation at **docs.kanboard.org**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Kanboard | [XavTo/Kanboard-Railway](https://github.com/XavTo/Kanboard-Railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `DATABASE_URL` | Kanboard | - | # The connection URL for the PostgreSQL database, including user, password, host, port and database name |
| `KANBOARD_URL` | Kanboard | - | The publicly accessible base URL for the Kanboard application |
| `PLUGIN_INSTALLER` | Kanboard | true | Install Plugins from interface |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/app/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kanboard)
