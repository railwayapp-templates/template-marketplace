# Deploy Mattermost | Secure Self-Hosted Slack Alternative for Teams on Railway

Self-host Mattermost on Railway — channels, threads & file sharing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mattermost-team-edition)

## About

This Railway template deploys a fully self-hosted **Mattermost Team Edition** instance — an open-source, Slack-compatible team chat platform — backed by a managed PostgreSQL database. Both services are pre-wired together using Railway's private networking, so there is no manual database configuration required. 
![Mattermost Railway Architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773219722/mattermost_railwayarcg_vd1ogs.png)

Mattermost is an open-core, self-hosted collaboration platform written in Go and React. It gives teams full ownership of their messages, files, and user data — nothing leaves your infrastructure. It is widely used as a privacy-first alternative to Slack, especially by security-conscious teams, DevOps engineers, and organisations subject to data residency regulations.

Key features in the free Team Edition:
- Unlimited message history and search (stored in your own Postgres database)
- Channels, direct messages, and group messaging
- File sharing and in-line image previews
- Native voice/video calling and screen sharing (via the Calls plugin)
- Slash commands, webhooks, and a rich plugin marketplace
- Mobile apps for iOS and Android
- Markdown rendering and code syntax highlighting
- Emoji reactions and custom emoji

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Mattermost | `mattermost/mattermost-team-edition:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `TZ` | Mattermost | UTC | Container timezone setting |
| `PORT` | Mattermost | 8065 | HTTP server listening port |
| `MM_BLEVESETTINGS_INDEXDIR` | Mattermost | - | Directory storing search indexes |
| `MM_FILESETTINGS_DIRECTORY` | Mattermost | - | Directory storing uploaded files |
| `MM_SQLSETTINGS_DATASOURCE` | Mattermost | - | Postgres connection string |
| `MM_SQLSETTINGS_DRIVERNAME` | Mattermost | postgres | Database driver used by Mattermost |
| `MM_SERVICESETTINGS_SITEURL` | Mattermost | - | Public URL of Mattermost instance |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mattermost/data`

**Category:** Bots

[View on Railway →](https://railway.com/template/mattermost-team-edition)
