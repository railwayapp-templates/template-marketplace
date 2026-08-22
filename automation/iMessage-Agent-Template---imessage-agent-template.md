# Deploy iMessage Agent Template on Railway

Deploy a personal AI agent to iMessage using Photon

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/imessage-agent-template)

## About

Connect OpenAI Codex to iMessage through [Photon](https://photon.codes) with a one-click Railway deployment. This template provisions the application, PostgreSQL database, and persistent storage needed for authentication, agent state, and workspaces.

Photon Spectrum provides the iMessage connection, while OpenAI Codex handles reasoning and task execution. After deployment, open the web dashboard, enter the owner phone number, connect Photon, and authenticate ChatGPT. The service then runs continuously on Railway as a private, single-owner iMessage assistant.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-imessage-template | [photon-hq/railway-imessage-template](https://github.com/photon-hq/railway-imessage-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | railway-imessage-template | production | Runs the application in production mode. |
| `CODEX_HOME` | railway-imessage-template | /var/data/codex | Persistent directory for Codex authentication and sessions. |
| `DATABASE_URL` | railway-imessage-template | - | Internal connection URL for the included PostgreSQL service. |
| `CODEX_AUTH_MODE` | railway-imessage-template | chatgpt | Selects the authentication method used by Codex. |
| `APP_ENCRYPTION_KEY` | railway-imessage-template | - | Automatically generated key for encrypting stored credentials. |
| `AGENT_WORKSPACE_ROOT` | railway-imessage-template | /var/data/workspaces | Persistent directory used for agent workspaces. |
| `POSTGRES_DB` | Postgres | railway | Database created when PostgreSQL initializes. |
| `DATABASE_URL` | Postgres | - | Complete internal PostgreSQL connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL administrator username. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Automatically generated PostgreSQL administrator password. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** TypeScript, JavaScript, PLpgSQL, Shell

[View on Railway →](https://railway.com/deploy/imessage-agent-template)
