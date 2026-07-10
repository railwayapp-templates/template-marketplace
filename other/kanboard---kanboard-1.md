# Deploy kanboard on Railway

Kanboard — open-source project management with Kanban boards.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kanboard-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/nNza4s)

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-kanboard/main/og-image.svg)

Kanboard is a free and open-source Kanban project management software. It focuses on simplicity, speed, and a minimalistic approach — no complexity, no external dependencies. Manage your projects, tasks, and team workflow visually with an intuitive Kanban board deployed on Railway in minutes.

Kanboard runs as a single container with SQLite for persistence. Railway provides the compute, TLS at the edge, and a public URL. The service includes an Nginx reverse proxy with automatic PORT substitution, a persistent volume for the SQLite database and file uploads, and a built-in health check that Railway monitors for automatic restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kanboard | [INAPP-Mobile/railway-kanboard](https://github.com/INAPP-Mobile/railway-kanboard) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port Kanboard listens on (default: 80). Railway injects PORT for routing. |
| `DEBUG` | false | Set to true to enable debug mode for troubleshooting. |
| `DB_DRIVER` | sqlite | Database driver: sqlite, mysql, or postgres. SQLite is built-in with a persistent volume. |
| `MAIL_FROM` | notifications@localhost | From address for email notifications (task assignments, reminders). Change if you configure SMTP. |
| `INITIAL_LOGIN_ID` | (secret) | Informational purpose variable |
| `PLUGIN_INSTALLER` | false | Set to true to enable the plugin installer from Administration > Plugins. |
| `INITIAL_LOGIN_PASSWORD` | (secret) | Informational purpose variable |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/app/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kanboard-1)
