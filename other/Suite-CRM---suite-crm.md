# Deploy Suite CRM on Railway

SuiteCRM 7 one-click deploy on Railway. Free tier, zero config. 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/suite-crm)

## About

**One-click deployment of SuiteCRM 7.15.2 on Railway with MariaDB, auto-install, and zero manual configuration.**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/XXXXX)

---

Deploying SuiteCRM on Railway gives you a fully managed CRM instance without touching a single config file. This template handles the entire setup: it provisions a MariaDB database, downloads SuiteCRM 7.15.2, runs the silent installer to create all database tables and the admin user, and configures Apache with mod_rewrite for clean URLs — all automatically on first boot.

Your data persists across deployments thanks to Railway volumes for uploads, custom modules, and logs. A system cron job runs every minute to power SuiteCRM's schedulers (workflow automation, email sending, scheduled reports). The whole stack fits comfortably within Railway's free tier.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11` | Database |
| suitecrm | [BURNI80/suitecrm-railway-template](https://github.com/BURNI80/suitecrm-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | mariadb | (secret) | MARIADB_USER |
| `MARIADB_DATABASE` | mariadb | suitecrm | MARIADB_DATABASE |
| `MARIADB_PASSWORD` | mariadb | (secret) | MARIADB_PASSWORD |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | MARIADB_ROOT_PASSWORD |
| `DB_HOST` | suitecrm | - | DB_HOST |
| `DB_NAME` | suitecrm | - | DB_NAME |
| `DB_PASS` | suitecrm | - | DB_PASS |
| `DB_PORT` | suitecrm | 3306 | DB_PORT |
| `DB_USER` | suitecrm | (secret) | DB_USER |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/upload`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/suite-crm)
