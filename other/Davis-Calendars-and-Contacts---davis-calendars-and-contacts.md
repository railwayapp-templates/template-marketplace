# Deploy Davis Calendars and Contacts on Railway

CalDAV and CardDAV with a protected administration dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/davis-calendars-and-contacts)

## About

CalDAV and CardDAV with a protected administration dashboard.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

CalDAV and CardDAV with a protected administration dashboard.

| Service | Role | Persistent path |
| --- | --- | --- |
| `mariadb` | Private application or dependency | `/var/lib/mysql` |
| `davis` | Public application | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:10.11@sha256:7f22313fc130a377a44999965bcb0a08dd5b21e8502824c1b864f792f9bc66ab` | Database |
| davis | `ghcr.io/tchapi/davis-standalone:5.4.4@sha256:18c38a54b86d15fc6f7f51c7cc68ab45c958da3175f68bc5e4ebe69b1da4ce8b` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | mariadb | (secret) | Mariadb user for mariadb; follows the upstream deployment configuration. |
| `MARIADB_DATABASE` | mariadb | davis | Mariadb database for mariadb; follows the upstream deployment configuration. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `APP_ENV` | davis | prod | App env for davis; follows the upstream deployment configuration. |
| `APP_SECRET` | davis | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `AUTH_REALM` | davis | Davis | Auth realm for davis; follows the upstream deployment configuration. |
| `MAILER_DSN` | davis | null://null | Mailer dsn for davis; follows the upstream deployment configuration. |
| `ADMIN_LOGIN` | davis | (secret) | Admin login for davis; follows the upstream deployment configuration. |
| `AUTH_METHOD` | davis | Basic | Auth method for davis; follows the upstream deployment configuration. |
| `APP_TIMEZONE` | davis | UTC | App timezone for davis; follows the upstream deployment configuration. |
| `DATABASE_URL` | davis | - | Resolved from the linked service; preserve this reference for the included topology. |
| `ADMIN_PASSWORD` | davis | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `CALDAV_ENABLED` | davis | true | Caldav enabled for davis; follows the upstream deployment configuration. |
| `WEBDAV_ENABLED` | davis | false | Webdav enabled for davis; follows the upstream deployment configuration. |
| `CARDDAV_ENABLED` | davis | true | Carddav enabled for davis; follows the upstream deployment configuration. |
| `DATABASE_DRIVER` | davis | mysql | Database driver for davis; follows the upstream deployment configuration. |
| `ADMIN_AUTH_BYPASS` | davis | false | Admin auth bypass for davis; follows the upstream deployment configuration. |
| `SYMFONY_TRUSTED_PROXIES` | davis | 127.0.0.1,REMOTE_ADDR | Symfony trusted proxies for davis; follows the upstream deployment configuration. |
| `PUBLIC_CALENDARS_ENABLED` | davis | false | Public calendars enabled for davis; follows the upstream deployment configuration. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Start command:** `sh -ec 'until php bin/console doctrine:query:sql "SELECT 1" >/dev/null 2>&1; do sleep 2; done
php bin/console doctrine:migrations:migrate --no-interaction
exec /usr/bin/supervisord -c /etc/supervisord.conf'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/davis-calendars-and-contacts)
