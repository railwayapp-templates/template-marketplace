# Deploy Seafile + ONLYOFFICE on Railway

Private Open Source Version of Google; Drive + Docs + Sheets + Slides

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/seafile-onlyoffice)

## About

Seafile + ONLYOFFICE is a powerful self-hosted file cloud and document editing stack that lets you store, sync, and collaborate on files with full control. Seafile provides fast and reliable file syncing and sharing, while ONLYOFFICE adds real-time collaborative editing for documents, spreadsheets, and presentations, all running on your own infrastructure.

![Seafile](https://github.com/rpuls/my-own-suite/blob/main/site/src/assets/screenshots/seafile/seafile-private-cloud-starred-library-favorites-quick-access-dashboard.png?raw=true)

![ONLYOFFICE](https://github.com/rpuls/my-own-suite/blob/main/site/src/assets/screenshots/onlyoffice/onlyoffice-open-source-self-hosted-office-suite-word-document-real-time-collaboration-editor.png?raw=true)

Hosting Seafile + ONLYOFFICE gives you a private alternative to services like Google Drive, OneDrive, or Dropbox, without sacrificing modern collaboration features. You get full ownership and control over your deployment while still enjoying browser-based editing, sharing, and syncing across devices.

This template provides a ready-to-run setup where Seafile and ONLYOFFICE are pre-configured to work together seamlessly. Railway handles the infrastructure and deployment, so you can focus on using your cloud instead of wiring services together manually.

If you are looking for a broader all-in-one experience that includes photos, passwords, calendars, and more, check out My Own Suite, which builds on setups like this into a complete private cloud ecosystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Memcached | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/seafile) | Worker |
| OnlyOffice | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/onlyoffice) | Web service |
| MySQL | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/seafile) | Database |
| Seafile | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/seafile) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `DB_USER_HOST` | Seafile | % | - |
| `SMTP_ENABLED` | Seafile | false | OBD: requires Railway pro plan ‼️ Enable email features for compatible apps |
| `SMTP_PASSWORD` | Seafile | (secret) | Custom SMTP password or API key |
| `SMTP_SECURITY` | Seafile | starttls | SMTP security: starttls, force_tls, or off |
| `SMTP_USERNAME` | Seafile | (secret) | Custom SMTP username |
| `SEAFILE_ADMIN_EMAIL` | Seafile | admin@example.com | - |
| `ONLYOFFICE_JWT_SECRET` | Seafile | (secret) | - |
| `SEAFILE_ADMIN_PASSWORD` | Seafile | (secret) | - |
| `SEAFILE_SERVER_PROTOCOL` | Seafile | https | - |
| `SEAFILE_SERVER_LETSENCRYPT` | Seafile | false | required for adding custom domain, SSL will be handled by Railway |
| `VERIFY_ONLYOFFICE_CERTIFICATE` | Seafile | true | - |

## Configuration

- **Start command:** `docker-entrypoint.sh memcached -vv --max-item-size=32m`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/onlyoffice/Data`
- **Start command:** `docker-entrypoint.sh mysqld --default-authentication-plugin=mysql_native_password --innodb-use-native-aio=0 --skip-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/shared`

**Category:** Storage · **Languages:** TypeScript, CSS, JavaScript, MDX, Astro, Shell, Dockerfile, PowerShell, HTML

[View on Railway →](https://railway.com/deploy/seafile-onlyoffice)
