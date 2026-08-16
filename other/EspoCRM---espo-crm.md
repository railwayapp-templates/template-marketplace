# Deploy EspoCRM on Railway

Salesforce alternative. Full stack: web app, background jobs, WebSockets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/espo-crm)

## About

EspoCRM is an open source CRM that keeps accounts, contacts, leads, opportunities, cases and email in one place, behind a fast single-page interface and an entity manager that adds your own fields and layouts without code. Sales teams, agencies and support desks run it as a self-hosted alternative to Salesforce or HubSpot, with the data in a database they own and no per-seat licence.

Deploy EspoCRM on Railway with the database, background job daemon, real-time WebSocket server and attachment storage already wired together. The template builds from [gridalpha/espocrm-railway](https://github.com/gridalpha/espocrm-railway) on the official `espocrm/espocrm` image: managed MySQL holds the CRM data, a Railway bucket holds uploaded files, and a volume keeps your customisations. To self-host EspoCRM elsewhere, the Docker instructions below do the same by hand.

![EspoCRM Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786823986/9ae34f75-3bdf-4640-8846-581dfc620b98.png)

EspoCRM is a PHP application running behind Apache with a MySQL or MariaDB database. Self-host it when customer records should not sit in a vendor's cloud, when you want unlimited users without per-seat pricing, or when you need custom entities a SaaS CRM charges extra for.

- Accounts, contacts, leads, opportunities and a drag-and-drop pipeline
- Cases, a knowledge base and a customer portal for support
- Two-way email: IMAP/SMTP inboxes, templates, mass email and campaigns
- Entity Manager for custom entities, fields, relationships and layouts
- Reports, dashlets, calendar, target lists and workflow automation
- REST API, webhooks, LDAP auth and two-factor authentication

Three roles run here: the web application serving the UI and REST API, a job daemon running scheduled work such as email fetching and reminders, and a WebSocket server pushing live notifications to open tabs. The daemon and WebSocket server read the same customisations you make in Entity Manager, so they run alongside the web process, as on a single server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| espocrm | [gridalpha/espocrm-railway](https://github.com/gridalpha/espocrm-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Private hostname, never publicly exposed |
| `MYSQLPORT` | MySQL | 3306 | MySQL port on the private network |
| `MYSQLUSER` | MySQL | root | Superuser; give the app a scoped user instead |
| `MYSQL_URL` | MySQL | - | Private-network connection string |
| `MYSQLDATABASE` | MySQL | - | Alias consumers reference as ${{MySQL.MYSQLDATABASE}} |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first init |
| `MYSQL_PUBLIC_URL` | MySQL | - | External connection string; empty host/port until a TCP proxy exists |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated once at init — read only when the data dir is created |
| `PORT` | espocrm | 80 | Apache listening port |
| `ESPOCRM_SITE_URL` | espocrm | - | Public URL of the instance |
| `AWS_ACCESS_KEY_ID` | espocrm | - | Bucket access key |
| `ESPOCRM_S3_BUCKET` | espocrm | - | Attachment bucket name |
| `ESPOCRM_S3_REGION` | espocrm | - | Attachment bucket region |
| `ESPOCRM_TIME_ZONE` | espocrm | UTC | Default instance timezone |
| `ESPOCRM_S3_ENDPOINT` | espocrm | - | Attachment bucket endpoint |
| `AWS_SECRET_ACCESS_KEY` | espocrm | (secret) | Bucket secret key |
| `ESPOCRM_DATABASE_HOST` | espocrm | - | Private database hostname |
| `ESPOCRM_DATABASE_NAME` | espocrm | espocrm | Application database name |
| `ESPOCRM_DATABASE_PORT` | espocrm | 3306 | Database port |
| `ESPOCRM_DATABASE_USER` | espocrm | (secret) | Application database user |
| `ESPOCRM_ADMIN_PASSWORD` | espocrm | (secret) | First administrator password |
| `ESPOCRM_ADMIN_USERNAME` | espocrm | (secret) | First administrator username |
| `ESPOCRM_CONFIG_SITE_URL` | espocrm | - | Keeps site URL current |
| `ESPOCRM_DATABASE_PASSWORD` | espocrm | (secret) | Application database password |
| `ESPOCRM_DATABASE_PLATFORM` | espocrm | Mysql | Database driver |
| `ESPOCRM_DATABASE_ADMIN_URL` | espocrm | - | Provisions database and user at boot |
| `ESPOCRM_CONFIG_LOGGER__PATH` | espocrm | data/logs/espo.log | Application log location |
| `ESPOCRM_CONFIG_USE_WEB_SOCKET` | espocrm | true | Real-time notifications |
| `ESPOCRM_CONFIG_LOGGER__ROTATION` | espocrm | true | Rotate application logs |
| `ESPOCRM_CONFIG_LOGGER__PRINT_TRACE` | espocrm | true | Stack traces in the log |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/espo-crm)
