# Deploy EspoCRM | (Just Updated) Open-Source CRM That Actually Installs on Railway

Sales CRM that installs itself, with an admin password only you know

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/espocrm-or-just-updated-open-source-crm-)

## About

EspoCRM is an open-source CRM: accounts, contacts, leads and opportunities, a
sales pipeline, activities and calendar, email integration, workflows, reports
and a REST API. This template deploys EspoCRM 10.0.6 with a PostgreSQL database,
installs it on the first boot, and hands you an administrator account whose
password is generated for your deployment alone.

EspoCRM is a PHP application served by Apache, with its data in PostgreSQL and
its uploads, cache and customisations on disk. Two things decide whether a
self-hosted deployment actually works.

The first is the disk layout. EspoCRM's official image treats a volume mounted
on the document root as a "legacy" installation and skips its installer
entirely, so a deployment that mounts the whole application directory serves an
empty folder and a `403 Forbidden` — a CRM that never existed. This template
mounts the volume on the data directory instead, and symlinks the two
customisation directories onto it, so the installer runs and your schema and
layout changes survive a redeploy.

The second is the administrator account. The official image seeds the admin user
only during that one-time installation, from environment variables that fall
back to the documented default password when they are left empty. This template
refuses to boot without an administrator password, refuses to boot with the
upstream default, and re-applies your password on every boot — so a redeploy is
a working password reset, which matters because a fresh instance has no mail
server to send a reset link with.

Apache is also pointed at the port Railway assigns, and the scheduled-job daemon
runs alongside it so workflows, reminders and email fetching actually fire.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-alpine` | Database |
| espocrm | `ghcr.io/bon5co/espocrm-railway:10.0.6` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `ESPOCRM_ADMIN_PASSWORD` | espocrm | (secret) |
| `ESPOCRM_DATABASE_PASSWORD` | espocrm | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/espocrm-or-just-updated-open-source-crm-)
