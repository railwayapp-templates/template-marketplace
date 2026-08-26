# Deploy Moodle on Railway

Learning management system for running online courses and grading

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moodle-learning-platform)

## About

Moodle is the open-source learning management system behind more than 150,000 registered sites, from universities to corporate training teams. It gives you courses, enrolments, assignments, quizzes, gradebooks, forums and completion tracking in one place, with over 2,000 community plugins. Teams self-host it for control: data residency, custom authentication, unlimited seats, and plugins no hosted plan allows.

Deploy Moodle on Railway and you get the full production shape, not a single container. The template runs Moodle 5.2 on nginx and PHP-FPM 8.3 with the scheduled task runner supervised beside the web server, managed PostgreSQL, managed Redis serving both PHP sessions and the application cache, and a Mailpit inbox wired in as the SMTP host so password resets and forum digests work the moment the deploy finishes. Uploads, backups and caches live on a volume at `/var/www/moodledata`.

![Moodle, Postgres, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787610282/moodle-architecture.png)

Moodle is a PHP application that keeps structured data in a relational database and every uploaded file, cache and course backup in a directory it calls `moodledata`. A working install needs the web tier, a database, and storage that survives restarts. A fourth piece is easy to miss — the scheduled task runner, which sends notifications, processes submissions, rebuilds caches and expires sessions. Without it a site looks healthy and quietly stops emailing anyone.

Key capabilities:

- Course management with sections, activities and completion tracking
- Assignments, quizzes, workshops, H5P content and SCORM packages
- A gradebook with custom scales and weighted categories
- Forums, messaging, calendars and cohort enrolment
- LTI, OAuth 2, LDAP and SAML authentication, plus a REST API

Here the `moodle` service runs nginx, PHP-FPM and the task runner together, because the runner must read and write the same `moodledata` the web tier uses. PostgreSQL holds courses, users, grades and logs. Redis serves sessions and the cache, which is what lets a sign-in survive a redeploy instead of dropping every user back to the login page. Mailpit captures outgoing mail and can relay to a real provider later.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| moodle | [gridalpha/moodle-railway](https://github.com/gridalpha/moodle-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `TZ` | mailpit | UTC | Container timezone |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web listener, dual stack |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener, dual stack |
| `PORT` | moodle | 8080 | HTTP port nginx listens on |
| `DB_HOST` | moodle | - | Private database hostname |
| `DB_NAME` | moodle | moodle | Moodle's own database |
| `DB_PASS` | moodle | - | Password for that role |
| `DB_PORT` | moodle | 5432 | Database port |
| `DB_TYPE` | moodle | pgsql | Database driver |
| `DB_USER` | moodle | (secret) | Moodle's own database role |
| `SITE_URL` | moodle | - | Public site URL, becomes wwwroot |
| `SSLPROXY` | moodle | true | TLS terminates at the edge |
| `DB_PREFIX` | moodle | mdl_ | Table name prefix |
| `SMTP_HOST` | moodle | - | Outgoing mail host |
| `SMTP_PORT` | moodle | 1025 | Outgoing mail port |
| `SMTP_USER` | moodle | (secret) | No SMTP auth against Mailpit |
| `REDIS_HOST` | moodle | - | Private Redis hostname |
| `MOODLE_EMAIL` | moodle | - | Administrator email address |
| `REVERSEPROXY` | moodle | false | Single base URL only |
| `memory_limit` | moodle | 512M | PHP memory limit |
| `SMTP_PASSWORD` | moodle | (secret) | No SMTP auth against Mailpit |
| `SMTP_PROTOCOL` | moodle | - | Plain SMTP, no STARTTLS |
| `date_timezone` | moodle | UTC | PHP default timezone |
| `post_max_size` | moodle | 100M | Largest POST body accepted |
| `REDIS_PASSWORD` | moodle | (secret) | Redis auth password |
| `RUN_CRON_TASKS` | moodle | true | Run Moodle scheduled tasks in-container |
| `max_input_vars` | moodle | 5000 | PHP input variable cap |
| `MOODLE_LANGUAGE` | moodle | en | Installation language |
| `MOODLE_PASSWORD` | moodle | (secret) | Administrator password, no spaces |
| `MOODLE_SITENAME` | moodle | Moodle-on-Railway | Site full name, no spaces |
| `MOODLE_USERNAME` | moodle | (secret) | Site administrator username |
| `DB_BOOTSTRAP_URL` | moodle | - | Creates Moodle's scoped role at boot |
| `SYNC_MOODLE_CODE` | moodle | auto | Refresh code when the image changes |
| `AUTO_UPDATE_MOODLE` | moodle | true | Run the schema upgrade on boot |
| `MOODLE_MAIL_PREFIX` | moodle | [Moodle] | Email subject prefix |
| `upload_max_filesize` | moodle | 100M | Largest upload accepted |
| `MOODLE_CRON_INTERVAL` | moodle | 60 | Seconds between cron runs |
| `PHP_FPM_MAX_CHILDREN` | moodle | 16 | Concurrent PHP worker cap |
| `client_max_body_size` | moodle | 100M | Largest request nginx accepts |
| `MOODLE_MAIL_NOREPLY_ADDRESS` | moodle | - | No-reply sender address |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`
- **Volume:** `/var/www/moodledata`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/moodle-learning-platform)
