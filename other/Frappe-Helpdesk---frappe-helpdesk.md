# Deploy Frappe Helpdesk on Railway

Customer support tickets with MariaDB, workers, and persistent files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/frappe-helpdesk)

## About

Frappe Helpdesk v1.30.1 provides customer support ticket management. The template installs Helpdesk and its required pinned Telephony dependency into the framework image and runs all site-file consumers together in one application service.

Release tested on Railway. See the validation scope below for verified workflows and remaining limitations.

The template defines 3 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. Repository-backed adapters build from `main`. Railway terminates HTTPS for the public endpoints; databases and internal workers have no public TCP proxies. Fresh initialization was tested in an isolated Railway project. Each deployment has its own database and storage resources. Backups are not scheduled by this template, and filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:10.11@sha256:ce66c7be32a03aabe7241d0a10993a2db827ef652a35d25727d92a832ac8ef73` | Database |
| frappe-helpdesk | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_ROOT_HOST` | mariadb | % | Allow the private application service to initialize its site database. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated mariadb root password. Keep private and preserve with backups. |
| `PORT` | frappe-helpdesk | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DB_HOST` | frappe-helpdesk | - | Db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_PORT` | frappe-helpdesk | 3306 | Db port for frappe-helpdesk. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | frappe-helpdesk | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `FRAPPE_APP` | frappe-helpdesk | helpdesk | Frappe application installed at build time; do not change independently of the image. |
| `PUBLIC_URL` | frappe-helpdesk | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `WEB_WORKERS` | frappe-helpdesk | 2 | Gunicorn worker count; tune against available memory. |
| `ADMIN_PASSWORD` | frappe-helpdesk | (secret) | Generated admin password. Keep private and preserve with backups. |
| `ALLOW_MIGRATION` | frappe-helpdesk | false | For an existing site on a different release, back up database and files before setting true for one upgrade. |
| `DB_ROOT_PASSWORD` | frappe-helpdesk | (secret) | Db root password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `FRAPPE_SITE_NAME` | frappe-helpdesk | site.localhost | Persistent internal site identity; keep stable when changing the public domain. |
| `TEMPLATE_RELEASE` | frappe-helpdesk | v1.30.1 | Template release for frappe-helpdesk. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |

## Configuration

- **Start command:** `docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/api/method/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/frappe-helpdesk)
