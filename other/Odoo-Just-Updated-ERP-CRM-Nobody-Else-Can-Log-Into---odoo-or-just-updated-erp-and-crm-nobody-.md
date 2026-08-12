# Deploy Odoo | (Just Updated) ERP & CRM Nobody Else Can Log Into on Railway

Odoo ERP & CRM: admin password seeded, database manager shut on boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odoo-or-just-updated-erp-and-crm-nobody-)

## About

Odoo is the open-source business suite — CRM, sales, invoicing, accounting, inventory,
manufacturing, purchasing, projects, HR, e-commerce and a website builder, all sharing one
database. This template runs Odoo 19.0 with Postgres, a volume for the filestore, an administrator
password generated per deploy, and the database manager closed before the public URL is ever
reachable.

Odoo has no environment-variable configuration layer. Every setting that decides whether a public
deploy is safe lives in `odoo.conf` or on the command line, which is why a one-click Odoo needs
more than a container image and a database:

- **The administrator account.** A freshly initialised Odoo database has the login `admin` with
  the password `admin`, and no upstream option changes it. On a public URL, the first stranger who
  tries the documented default owns the ERP.
- **The database manager.** `admin_passwd` defaults to `admin` and `list_db` defaults to `True`,
  so `/web/database/manager` will create, duplicate, restore, drop — and **download a full backup
  of** — the database to anyone who supplies that default. The backup ZIP contains `dump.sql` and
  the filestore, i.e. every record and every attachment.
- **The filestore needs a volume.** Attachments, product images, uploaded documents and generated
  PDFs live on disk under `/var/lib/odoo`, not in Postgres.
- **Reverse-proxy awareness.** Railway terminates TLS. Without `proxy_mode` and a fixed
  `web.base.url`, Odoo builds password-reset links, portal invitations and every emailed URL from
  whatever host the container saw.

This template settles all four. The master password comes from a generated secret and the database
manager is disabled outright; the administrator password is generated per deploy and applied
before anything binds a port; the filestore is on a volume, owned by the service user rather than
by root; and `proxy_mode` is on with the base URL pinned to the Railway domain and frozen.

Sign in with the login `admin` and the generated `ODOO_ADMIN_PASSWORD`. The seed runs on every
boot, so setting a new value and redeploying is also a supported password reset — and the master
password is never accepted anywhere, because database management stays off.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| odoo | `ghcr.io/bon5co/odoo-railway:19.0` | Web service |
| postgres | `postgres:17.10-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ODOO_DB_PASSWORD` | odoo | (secret) |
| `ODOO_ADMIN_PASSWORD` | odoo | (secret) |
| `ODOO_MASTER_PASSWORD` | odoo | (secret) |
| `ODOO_PGSUPERPASSWORD` | odoo | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Healthcheck:** `/web/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/odoo`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/odoo-or-just-updated-erp-and-crm-nobody-)
