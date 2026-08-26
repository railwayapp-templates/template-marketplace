# Deploy Invoice Ninja on Railway

Invoicing app for sending bills and getting paid by clients

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invoice-ninja-billing)

## About

Invoice Ninja is a self-hosted invoicing, quoting and payments platform used by freelancers, agencies and small finance teams to bill clients and get paid faster. It covers the whole cycle: clients, products, quotes that convert to invoices, recurring billing, expenses, time tracking, tax rules, and a branded client portal where customers view a PDF and pay through one of 40+ gateways such as Stripe. Self-host Invoice Ninja and your clients, rates and payment history stay in a database you own, with every feature the hosted service reserves for its enterprise tier unlocked.

This template runs Invoice Ninja on Railway with the pieces its production Docker setup expects. The application service carries nginx and PHP-FPM in front of the Laravel app, two queue workers, and the scheduler that sends recurring invoices and reminders. Managed MySQL stores every record, managed Redis backs the queue, cache and sessions, and Mailpit captures outgoing mail so you can watch an invoice email arrive before pointing the deployment at a real relay. Logos, documents and PDFs live on a persistent volume, and the owner account is created on first boot from the email and password you supply.

![Invoice Ninja, MySQL, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787599324/invoiceninja-architecture.png)

Invoice Ninja is a Laravel application with a React admin console and a separate client portal. Self-hosting it means four cooperating parts.

- **Application service** — nginx serves the front end and proxies PHP to PHP-FPM. Supervisor also runs two `queue:work` workers and one `schedule:work` scheduler in the same container, since they write to the storage directory the web tier serves from.
- **MySQL** — system of record for clients, invoices, payments and settings.
- **Redis** — the queue carrying email, PDF generation and webhooks off the request path, plus cache and sessions.
- **Mailpit** — a local SMTP sink with a web inbox, so invoice email works as soon as the deploy finishes rather than needing an SMTP account.

Key features: recurring invoices with auto-billing, partial payments and deposits, multi-currency and multi-company support, customisable designs, online quote approval, expense and vendor tracking, project time tracking that converts to billable lines, UBL and Zugferd e-invoicing, and a REST API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| invoiceninja | [gridalpha/invoiceninja-railway](https://github.com/gridalpha/invoiceninja-railway) | Web service |
| Redis | `redis:8.2` | Database |
| MySQL | `mysql:9.4` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | invoiceninja | 8080 | Port nginx listens on |
| `APP_ENV` | invoiceninja | production | Enables boot-time migrate and seed |
| `APP_URL` | invoiceninja | - | Base URL in emails, PDFs, portal links |
| `DB_HOST` | invoiceninja | - | Private MySQL hostname |
| `DB_PORT` | invoiceninja | - | MySQL port |
| `APP_DEBUG` | invoiceninja | false | Never true on a public deployment |
| `IS_DOCKER` | invoiceninja | true | Adds a stderr channel to every log stack |
| `LOG_LEVEL` | invoiceninja | info | Application log verbosity |
| `MAIL_HOST` | invoiceninja | - | Mailpit SMTP host |
| `MAIL_PORT` | invoiceninja | 1025 | Mailpit SMTP port |
| `REDIS_HOST` | invoiceninja | - | Private Redis hostname |
| `REDIS_PORT` | invoiceninja | - | Redis port |
| `DB_DATABASE` | invoiceninja | - | Database name |
| `DB_PASSWORD` | invoiceninja | (secret) | Database password |
| `DB_USERNAME` | invoiceninja | (secret) | Database user |
| `IN_PASSWORD` | invoiceninja | (secret) | Owner password; change before deploying |
| `MAIL_MAILER` | invoiceninja | smtp | Send mail over SMTP |
| `MAIL_SCHEME` | invoiceninja | smtp | Transport scheme |
| `APP_KEY_SEED` | invoiceninja | - | Seed the entrypoint derives APP_KEY from |
| `CACHE_DRIVER` | invoiceninja | redis | Cache store, Redis database 1 |
| `SCOUT_DRIVER` | invoiceninja | null | No Elasticsearch search tier |
| `DB_CONNECTION` | invoiceninja | mysql | Database driver |
| `IN_USER_EMAIL` | invoiceninja | admin@example.com | Owner account created on first boot |
| `PDF_GENERATOR` | invoiceninja | snappdf | Render PDFs with the bundled Chrome |
| `REQUIRE_HTTPS` | invoiceninja | true | Redirect insecure requests to HTTPS |
| `UPDATE_SECRET` | invoiceninja | (secret) | Guards the /update maintenance route |
| `MAIL_FROM_NAME` | invoiceninja | Invoice Ninja | Sender display name |
| `REDIS_PASSWORD` | invoiceninja | (secret) | Redis auth password |
| `SESSION_DRIVER` | invoiceninja | redis | Session store, Redis database 0 |
| `FILESYSTEM_DISK` | invoiceninja | debian_docker | Store uploads under storage/app/public |
| `MAIL_ENCRYPTION` | invoiceninja | null | Plain SMTP; Mailpit advertises no STARTTLS |
| `MAX_UPLOAD_SIZE` | invoiceninja | 64M | nginx and PHP upload ceiling |
| `TRUSTED_PROXIES` | invoiceninja | 0.0.0.0/0,::/0 | Read real client IP from X-Forwarded-For |
| `QUEUE_CONNECTION` | invoiceninja | redis | Job queue backend |
| `MAIL_FROM_ADDRESS` | invoiceninja | invoices@example.com | Sender address on outgoing invoices |
| `NINJA_ENVIRONMENT` | invoiceninja | selfhost | Self-hosted mode; closes public signup |
| `PRECONFIGURED_INSTALL` | invoiceninja | true | Stops /setup overriding the database connection |
| `PHANTOMJS_PDF_GENERATION` | invoiceninja | false | Disable the legacy PDF service |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on image startup |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |
| `TZ` | mailpit | UTC | Timestamp timezone |
| `PORT` | mailpit | 8025 | Web inbox listening port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Ring-buffer size for captured mail |
| `MP_SMTP_AUTH_ACCEPT_ANY` | mailpit | true | Accept any SMTP credentials |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow plain SMTP on the private network |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/invoice-ninja-billing)
