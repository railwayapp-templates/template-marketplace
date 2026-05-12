# Deploy Seafile + ONLYOFFICE on Railway

Private Open Source Version of Google; Drive + Docs + Sheets + Slides

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seafile-onlyoffice)

## About

Seafile + ONLYOFFICE is a powerful self-hosted file cloud and document editing stack that lets you store, sync, and collaborate on files with full control. Seafile provides fast and reliable file syncing and sharing, while ONLYOFFICE adds real-time collaborative editing for documents, spreadsheets, and presentations, all running on your own infrastructure.

### Video Instructions
[![Watch the video](https://i3.ytimg.com/vi/VBZGHCjFHlw/maxresdefault.jpg)](https://youtu.be/VBZGHCjFHlw)
Click ☝️ to play on YouTube

Blog article: https://funkyton.com/goodbye-google-drive-my-self-hosted-drive-and-docs-replacement/

![ONLYOFFICE](https://github.com/rpuls/my-own-suite/blob/main/site/src/assets/screenshots/onlyoffice/onlyoffice-open-source-self-hosted-office-suite-word-document-real-time-collaboration-editor.png?raw=true)

Hosting Seafile + ONLYOFFICE gives you a private alternative to services like Google Drive, OneDrive, or Dropbox, without sacrificing modern collaboration features. You get full ownership and control over your deployment while still enjoying browser-based editing, sharing, and syncing across devices.

This template provides a ready-to-run setup where Seafile and ONLYOFFICE are pre-configured to work together seamlessly. Railway handles the infrastructure and deployment, so you can focus on using your cloud instead of wiring services together manually.

If you are looking for a broader all-in-one experience that includes photos, passwords, calendars, and more, check out My Own Suite, which builds on setups like this into a complete private cloud ecosystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| seafile-valkey | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/seafile) | Worker |
| OnlyOffice | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/onlyoffice) | Web service |
| MySQL | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/seafile) | Database |
| Seafile | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/seafile) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | seafile-valkey | (secret) | - |
| `JWT_SECRET` | OnlyOffice | (secret) | - |
| `JWT_ENABLED` | OnlyOffice | true | - |
| `SECURE_LINK_SECRET` | OnlyOffice | (secret) | - |
| `ALLOW_META_IP_ADDRESS` | OnlyOffice | true | - |
| `ALLOW_PRIVATE_IP_ADDRESS` | OnlyOffice | true | - |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | seafile | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `SMTP_FROM` | Seafile | noreply@example.com | Sender email shown on outgoing mail |
| `SMTP_HOST` | Seafile | smtp.example.com | Custom SMTP host for advanced users |
| `SMTP_PORT` | Seafile | 587 | Custom SMTP port, usually 587 for STARTTLS |
| `REDIS_PORT` | Seafile | 6379 | - |
| `SMTP_ENABLED` | Seafile | false | OBD: requires Railway pro plan ‼️ Enable email features for compatible apps |
| `SMTP_PASSWORD` | Seafile | (secret) | Custom SMTP password or API key |
| `SMTP_SECURITY` | Seafile | starttls | SMTP security: starttls, force_tls, or off |
| `SMTP_USERNAME` | Seafile | (secret) | Custom SMTP username |
| `CACHE_PROVIDER` | Seafile | redis | - |
| `REDIS_PASSWORD` | Seafile | (secret) | - |
| `ONLYOFFICE_JWT_SECRET` | Seafile | (secret) | - |
| `SEAFILE_MYSQL_DB_USER` | Seafile | (secret) | - |
| `SEAFILE_SERVER_PROTOCOL` | Seafile | https | - |
| `SEAFILE_MYSQL_DB_PASSWORD` | Seafile | (secret) | - |
| `SEAFILE_SERVER_LETSENCRYPT` | Seafile | false | required for adding custom domain, SSL will be handled by Railway |
| `INIT_SEAFILE_ADMIN_PASSWORD` | Seafile | (secret) | - |
| `VERIFY_ONLYOFFICE_CERTIFICATE` | Seafile | true | - |
| `SEAFILE_MYSQL_DB_CCNET_DB_NAME` | Seafile | ccnet_db | - |
| `SEAFILE_MYSQL_DB_SEAHUB_DB_NAME` | Seafile | seahub_db | - |
| `INIT_SEAFILE_MYSQL_ROOT_PASSWORD` | Seafile | (secret) | - |
| `SEAFILE_MYSQL_DB_SEAFILE_DB_NAME` | Seafile | seafile_db | - |

## Configuration

- **Start command:** `sh -lc 'valkey-server --requirepass "$REDIS_PASSWORD" --appendonly no'`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/onlyoffice/Data`
- **Start command:** `docker-entrypoint.sh mysqld --default-authentication-plugin=mysql_native_password --innodb-use-native-aio=0 --skip-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/shared`

**Category:** Storage · **Languages:** TypeScript, JavaScript, CSS, MDX, Astro, Shell, Dockerfile, PowerShell, HTML

[View on Railway →](https://railway.com/deploy/seafile-onlyoffice)
