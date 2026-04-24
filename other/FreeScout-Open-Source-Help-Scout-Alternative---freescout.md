# Deploy FreeScout | Open Source Help Scout Alternative on Railway

Self-host FreeScout. Free helpdesk, unlimited agents, shared mailbox & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/freescout)

## About

Deploy FreeScout as your self-hosted helpdesk and shared inbox — a lightweight, open-source alternative to Zendesk and Help Scout. This Railway template pre-configures FreeScout with a MySQL database, persistent storage for sessions and uploads, automatic cron scheduling for background jobs, and a public HTTPS domain ready for your support team.

FreeScout is a super lightweight (~10MB) PHP/Laravel helpdesk that gives teams unlimited agents, tickets, and mailboxes with zero per-user fees. It mirrors Help Scout's clean interface while running entirely on your own infrastructure.

Key features:

- **Shared inbox** with collision detection, auto-replies, and conversation merging
- **Multi-channel support** — email, Slack, WhatsApp, Facebook, Telegram
- **Module system** — extend with workflows, knowledge base, customer portal, tags
- **Multi-language** — 25+ languages out of the box
- **REST API** for custom integrations and automation
- **Push notifications** and open tracking for real-time awareness

The template runs two services: the FreeScout application container (with Nginx, PHP-FPM, and cron built in via s6-overlay) and a Railway-managed MySQL database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| FreeScout | `tiredofit/freescout:latest_php8.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |
| `PORT` | FreeScout | 80 | HTTP listening port |
| `DB_HOST` | FreeScout | - | MySQL internal hostname |
| `DB_NAME` | FreeScout | - | MySQL database name |
| `DB_PASS` | FreeScout | - | MySQL password |
| `DB_PORT` | FreeScout | - | MySQL port |
| `DB_TYPE` | FreeScout | mysql | Database engine type |
| `DB_USER` | FreeScout | (secret) | MySQL username |
| `SITE_URL` | FreeScout | - | Public-facing app URL |
| `TIMEZONE` | FreeScout | UTC | Server timezone |
| `ADMIN_PASS` | FreeScout | - | Admin password (bootstrap-only) |
| `SETUP_TYPE` | FreeScout | AUTO | Automatic initial setup |
| `ADMIN_EMAIL` | FreeScout | - | Admin login email (bootstrap-only) |
| `DISPLAY_ERRORS` | FreeScout | FALSE | Hide PHP errors in production |
| `ADMIN_LAST_NAME` | FreeScout | User | Admin last name |
| `ADMIN_FIRST_NAME` | FreeScout | Admin | Admin first name |
| `ENABLE_SSL_PROXY` | FreeScout | TRUE | Trust Railway TLS proxy |
| `ENABLE_AUTO_UPDATE` | FreeScout | FALSE | Disable in-container updates |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/freescout)
