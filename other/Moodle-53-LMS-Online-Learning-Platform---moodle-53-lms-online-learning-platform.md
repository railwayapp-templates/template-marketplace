# Deploy Moodle 5.3 LMS Online Learning Platform on Railway

Courses, quizzes and grades for schools and teams, with cron and caching.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moodle-53-lms-online-learning-platform)

## About

Moodle is the open-source learning management system used by schools, universities and companies to run courses, quizzes, assignments and gradebooks. This community template runs Moodle 5.3 LTS on Railway from the official release, with PostgreSQL, Redis caching, cron every minute and persistent storage for course files.

Moodle is a PHP application that needs a web server, a database, a data directory for uploaded files, and a cron job that runs every minute for notifications, backups, grading and clean-up. This template builds Moodle from the official, checksum-verified release on the official PHP 8.4 Apache image, serves only Moodle's public directory, installs the site from the command line on first boot with a generated admin password, upgrades automatically when you change the version, stores sessions and the application cache in Redis, and runs cron inside the same service because cron needs the data directory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| Moodle | [baranberkay96/moodle-railway](https://github.com/baranberkay96/moodle-railway) (branch: main) (root: /services/moodle) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis. |
| `PORT` | Moodle | 80 | Port Apache listens on; Railway routes traffic and healthchecks here. |
| `MOODLE_URL` | Moodle | - | Site URL ($CFG->wwwroot). Change it when you add a custom domain; Moodle redirects every request to this host. |
| `MOODLE_LANG` | Moodle | en | Installation language code, e.g. en, de, es, tr (the language pack is downloaded during install). |
| `PHP_TIMEZONE` | Moodle | UTC | PHP default timezone (Moodle's site timezone is set in Site administration). |
| `MOODLE_DB_HOST` | Moodle | - | Postgres host on the private network. |
| `MOODLE_DB_NAME` | Moodle | - | Database name. |
| `MOODLE_DB_PORT` | Moodle | 5432 | Postgres port. |
| `MOODLE_DB_TYPE` | Moodle | pgsql | Database driver (Railway Postgres). |
| `MOODLE_DB_USER` | Moodle | (secret) | Database user. |
| `MOODLE_DB_PREFIX` | Moodle | mdl_ | Table prefix; do not change after installation. |
| `MOODLE_SITE_NAME` | Moodle | Moodle | Full site name set at installation (can be changed later in Site administration). |
| `MOODLE_SMTP_HOST` | Moodle | - | SMTP host for outgoing mail (outbound SMTP needs Railway Pro). Empty = configure later in Site administration. Optional. |
| `MOODLE_SMTP_PORT` | Moodle | 587 | SMTP port. |
| `MOODLE_SMTP_USER` | Moodle | (secret) | SMTP username. Optional. |
| `PHP_MEMORY_LIMIT` | Moodle | 256M | PHP memory per web request. |
| `MOODLE_ADMIN_USER` | Moodle | (secret) | Username of the site administrator created at installation. |
| `MOODLE_REDIS_HOST` | Moodle | - | Redis for sessions and the application cache. Empty = database sessions and file cache. |
| `MOODLE_REDIS_PORT` | Moodle | 6379 | Redis port. |
| `PHP_POST_MAX_SIZE` | Moodle | 130M | Largest request body (keep slightly above PHP_UPLOAD_MAX_FILESIZE). |
| `MOODLE_ADMIN_EMAIL` | Moodle | - | E-mail of the site administrator (also the support contact). |
| `MOODLE_DB_PASSWORD` | Moodle | (secret) | Database password. |
| `MOODLE_SMTP_SECURE` | Moodle | tls | SMTP security: tls (STARTTLS), ssl, or empty. |
| `MOODLE_CONFIG_EXTRA` | Moodle | - | Optional raw PHP appended to config.php (e.g. $CFG->theme = 'boost';). Evaluated last. Advanced. |
| `MOODLE_CRON_ENABLED` | Moodle | true | Run Moodle cron inside this service every minute (needs moodledata, so it cannot be a separate Railway cron service). |
| `MOODLE_CRON_VERBOSE` | Moodle | false | Stream cron output to the logs. Task logs are always available in Site administration > Server > Tasks > Task logs. |
| `MOODLE_CRON_INTERVAL` | Moodle | 60 | Seconds between cron starts (Moodle recommends every minute). |
| `MOODLE_SMTP_PASSWORD` | Moodle | (secret) | SMTP password. Optional. |
| `MOODLE_ADMIN_PASSWORD` | Moodle | (secret) | Password of the site administrator (used once at installation; change it in your profile afterwards). |
| `MOODLE_REDIS_PASSWORD` | Moodle | (secret) | Redis password. |
| `MOODLE_SITE_SHORTNAME` | Moodle | moodle | Short site name set at installation. |
| `MOODLE_NOREPLY_ADDRESS` | Moodle | - | No-reply sender address for notifications, e.g. noreply@yourschool.org. Optional. |
| `MOODLE_CRON_MAX_RUNNERS` | Moodle | 3 | Maximum overlapping cron runs (each keeps polling for tasks for a few minutes). |
| `PHP_UPLOAD_MAX_FILESIZE` | Moodle | 128M | Largest single upload; Moodle's own course/site limits apply on top. |
| `APACHE_MAX_REQUEST_WORKERS` | Moodle | 25 | Maximum concurrent PHP requests. Peak RAM is roughly this x 60-100 MB; raise with the service memory. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/moodledata`

**Category:** Other · **Tags:** moodle, lms, e-learning, education, php · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/moodle-53-lms-online-learning-platform)
