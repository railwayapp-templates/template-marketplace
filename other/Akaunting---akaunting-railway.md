# Deploy Akaunting on Railway

Accounting software for invoices, expenses and financial reports

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/akaunting-railway)

## About

Akaunting is open source accounting software for small businesses and freelancers: invoicing, bills, customers and vendors, bank accounts and transfers, double-entry categories and financial reports, in a Laravel application you own end to end. It is what people reach for when QuickBooks or FreshBooks feels heavy but a spreadsheet has stopped being enough. Self-host Akaunting and the ledger, the client list and the invoice history stay on your own infrastructure, with no seat pricing and nobody between you and your books.

Deploy Akaunting on Railway and the whole stack arrives wired together: the web application built from the `gridalpha/akaunting-railway` repository, a managed **MySQL** database holding every record, and a managed **Redis** backing cache, sessions and the job queue. The container runs three processes under supervisord — Apache, a queue worker for emails and exports, and Laravel's scheduler for recurring invoices and reminders — so nothing needs a separate cron host. A 5 GB volume at `/data` holds attachments, generated PDFs and any modules you add later.

![Akaunting connected to MySQL and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787757827/akaunting-architecture.png)

Akaunting is a full double-entry accounting application, not an invoice generator with a database behind it. Every invoice, bill and payment lands in a category and against a bank account, which is what makes its Profit & Loss and Tax Summary reports meaningful. Teams self-host it when client names, rates and revenue are commercially sensitive, when they need several companies under one login, or when per-user SaaS pricing stops making sense.

What you get out of the box:

- Invoices and estimates with recurring schedules, partial payments and statements
- Bills, vendors and expense tracking on the purchases side
- Bank accounts, transfers and reconciliation
- Multi-company, multi-currency and multi-language support
- Profit & Loss, Income Summary, Expense Summary and Tax Summary reports
- A client portal where customers view and pay their own invoices
- A REST API and an App Store of modules

Three services carry it. **Akaunting** is the Laravel application: Apache and PHP 8.3 serve every page, `queue:work` handles anything slow enough to block a request, and `schedule:work` runs the jobs behind recurring invoices and reminders. **MySQL** stores every record. **Redis** holds cache, sessions and the queue, which is what lets the container be replaced on each deploy without signing everyone out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| akaunting | [gridalpha/akaunting-railway](https://github.com/gridalpha/akaunting-railway) | Web service |
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | akaunting | 8080 | Apache listening port |
| `APP_URL` | akaunting | - | Public-facing app URL |
| `DB_HOST` | akaunting | - | Private MySQL hostname |
| `DB_PORT` | akaunting | 3306 | MySQL port |
| `DB_PREFIX` | akaunting | akt_ | Table prefix, fixed across redeploys |
| `REDIS_URL` | akaunting | - | Cache, session and queue connection |
| `APP_LOCALE` | akaunting | en-GB | Interface language |
| `DB_DATABASE` | akaunting | - | Database name |
| `DB_PASSWORD` | akaunting | (secret) | Bootstrap account password |
| `DB_USERNAME` | akaunting | (secret) | Bootstrap account, swapped for a scoped role |
| `APP_TIMEZONE` | akaunting | UTC | Timezone for dates and reports |
| `APP_SCHEDULE_TIME` | akaunting | 09:00 | When reminders and recurring documents run |
| `AKAUNTING_APP_SECRET` | akaunting | (secret) | Seed for encryption key and DB role |
| `AKAUNTING_ADMIN_EMAIL` | akaunting | admin@example.com | First administrator's login |
| `AKAUNTING_COMPANY_NAME` | akaunting | My Company | First company name, install-time only |
| `AKAUNTING_COMPANY_EMAIL` | akaunting | admin@example.com | First company email, install-time only |
| `AKAUNTING_ADMIN_PASSWORD` | akaunting | (secret) | First administrator's password |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/akaunting-railway)
