# Deploy Moodle LMS on Railway

Moodle LMS sandbox — ideal for development, testing, and evaluation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moodle-lms)

## About

Moodle is a free, open-source Learning Management System (LMS) trusted by educators and institutions worldwide. It enables the creation and delivery of online courses, supporting assignments, quizzes, forums, grading, and a rich plugin ecosystem — making it one of the most widely deployed e-learning platforms available.

Moodle requires a web server, a PHP runtime, a relational database (PostgreSQL or MySQL), and persistent storage for uploaded files and course data. Traditional deployments involve provisioning a server, configuring Apache or Nginx, managing TLS certificates, and keeping all components updated — a significant operational overhead. This Railway template removes that burden by running Moodle in a Docker container based on the official `moodlehq/moodle-php-apache` image, with PostgreSQL provisioned automatically and a persistent volume handling the Moodle data directory. HTTPS is handled by Railway's reverse proxy out of the box.

For full setup instructions, refer to the [README](https://github.com/JesseZweers/moodle-railway/blob/main/README.md).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Moodle | [JesseZweers/moodle-railway](https://github.com/JesseZweers/moodle-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/moodledata`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/moodle-lms)
