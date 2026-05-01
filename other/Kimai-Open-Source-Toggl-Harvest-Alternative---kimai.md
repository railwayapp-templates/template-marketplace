# Deploy Kimai | Open Source Toggl & Harvest Alternative on Railway

Self Host Kimai, the #1 open-source time tracker - reports, invoices, etc.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kimai)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kimai?referralCode=QXdhdr)

Kimai is the #1 open-source time-tracking application — a self-hostable alternative to Toggl, Harvest, Clockify and Hubstaff that lets freelancers, agencies, and teams record timesheets, generate reports, send invoices, and manage projects from a single web app. Self-host Kimai on Railway in one click and run your billable-hours stack on infrastructure you own, with HTTPS, a managed MySQL database, and a persistent volume for logs and uploads.

This Railway template deploys the official `kimai/kimai2:apache` image (Kimai 2.56.0, PHP 8.3 on Apache) wired to a Railway-managed MySQL service. It pre-applies the `php:*-apache` MPM-prefork workaround required to run Apache on Railway, generates a strong `APP_SECRET` and admin password, and mounts a volume at `/opt/kimai/var` so plugins, sessions, and the install marker survive redeploys.

Kimai is a Symfony-based time-tracking platform actively maintained by Kevin Papst since 2014. It is GPL-3.0 licensed, supports unlimited users and customers in the self-hosted edition, and ships a full REST API plus a marketplace of community plugins.

Key features of self-hosted Kimai:

- Multi-user, multi-team, multi-customer time tracking with per-project activities
- Invoice generation with customisable templates (PDF/HTML), tax rates, and recurring invoices
- 30+ built-in reports — by user, customer, project, activity, tag, billable/non-billable
- REST API and webhooks for integrations with Slack, Trello, accounting systems
- Plugin marketplace with paid and free add-ons (LDAP/SSO, additional exports, custom fields)
- Two-factor authentication, role-based permissions, audit log, and per-user rates

Architecture: a single Apache + PHP-FPM container talking to a managed MySQL service over Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kimai | `kimai/kimai2:apache` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Kimai | 8001 | Railway edge routing signal (apache Listen is hardcoded) |
| `APP_ENV` | Kimai | prod | Symfony environment |
| `ADMINMAIL` | Kimai | - | Bootstrap admin email (first deploy only) |
| `ADMINPASS` | Kimai | - | Bootstrap admin password (first deploy only) |
| `APP_SECRET` | Kimai | (secret) | Symfony cookie/session signing key |
| `MAILER_URL` | Kimai | null://null | Symfony Mailer DSN (replace with smtp:// to enable) |
| `MAILER_FROM` | Kimai | kimai@example.com | Sender address on outbound mail |
| `DATABASE_URL` | Kimai | - | Doctrine DSN to managed MySQL |
| `memory_limit` | Kimai | 512M | PHP memory_limit at runtime |
| `TRUSTED_PROXIES` | Kimai | 100.64.0.0/10 | Railway CGNAT proxy range |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |

## Configuration

- **Start command:** `/bin/bash -c 'a2dismod mpm_event 2>/dev/null; a2enmod mpm_prefork 2>/dev/null; exec /entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/kimai/var`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kimai)
