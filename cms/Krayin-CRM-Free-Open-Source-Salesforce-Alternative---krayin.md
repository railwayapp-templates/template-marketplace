# Deploy Krayin CRM | Free Open Source Salesforce Alternative on Railway

Self-host Krayin CRM on Railway with MySQL — free, open-source Laravel CRM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/krayin)

## About

Deploy Krayin CRM on Railway to run a fully self-hosted, open-source customer relationship management system with zero per-user licensing fees. Self-host Krayin CRM and manage your entire sales pipeline — leads, contacts, activities, quotations, and products — all under your own infrastructure.

This Railway template deploys Krayin CRM (webkul/krayin:2.2.0) with a MySQL database, pre-configured with Nginx, PHP-FPM, automated database migrations, and a production-ready setup.

Krayin CRM is a free, MIT-licensed Laravel CRM built by Webkul for SMEs and enterprises. With 22,100+ GitHub stars, it provides complete customer lifecycle management through a modern Vue.js interface backed by PHP 8.3 and MySQL.

Key features:

- **Lead &amp; Pipeline Management** — drag-and-drop kanban boards with deal probability and stage tracking
- **Contact &amp; Organization Management** — full interaction history, communication logs, company hierarchies
- **Activity Tracking** — calls, meetings, emails, notes, and tasks linked to contacts and leads
- **Quotation &amp; Product Catalog** — generate price quotes tied to products and deals
- **Email Integration** — inbound email parsing via SendGrid, outbound campaigns, CRM inbox
- **Workflow Automation** — event-driven triggers and automated actions
- **REST API &amp; Webhooks** — full CRUD API for all entities with outbound webhook support
- **AI Lead Extraction** — create leads automatically from uploaded PDFs and images
- **Role-Based Access Control** — granular permissions per module and user role
- **Custom Attributes** — add custom fields (text, select, date, price, multi-select) to any entity

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Krayin | `webkul/krayin:2.2.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |
| `PORT` | Krayin | 80 | Port |
| `APP_ENV` | Krayin | production | Application environment production mode |
| `APP_KEY` | Krayin | base64:sLRSejYf3TAF+Aqa1Lfm0sOmgjg1BFnEJ/BMfd6SPRE= | Application encryption and signing key (base64 format) |
| `APP_URL` | Krayin | - | Public base URL for instance |
| `DB_HOST` | Krayin | - | MySQL internal hostname |
| `DB_PORT` | Krayin | - | MySQL service port |
| `APP_DEBUG` | Krayin | false | Enable or disable debug mode |
| `DB_DATABASE` | Krayin | - | MySQL database name reference |
| `DB_PASSWORD` | Krayin | (secret) | MySQL password reference |
| `DB_USERNAME` | Krayin | (secret) | MySQL username reference |
| `CACHE_DRIVER` | Krayin | file | Cache storage driver type |
| `DB_CONNECTION` | Krayin | mysql | Database connection type mysql |
| `SESSION_DRIVER` | Krayin | file | Session storage driver type |
| `MYSQL_AUTOSTART` | Krayin | false | Disable automatic MySQL service start |
| `TRUSTED_PROXIES` | Krayin | * | Trusted proxy IP addresses wildcard |
| `QUEUE_CONNECTION` | Krayin | sync | Queue processing mode synchronous |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'rm -f /etc/nginx/sites-enabled/default && sed -i "/fastcgi_pass/a        fastcgi_param HTTPS on;" /etc/nginx/conf.d/krayin.conf && /usr/local/bin/entrypoint.sh /bin/sh -c "cd /var/www/laravel-crm && php artisan migrate --force; php artisan db:seed --force || true; exec supervisord -n -c /etc/supervisor/supervisord.conf"'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/laravel-crm/storage/app`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/krayin)
