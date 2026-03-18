# Deploy Snipe-IT on Railway

A free open source IT asset/license management system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/7Su9hO)

## About

<p align="center">
    <a href="https://snipeitapp.com/">
        <img style="background: #fff; padding: 30px; border-radius: 5px; width: 500px;" src="https://github.com/snipe/snipe-it/assets/197404/b515673b-c7c8-4d9a-80f5-9fa58829a602" alt="snipe=it logo">
    </a>
</p>

<h3 align="center">Open Source Asset Management System</h3>

This is a FOSS project for asset management in IT Operations. Knowing who has which laptop, when it was purchased in order to depreciate it correctly, handling software licenses, etc.

### General Features

- Mobile-friendly for asset updates on the go
- Web-based software so it works on any device
- Slack notification integration for checkin/checkout 
- Tons of security features to keep your data safe
- Pre-defined "kits" for faster checkouts
- SAML login integration 
- JAMF integration using Jamf2Snipe 
- Includes a robust JSON REST API 
- Translated into over 55 languages for easy localization 
- Per-user language support for distributed teams
- One-click (or cron) backups 
- LDAP login/user sync 
- Google Secure LDAP user sync 
- SCIM support for automatic user provisioning
- new! Kandji integration using Kandji2snipe

### Admin Dashboard

At-a-glance access to recent activity and an overall view of what assets, accessories, consumables, and components you have.

Items that have been checked in, checked out, recently updated or deleted, show up in a recent activity snapshot.

## Asset Management

Easily see which assets are assigned, to whom, and their physical location. Check them back into inventory with one click, or click through to see the asset's complete history. Seeing what assets are currently deployed, pending (brand new awaiting software installs, out for repair), ready to deploy, or archived (lost/stolen, or broken) is quick and easy.

- Easily see which assets are assigned, to whom, and their physical location
- One-click checkin
- Asset Models let you group common features
- Require User Acceptance (End-User EULAs/Terms of Service) on Checkout
- Email alerts for expiring warrantees and licenses
- Integrates with most handheld barcode scanners and QR code reader apps
- Quick and easy asset auditing
- Add your own custom fields for additional asset attributes
- Easily import and export assets
- Generate QR code labels for easy mobile access and labels
- Assets marked as requestable can be requested by a user
- Assets retain full history including checkouts, checkins and maintenance
- Optional digital signatures on asset acceptance

### License Management

You get the same quick access with licenses, too. We’re working on making this even better, by letting you smartly handle multi-pack licenses with ease. Enable email alerts to get an email when your licenses are expiring.

### Email Notifications

Snipe-IT comes with beautiful built-in email notifications for users and administrators.

**Sent to Users**
- Asset Checkout/Checkin (with optional EULA and asset acceptance)
- Checkin Deadline Approaching

**Sent to Admins**
- Asset Checkout/Checkin
- Expected Checkin Report
- Expiring License Report
- Low Inventory Report

### Integrations &amp; Robust JSON REST API

Easily integrate your own proprietary systems and workflows with a powerful REST API. And while the native API is straightforward and well-documented, new open source SDKs are being developed by the community all the time to make integration even easier, including:

- Kandji2Snipe
- UniFi to Snipe-IT
- JAMF
- Google App Scripts
- SAM command line interface option for using the Snipe-IT API
- SnipeSharp .NET module
- InQRy by Microsoft
- Powershell API Wrapper

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql` | Database |
| KeyDB | `eqalpha/keydb:latest` | Database |
| Snipe-IT | `snipe/snipe-it:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway TCP Proxy Domain. |
| `MYSQLPORT` | MySQL | - | MySQL TCP Proxy port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PRIVATE_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `KEYDB_URL` | KeyDB | - | URL to connect to KeyDB Publically |
| `KEYDB_HOST` | KeyDB | - | Railway public TCP domain name |
| `KEYDB_PORT` | KeyDB | - | Port to connect to KeyDB Publically |
| `KEYDB_USER` | KeyDB | (secret) | Default user to connect to KeyDB |
| `KEYDB_PASSWORD` | KeyDB | (secret) | Password to connect to KeyDB |
| `KEYDB_PRIVATE_URL` | KeyDB | - | URL to connect to KeyDB over the private network |
| `KEYDB_PRIVATE_HOST` | KeyDB | - | Railway private domain name |
| `KEYDB_PRIVATE_PORT` | KeyDB | 6379 | Port to connect to KeyDB over the private network |
| `PORT` | Snipe-IT | 80 | - |
| `APP_ENV` | Snipe-IT | production | - |
| `APP_DEBUG` | Snipe-IT | false | - |
| `MAIL_PORT` | Snipe-IT | 587 | - |
| `APP_LOCALE` | Snipe-IT | en-US | - |
| `DB_CHARSET` | Snipe-IT | utf8mb4 | - |
| `DB_PASSWORD` | Snipe-IT | (secret) | - |
| `DB_USERNAME` | Snipe-IT | (secret) | - |
| `MAIL_DRIVER` | Snipe-IT | smtp | - |
| `APP_TIMEZONE` | Snipe-IT | UTC | - |
| `DB_COLLATION` | Snipe-IT | utf8mb4_unicode_ci | - |
| `DB_CONNECTION` | Snipe-IT | mysql | - |
| `MAIL_PASSWORD` | Snipe-IT | (secret) | - |
| `MAIL_USERNAME` | Snipe-IT | (secret) | - |
| `MAIL_FROM_ADDR` | Snipe-IT | - | Email from address |
| `MAIL_FROM_NAME` | Snipe-IT | - | Email from name |
| `REDIS_PASSWORD` | Snipe-IT | (secret) | - |
| `MAIL_ENCRYPTION` | Snipe-IT | tls | - |
| `PHP_UPLOAD_LIMIT` | Snipe-IT | 100 | - |
| `MAIL_AUTO_EMBED_METHOD` | Snipe-IT | attachment | - |
| `PUBLIC_FILESYSTEM_DISK` | Snipe-IT | local_public | - |
| `PRIVATE_FILESYSTEM_DISK` | Snipe-IT | local | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "keydb-server /etc/keydb/keydb.conf --server-threads 16 --always-show-logo no --appendonly yes --requirepass ${KEYDB_PASSWORD} --port ${KEYDB_PRIVATE_PORT}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "sleep 3 && /startup.sh"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/snipeit`

**Category:** Other

[View on Railway →](https://railway.com/template/7Su9hO)
