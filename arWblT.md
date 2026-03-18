# Deploy Mattermost on Railway

An open source alternative to Slack and Microsoft Teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/arWblT)

## About

Everything is pre-configured to work out of the box. The majority of settings are handled within the app's CMS.

When visiting the app you will be prompted to create an admin user.

If you add a different domain, you just need to re-deploy the app for the changes to the environment to take effect.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mattermost/mattermost-team-edition:latest | `mattermost/mattermost-team-edition:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | mattermost/mattermost-team-edition:latest | UTC | - |
| `PORT` | mattermost/mattermost-team-edition:latest | 8065 | - |
| `MM_BLEVESETTINGS_INDEXDIR` | mattermost/mattermost-team-edition:latest | /mattermost/bleve-indexes | - |
| `MM_SQLSETTINGS_DRIVERNAME` | mattermost/mattermost-team-edition:latest | postgres | - |
| `MM_SERVICESETTINGS_LISTENADDRESS` | mattermost/mattermost-team-edition:latest | :8065 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Healthcheck:** `/api/v4/system/ping`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/arWblT)
