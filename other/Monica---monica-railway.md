# Deploy Monica on Railway

Personal Relationship Manager. Remember birthdays, notes and promises

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/monica-railway)

## About

Monica is an open-source personal relationship manager — a CRM for your private life rather than your sales pipeline. Instead of deals it tracks people: how you met someone, what their kids are called, what you last talked about, and when you promised to check in again. Because it is AGPL-licensed and keeps everything in your own MySQL database, self-hosting Monica means your notes about your family never leave infrastructure you control.

This template runs Monica in the shape its maintainers document for production rather than the single-container demo. The **Monica** web service (Apache with mod_php) serves the interface, a **scheduler** runs Monica's minute-by-minute task schedule, a **queue worker** drains background jobs such as reminder mail and account exports, **MySQL** holds every contact and note, **Redis** carries cache, sessions and the job queue, a **storage bucket** keeps avatars, photos and documents, and **Mailpit** captures the reminder emails Monica sends so the feature works the moment the deploy finishes. The web service is the only one with a public address; everything else talks over the private network.

![Monica Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787076432/bc16ba53-427e-472e-bfac-a8632c224599.png)

Monica is a Laravel application developed in the open since 2017, and deliberately unglamorous: you type what you know about someone, and it remembers. Self-hosting suits it, because health notes and family structure are exactly what people are uncomfortable storing on someone else's servers.

- Contacts with relationships, pets, work history and custom fields
- Notes, calls, conversations and activities, all timestamped
- One-off and recurring reminders delivered by email, plus automatic birthday reminders
- A journal, and gift, debt and task tracking per contact
- CardDAV and CalDAV, so contacts and reminders sync to your phone
- Two-factor authentication, a REST API, and vCard import/export

The split into services matters. The web service handles requests and runs migrations on boot. The scheduler is Monica's `schedule:run` loop; without it reminder emails are never queued and birthdays never fire. The worker consumes those jobs, keeping a slow mail server from blocking a page load. MySQL is the system of record; Redis holds sessions, so signing in survives a redeploy. Uploads go to the bucket rather than a disk, which is what lets the web service and the worker see the same files — and Monica streams each one through its own authenticated route, so a document is readable only by someone signed in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| monica | [gridalpha/monica-railway](https://github.com/gridalpha/monica-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |
| monica-queue | [gridalpha/monica-railway](https://github.com/gridalpha/monica-railway) | Worker |
| Redis | `redis:8.2` | Database |
| monica-cron | [gridalpha/monica-railway](https://github.com/gridalpha/monica-railway) | Worker |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | monica | 8080 | Apache listening port |
| `APP_ENV` | monica | production | Laravel environment |
| `APP_KEY` | monica | - | Encryption key, normalised at boot |
| `APP_URL` | monica | - | Public app URL |
| `DB_HOST` | monica | - | Private MySQL hostname |
| `DB_PORT` | monica | - | MySQL port |
| `APP_DEBUG` | monica | false | Never true on a public instance |
| `HASH_SALT` | monica | - | Salt for hashed IDs in URLs |
| `MAIL_HOST` | monica | - | Private Mailpit hostname |
| `MAIL_PORT` | monica | 1025 | Mailpit SMTP port |
| `MYSQL_URL` | monica | - | Root URL, used only to provision the role |
| `AWS_BUCKET` | monica | - | Bucket name |
| `REDIS_HOST` | monica | - | Private Redis hostname |
| `REDIS_PORT` | monica | - | Redis port |
| `DB_DATABASE` | monica | monica | Database created at boot |
| `DB_PASSWORD` | monica | (secret) | Password for the scoped role |
| `DB_USERNAME` | monica | (secret) | Scoped role created at boot |
| `LOG_CHANNEL` | monica | stderr | Send Laravel logs to the platform |
| `MAIL_MAILER` | monica | smtp | Send mail over SMTP |
| `MONICA_ROLE` | monica | web | Selects the web role |
| `AWS_ENDPOINT` | monica | - | Bucket endpoint URL |
| `CACHE_DRIVER` | monica | redis | Cache in Redis |
| `REDIS_CLIENT` | monica | phpredis | Bundled PHP Redis extension |
| `DB_CONNECTION` | monica | mysql | Monica supports MySQL only |
| `MAIL_PASSWORD` | monica | (secret) | SMTP password, shared with Mailpit |
| `MAIL_USERNAME` | monica | (secret) | SMTP username |
| `DB_USE_UTF8MB4` | monica | true | Emoji-capable charset |
| `MAIL_FROM_NAME` | monica | Monica | Sender display name |
| `REDIS_PASSWORD` | monica | (secret) | Redis auth password |
| `SESSION_DRIVER` | monica | redis | Sessions survive redeploys |
| `FILESYSTEM_DISK` | monica | s3 | Uploads go to the bucket |
| `MAIL_ENCRYPTION` | monica | - | Plain SMTP on the private network |
| `MAIL_VERIFY_PEER` | monica | false | No TLS to verify |
| `QUEUE_CONNECTION` | monica | redis | Background jobs via Redis |
| `AWS_ACCESS_KEY_ID` | monica | - | Bucket access key |
| `MAIL_FROM_ADDRESS` | monica | - | Sender address |
| `APP_DISABLE_SIGNUP` | monica | true | Keeps public registration closed |
| `AWS_DEFAULT_REGION` | monica | - | Bucket region |
| `MONICA_ADMIN_EMAIL` | monica | owner@example.com | First account's login email |
| `APP_TRUSTED_PROXIES` | monica | 0.0.0.0/0,::/0 | Trust Railway's edge for client IPs |
| `AWS_SECRET_ACCESS_KEY` | monica | (secret) | Bucket secret key |
| `MONICA_ADMIN_LASTNAME` | monica | Owner | First account's last name |
| `MONICA_ADMIN_PASSWORD` | monica | (secret) | First account's password |
| `SESSION_SECURE_COOKIE` | monica | true | HTTPS-only session cookie |
| `MONICA_ADMIN_FIRSTNAME` | monica | Monica | First account's first name |
| `APP_SIGNUP_DOUBLE_OPTIN` | monica | false | No email confirmation needed |
| `AWS_USE_PATH_STYLE_ENDPOINT` | monica | true | Path-style S3 addressing |
| `TZ` | mailpit | UTC | Timestamps in the inbox |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_LABEL` | mailpit | monica | Label shown in the inbox |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | SMTP credentials Monica uses |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Rolling message retention |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack UI listener |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack SMTP listener |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Plain auth on the private network |
| `APP_ENV` | monica-queue | production | Laravel environment |
| `APP_KEY` | monica-queue | - | Same key as the web service |
| `APP_URL` | monica-queue | - | Links in reminder emails |
| `DB_HOST` | monica-queue | - | Private MySQL hostname |
| `DB_PORT` | monica-queue | - | MySQL port |
| `APP_DEBUG` | monica-queue | false | Never true on a public instance |
| `HASH_SALT` | monica-queue | - | Same salt as the web service |
| `MAIL_HOST` | monica-queue | - | Private Mailpit hostname |
| `MAIL_PORT` | monica-queue | 1025 | Mailpit SMTP port |
| `MYSQL_URL` | monica-queue | - | Root URL, used only to provision the role |
| `AWS_BUCKET` | monica-queue | - | Bucket name |
| `REDIS_HOST` | monica-queue | - | Private Redis hostname |
| `REDIS_PORT` | monica-queue | - | Redis port |
| `DB_DATABASE` | monica-queue | monica | Same database as the web service |
| `DB_PASSWORD` | monica-queue | (secret) | Same password as the web service |
| `DB_USERNAME` | monica-queue | (secret) | Same scoped role |
| `LOG_CHANNEL` | monica-queue | stderr | Send Laravel logs to the platform |
| `MAIL_MAILER` | monica-queue | smtp | Send mail over SMTP |
| `MONICA_ROLE` | monica-queue | queue | Runs the background job worker |
| `AWS_ENDPOINT` | monica-queue | - | Bucket endpoint URL |
| `CACHE_DRIVER` | monica-queue | redis | Cache in Redis |
| `REDIS_CLIENT` | monica-queue | phpredis | Bundled PHP Redis extension |
| `DB_CONNECTION` | monica-queue | mysql | Monica supports MySQL only |
| `MAIL_PASSWORD` | monica-queue | (secret) | Same SMTP password |
| `MAIL_USERNAME` | monica-queue | (secret) | SMTP username |
| `DB_USE_UTF8MB4` | monica-queue | true | Emoji-capable charset |
| `MAIL_FROM_NAME` | monica-queue | Monica | Sender display name |
| `REDIS_PASSWORD` | monica-queue | (secret) | Redis auth password |
| `SESSION_DRIVER` | monica-queue | redis | Shared session store |
| `FILESYSTEM_DISK` | monica-queue | s3 | Reads and writes the same bucket |
| `MAIL_ENCRYPTION` | monica-queue | - | Plain SMTP on the private network |
| `MAIL_VERIFY_PEER` | monica-queue | false | No TLS to verify |
| `QUEUE_CONNECTION` | monica-queue | redis | Consumes jobs from Redis |
| `AWS_ACCESS_KEY_ID` | monica-queue | - | Bucket access key |
| `MAIL_FROM_ADDRESS` | monica-queue | - | Sender address |
| `APP_DISABLE_SIGNUP` | monica-queue | true | Keeps public registration closed |
| `AWS_DEFAULT_REGION` | monica-queue | - | Bucket region |
| `APP_TRUSTED_PROXIES` | monica-queue | 0.0.0.0/0,::/0 | Trust Railway's edge for client IPs |
| `AWS_SECRET_ACCESS_KEY` | monica-queue | (secret) | Bucket secret key |
| `AWS_USE_PATH_STYLE_ENDPOINT` | monica-queue | true | Path-style S3 addressing |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `APP_ENV` | monica-cron | production | Laravel environment |
| `APP_KEY` | monica-cron | - | Same key as the web service |
| `APP_URL` | monica-cron | - | Links in reminder emails |
| `DB_HOST` | monica-cron | - | Private MySQL hostname |
| `DB_PORT` | monica-cron | - | MySQL port |
| `APP_DEBUG` | monica-cron | false | Never true on a public instance |
| `HASH_SALT` | monica-cron | - | Same salt as the web service |
| `MAIL_HOST` | monica-cron | - | Private Mailpit hostname |
| `MAIL_PORT` | monica-cron | 1025 | Mailpit SMTP port |
| `MYSQL_URL` | monica-cron | - | Root URL, used only to provision the role |
| `AWS_BUCKET` | monica-cron | - | Bucket name |
| `REDIS_HOST` | monica-cron | - | Private Redis hostname |
| `REDIS_PORT` | monica-cron | - | Redis port |
| `DB_DATABASE` | monica-cron | monica | Same database as the web service |
| `DB_PASSWORD` | monica-cron | (secret) | Same password as the web service |
| `DB_USERNAME` | monica-cron | (secret) | Same scoped role |
| `LOG_CHANNEL` | monica-cron | stderr | Send Laravel logs to the platform |
| `MAIL_MAILER` | monica-cron | smtp | Send mail over SMTP |
| `MONICA_ROLE` | monica-cron | cron | Runs Monica's task scheduler |
| `AWS_ENDPOINT` | monica-cron | - | Bucket endpoint URL |
| `CACHE_DRIVER` | monica-cron | redis | Cache in Redis |
| `REDIS_CLIENT` | monica-cron | phpredis | Bundled PHP Redis extension |
| `DB_CONNECTION` | monica-cron | mysql | Monica supports MySQL only |
| `MAIL_PASSWORD` | monica-cron | (secret) | Same SMTP password |
| `MAIL_USERNAME` | monica-cron | (secret) | SMTP username |
| `DB_USE_UTF8MB4` | monica-cron | true | Emoji-capable charset |
| `MAIL_FROM_NAME` | monica-cron | Monica | Sender display name |
| `REDIS_PASSWORD` | monica-cron | (secret) | Redis auth password |
| `SESSION_DRIVER` | monica-cron | redis | Shared session store |
| `FILESYSTEM_DISK` | monica-cron | s3 | Uploads go to the bucket |
| `MAIL_ENCRYPTION` | monica-cron | - | Plain SMTP on the private network |
| `MAIL_VERIFY_PEER` | monica-cron | false | No TLS to verify |
| `QUEUE_CONNECTION` | monica-cron | redis | Dispatches jobs to Redis |
| `AWS_ACCESS_KEY_ID` | monica-cron | - | Bucket access key |
| `MAIL_FROM_ADDRESS` | monica-cron | - | Sender address |
| `APP_DISABLE_SIGNUP` | monica-cron | true | Keeps public registration closed |
| `AWS_DEFAULT_REGION` | monica-cron | - | Bucket region |
| `APP_TRUSTED_PROXIES` | monica-cron | 0.0.0.0/0,::/0 | Trust Railway's edge for client IPs |
| `AWS_SECRET_ACCESS_KEY` | monica-cron | (secret) | Bucket secret key |
| `AWS_USE_PATH_STYLE_ENDPOINT` | monica-cron | true | Path-style S3 addressing |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`
- **Healthcheck:** `/livez`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/monica-railway)
