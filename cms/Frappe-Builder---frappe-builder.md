# Deploy Frappe Builder on Railway

Visual website builder with Frappe, MariaDB and persistent assets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frappe-builder)

## About

Visual website builder with Frappe, MariaDB and persistent assets.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Three services. Builds Builder v1.34.0 at its recorded commit on the pinned framework. Admin/editor authentication is native Frappe, so published pages can be public. One site and one replica; custom domain/DNS setup is not automated. The Builder application is MIT-licensed; framework and dependency licenses still apply. Build compatibility and rendered custom-domain links need runtime checks. Backups must include MariaDB plus /data site configuration and assets.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| frappe-builder | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| mariadb | `mariadb:10.11@sha256:07c0aaff7396b74cb7975cba78257178d188e30f531a5db2b617c48beef13c41` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `PORT` | frappe-builder | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DB_HOST` | frappe-builder | - | Db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_PORT` | frappe-builder | 3306 | Db port for frappe-builder. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | frappe-builder | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `FRAPPE_APP` | frappe-builder | builder | Frappe app for frappe-builder. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PUBLIC_URL` | frappe-builder | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `WEB_WORKERS` | frappe-builder | 2 | Web workers for frappe-builder. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ADMIN_PASSWORD` | frappe-builder | (secret) | Generated admin password. Keep private and preserve with backups. |
| `ALLOW_MIGRATION` | frappe-builder | false | For an existing site, back up its database and files before allowing migration to a changed release. |
| `DB_ROOT_PASSWORD` | frappe-builder | (secret) | Db root password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `FRAPPE_SITE_NAME` | frappe-builder | site.localhost | Frappe site name for frappe-builder. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TEMPLATE_RELEASE` | frappe-builder | v1.34.0 | Template release for frappe-builder. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MARIADB_ROOT_HOST` | mariadb | % | Mariadb root host for mariadb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated mariadb root password. Keep private and preserve with backups. |

## Configuration

- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/data`
- **Healthcheck:** `/api/method/ping`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake`
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/frappe-builder)
