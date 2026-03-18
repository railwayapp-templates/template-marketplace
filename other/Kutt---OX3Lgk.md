# Deploy Kutt on Railway

Shorten URLs, manage your links and view the click rate statistics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/OX3Lgk)

## About

<div style="display: flex; flex-direction: row; flex-wrap: wrap;">
<div>
<h1 style="margin: 0; margin-bottom: 15px;">Kutt</h1>
<h2 style="margin: 0">Kutt your links <span class="h">shorter</span>.</h2>
<br>
<h3>Key Features</h3>
<ul>
<li>Create, protect and delete your links and monitor them with detailed statistics.</li>
<li>Use custom domains for your links. Add or remove them for free.</li>
<li>Use the provided API to create, delete, and get URLs from anywhere.</li>
</ul>
</div>
<img style="width: 50%; min-width: 300px" src="https://kutt.it/images/callout.png">
</div>

<style>
.h {
    color: #B89BD8;
}
</style>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Kutt | `kutt/kutt` | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PG_PRIVATE_PORT` | Postgres | 5432 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `PORT` | Kutt | 3000 | This app needs to run on port 3000 |
| `DB_SSL` | Kutt | false | Postgres database SSL connection |
| `DB_HOST` | Kutt | - | Postgres database host |
| `DB_NAME` | Kutt | - | Postgres database name |
| `DB_PORT` | Kutt | - | Pstgres database port |
| `DB_USER` | Kutt | (secret) | Postgres database user |
| `REDIS_DB` | Kutt | railway | Redis database name |
| `MAIL_FROM` | Kutt | - | Example: "Kutt <mail@kutt.it>" |
| `MAIL_HOST` | Kutt | - | SMTP is required for verification emails |
| `MAIL_USER` | Kutt | (secret) | - |
| `SITE_NAME` | Kutt | - | Your site's custom name, e.g "Linkbin" or "Peter" |
| `JWT_SECRET` | Kutt | (secret) | passphrase to encrypt JWT |
| `REDIS_HOST` | Kutt | - | Redis database host |
| `REDIS_PORT` | Kutt | - | Redis database port |
| `DB_PASSWORD` | Kutt | (secret) | Postgres database password |
| `MAIL_SECURE` | Kutt | - | true or false |
| `ADMIN_EMAILS` | Kutt | - | Admin emails seperated by comma for admin-settings. |
| `REPORT_EMAIL` | Kutt | - | The email that will receive submitted reports. |
| `CONTACT_EMAIL` | Kutt | - | Support email to show on the app |
| `MAIL_PASSWORD` | Kutt | (secret) | - |
| `DEFAULT_DOMAIN` | Kutt | - | Your site's domain |
| `REDIS_PASSWORD` | Kutt | (secret) | Redis database password |
| `NON_USER_COOLDOWN` | Kutt | 0 | Link creation cooldown for non logged-in users. (0 = disable) |
| `RECAPTCHA_SITE_KEY` | Kutt | - | Invisible reCaptcha secret key (Create one in https://www.google.com/recaptcha/intro/) |
| `USER_LIMIT_PER_DAY` | Kutt | 50 | The daily limit for each user |
| `RECAPTCHA_SECRET_KEY` | Kutt | (secret) | Invisible reCaptcha secret key |
| `DISALLOW_REGISTRATION` | Kutt | false | Whether to deny user registrations |
| `CUSTOM_DOMAIN_USE_HTTPS` | Kutt | false | Use HTTPS for links with custom domain |
| `DISALLOW_ANONYMOUS_LINKS` | Kutt | false | Whether to disable anonymous link creation |
| `GOOGLE_SAFE_BROWSING_KEY` | Kutt | - | Google Cloud API to prevent from users from submitting malware URLs. (https://developers.google.com/safe-browsing/v4/get-started) |
| `DEFAULT_MAX_STATS_PER_LINK` | Kutt | 5000 | Max number of visits for each link to have detailed stats |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `REDIS_PRIVATE_PORT` | Redis | 6379 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "sleep 3 && npm run start"`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/deploy/OX3Lgk)
