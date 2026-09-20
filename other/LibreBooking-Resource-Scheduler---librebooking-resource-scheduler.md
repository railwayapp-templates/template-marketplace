# Deploy LibreBooking Resource Scheduler on Railway

Private room and equipment reservations with MariaDB and durable uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librebooking-resource-scheduler)

## About

Private room and equipment reservations with MariaDB and durable uploads.

LibreBooking 5.3.0 manages reservations for rooms, equipment and shared resources. A private MariaDB service stores accounts and reservations; one app volume stores configuration, resource images and reservation attachments. Only the owner gateway receives a public domain.

| Service | Access | Persistent storage |
| --- | --- | --- |
| mariadb | Private | /var/lib/mysql |
| core | Private | /data |
| librebooking | Public HTTPS | None |

Railway terminates public TLS. Keep volume-backed services at one replica. Database and core application ports are private; only the generated owner gateway is public.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| librebooking | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| mariadb | `mariadb:10.11@sha256:7f22313fc130a377a44999965bcb0a08dd5b21e8502824c1b864f792f9bc66ab` | Database |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | librebooking | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | librebooking | true | Owner auth for librebooking. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | librebooking | all | Owner scope for librebooking. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | librebooking | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | librebooking | 8080 | Upstream port for librebooking. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | librebooking | (secret) | Generated access password. Keep private and preserve with backups. |
| `MARIADB_USER` | mariadb | (secret) | Mariadb user for mariadb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MARIADB_DATABASE` | mariadb | librebooking | Mariadb database for mariadb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MARIADB_PASSWORD` | mariadb | (secret) | Generated mariadb password. Keep private and preserve with backups. |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Generated mariadb root password. Keep private and preserve with backups. |
| `LB_APP_DEBUG` | core | false | Lb app debug for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_SCRIPT_URL` | core | - | Lb script url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LB_ADMIN_EMAIL` | core | - | Required administrator email. Register the first application account with exactly this address after completing the protected installer. |
| `LB_LOGGING_SQL` | core | false | Lb logging sql for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_DATABASE_NAME` | core | librebooking | Lb database name for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_DATABASE_USER` | core | (secret) | Lb database user for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_EMAIL_ENABLED` | core | false | Lb email enabled for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_LOGGING_LEVEL` | core | error | Lb logging level for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_DEFAULT_TIMEZONE` | core | UTC | Lb default timezone for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_INSTALL_PASSWORD` | core | (secret) | Generated installer password. Use the existing restricted database user; leave Create database and Create user unchecked. Clear this variable after setup. |
| `LB_DATABASE_HOSTSPEC` | core | - | Lb database hostspec resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LB_DATABASE_PASSWORD` | core | (secret) | Lb database password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LB_ICS_SUBSCRIPTION_KEY` | core | - | Generated lb ics subscription key. Keep private and preserve with backups. |
| `LB_PASSWORD_DISABLE_RESET` | core | (secret) | Lb password disable reset for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_PRIVACY_VIEW_SCHEDULES` | core | false | Lb privacy view schedules for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_RESERVATION_REMINDERS_ENABLED` | core | false | Lb reservation reminders enabled for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_PRIVACY_ALLOW_GUEST_RESERVATIONS` | core | false | Lb privacy allow guest reservations for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_UPLOADS_RESERVATION_ATTACHMENT_PATH` | core | /data/reservations | Lb uploads reservation attachment path for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LB_REGISTRATION_ALLOW_SELF_REGISTRATION` | core | true | Enabled for the first administrator registration behind the owner gateway. Set false after creating that account; administrators can add users. |
| `LB_UPLOADS_RESERVATION_ATTACHMENTS_ENABLED` | core | true | Lb uploads reservation attachments enabled for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/librebooking-resource-scheduler)
