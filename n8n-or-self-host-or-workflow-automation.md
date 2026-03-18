# Deploy N8N with Postgres on Railway

[Mar '26] The cheapest n8n instance with database. Period.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/n8n-or-self-host-or-workflow-automation)

## About

**n8n** is an open-source workflow automation tool that lets you connect apps, APIs, and databases to automate anything — from moving data between **Google Sheets** and **Slack** to building complex backend integrations.

With this **one-click Railway deployment**, you get a fully configured, **production-ready n8n setup** complete with **PostgreSQL** for persistent data storage.

It’s ideal for **developers**, **teams**, and **creators** who want to build scalable automation systems without managing servers or infrastructure.

---

Deploying n8n on Railway is as simple as it gets — just click the **Deploy Now** button on the template page, and within a minute, your complete automation stack will be live.  
No setup, no terminal commands, no configuration headaches. Everything comes **prewired and ready to go**.

Behind that one-click setup, this template automatically provisions and connects two core services:

- **n8n:** the workflow automation engine and user interface  
- **PostgreSQL:** the database used by n8n (to store workflow data, execution history, or even chat logs from AI agents)

These components are already linked using **Railway’s built-in environment variables**, so you don’t have to worry about managing credentials or connection strings — it’s all handled securely under the hood.

For most users, the default configuration works perfectly out of the box.  
But if you like to fine-tune things, we’ve left a few knobs for you to tweak — all exposed as **environment variables** in your Railway dashboard:

- **Execution Pruning:** (`EXECUTIONS_DATA_PRUNE`, `EXECUTIONS_DATA_PRUNE_MAX_COUNT`) — decide how long to keep historical workflow runs

Every parameter is well-documented in the **[official n8n environment variable reference](https://docs.n8n.io/reference/environment-variables/)**, so you can safely explore and tune them to fit your use case.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database name created when PostgreSQL starts for the first time. |
| `DATABASE_URL` | Postgres | - | Full database connection URL (used by apps like n8n for easy setup). |
| `POSTGRES_USER` | Postgres | (secret) | Default PostgreSQL user created during setup. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password assigned to the default PostgreSQL user. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Publicly accessible URL for the database |
| `PORT` | n8n | 5678 | The HTTP port on which n8n will run. Default is 5678. Change only if it conflicts with another service. |
| `DB_TYPE` | n8n | postgresdb | Specifies the database type used by n8n, in this case postgres. |
| `N8N_PORT` | n8n | 5678 | Port on which the n8n service runs inside the container. |
| `WEBHOOK_URL` | n8n | - | Public URL used by n8n to handle incoming webhooks and triggers. |
| `DB_POSTGRESDB_HOST` | n8n | - | Host address of the PostgreSQL database (auto-filled by Railway). |
| `DB_POSTGRESDB_PORT` | n8n | - | Port number for connecting to the PostgreSQL database. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Username for authenticating with the PostgreSQL database. |
| `EXECUTIONS_DATA_PRUNE` | n8n | true | Enables or disables automatic cleanup of old execution records. |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Name of the PostgreSQL database where n8n stores workflows and execution data. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Password for the PostgreSQL user account. |
| `N8N_DEFAULT_BINARY_DATA_MODE` | n8n | filesystem | Sets how binary files (images, PDFs, etc.) are stored — in memory or filesystem. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | n8n | 100 | Defines the maximum number of execution records to retain when pruning. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | When enabled, ensures n8n settings files have secure access permissions (for safety). |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/n8n-or-self-host-or-workflow-automation)
