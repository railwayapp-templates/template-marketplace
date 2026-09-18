# Deploy Easy!Appointments on Railway

Appointment scheduler with a public booking page for your business

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/easyappointments-app)

## About

Easy!Appointments is an open-source appointment scheduler for businesses that book people into time slots: clinics, salons, tutors, garages and council offices. Customers open a public booking page, pick a service, a provider and a free slot, and get a confirmation email; staff work from an admin back office with a calendar, customer records, per-provider working plans and booking rules. Maintained since 2013 under GPL-3.0, it ships 30-plus languages and syncs two ways with Google Calendar and CalDAV.

Self-host Easy!Appointments on Railway and this template wires up the production shape rather than a single container. **easyappointments** serves the booking page and the back office through Apache and mod_php. **MySQL** holds every appointment, customer and setting. **Redis** stores sessions, so the web tier keeps no state and a redeploy signs nobody out. **easyappointments-cron** runs the commands upstream documents as cron jobs: calendar sync, retention cleanup and a daily backup onto its own volume. **mailpit** provides an SMTP host with a password-protected inbox. The first administrator is created from your own variables while the container boots, before the public port opens, so no setup wizard is left open for a stranger to finish.

![Diagram of the Easy!Appointments services, MySQL, Redis and Mailpit on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789612079/easyappointments-architecture.webp)

Booking data is sensitive: names, phone numbers, and a record of when someone visited a clinic. Self-hosting keeps it in a database you control, under your own retention policy, with no per-seat price.

- An embeddable booking page with per-service durations, slot intervals, booking limits and prices
- Administrator, provider and secretary roles, each with a working plan and exceptions
- Two-way Google Calendar and CalDAV sync, plus Jitsi and Google Meet links
- Email notifications on booking, rescheduling and cancellation, with signed cancel and confirm links
- A REST API, webhooks, LDAP login, an ALTCHA captcha and a data-retention period

The Railway split follows what upstream recommends for production: the web service is stateless and scalable once your hours are set, MySQL is the only durable store the app writes to, and Redis holds the sessions a file store would lose on each deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| easyappointments | [gridalpha/easyappointments-railway](https://github.com/gridalpha/easyappointments-railway) | Web service |
| easyappointments-cron | [gridalpha/easyappointments-railway](https://github.com/gridalpha/easyappointments-railway) | Database |
| Redis | `redis:8.2` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |
| `PORT` | easyappointments | 8080 | Apache listening port |
| `DB_HOST` | easyappointments | - | Private MySQL hostname |
| `DB_NAME` | easyappointments | - | Application database |
| `DB_PORT` | easyappointments | - | MySQL port |
| `BASE_URL` | easyappointments | - | Public URL used in emails |
| `LANGUAGE` | easyappointments | english | Default interface language |
| `DEBUG_MODE` | easyappointments | false | Keep error details hidden |
| `REDIS_HOST` | easyappointments | - | Private Redis hostname |
| `REDIS_PORT` | easyappointments | - | Redis port |
| `DB_PASSWORD` | easyappointments | (secret) | MySQL password |
| `DB_USERNAME` | easyappointments | (secret) | MySQL account |
| `EA_TIMEZONE` | easyappointments | UTC | Default installation timezone |
| `MAIL_PROTOCOL` | easyappointments | smtp | Send through an SMTP server |
| `EA_ADMIN_EMAIL` | easyappointments | admin@example.org | Administrator email, change this |
| `MAIL_FROM_NAME` | easyappointments | My Company | Notification sender name |
| `MAIL_SMTP_AUTH` | easyappointments | false | SMTP authentication off |
| `MAIL_SMTP_HOST` | easyappointments | - | SMTP hostname |
| `MAIL_SMTP_PASS` | easyappointments | - | SMTP password, if required |
| `MAIL_SMTP_PORT` | easyappointments | 1025 | SMTP port |
| `MAIL_SMTP_USER` | easyappointments | (secret) | SMTP username, if required |
| `REDIS_DATABASE` | easyappointments | 0 | Redis database index |
| `REDIS_PASSWORD` | easyappointments | (secret) | Redis auth password |
| `EA_COMPANY_LINK` | easyappointments | - | Company website link |
| `EA_COMPANY_NAME` | easyappointments | My Company | Name shown on the booking page |
| `MAIL_SMTP_DEBUG` | easyappointments | 0 | SMTP conversation logging off |
| `EA_COMPANY_EMAIL` | easyappointments | admin@example.org | Company notification address |
| `GOOGLE_CLIENT_ID` | easyappointments | - | Google OAuth client id |
| `MAIL_SMTP_CRYPTO` | easyappointments | - | Empty, tls or ssl |
| `EA_ADMIN_PASSWORD` | easyappointments | (secret) | First administrator password |
| `EA_ADMIN_USERNAME` | easyappointments | (secret) | First administrator login name |
| `EA_SESSION_DRIVER` | easyappointments | redis | Keep sessions outside the container |
| `MAIL_FROM_ADDRESS` | easyappointments | no-reply@example.org | Notification sender address |
| `EA_ADMIN_LAST_NAME` | easyappointments | Administrator | Administrator last name |
| `EA_DB_WAIT_SECONDS` | easyappointments | 180 | Startup wait for MySQL |
| `EA_ADMIN_FIRST_NAME` | easyappointments | Site | Administrator first name |
| `GOOGLE_SYNC_FEATURE` | easyappointments | false | Google Calendar sync off |
| `GOOGLE_CLIENT_SECRET` | easyappointments | (secret) | Google OAuth client secret |
| `MAIL_REPLY_TO_ADDRESS` | easyappointments | admin@example.org | Notification reply-to address |
| `PORT` | easyappointments-cron | 8080 | Health probe listening port |
| `DB_HOST` | easyappointments-cron | - | Private MySQL hostname |
| `DB_NAME` | easyappointments-cron | - | Application database |
| `DB_PORT` | easyappointments-cron | - | MySQL port |
| `EA_ROLE` | easyappointments-cron | cron | Run the maintenance loop |
| `BASE_URL` | easyappointments-cron | - | URL used in emails |
| `LANGUAGE` | easyappointments-cron | english | Language for generated emails |
| `DEBUG_MODE` | easyappointments-cron | false | Keep error details hidden |
| `REDIS_HOST` | easyappointments-cron | - | Private Redis hostname |
| `REDIS_PORT` | easyappointments-cron | - | Redis port |
| `DB_PASSWORD` | easyappointments-cron | (secret) | MySQL password |
| `DB_USERNAME` | easyappointments-cron | (secret) | MySQL account |
| `EA_TIMEZONE` | easyappointments-cron | UTC | Timezone for scheduled work |
| `MAIL_PROTOCOL` | easyappointments-cron | smtp | Send through an SMTP server |
| `MAIL_FROM_NAME` | easyappointments-cron | My Company | Notification sender name |
| `MAIL_SMTP_AUTH` | easyappointments-cron | false | SMTP authentication off |
| `MAIL_SMTP_HOST` | easyappointments-cron | - | SMTP hostname |
| `MAIL_SMTP_PORT` | easyappointments-cron | 1025 | SMTP port |
| `REDIS_DATABASE` | easyappointments-cron | 0 | Redis database index |
| `REDIS_PASSWORD` | easyappointments-cron | (secret) | Redis auth password |
| `EA_CRON_INTERVAL` | easyappointments-cron | 3600 | Seconds between maintenance cycles |
| `MAIL_SMTP_CRYPTO` | easyappointments-cron | - | Empty, tls or ssl |
| `EA_BACKUP_ENABLED` | easyappointments-cron | true | One database backup per day |
| `EA_SESSION_DRIVER` | easyappointments-cron | redis | Match the web service |
| `MAIL_FROM_ADDRESS` | easyappointments-cron | no-reply@example.org | Notification sender address |
| `EA_DB_WAIT_SECONDS` | easyappointments-cron | 180 | Startup wait for MySQL and the schema |
| `MAIL_REPLY_TO_ADDRESS` | easyappointments-cron | admin@example.org | Notification reply-to address |
| `EA_BACKUP_RETENTION_DAYS` | easyappointments-cron | 14 | Days of backups kept on the volume |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `TZ` | mailpit | UTC | Timestamps in the inbox |
| `PORT` | mailpit | 8025 | Inbox web UI port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Oldest messages pruned beyond this |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack private SMTP listener |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/easyappointments-app)
