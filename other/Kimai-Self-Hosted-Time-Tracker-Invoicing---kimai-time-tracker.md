# Deploy Kimai — Self-Hosted Time Tracker & Invoicing on Railway

Self-host Kimai — track billable hours, no per-seat fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kimai-time-tracker)

## About

Kimai is the #1 open-source time tracker — a self-hosted alternative to Toggl and Harvest with timesheets, projects, customers, activities, reports, and invoicing built in. Freelancers, agencies, and teams use it to track billable hours and turn them into invoices, without per-user subscriptions. This template deploys the official Kimai image wired to a Railway MySQL service, with the Apache and connection-string gotchas already solved and a strong admin account generated, so you're tracking time and billing clients in minutes.

---

Kimai is a mature, capable app, and a few Railway-specific details decide whether it deploys cleanly — all handled here.

**The `DATABASE_URL` needs the exact server version.** Kimai's connection string isn't just host and credentials — it includes `?charset=utf8mb4&serverVersion=X`, and that server version must match your actual MySQL version, or Kimai throws errors on migrations and queries. This is the most common Kimai setup mistake. This template builds the `DATABASE_URL` with the correct charset and server version for the provisioned MySQL, so it connects and migrates cleanly on first deploy.

**The Apache MPM workaround is applied.** Kimai's official image runs PHP on Apache, and `php:*-apache` images need an MPM-prefork configuration fix to run correctly on Railway. This template pre-applies that workaround, so the web server starts properly instead of failing — the same class of issue that trips up any Apache-based app on the platform.

**`TRUSTED_HOSTS` and `TRUSTED_PROXIES` must match Railway.** Kimai validates incoming requests against `TRUSTED_HOSTS` (your Railway domain) and needs `TRUSTED_PROXIES` set for Railway's edge proxy, or it rejects requests or generates wrong URLs. This template configures both for your deployment.

**Your admin account and secret are generated.** `ADMINMAIL` and `ADMINPASS` create your administrator on first boot, and a strong 32-character `APP_SECRET` is generated to encrypt sessions — keep it stable, since changing it logs everyone out. After deploy, open your Railway URL, land on `/en/login`, and sign in with the generated admin credentials from the Variables tab.

**Data and plugins persist correctly.** All tracking data — timesheets, customers, projects, invoices — lives in MySQL, while plugins, sessions, and the install marker persist on the `/opt/kimai/var` volume. Both survive redeploys. Point `MAILER_URL` at your SMTP provider so resets and invoice emails work.

Typical cost: **~$5–10/month** on Railway for Kimai and MySQL — a small team often fits the hobby tier. Kimai is GPL-3.0 and free, with no per-user licensing versus Toggl and Harvest's per-seat fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Kimai | `kimai/kimai2:apache` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Kimai | 8001 | - |
| `APP_ENV` | Kimai | prod | - |
| `ADMINMAIL` | Kimai | - | Bootstrap admin email (first deploy only) |
| `ADMINPASS` | Kimai | - | Bootstrap admin password (first deploy only) |
| `APP_SECRET` | Kimai | (secret) | - |
| `MAILER_URL` | Kimai | null://null | - |
| `MAILER_FROM` | Kimai | kimai@example.com | - |
| `memory_limit` | Kimai | 512M | - |
| `TRUSTED_PROXIES` | Kimai | 100.64.0.0/10 | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/kimai/var`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kimai-time-tracker)
