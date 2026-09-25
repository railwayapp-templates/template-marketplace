# Deploy Moodle 5.2 | Official Release, Postgres, Nightly Backups on Railway

Current Moodle LMS on Postgres, installed with no open setup page

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moodle-5)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/moodle-5?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=moodle-5)

[Moodle](https://moodle.org) is the open-source learning platform used by schools, universities and companies worldwide: courses, assignments, quizzes, gradebook, forums, badges and certificates, with more than 2,000 plugins. This template runs the current official Moodle 5.2 release (5.2.3) on PostgreSQL.

Two services and a bucket:

- **Moodle** runs PHP 8.4 and Apache with the official release package. The code is in the image; uploaded files, the site secret and caches live on the volume at `/var/moodledata`. Cron runs in the same service every minute, so scheduled tasks, emails and course backups work without extra setup.
- **Postgres** 17, reachable only over Railway's private network.
- **Backups** is a Railway bucket that gets a nightly copy of the database and the data directory.

Moodle is installed from the command line on first boot, with an admin password generated at deploy. The web installer is never reachable: until the install finishes, the site shows a "Moodle is starting" page.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Moodle | [nomideusz/moodle-railway](https://github.com/nomideusz/moodle-railway) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Moodle | 8080 | Port Apache listens on - leave as is |
| `S3_BUCKET` | Moodle | - | Backup bucket name. Empty = no nightly backups |
| `S3_REGION` | Moodle | - | Backup bucket region |
| `MOODLE_URL` | Moodle | - | Site address. On a custom domain, set it to https://your.domain |
| `S3_ENDPOINT` | Moodle | - | Nightly backups go to the bundled bucket - leave as is |
| `S3_ACCESS_KEY_ID` | Moodle | - | Backup bucket credentials |
| `MOODLE_ADMIN_EMAIL` | Moodle | admin@example.com | Admin email, set on first boot only - change it in the admin's profile |
| `S3_SECRET_ACCESS_KEY` | Moodle | (secret) | Backup bucket credentials |
| `MOODLE_ADMIN_PASSWORD` | Moodle | (secret) | Password for the 'admin' login, set on first boot only - change it in Moodle afterwards |
| `POSTGRES_DB` | Postgres | moodle | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/moodledata`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Shell, Dockerfile, PHP, HTML

[View on Railway →](https://railway.com/deploy/moodle-5)
