# Deploy SendPortal on Railway

SendPortal template with PostgreSQL & Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sendportal)

## About

**SendPortal** is an open‑source, self‑hosted email marketing app (built on Laravel) for creating lists, tags, templates and sending campaigns via your own email provider. It is lightweight, database‑backed, and supports multiple ESPs (Postmark, SES, Mailgun, SendGrid, Mailjet, SMTP).

This template provisions a ready‑to‑run container that serves SendPortal (via FrankenPHP/Caddy), a PostgreSQL database for application data, and Redis for queues/caching. Laravel Horizon is enabled to process SendPortal queues (`sendportal-message-dispatch`, `sendportal-webhook-process`) and the Laravel scheduler runs every minute to progress campaigns and housekeeping tasks. A health endpoint is exposed at `/health` for Railway checks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| sendportal | [XavTo/sendportal-Selfhost](https://github.com/XavTo/sendportal-Selfhost) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `APP_ENV` | sendportal | production | - |
| `APP_NAME` | sendportal | SendPortal | - |
| `APP_DEBUG` | sendportal | false | - |
| `MAIL_HOST` | sendportal | - | The SMTP server used to send outgoing emails. Example: pro2.mail.ovh.net |
| `MAIL_PORT` | sendportal | - | The port number used by the SMTP server. Usually 587 for TLS, 465 for SSL, or 25 for plain connections. Example: 587 |
| `DB_PASSWORD` | sendportal | (secret) | - |
| `DB_USERNAME` | sendportal | (secret) | - |
| `MAIL_MAILER` | sendportal | smtp | - |
| `APP_TIMEZONE` | sendportal | - | The default application timezone. This value should be a valid PHP timezone identifier (Europe/Paris, America/New_York, UTC). |
| `CACHE_DRIVER` | sendportal | redis | - |
| `DB_CONNECTION` | sendportal | pgsql | - |
| `MAIL_PASSWORD` | sendportal | (secret) | The password associated with your SMTP username. Make sure this value is stored securely. Example: your-secure-password |
| `MAIL_USERNAME` | sendportal | (secret) | The username or full email address used to authenticate with your SMTP provider. Example: info@mail.com |
| `REDIS_PASSWORD` | sendportal | (secret) | - |
| `SESSION_DRIVER` | sendportal | redis | - |
| `MAIL_ENCRYPTION` | sendportal | - | The encryption protocol used for the SMTP connection. Valid values: tls, ssl, or null (no encryption). Example: tls |
| `BROADCAST_DRIVER` | sendportal | log | - |
| `QUEUE_CONNECTION` | sendportal | redis | - |
| `SESSION_LIFETIME` | sendportal | 120 | - |
| `MAIL_FROM_ADDRESS` | sendportal | - | The email address that will appear in the "From" field of outgoing emails. Example: info@yourdomain.com |
| `SENDPORTAL_REGISTER` | sendportal | true | - |
| `SESSION_SECURE_COOKIE` | sendportal | true | - |
| `SENDPORTAL_PASSWORD_RESET` | sendportal | (secret) | - |
| `SENDPORTAL_THROTTLE_MIDDLEWARE` | sendportal | 60,1 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** PHP, Blade, Dockerfile, Shell

[View on Railway →](https://railway.com/template/sendportal)
