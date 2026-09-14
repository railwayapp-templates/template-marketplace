# Deploy Frappe Insights on Railway

Business intelligence dashboards with Frappe, MariaDB and Redis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frappe-insights)

## About

Business intelligence dashboards with Frappe, MariaDB and Redis.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Three services. Builds Insights v3.13.2 at its recorded commit on the pinned framework. Web, Socket.IO, worker and scheduler share one site volume. Server scripts are enabled because Insights needs them; treat application administrators as trusted. External analytics databases are not copied into this stack or included in its backups. AGPL-3.0 upstream terms apply. Test compatibility with your chosen connector; paid managed hosting and enterprise support are not included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frappe-insights | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| mariadb | `mariadb:10.11@sha256:07c0aaff7396b74cb7975cba78257178d188e30f531a5db2b617c48beef13c41` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | frappe-insights | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DB_HOST` | frappe-insights | - | Db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_PORT` | frappe-insights | 3306 | Db port for frappe-insights. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | frappe-insights | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `FRAPPE_APP` | frappe-insights | insights | Frappe app for frappe-insights. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PUBLIC_URL` | frappe-insights | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `WEB_WORKERS` | frappe-insights | 2 | Web workers for frappe-insights. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ADMIN_PASSWORD` | frappe-insights | (secret) | Generated admin password. Keep private and preserve with backups. |
| `ALLOW_MIGRATION` | frappe-insights | false | For an existing site, back up its database and files before allowing migration to a changed release. |
| `DB_ROOT_PASSWORD` | frappe-insights | (secret) | Db root password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `FRAPPE_SITE_NAME` | frappe-insights | site.localhost | Frappe site name for frappe-insights. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TEMPLATE_RELEASE` | frappe-insights | v3.13.2 | Template release for frappe-insights. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `MARIADB_ROOT_HOST` | mariadb | % | Mariadb root host for mariadb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated mariadb root password. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/api/method/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Start command:** `docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake`
- **Volume:** `/var/lib/mysql`

**Category:** Analytics · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/frappe-insights)
