# Deploy Invoice Ninja 5 | Invoicing with PDFs, Queue and Nightly Backups on Railway

Invoices, quotes and payments with working PDFs, queue and nightly backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invoice-ninja-5)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/invoice-ninja-5?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=invoice-ninja-5)

[Invoice Ninja](https://invoiceninja.com/) is self-hosted invoicing and billing for freelancers and small businesses: invoices, quotes, recurring invoices and subscriptions, expenses, time tracking, and a client portal where clients view and pay invoices through Stripe, PayPal, GoCardless and more than a dozen other payment gateways. Its source is on GitHub under the Elastic License 2.0. This template runs the official Invoice Ninja 5 image with everything it needs working from the first boot: PDF generation, the queue worker, the scheduler, and nightly backups.

The stack is three pieces: Invoice Ninja (nginx, PHP-FPM, queue worker and scheduler in one service), a private MariaDB, and a Railway bucket for backups.

- **No open setup page.** A fresh Invoice Ninja shows its setup screen to whoever opens the URL first. This template creates your admin account on the first boot, before the site answers, with your email and a generated password. The database has a generated password and no public proxy.
- **PDFs, emails and recurring invoices work.** The official image renders PDFs with Chrome, which is included and set up here. The queue worker sends emails and builds PDFs in the background, and the scheduler runs recurring invoices, reminders and auto-billing every hour. Queued jobs are stored in MariaDB, so they survive restarts.
- **Pinned and upgraded on purpose.** The template pins Invoice Ninja 5.13.43 instead of `latest`, so a new upstream release never lands in the middle of your month. Database migrations run on every boot, so updating means bumping the tag and redeploying.
- **Nightly backups.** Every night at 03:00 UTC the database, uploaded files and the encryption key go to the bundled bucket, one archive per weekday, so the last 7 days are always there. Restoring is one command.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Invoice Ninja | [nomideusz/invoiceninja-railway](https://github.com/nomideusz/invoiceninja-railway) (root: /) | Web service |
| MariaDB | `mariadb:11.8.9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Invoice Ninja | 8080 | Port nginx listens on - leave as is |
| `APP_KEY` | Invoice Ninja | - | Encrypts stored gateway, email and bank credentials. Never change it after the first boot |
| `APP_URL` | Invoice Ninja | - | Public URL used in emails, PDFs and the client portal. Change it when you add a custom domain |
| `DB_HOST` | Invoice Ninja | - | MariaDB host - private network only, leave as is |
| `DB_PORT` | Invoice Ninja | 3306 | MariaDB port |
| `S3_BUCKET` | Invoice Ninja | - | Backup bucket name. Empty = no nightly backups |
| `S3_REGION` | Invoice Ninja | - | Backup bucket region |
| `DB_DATABASE` | Invoice Ninja | - | Database name - wired to the bundled MariaDB, leave as is |
| `DB_PASSWORD` | Invoice Ninja | (secret) | Database password - wired to the bundled MariaDB, leave as is |
| `DB_USERNAME` | Invoice Ninja | (secret) | Database user - wired to the bundled MariaDB, leave as is |
| `IN_PASSWORD` | Invoice Ninja | (secret) | Password of the first admin, used on first boot only - change it in Settings > User Details afterwards |
| `MAIL_MAILER` | Invoice Ninja | log | Mailer for system emails. 'log' writes them to the logs; see the template README for SMTP (Pro plan) or per-company API providers |
| `S3_ENDPOINT` | Invoice Ninja | - | Nightly backups go to the bundled bucket - leave as is |
| `IN_USER_EMAIL` | Invoice Ninja | - | Your email address: the login of the first admin (created on first boot) and where password resets go |
| `S3_ACCESS_KEY_ID` | Invoice Ninja | - | Backup bucket credentials |
| `S3_SECRET_ACCESS_KEY` | Invoice Ninja | (secret) | Backup bucket credentials |
| `MARIADB_USER` | MariaDB | (secret) | Database user for Invoice Ninja |
| `MARIADB_DATABASE` | MariaDB | ninja | Database name |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Auto-generated database password |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Auto-generated root password |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`
- **Start command:** `docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/invoice-ninja-5)
