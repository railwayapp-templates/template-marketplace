# Deploy Monica — Self-Hosted Personal Relationship CRM on Railway

Self-host Monica — track relationships, birthdays & contacts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/monica-relationship-manager)

## About

Monica is the open-source Personal Relationship Manager — a private CRM for your life, not your business. Track the people you care about: log conversations, remember birthdays and how you met, note gift ideas, record debts, set reminders to stay in touch, and keep a journal of life events. It's an ad-free, private alternative to keeping it all in your head or scattered across apps. This template deploys Monica with a MySQL database and persistent file storage, with the encryption key and production settings configured, so your personal CRM is ready in minutes.

---

Monica is a mature Laravel application, and a few specifics make it deploy cleanly and stay private — all handled here.

**`APP_KEY` must be a base64 32-byte key — or Monica won't run.** Monica uses a Laravel encryption key in the form `base64:...` (generated with `openssl rand -base64 32`) to encrypt sensitive data. A missing or malformed key stops the app from starting, and changing it after data exists makes encrypted values unreadable. This template generates a valid key and keeps it stable, so Monica boots correctly and your data stays decryptable.

**Uploaded files need the persistent volume.** Contact photos and document attachments are written to `/var/www/html/storage`, which is ephemeral on Railway — they'd vanish on redeploy without a volume. This template mounts persistent storage there, while all structured data (contacts, conversations, reminders, journal) lives in MySQL.

**Register first, then lock signups — the key privacy step.** Monica has no env-var admin: the first account you register through the web page becomes the instance administrator. Right after creating it, set `APP_DISABLE_SIGNUP=true` in your Railway variables so no one else can register on your instance — otherwise your personal CRM is open to public signup. This one step is what makes it truly yours.

**Migrations run automatically on startup.** Monica applies its database migrations when it starts, so wait for the deployment to finish and migrations to complete before opening the URL. On first load you'll get the registration page; once you're in, the schema is ready.

**Add email for reminders.** Monica's core value is reminders — birthdays, "reach out to X," anniversaries. Configure the `MAIL_*` variables with your SMTP provider so those reminder emails actually send; without it, reminders exist in-app but won't reach your inbox.

Typical cost: **~$5–10/month** on Railway for Monica and MySQL. It's free and open source when self-hosted, versus the hosted Monica plan's subscription — and your relationship data stays private on your own infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Monica | `monica:4` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Monica | 80 | - |
| `APP_ENV` | Monica | production | - |
| `APP_DEBUG` | Monica | false | - |
| `CACHE_STORE` | Monica | database | - |
| `DB_PASSWORD` | Monica | (secret) | - |
| `DB_USERNAME` | Monica | (secret) | - |
| `MAIL_MAILER` | Monica | log | - |
| `DB_CONNECTION` | Monica | mysql | - |
| `SESSION_DRIVER` | Monica | database | - |
| `TRUSTED_PROXIES` | Monica | * | - |
| `QUEUE_CONNECTION` | Monica | sync | - |
| `APP_DISABLE_SIGNUP` | Monica | false | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/monica-relationship-manager)
