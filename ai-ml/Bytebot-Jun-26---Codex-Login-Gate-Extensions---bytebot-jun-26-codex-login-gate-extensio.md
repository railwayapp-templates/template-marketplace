# Deploy Bytebot [Jun 26'] - Codex + Login Gate Extensions on Railway

Bytebot Railway Template - Codex + Login Gate Extensions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bytebot-jun-26-codex-login-gate-extensio)

## About

Bytebot consists of four integrated components working together:

### Bytebot Agent Architecture

1. **Bytebot Desktop**
   Ubuntu 22.04 with XFCE4, pre-installed apps, and the automation daemon.

2. **AI Agent**
   NestJS service that uses an LLM to plan and execute tasks.

3. **Postgres Database**
   Persistent storage for the agent, including task details, status, and metadata.

4. **Task Interface**
   Next.js web app for creating and managing tasks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bytebot-ui | `ghcr.io/jhjhjhjh/bytebot-ui:edge` | Web service |
| bytebot-desktop | `ghcr.io/jhjhjhjh/bytebot-desktop:edge` | Worker |
| bytebot-agent | `ghcr.io/jhjhjhjh/bytebot-agent:edge` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | bytebot-ui | production | Runtime environment, e.g. production or development |
| `BYTEBOT_DOCS_BASE_URL` | bytebot-ui | - | Bytebot documentation site base URL |
| `BYTEBOT_UI_ADMIN_USER` | bytebot-ui | (secret) | Admin username for Bytebot UI login |
| `BYTEBOT_AGENT_BASE_URL` | bytebot-ui | - | Bytebot agent service base URL |
| `BYTEBOT_DESKTOP_VNC_URL` | bytebot-ui | - | Bytebot desktop VNC websocket URL |
| `BYTEBOT_DESKTOP_BASE_URL` | bytebot-ui | - | Bytebot desktop service base URL |
| `BYTEBOT_UI_ADMIN_PASSWORD` | bytebot-ui | (secret) | Admin password for Bytebot UI login |
| `PORT` | bytebot-desktop | 9990 | Application port |
| `DISPLAY` | bytebot-desktop | :0 | Server display identifier for desktop/GUI sessions |
| `PORT` | bytebot-agent | 9991 | Application port |
| `DATABASE_URL` | bytebot-agent | - | PostgreSQL database connection URL |
| `BYTEBOT_DESKTOP_BASE_URL` | bytebot-agent | - | Bytebot desktop service base URL |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bytebot-jun-26-codex-login-gate-extensio)
