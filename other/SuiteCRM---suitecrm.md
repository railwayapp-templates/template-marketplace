# Deploy SuiteCRM on Railway

Customer relationship manager for sales, support and marketing teams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/suitecrm)

## About

SuiteCRM is a full customer relationship management suite: accounts, contacts, leads, opportunities, quotes and invoices, cases, campaigns, projects and reports, plus a workflow engine and a Studio for adding fields and modules without writing code. It forked from SugarCRM Community Edition, is AGPL-3.0 licensed, and suits teams who want Salesforce-class functionality on infrastructure they control.

Self-host SuiteCRM 8.10 on Railway with this template and you get two services. **SuiteCRM** runs the application behind Apache and PHP 8.3, serving the Angular front end, the classic PHP modules and the REST API on one public domain. **MariaDB** holds every record on its own volume, reachable only over Railway's private network. The app container also runs the two background processes SuiteCRM 8.10 needs and a bare image omits: the scheduler driving workflows, campaigns, inbound email and reports every minute, and the Symfony Messenger worker for asynchronous jobs. The installer runs unattended on first boot, so no setup wizard is exposed.

![Diagram of the SuiteCRM and MariaDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789464502/suitecrm-architecture.webp)

Teams self-host SuiteCRM when per-seat pricing stops making sense, when customer data must stay in one jurisdiction, or when they need to reshape the data model further than a SaaS product allows. The application is PHP plus a MySQL-compatible database, so one container and one database are enough.

- Sales pipeline: leads, opportunities, quotes, contracts and invoices with PDF templates
- Customer service: cases, knowledge base, and inbound email routed into cases
- Marketing: target lists, email campaigns, confirmed opt-in, surveys and events
- Studio and Module Builder for custom fields, modules and layouts
- Workflow engine firing on record conditions, plus scheduled reports
- Roles and security groups, with LDAP and SAML single sign-on
- REST API v8 with OAuth2 and CalDAV calendar sync

SuiteCRM serves HTTP and runs the scheduler and Messenger worker beside Apache, because all three write the same uploads, cache and customisation directories on its volume. MariaDB stores every module's tables and is never public — the app reaches it over `*.railway.internal`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SuiteCRM | [gridalpha/suitecrm-railway](https://github.com/gridalpha/suitecrm-railway) | Web service |
| MariaDB | `mariadb:11.8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SuiteCRM | 8080 | Apache listening port |
| `APP_ENV` | SuiteCRM | prod | Symfony environment |
| `APP_SECRET` | SuiteCRM | (secret) | Symfony secret, must stay stable |
| `TRUSTED_PROXIES` | SuiteCRM | 100.64.0.0/10,152.233.0.0/17,fd00::/8 | Railway edge ranges for Symfony |
| `SUITECRM_SITE_URL` | SuiteCRM | - | Public URL links are built from |
| `SUITECRM_DEMO_DATA` | SuiteCRM | no | Load SuiteCRM demo records on first boot |
| `SUITECRM_ADMIN_USER` | SuiteCRM | (secret) | First administrator's username |
| `SUITECRM_CRON_INTERVAL` | SuiteCRM | 60 | Seconds between scheduler runs |
| `SUITECRM_DATABASE_HOST` | SuiteCRM | - | Private MariaDB hostname |
| `SUITECRM_DATABASE_NAME` | SuiteCRM | - | Database SuiteCRM owns |
| `SUITECRM_DATABASE_PORT` | SuiteCRM | 3306 | MariaDB port |
| `SUITECRM_DATABASE_USER` | SuiteCRM | (secret) | Scoped account the app runs as |
| `SUITECRM_ADMIN_PASSWORD` | SuiteCRM | (secret) | First administrator's password |
| `APACHE_MAX_REQUEST_WORKERS` | SuiteCRM | 24 | Prefork worker ceiling |
| `SUITECRM_DATABASE_PASSWORD` | SuiteCRM | (secret) | Scoped account password |
| `SUITECRM_DATABASE_ADMIN_USER` | SuiteCRM | (secret) | Install-time account, creates the schema |
| `SUITECRM_DATABASE_ADMIN_PASSWORD` | SuiteCRM | (secret) | Install-time account password |
| `MARIADB_USER` | MariaDB | (secret) | Scoped account created on first boot |
| `MARIADB_DATABASE` | MariaDB | suitecrm | Database created on first boot |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Scoped account password, read by the server |
| `MARIADB_AUTO_UPGRADE` | MariaDB | 1 | Run mariadb-upgrade after an image bump |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Superuser password, read by the server |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/suitecrm-data`
- **Start command:** `/bin/sh -c 'MEM=$(cat /sys/fs/cgroup/memory.max 2>/dev/null); case "$MEM" in ""|max) MEM=1073741824;; esac; POOL=$((MEM/1024/1024/4)); [ "$POOL" -lt 128 ] && POOL=128; mkdir -p /var/lib/mysql/data; exec docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data --innodb-buffer-pool-size=${POOL}M --max-connections=200 --character-set-server=utf8mb4 --collation-server=utf8mb4_general_ci --innodb-file-per-table=1'`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile, PHP, Go Template

[View on Railway →](https://railway.com/deploy/suitecrm)
