# Deploy opensondage-template on Railway

Self-hosted polls & scheduling (Framadate) — one click, MariaDB included

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opensondage-template)

## About

Deploying provisions two services:

| Service | Image | Role |
|---|---|---|
| `framadate` | `xgaia/framadate:1.1.19` (digest-pinned) | PHP/Apache app on port 80, public domain auto-provisioned |
| `mariadb` | `mariadb:10.11` (digest-pinned) | Database with a persistent volume at `/var/lib/mysql` |

On first boot the app container waits for Apache, generates the admin
credentials and configuration from its environment, and runs the database
schema migration through `/admin/migration.php` (idempotent — tracked in the
`fd_framadate_migration` table). Within a minute of clicking deploy the poll
home page is live on your Railway domain.

Hosting Framadate yourself means your polls, voter names and schedules live in
your own database — no third-party tracking, no poll expiry imposed by a
hosting company, and no feature gating. This template keeps the footprint
small: one stateless PHP container and one MariaDB container with a volume,
typically **$3–5/month** on Railway's Hobby plan.

What is provisioned and configured for you:

- `framadate` service — public domain on port 80; `SERVERNAME` follows your
  Railway domain automatically; admin panel at `/admin` protected by HTTP
  Basic Auth with a generated `ADMIN_PASSWORD`.
- `mariadb` service — root and app passwords generated via
  `${{secret(24,"alnum")}}`; the app connects over Railway private networking
  (`DB_HOST=${{mariadb.RAILWAY_PRIVATE_DOMAIN}}`,
  `DB_PASSWORD=${{mariadb.MARIADB_PASSWORD}}`).
- A persistent volume on MariaDB — deleting/redeploying the app never loses
  polls; only deleting the volume does.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| framadate | [lNamelessl/opensondage-railway-template](https://github.com/lNamelessl/opensondage-railway-template) (root: framadate) | Web service |
| mariadb | [lNamelessl/opensondage-railway-template](https://github.com/lNamelessl/opensondage-railway-template) (root: mariadb) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_PASSWORD` | framadate | (secret) |
| `ADMIN_PASSWORD` | framadate | (secret) |
| `MARIADB_PASSWORD` | mariadb | (secret) |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile, sed, PHP

[View on Railway →](https://railway.com/deploy/opensondage-template)
