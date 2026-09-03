# Deploy osTicket on Railway

Self-hosted osTicket helpdesk with MariaDB and automated cron.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/osticket)

## About

osTicket is a widely-adopted, open-source support ticket system that turns email, phone and web-based inquiries into a simple, unified online helpdesk. Lightweight and self-hosted, it includes a customer self-service portal, a powerful agent panel, custom fields, SLAs, canned responses and rich reporting — all under your full control.

This template deploys osTicket 1.18 on Railway backed by a MariaDB database and a dedicated cron service that runs scheduled tasks every 5 minutes. The web service runs nginx + PHP-FPM on port 8080 and auto-seeds a fresh install on first boot, creating an administrator account so the helpdesk is live the moment it finishes deploying. Railway manages the HTTPS domain, private networking between services and horizontal/vertical scaling, so you focus on the helpdesk instead of server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11.4` | Database |
| cron | [BURNI80/osTicket-railway-template](https://github.com/BURNI80/osTicket-railway-template) (root: ./cron) | Worker |
| osticket | [BURNI80/osTicket-railway-template](https://github.com/BURNI80/osTicket-railway-template) (root: ./osticket) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | mariadb | (secret) | MARIADB_USER |
| `MARIADB_DATABASE` | mariadb | osticket | MARIADB_DATABASE |
| `MARIADB_PASSWORD` | mariadb | (secret) | MARIADB_PASSWORD |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | MARIADB_ROOT_PASSWORD |
| `CRON_KEY` | cron | - | CRON_KEY |
| `OSTICKET_URL` | cron | http://osticket.railway.internal:8080 | OSTICKET_URL |
| `TZ` | osticket | UTC | TZ |
| `DB_HOST` | osticket | mariadb.railway.internal | DB_HOST |
| `DB_NAME` | osticket | osticket | DB_NAME |
| `DB_PASS` | osticket | osticketpassword | DB_PASS |
| `DB_PORT` | osticket | 3306 | DB_PORT |
| `DB_USER` | osticket | (secret) | DB_USER |
| `DB_PREFIX` | osticket | - | DB_PREFIX |
| `HTTP_PORT` | osticket | 8080 | HTTP_PORT |
| `ADMIN_PASS` | osticket | Admin123! | ADMIN_PASS |
| `ADMIN_USER` | osticket | (secret) | ADMIN_USER |
| `ADMIN_EMAIL` | osticket | admin@example.com | ADMIN_EMAIL |
| `INSTALL_NAME` | osticket | My Helpdesk | INSTALL_NAME |
| `INSTALL_EMAIL` | osticket | support@osticket.local | INSTALL_EMAIL |
| `ADMIN_LASTNAME` | osticket | Administrator | ADMIN_LASTNAME |
| `INSTALL_SECRET` | osticket | (secret) | INSTALL_SECRET |
| `ADMIN_FIRSTNAME` | osticket | Admin | ADMIN_FIRSTNAME |
| `PHP_MEMORY_LIMIT` | osticket | 256M | PHP_MEMORY_LIMIT |
| `PHP_UPLOAD_MAX_SIZE` | osticket | 25M | PHP_UPLOAD_MAX_SIZE |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/osticket)
