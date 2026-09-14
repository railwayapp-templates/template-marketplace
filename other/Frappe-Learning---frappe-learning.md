# Deploy Frappe Learning on Railway

Learning management with Frappe, MariaDB, Redis and persistent courses.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frappe-learning)

## About

Learning management with Frappe, MariaDB, Redis and persistent courses.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Three services. The adapter builds LMS v2.63.0 and Payments at recorded commits on the pinned Frappe framework image. It runs web, Socket.IO, queue worker and scheduler with one /data volume. Database and Redis are private. AGPL-3.0 applies to LMS. The framework/app build and dependency compatibility still require a real image build. Upgrades to an existing site require a backup followed by ALLOW_MIGRATION=true; reset it after validation. Paid course billing requires a supported external payment provider.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frappe-learning | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| mariadb | `mariadb:10.11@sha256:07c0aaff7396b74cb7975cba78257178d188e30f531a5db2b617c48beef13c41` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | frappe-learning | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DB_HOST` | frappe-learning | - | Db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_PORT` | frappe-learning | 3306 | Db port for frappe-learning. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | frappe-learning | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `FRAPPE_APP` | frappe-learning | lms | Frappe app for frappe-learning. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PUBLIC_URL` | frappe-learning | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `WEB_WORKERS` | frappe-learning | 2 | Web workers for frappe-learning. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ADMIN_PASSWORD` | frappe-learning | (secret) | Generated admin password. Keep private and preserve with backups. |
| `ALLOW_MIGRATION` | frappe-learning | false | For an existing site, back up its database and files before allowing migration to a changed release. |
| `DB_ROOT_PASSWORD` | frappe-learning | (secret) | Db root password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `FRAPPE_SITE_NAME` | frappe-learning | site.localhost | Frappe site name for frappe-learning. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TEMPLATE_RELEASE` | frappe-learning | v2.63.0 | Template release for frappe-learning. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
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

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/frappe-learning)
