# Deploy moodle on Railway

Moodle is a free and open-source learning management system.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moodle-1)

## About

Moodle is a free and open-source learning management system written in PHP and distributed under the GNU General Public License. Moodle is used for blended learning, distance education, flipped classroom and other online learning projects in schools, universities, workplaces and other sectors.

![](https://raw.githubusercontent.com/moodle/moodle/main/.github/moodlelogo.svg)

- [Demo](https://sandbox.moodledemo.net)

Hosting Moodle involves setting up a web server capable of running PHP, configuring a supported SQL database like MySQL or PostgreSQL, and ensuring file storage for user data and course content. Additionally, a web server like Nginx or Apache must be configured to serve the application. When hosted on Railway, Moodle can be quickly deployed using containerization (e.g., Docker), connected to a managed database, and scaled easily without managing server infrastructure directly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| moodle | `ellakcy/moodle:postgresql_apache_500_php8.4` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MOODLE_SSL` | moodle | true | Is moodle behind a proxy with SSL? |
| `MOODLE_URL` | moodle | - | The public service or customer domain. |
| `MOODLE_ADMIN` | moodle | admin | Admin Username |
| `MOODLE_DB_HOST` | moodle | - | PG Host |
| `MOODLE_DB_NAME` | moodle | - | PG Database Name |
| `MOODLE_DB_PORT` | moodle | - | PG Default Port |
| `MOODLE_DB_USER` | moodle | (secret) | PG User |
| `MOODLE_EMAIL_HOST` | moodle | - | Email Host |
| `MOODLE_REVERSE_LB` | moodle | false | Is moodle behind a proxy?" |
| `MOODLE_ADMIN_EMAIL` | moodle | example@moodle.railway.com | Admin Email |
| `MOODLE_DB_PASSWORD` | moodle | (secret) | PG Password |
| `MOODLE_ADMIN_PASSWORD` | moodle | (secret) | Admin Password |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c 'set -eu; /usr/local/bin/entrypoint.sh; a2dismod mpm_event mpm_worker || true; a2enmod mpm_prefork || true; exec /usr/sbin/apache2ctl -D FOREGROUND'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/moodledata`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/moodle-1)
