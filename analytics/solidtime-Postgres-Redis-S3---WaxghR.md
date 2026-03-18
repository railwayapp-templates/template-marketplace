# Deploy solidtime ⁂ Postgres, Redis, S3 on Railway

Open-source time-tracking tool designed for freelancers and teams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/WaxghR)

## About

## solidtime

Solidtime is an open-source time-tracking tool designed for freelancers and teams. It offers features like granular roles and permissions, cross-platform compatibility via a PWA, and system notifications. Users can import data from other time trackers like Toggl and Clockify. The platform also plans to include billing and invoicing features soon. Solidtime can be used as a hosted SaaS solution or set up on-premise, with support for enterprise installations.

For more information, visit [Solidtime](https://www.solidtime.io/).

### Features

*   Redis
*   Postgres
*   S3

### Setting up

This install is literally one click, but you'll need to configure things if you want it to work in production.  
  
1\. Setup your custom SMTP - if you don't you won't be able to activate your accounts.

2\. If you don't setup a custom SMTP, you must register an account, then edit that account on the Postgres instance (through the data tab).

– Editing the user is easy, just click your name, and add a timestamp to `email_verified_at`. Once that's done, save and refresh your app. You should be able to login no problem.  
 

### Admin Access

Edit the variable “SUPER\_ADMINS” and add your email(s). Separated by commas.

### S3

Just add your variables to the environment and you should be good, although I haven't tested it myself personally – let's hope for the best ;)

## Additional Documentation and Configuration
https://docs.solidtime.io/self-hosting/intro

## ONE CLICK INSTALL

[![screenshot](https://railway.app/button.svg)](https://railway.app/template/WaxghR?referralCode=QkFCyI)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| solidtime | `solidtime/solidtime` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `INFO` | solidtime | - | For info, go to my Github page: https://github.com/hellocory/railway-solidtime-one-click-install [YOU MAY DELETE THIS VARIABLE] |
| `PORT` | solidtime | 8000 | - |
| `APP_ENV` | solidtime | production | "production" or "development". |
| `APP_NAME` | solidtime | solidtime | - |
| `APP_DEBUG` | solidtime | false | - |
| `LOG_LEVEL` | solidtime | debug | - |
| `MAIL_HOST` | solidtime | smtp.tem.scw.cloud | - |
| `MAIL_PORT` | solidtime | 465 | - |
| `S3_BUCKET` | solidtime | mybucket | Change filesystem (public or private) to "s3" if you use this. |
| `S3_REGION` | solidtime | us-west-2 | Change filesystem (public or private) to "s3" if you use this. |
| `DB_SSLMODE` | solidtime | require | - |
| `DB_PASSWORD` | solidtime | (secret) | - |
| `DB_USERNAME` | solidtime | (secret) | - |
| `LOG_CHANNEL` | solidtime | stderr | - |
| `MAIL_MAILER` | solidtime | log | - |
| `S3_ENDPOINT` | solidtime | us-west-2.amazonaws.com | Change filesystem (public or private) to "s3" if you use this. |
| `SUPER_ADMINS` | solidtime | some@admin.com,someother@admin.com | Admins by email separated by commas. |
| `DB_CONNECTION` | solidtime | pgsql | - |
| `MAIL_PASSWORD` | solidtime | (secret) | - |
| `MAIL_USERNAME` | solidtime | (secret) | - |
| `VITE_APP_NAME` | solidtime | solidtime | - |
| `CONTAINER_MODE` | solidtime | http | - |
| `MAIL_FROM_NAME` | solidtime | solidtime | - |
| `REDIS_PASSWORD` | solidtime | (secret) | - |
| `APP_FORCE_HTTPS` | solidtime | true | - |
| `AUTO_DB_MIGRATE` | solidtime | true | - |
| `FILESYSTEM_DISK` | solidtime | local | "local" by default. |
| `FORWARD_DB_PORT` | solidtime | 5432 | - |
| `MAIL_ENCRYPTION` | solidtime | tls | - |
| `TRUSTED_PROXIES` | solidtime | 0.0.0.0/0,2000:0:0:0:0:0:0:0/3 | - |
| `FORWARD_APP_PORT` | solidtime | 8000 | - |
| `QUEUE_CONNECTION` | solidtime | database | - |
| `S3_ACCESS_KEY_ID` | solidtime | 123456 | Change filesystem (public or private) to "s3" if you use this. |
| `MAIL_FROM_ADDRESS` | solidtime | no-reply@your-domain.com | - |
| `PASSPORT_PUBLIC_KEY` | solidtime | - | DO NOT FILL THIS IN. |
| `SOLIDTIME_IMAGE_TAG` | solidtime | latest | - |
| `PASSPORT_PRIVATE_KEY` | solidtime | - | DO NOT FILL THIS IN. |
| `S3_SECRET_ACCESS_KEY` | solidtime | (secret) | Change filesystem (public or private) to "s3" if you use this. |
| `PUBLIC_FILESYSTEM_DISK` | solidtime | public | "public" by default. |
| `PAGINATION_PER_PAGE_DEFAULT` | solidtime | 500 | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "php artisan migrate --force && php artisan passport:keys --force && php artisan config:cache && php artisan storage:link && php artisan octane:start --host=0.0.0.0 --port=8000"`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/WaxghR)
