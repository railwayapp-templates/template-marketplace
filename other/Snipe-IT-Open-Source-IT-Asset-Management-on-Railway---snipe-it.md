# Deploy Snipe-IT | Open Source IT Asset Management on Railway on Railway

Self Host Snipe-IT. Track hardware, licenses, and assets & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/snipe-it)

## About

Deploy Snipe-IT on Railway to get a fully functional IT asset management system running in minutes. Snipe-IT is the leading open-source platform for tracking hardware assets, software licenses, consumables, and accessories across your organization — built on Laravel with a clean web interface and a comprehensive REST API.

This Railway template pre-configures Snipe-IT with a MySQL database for persistent storage, HTTPS-ready environment variables, and a mounted volume for file uploads and backups. Self-host Snipe-IT on Railway and take full control of your asset inventory without vendor lock-in.

Snipe-IT is a free, open-source IT asset management system built by Grokability. It solves the problem of tracking who has what, where it is, and when licenses expire — replacing spreadsheets with a purpose-built tool that includes audit trails, check-in/check-out workflows, and compliance-ready reporting.

Key features of self-hosted Snipe-IT include:

- **Hardware asset tracking** with check-in/check-out, status labels, and location management
- **Software license management** with seat tracking and expiration alerts
- **Barcode and QR code scanning** for fast asset identification
- **Custom fields** for tracking organization-specific metadata
- **Full audit log** with timestamps and user attribution for every action
- **REST API** for integrations with LDAP, SSO, and third-party tools
- **55+ language support** for international teams
- **Granular permissions** with role-based access control

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Snipe-IT | `snipe/snipe-it:latest` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Snipe-IT | 80 | Container listening port |
| `APP_ENV` | Snipe-IT | production | Application environment |
| `APP_KEY` | Snipe-IT | - | Laravel encryption key (base64-encoded) |
| `APP_URL` | Snipe-IT | - | Public-facing URL with HTTPS |
| `DB_HOST` | Snipe-IT | - | MySQL internal hostname |
| `DB_PORT` | Snipe-IT | - | MySQL port |
| `APP_DEBUG` | Snipe-IT | false | Disable debug mode |
| `APP_LOCALE` | Snipe-IT | en-US | Default locale |
| `DB_CHARSET` | Snipe-IT | utf8mb4 | Database character set |
| `DB_DATABASE` | Snipe-IT | - | Database name |
| `DB_PASSWORD` | Snipe-IT | (secret) | Database password |
| `DB_USERNAME` | Snipe-IT | (secret) | Database username |
| `MAIL_MAILER` | Snipe-IT | log | Email driver (log = no email) |
| `APP_TIMEZONE` | Snipe-IT | UTC | Server timezone |
| `DB_COLLATION` | Snipe-IT | utf8mb4_unicode_ci | Database collation |
| `APP_FORCE_TLS` | Snipe-IT | true | Force HTTPS behind Railway proxy |
| `DB_CONNECTION` | Snipe-IT | mysql | Database driver |
| `ALLOW_DATA_PURGE` | Snipe-IT | false | Prevent data purge |
| `SESSION_LIFETIME` | Snipe-IT | 12000 | Session timeout in minutes |
| `ALLOW_BACKUP_DELETE` | Snipe-IT | false | Prevent backup deletion |
| `APP_TRUSTED_PROXIES` | Snipe-IT | * | Trust Railway proxy headers |
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

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/snipeit`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/snipe-it)
