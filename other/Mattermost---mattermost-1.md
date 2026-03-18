# Deploy Mattermost on Railway

Self-hosted open-source team messaging. A privacy-first Slack alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mattermost-1)

## About

Mattermost is an open-source, self-hosted team messaging and collaboration platform. It provides chat channels, direct messages, file sharing, and integrations as a privacy-first alternative to Slack and Microsoft Teams.

Hosting Mattermost requires a persistent application server and a relational database. The app server handles HTTP connections, WebSocket push notifications, file uploads, and plugin execution. A PostgreSQL database stores all messages, users, and configuration. Data written to the server (attachments, custom emoji, plugins) must be stored on a persistent volume so it survives redeployments. Mattermost exposes a health endpoint at `/api/v4/system/ping` that Railway uses to confirm the service is ready before routing traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-mattermost | [c-treinta/railway-mattermost](https://github.com/c-treinta/railway-mattermost) (root: app/) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | railway-mattermost | 8065 | Port Mattermost listens on inside the container |
| `MM_EMAILSETTINGS_SMTPPORT` | railway-mattermost | 587 | SMTP port ΓÇö 587 for STARTTLS, 465 for SSL |
| `MM_SQLSETTINGS_DATASOURCE` | railway-mattermost | - | Full Postgres DSN ΓÇö auto-injected from managed Postgres |
| `MM_SQLSETTINGS_DRIVERNAME` | railway-mattermost | postgres | Database driver; must be 'postgres' for Railway Postgres |
| `MM_SERVICESETTINGS_SITEURL` | railway-mattermost | - | Publicly accessible URL ΓÇö update after deploy with your Railway domain |
| `MM_EMAILSETTINGS_SMTPSERVER` | railway-mattermost | - | SMTP hostname (e.g. smtp.sendgrid.net); empty disables email |
| `MM_EMAILSETTINGS_SMTPPASSWORD` | railway-mattermost | (secret) | SMTP password ΓÇö replace with real credential before enabling email |
| `MM_EMAILSETTINGS_SMTPUSERNAME` | railway-mattermost | (secret) | SMTP username or API key |
| `MM_EMAILSETTINGS_FEEDBACKEMAIL` | railway-mattermost | - | From address for system emails (e.g. noreply@example.com) |
| `MM_SERVICESETTINGS_ALLOWCORSFROM` | railway-mattermost | - | Comma-separated CORS origins; empty = restrict to SITEURL only |
| `MM_SERVICESETTINGS_LISTENADDRESS` | railway-mattermost | :8065 | Internal HTTP listen address |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Makefile, Dockerfile

[View on Railway →](https://railway.com/template/mattermost-1)
