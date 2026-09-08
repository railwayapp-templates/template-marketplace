# Deploy Krayin on Railway

Open-source CRM for leads, contacts, quotes and sales pipelines

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/krayin-crm)

## About

Krayin is a free, open-source CRM built on Laravel and Vue.js by Webkul, for sales teams that want to track leads through a pipeline without paying per seat: a drag-and-drop kanban of deals, a contact and organisation book, quotes built from a product catalogue, an email inbox threaded against each lead, and a log of calls, meetings and notes. Every field is a custom attribute, so you can shape leads, people and organisations around your own sales process. Teams self-host Krayin for Pipedrive-style pipeline management on infrastructure they control.

Deploy Krayin on Railway and this template brings up everything it needs: the **krayin** service running nginx, PHP-FPM, two queue workers and the Laravel scheduler in one container; **MySQL** for CRM data; **Redis** for sessions, cache and the job queue; and **mailpit**, an SMTP inbox catching everything Krayin sends, so quotes, password resets and lead emails work as soon as the deploy finishes. Browser traffic reaches nginx on the public domain, PHP talks to MySQL and Redis privately, and mail goes to mailpit on port 1025 — no public database, no install step.

![Diagram of the Krayin, MySQL, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788783907/krayin-architecture.png)

Self-hosting Krayin makes sense when customer records are sensitive, when per-seat pricing has outgrown its value, or when you want to extend the CRM with your own modules — packages drop into `packages/Webkul` like the shipped ones.

- Drag-and-drop sales pipelines with multiple stages and per-stage totals
- Contacts and organisations, with custom attributes on each record
- Quotes generated from a product catalogue and mailed as PDFs
- A mail module threading inbound and outbound email against leads
- Activities, workflow automation, tags, roles and a per-record changelog
- CSV and XLSX import and export for leads, people and organisations

Inside the **krayin** service, nginx serves `public/`, PHP-FPM runs Laravel, two `queue:work` processes drain background jobs such as data imports, and `schedule:work` runs recurring tasks. **mailpit** shows captured mail in a password-protected inbox; point `MP_SMTP_RELAY_*` at a provider to forward it on.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| krayin | [gridalpha/krayin-railway](https://github.com/gridalpha/krayin-railway) | Web service |
| Redis | `redis:8.2` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | krayin | 8080 | Port nginx listens on |
| `APP_ENV` | krayin | production | Laravel environment |
| `DB_HOST` | krayin | - | Private MySQL hostname |
| `DB_PORT` | krayin | - | MySQL port |
| `APP_NAME` | krayin | Krayin CRM | Application name shown in the UI |
| `REDIS_DB` | krayin | 0 | Sessions and queues |
| `APP_DEBUG` | krayin | false | Never expose stack traces publicly |
| `LOG_LEVEL` | krayin | info | Log verbosity |
| `MAIL_HOST` | krayin | - | Private SMTP host |
| `MAIL_PORT` | krayin | 1025 | Mailpit SMTP port |
| `ADMIN_NAME` | krayin | Administrator | Display name of the first admin |
| `APP_LOCALE` | krayin | en | Default locale |
| `REDIS_HOST` | krayin | - | Private Redis hostname |
| `REDIS_PORT` | krayin | - | Redis port |
| `ADMIN_EMAIL` | krayin | admin@example.com | Login address of the first admin |
| `DB_DATABASE` | krayin | krayin | Schema the app owns |
| `DB_PASSWORD` | krayin | (secret) | Password for that scoped role |
| `DB_USERNAME` | krayin | (secret) | Scoped role the app connects as |
| `LOG_CHANNEL` | krayin | stderr | Application log goes to the deploy log |
| `MAIL_DOMAIN` | krayin | - | Domain used in message ids |
| `MAIL_MAILER` | krayin | smtp | Outbound mail transport |
| `QUEUE_NAMES` | krayin | default | Queues the workers consume |
| `APP_CURRENCY` | krayin | USD | Default currency |
| `APP_KEY_SEED` | krayin | - | Seed the entrypoint hashes into APP_KEY |
| `APP_TIMEZONE` | krayin | UTC | Default timezone |
| `CACHE_DRIVER` | krayin | redis | Cache store |
| `REDIS_CLIENT` | krayin | phpredis | PHP Redis extension built into the image |
| `DB_CONNECTION` | krayin | mysql | Laravel database driver |
| `QUEUE_WORKERS` | krayin | 2 | Number of queue:work processes |
| `ADMIN_PASSWORD` | krayin | (secret) | Password of the first admin |
| `APP_ADMIN_PATH` | krayin | admin | Admin panel path prefix |
| `MAIL_FROM_NAME` | krayin | Krayin CRM | Display name on outbound mail |
| `REDIS_CACHE_DB` | krayin | 1 | Application cache, flushed independently |
| `REDIS_PASSWORD` | krayin | (secret) | Redis auth password |
| `SESSION_DRIVER` | krayin | redis | Session store, survives redeploys |
| `FILESYSTEM_DISK` | krayin | public | Uploads land on the attached volume |
| `MAIL_ENCRYPTION` | krayin | null | Plain SMTP on the private network |
| `BROADCAST_DRIVER` | krayin | log | No websocket broadcaster configured |
| `QUEUE_CONNECTION` | krayin | redis | Queue backend for background jobs |
| `SESSION_LIFETIME` | krayin | 120 | Session lifetime in minutes |
| `DB_ADMIN_PASSWORD` | krayin | (secret) | Superuser password, unset after boot |
| `DB_ADMIN_USERNAME` | krayin | (secret) | Superuser, used once to create the role |
| `MAIL_FROM_ADDRESS` | krayin | - | Envelope sender |
| `CLIENT_MAX_BODY_SIZE` | krayin | 64M | Largest upload nginx accepts |
| `MAIL_RECEIVER_DRIVER` | krayin | sendgrid | Set webklex-imap plus IMAP_* to poll a mailbox |
| `SESSION_SECURE_COOKIE` | krayin | true | Session cookie is HTTPS-only |
| `NGINX_WORKER_PROCESSES` | krayin | 2 | nginx workers, not sized from the host |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | requirepass, read by the server |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_LABEL` | mailpit | krayin | Label shown in the inbox header |
| `MP_UI_AUTH` | mailpit | - | Credentials guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web UI |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |
| `MP_DISABLE_VERSION_CHECK` | mailpit | true | No outbound update check |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/krayin/storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/krayin-crm)
