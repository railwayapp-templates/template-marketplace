# Deploy Planka | Open Source Trello Alternative on Railway

Self host Planka. Project management with kanban boards, real-time sync

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/planka)

## About

Deploy Planka on Railway to get a self-hosted, real-time Kanban board for your team. Planka is an open-source alternative to Trello and Asana built with React and Node.js — offering drag-and-drop task management, markdown descriptions, file attachments, OIDC single sign-on, and 100+ notification providers. Self-host Planka to keep full ownership of your project data with zero per-user fees.

This Railway template deploys Planka with a PostgreSQL database for production-grade persistence. The template pre-configures the database connection, admin account, encryption key, persistent volume for uploads and attachments, and a public HTTPS domain — ready to use in under two minutes.

Planka is a fair-code Kanban-style project management tool built by the Planka team. It ships as a single Docker image with a React frontend and Node.js backend, backed by PostgreSQL. The project has over 12,000 stars on GitHub and supports 20+ languages.

Key features of self-hosted Planka:

- **Real-time collaboration** — instant syncing across all users via WebSocket (Socket.io)
- **Kanban boards** — projects, boards, lists, cards, labels, due dates, and timers
- **Markdown editor** — rich card descriptions with full markdown support
- **File attachments** — upload files directly to cards, stored on your volume
- **OIDC single sign-on** — authenticate via Google, Azure AD, Okta, Authentik, or any OIDC provider
- **100+ notification providers** — email (SMTP), Slack, Discord, Telegram, and more via Apprise
- **50+ webhook events** — extensive API for custom integrations and automation
- **Admin controls** — auto-created admin account, role-based access, user management

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Planka | `ghcr.io/plankanban/planka:2.1.1` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Planka | 1337 | HTTP server listening port |
| `BASE_URL` | Planka | - | Public HTTPS URL for Planka |
| `SECRET_KEY` | Planka | (secret) | Encryption key for sessions |
| `TRUST_PROXY` | Planka | true | Trust Railway reverse proxy headers |
| `DATABASE_URL` | Planka | - | Postgres connection string reference |
| `DEFAULT_ADMIN_NAME` | Planka | Admin | Default admin display name |
| `DEFAULT_ADMIN_EMAIL` | Planka | admin@planka.local | Default admin email address |
| `DEFAULT_ADMIN_PASSWORD` | Planka | (secret) | Default admin account password |
| `DEFAULT_ADMIN_USERNAME` | Planka | (secret) | Default admin login username |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/planka)
