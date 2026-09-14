# Deploy Bugsink Error Tracking on Railway

Self-hosted error tracking with private MySQL and generated admin access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bugsink-error-trac-1)

## About

Self-hosted error tracking with private MySQL and generated admin access.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Two services: Bugsink and private MySQL 8.4. Retention defaults to 30 days and 100,000 events; tune after measuring your workload. No separate event volume is used: back up MySQL. The upstream PolyForm Shield license has restrictions; this listing does not grant rights to offer a competing hosted service. SDK ingestion is intentionally public and uses the application DSN.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql | `mysql:8.4@sha256:85b9bf2e29cf836ecb8c2a15a935d4ba0c606631dff1dd79531a11983c638f2a` | Database |
| bugsink | `bugsink/bugsink:2.5.1@sha256:ecdd845877464d70d61244b8adba20d623e1860e88d8338f2808d9cc2925745c` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | mysql | (secret) | Mysql user for mysql. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_DATABASE` | mysql | bugsink | Mysql database for mysql. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_PASSWORD` | mysql | (secret) | Generated mysql password. Keep private and preserve with backups. |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) | Generated mysql root password. Keep private and preserve with backups. |
| `PORT` | bugsink | 8000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `BASE_URL` | bugsink | - | Base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PHONEHOME` | bugsink | false | Phonehome for bugsink. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `EMAIL_HOST` | bugsink | - | Optional SMTP server for invitations and alerts. |
| `SECRET_KEY` | bugsink | (secret) | Generated secret key. Keep private and preserve with backups. |
| `ADMIN_EMAIL` | bugsink | - | Required administrator email for first startup. |
| `DATABASE_URL` | bugsink | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `USE_X_REAL_IP` | bugsink | false | Use x real ip for bugsink. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ADMIN_PASSWORD` | bugsink | (secret) | Generated admin password. Keep private and preserve with backups. |
| `EMAIL_HOST_USER` | bugsink | (secret) | SMTP username. |
| `CREATE_SUPERUSER` | bugsink | - | Create superuser resolved automatically from the linked service. Keep this reference when using the included topology. |
| `USER_REGISTRATION` | bugsink | CB_ADMINS | User registration for bugsink. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `BEHIND_HTTPS_PROXY` | bugsink | true | Behind https proxy for bugsink. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DEFAULT_FROM_EMAIL` | bugsink | - | Verified sender email. |
| `MAX_EVENT_AGE_DAYS` | bugsink | 30 | Max event age days for bugsink. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `EMAIL_HOST_PASSWORD` | bugsink | (secret) | SMTP password. |
| `SNAPPEA_NUM_WORKERS` | bugsink | 2 | Snappea num workers for bugsink. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MAX_RETENTION_EVENT_COUNT` | bugsink | 100000 | Max retention event count for bugsink. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/bugsink-error-trac-1)
