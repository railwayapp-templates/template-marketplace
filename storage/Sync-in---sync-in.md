# Deploy Sync-in on Railway

Self-hosted file sync and sharing with MariaDB. Admin from env, no sign-up.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sync-in)

## About

Sync-in is a self-hosted platform for file storage, sync, sharing and team collaboration. This template deploys the upstream Sync-in server with a bundled MariaDB database. The administrator is created from variables on the first start, and public sign-up is closed. Community-maintained template, not affiliated with the Sync-in project, and no logo is used.

Sync-in runs as a single service that stores your files on a Railway volume at `/app/data`. Accounts, shares and the file index live in MariaDB on a second volume. Both services redeploy without losing data. The administrator password is generated and shown in the service variables; sign in at your public domain and change it in the app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | `syncin/server:2.5.2@sha256:c6a618f955601722d033057f489380618310eda895f1eb1ea755570bee25fd40` | Web service |
| db | `mariadb:11.8@sha256:6422478cb8e159f080fb1d8ccf65101e26fe51385787fde7d16c3b165a331f15` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | server | UTC | Server time zone. |
| `INIT_ADMIN` | server | true | Any value turns on the first-start admin bootstrap. Leave it as it is. |
| `INIT_ADMIN_LOGIN` | server | (secret) | Login name of the administrator, created on the first start. Sign in with it. |
| `SYNCIN_MAIL_HOST` | server | - | Optional. SMTP host for notification and password e-mail (also set SYNCIN_MAIL_PORT, SYNCIN_MAIL_SENDER). |
| `SYNCIN_MAIL_PORT` | server | - | Optional. SMTP port (default 25). |
| `SYNCIN_MYSQL_URL` | server | - | Connection string to the bundled MariaDB over Railway's private network. Built from the db service. |
| `SYNCIN_MAIL_SENDER` | server | - | Optional. From address, e.g. Sync-in<notification@example.com>. |
| `SYNCIN_SERVER_PORT` | server | 8080 | Port the server listens on (8080). Keep it equal to the public domain's target port. |
| `INIT_ADMIN_PASSWORD` | server | (secret) | The administrator's initial password, generated. Copy it to sign in; change it in Sync-in later. |
| `SYNCIN_LOGGER_LEVEL` | server | - | Optional. trace, debug, info (default), warn, error or fatal. |
| `SYNCIN_AUTH_PROVIDER` | server | - | Optional. mysql (default, local accounts), ldap or oidc. Set the matching SYNCIN_AUTH_* values from the upstream docs. |
| `SYNCIN_MAIL_AUTH_PASS` | server | - | Optional. SMTP password. |
| `SYNCIN_MAIL_AUTH_USER` | server | (secret) | Optional. SMTP user name. |
| `SYNCIN_SERVER_PUBLICURL` | server | - | The public address of this service, used in notification links and editor URLs. Set it to your custom domain if you add one. |
| `SYNCIN_AUTH_ENCRYPTIONKEY` | server | - | Encrypts user secrets (MFA) at rest, generated. Do not change it after users enable MFA. |
| `SYNCIN_AUTH_TOKEN_ACCESS_SECRET` | server | (secret) | Signs access tokens and cookies, generated. |
| `SYNCIN_AUTH_TOKEN_REFRESH_SECRET` | server | (secret) | Signs refresh tokens and cookies, generated. Different from the access secret. |
| `MARIADB_DATABASE` | db | sync_in | Database created on the first start. |
| `MARIADB_ROOT_PASSWORD` | db | (secret) | MariaDB root password, generated. The app connects as root, as upstream does. |

## Configuration

- **Healthcheck:** `/healthz/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/sync-in)
