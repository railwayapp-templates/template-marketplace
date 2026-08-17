# Deploy Kimai on Railway

Toggl Alternative. Open source time tracking, timesheets and invoicing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kim-ai)

## About

Kimai is an open source time-tracking application for freelancers, agencies and in-house teams who need to know where their hours actually went. You record time against a customer, a project and an activity — punching a timer in and out, or entering hours after the fact — and Kimai turns those records into timesheets, reports, exports and invoices. In development since 2006 and licensed AGPL-3.0, it includes roles and teams, per-user rates, budgets, a REST API and two-factor authentication.

Deploy Kimai on Railway and that stack runs without you touching a Dockerfile. The template pairs the official `kimai/kimai2:apache` image — Apache with mod_php on port 8001 — with a managed MySQL database on private networking, plus a volume at `/opt/kimai/var` for plugins, invoices and exports. Your first super-admin is created on the first boot from two variables you set before deploying.

![Kimai Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786895151/ac7065d8-c34a-42fe-8765-0352205889ee.png)

Kimai solves an unglamorous problem: proving how long work took, to a client or to yourself. Self-hosting makes sense when headcount makes per-seat billing painful, or when confidentiality rules out a third-party server.

- Timer-based and manual entry, with a calendar and weekly-hours grid
- Customers, projects and activities, each with money and time budgets
- Roles, teams, and per-user hourly and internal rates
- Reporting by user, project, customer, week, month or year
- Invoicing from tracked time, plus CSV, XLSX, PDF and HTML exports
- REST API with token auth, a plugin marketplace, 2FA, LDAP and SAML

Kimai is one container running Apache and PHP 8.3, holding no state beyond its volume. MySQL holds everything durable, including login sessions in a `kimai2_sessions` table rather than in container memory — which is why a redeploy does not sign your team out. There is no worker or queue tier, so two services is the complete production shape.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| kimai | `kimai/kimai2:apache` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Private hostname, never publicly exposed |
| `MYSQLPORT` | MySQL | 3306 | MySQL port on the private network |
| `MYSQLUSER` | MySQL | root | Superuser; give the app a scoped user instead |
| `MYSQL_URL` | MySQL | - | Private-network connection string |
| `MYSQL_USER` | MySQL | (secret) | Superuser; give the app a scoped user instead |
| `MYSQLDATABASE` | MySQL | - | Alias consumers reference as ${{MySQL.MYSQLDATABASE}} |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first init |
| `MYSQL_PASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_PUBLIC_URL` | MySQL | - | External connection string; empty host/port until a TCP proxy exists |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated once at init — read only when the data dir is created |
| `PORT` | kimai | 8001 | Apache listen port, fixed by image |
| `ADMINMAIL` | kimai | admin@example.com | Email of first super-admin |
| `ADMINPASS` | kimai | - | Password for username admin |
| `APP_SECRET` | kimai | (secret) | Signs sessions and CSRF tokens |
| `MAILER_URL` | kimai | null://null | SMTP DSN; null discards all mail |
| `DEFAULT_URI` | kimai | - | Public base URL for generated links |
| `MAILER_FROM` | kimai | - | Sender address on outgoing mail |
| `DATABASE_URL` | kimai | - | MySQL connection DSN |
| `TRUSTED_PROXIES` | kimai | 0.0.0.0/0,::/0 | Trust Railway edge for client IP |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/bash -c 'echo "boot: mpm modules before ="$(ls /etc/apache2/mods-enabled/ | grep -i mpm | tr "\n" " "); a2dismod mpm_event mpm_worker >/dev/null 2>&1 || true; rm -f /etc/apache2/mods-enabled/mpm_event.* /etc/apache2/mods-enabled/mpm_worker.*; a2enmod mpm_prefork >/dev/null 2>&1 || true; echo "boot: mpm modules after ="$(ls /etc/apache2/mods-enabled/ | grep -i mpm | tr "\n" " "); exec /entrypoint.sh'`
- **Healthcheck:** `/en/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/kimai/var`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kim-ai)
