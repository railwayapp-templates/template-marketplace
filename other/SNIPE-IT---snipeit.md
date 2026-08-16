# Deploy SNIPE-IT on Railway

Open-source IT asset. Track IT assets, licences and accessories

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/snipeit)

## About

Snipe-IT is an open-source IT asset management system that tracks the hardware, licences and accessories a company owns and records who has each one. IT teams, school districts and MSPs use it to replace the spreadsheet where laptop serial numbers go to die: every device gets an asset tag, a status, a purchase cost and a full checkout history, so answering "who has that MacBook and when does its warranty end?" takes seconds. It is a PHP/Laravel application published under AGPL-3.0 by Grokability.

Self-host Snipe-IT on Railway and this template wires up the three pieces a production install needs. The application service runs the official `snipe/snipe-it` image — Apache with PHP 8.3 — behind a public HTTPS domain, applies database migrations on every boot, and runs Snipe-IT's scheduler for alerts and backups. Managed MySQL holds the asset records over Railway's private network, so the database is never exposed publicly. Managed Redis backs the cache and session store, keeping users signed in across redeploys. A persistent volume at `/var/lib/snipeit` keeps uploaded images, attachments, backups and OAuth signing keys.

![Snipe-IT Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786824491/e374e497-0ca0-4478-85ce-b3d6886c0aa5.png)

Snipe-IT answers a narrow question well: what do we own, where is it, and who has it. It is an asset tracker rather than a helpdesk — there is no ticketing — which is why teams pick it when they want inventory accuracy without adopting a full ITSM suite. Self-hosting matters because an asset register holds serial numbers, purchase costs and staff assignments.

- Assets, licences, accessories, consumables and components, each with their own stock and checkout rules
- Check-in and check-out to users, locations or other assets, with a full audit history per item
- Custom fields and fieldsets, so a laptop and a projector carry different attributes
- Barcode and QR labels, scheduled audits, warranty tracking and depreciation
- LDAP/Active Directory sync and SAML single sign-on
- A documented REST API with personal access tokens, plus a CSV importer
- Email alerts for low stock, expiring licences and upcoming audits

Each Railway service owns one concern. The application container serves the web interface and API and runs the scheduler. MySQL stores every asset, user and log row. Redis holds cached settings and sessions. The volume stores anything that is a file rather than a row: asset photos, signed EULA PDFs, backup archives and the key pair that signs API tokens.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| MySQL | `mysql:9.4` | Database |
| snipe-it | `snipe/snipe-it:v8-latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `MYSQLHOST` | MySQL | - | Private hostname, never publicly exposed |
| `MYSQLPORT` | MySQL | 3306 | MySQL port on the private network |
| `MYSQLUSER` | MySQL | root | Superuser; give the app a scoped user instead |
| `MYSQL_URL` | MySQL | - | Private-network connection string |
| `MYSQLDATABASE` | MySQL | - | Alias consumers reference as ${{MySQL.MYSQLDATABASE}} |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first init |
| `MYSQL_PUBLIC_URL` | MySQL | - | External connection string; empty host/port until a TCP proxy exists |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated once at init — read only when the data dir is created |
| `PORT` | snipe-it | 80 | Apache listening port |
| `APP_ENV` | snipe-it | production | Laravel environment |
| `APP_KEY` | snipe-it | - | Laravel encryption key, 32 chars |
| `APP_URL` | snipe-it | - | Public base URL |
| `DB_HOST` | snipe-it | - | Private MySQL hostname |
| `DB_PORT` | snipe-it | - | MySQL port |
| `APP_NAME` | snipe-it | Snipe-IT | Application display name |
| `APP_DEBUG` | snipe-it | false | Disable debug output |
| `DB_PREFIX` | snipe-it | null | No table prefix |
| `IMAGE_LIB` | snipe-it | gd | Image processing library |
| `APP_LOCALE` | snipe-it | en-US | Default interface language |
| `DB_CHARSET` | snipe-it | utf8mb4 | Database character set |
| `REDIS_HOST` | snipe-it | - | Private Redis hostname |
| `REDIS_PORT` | snipe-it | - | Redis port |
| `COOKIE_NAME` | snipe-it | snipeit_session | Session cookie name |
| `DB_DATABASE` | snipe-it | - | Application database name |
| `DB_PASSWORD` | snipe-it | (secret) | Application database password |
| `DB_USERNAME` | snipe-it | (secret) | Application database user |
| `ENABLE_HSTS` | snipe-it | true | Send Strict-Transport-Security |
| `MAIL_MAILER` | snipe-it | log | Set to smtp to deliver mail |
| `MAX_RESULTS` | snipe-it | 500 | Maximum rows per API response |
| `APP_TIMEZONE` | snipe-it | UTC | Default timezone |
| `CACHE_DRIVER` | snipe-it | redis | Cache backend |
| `CACHE_PREFIX` | snipe-it | snipeit | Cache key prefix |
| `DB_COLLATION` | snipe-it | utf8mb4_unicode_ci | Database collation |
| `DB_DUMP_PATH` | snipe-it | /usr/bin | Path to mysqldump binary |
| `LOG_MAX_DAYS` | snipe-it | 10 | Days of log retention |
| `DB_CONNECTION` | snipe-it | mysql | Database driver |
| `ALLOW_IFRAMING` | snipe-it | false | Deny framing of the app |
| `MAIL_FROM_ADDR` | snipe-it | snipeit@example.com | Notification sender address |
| `MAIL_FROM_NAME` | snipe-it | Snipe-IT | Notification sender name |
| `REDIS_PASSWORD` | snipe-it | (secret) | Redis password |
| `SECURE_COOKIES` | snipe-it | true | Mark cookies secure |
| `SESSION_DRIVER` | snipe-it | redis | Session store backend |
| `REFERRER_POLICY` | snipe-it | same-origin | Referrer-Policy header value |
| `ALLOW_DATA_PURGE` | snipe-it | false | Disable destructive data purge |
| `DB_DUMP_SKIP_SSL` | snipe-it | true | Skip TLS for backup dumps |
| `PHP_UPLOAD_LIMIT` | snipe-it | 64 | Upload size limit in megabytes |
| `QUEUE_CONNECTION` | snipe-it | sync | No background queue needed |
| `SESSION_LIFETIME` | snipe-it | 12000 | Session lifetime in minutes |
| `MAIL_REPLYTO_ADDR` | snipe-it | snipeit@example.com | Notification reply-to address |
| `MAIL_REPLYTO_NAME` | snipe-it | Snipe-IT | Notification reply-to name |
| `LOGIN_MAX_ATTEMPTS` | snipe-it | (secret) | Failed logins before lockout |
| `ALLOW_BACKUP_DELETE` | snipe-it | false | Disable backup deletion in UI |
| `APP_TRUSTED_PROXIES` | snipe-it | 0.0.0.0/0,::/0 | Trust proxy headers for client IP |
| `LOGIN_LOCKOUT_DURATION` | snipe-it | (secret) | Lockout duration in seconds |
| `PUBLIC_FILESYSTEM_DISK` | snipe-it | local_public | Public uploads on the volume |
| `PRIVATE_FILESYSTEM_DISK` | snipe-it | local | Private uploads on the volume |
| `DB_DUMP_SINGLE_TRANSACTION` | snipe-it | false | Backup dump transaction mode |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/snipeit`

**Category:** Other

[View on Railway →](https://railway.com/deploy/snipeit)
