# Deploy Mattermost [Updated Mar '26] on Railway

Mattermost [Mar '26] (Slack Alternative & Secure Messaging) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mattermost)

## About

Mattermost is a free, open-source collaboration and messaging platform available on GitHub. It offers secure team communication, project collaboration, and integrations with popular tools. Mattermost is widely known as a **Slack alternative**, giving teams full control over their data and infrastructure.

You can **self host Mattermost with Docker** to keep all your messages, files, and integrations entirely under your control, with zero third-party involvement. Self hosting ensures better security, data ownership, and compliance with internal or government regulations like IL4 standards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Docker | `mattermost/mattermost-team-edition:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `TZ` | Docker | UTC |
| `PORT` | Docker | 8065 |
| `MM_BLEVESETTINGS_INDEXDIR` | Docker | /mattermost/bleve-indexes |
| `MM_SQLSETTINGS_DRIVERNAME` | Docker | postgres |
| `MM_SERVICESETTINGS_LISTENADDRESS` | Docker | :8065 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/api/v4/system/ping`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mattermost)
