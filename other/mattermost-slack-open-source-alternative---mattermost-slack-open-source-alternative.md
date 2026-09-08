# Deploy mattermost: slack open-source alternative on Railway

deploy easily this slack alternative and start using

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mattermost-slack-open-source-alternative)

## About

Deploy [Mattermost](https://mattermost.com), the open-source Slack alternative, on Railway in one click. Mattermost Team Edition, a PostgreSQL database, and S3-compatible file storage are pre-wired — open your deployment, create the first account, and start chatting.

This template deploys three services that work together out of the box:

* **Mattermost** (`mattermost/mattermost-team-edition:11.9`) — the free, self-hosted Team Edition. Serves on port `8065` with a health check at `/api/v4/system/ping`. Its site URL (`MM_SERVICESETTINGS_SITEURL`) is automatically set to your Railway public domain, so redirects and notifications use the right address.
* **PostgreSQL 18** — Railway's SSL-enabled Postgres image with a persistent volume at `/var/lib/postgresql/data`. Mattermost connects over Railway private networking (`MM_SQLSETTINGS_DATASOURCE`), so database traffic never leaves the private network.
* **File storage bucket** — an S3-compatible Railway bucket (`mattermost-files`) wired into Mattermost's file settings, so uploaded images and documents persist independently of the app container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Mattermost | `mattermost/mattermost-team-edition:11.9` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | mattermost | POSTGRES_DB |
| `DATABASE_URL` | Postgres | - | DATABASE_URL |
| `POSTGRES_USER` | Postgres | (secret) | POSTGRES_USER |
| `POSTGRES_PASSWORD` | Postgres | (secret) | POSTGRES_PASSWORD |
| `DATABASE_PUBLIC_URL` | Postgres | - | DATABASE_PUBLIC_URL |
| `TZ` | Mattermost | UTC | TZ |
| `PORT` | Mattermost | 8065 | PORT |
| `MM_CONFIG` | Mattermost | - | MM_CONFIG |
| `MM_SQLSETTINGS_DATASOURCE` | Mattermost | - | MM_SQLSETTINGS_DATASOURCE |
| `MM_SQLSETTINGS_DRIVERNAME` | Mattermost | postgres | MM_SQLSETTINGS_DRIVERNAME |
| `MM_FILESETTINGS_DRIVERNAME` | Mattermost | amazons3 | MM_FILESETTINGS_DRIVERNAME |
| `MM_SERVICESETTINGS_SITEURL` | Mattermost | - | MM_SERVICESETTINGS_SITEURL |
| `MM_FILESETTINGS_AMAZONS3SSL` | Mattermost | true | MM_FILESETTINGS_AMAZONS3SSL |
| `MM_FILESETTINGS_AMAZONS3BUCKET` | Mattermost | - | MM_FILESETTINGS_AMAZONS3BUCKET |
| `MM_FILESETTINGS_AMAZONS3REGION` | Mattermost | - | MM_FILESETTINGS_AMAZONS3REGION |
| `MM_FILESETTINGS_AMAZONS3ENDPOINT` | Mattermost | t3.storageapi.dev | MM_FILESETTINGS_AMAZONS3ENDPOINT |
| `MM_SERVICESETTINGS_LISTENADDRESS` | Mattermost | :8065 | MM_SERVICESETTINGS_LISTENADDRESS |
| `MM_FILESETTINGS_AMAZONS3ACCESSKEYID` | Mattermost | - | MM_FILESETTINGS_AMAZONS3ACCESSKEYID |
| `MM_FILESETTINGS_AMAZONS3SECRETACCESSKEY` | Mattermost | (secret) | MM_FILESETTINGS_AMAZONS3SECRETACCESSKEY |
| `MM_SERVICESETTINGS_TRUSTEDPROXYIPHEADER` | Mattermost | X-Forwarded-For X-Real-IP | MM_SERVICESETTINGS_TRUSTEDPROXYIPHEADER |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v4/system/ping`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/mattermost-slack-open-source-alternative)
