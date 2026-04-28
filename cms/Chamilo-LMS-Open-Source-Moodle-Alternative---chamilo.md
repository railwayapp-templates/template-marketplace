# Deploy Chamilo LMS | Open Source Moodle Alternative on Railway

Self-host Chamilo e-learning platform. Courses, quizzes, certs & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chamilo)

## About

Deploy Chamilo LMS on Railway to get a fully managed e-learning platform running in minutes. Self-host Chamilo LMS with this template that pre-configures Chamilo 1.11 with a MariaDB database, persistent storage for courses and uploads, and a public HTTPS domain — ready for the built-in installation wizard.

Chamilo is an open-source learning management system focused on ease of use, accessibility, and low resource consumption. It powers online courses, corporate training programs, and academic institutions across 180+ countries.

Chamilo LMS is a free, open-source e-learning and content management system maintained by the Chamilo Association. It provides a complete platform for creating and delivering online courses, managing learners, tracking progress, and issuing certificates.

- **Course authoring** with SCORM, xAPI, and LTI support for content interoperability
- **20+ quiz question types** including multiple choice, fill-in-the-blank, matching, and drag-and-drop
- **Learning analytics** with detailed progress tracking, course completion rates, and participation metrics
- **Gamification** with points, badges, and leaderboards to drive learner engagement
- **Video conferencing** integration with BigBlueButton and OpenMeetings for virtual classrooms
- **Skills management** and certificate generation based on completed training paths
- **GDPR-compliant** with European privacy and security standards built in

The template deploys two services: the Chamilo PHP/Apache application server and a MariaDB 10.11 database for storing courses, user data, and learning records.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chamilo | `ipeos/chamilo:1.11` | Web service |
| MariaDB | `mariadb:10.11` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Chamilo | 80 | HTTP server listening port |
| `PHP_TIMEZONE` | Chamilo | UTC | PHP default timezone |
| `PHP_MEMORY_LIMIT` | Chamilo | 256M | PHP memory allocation limit |
| `PHP_POST_MAX_SIZE` | Chamilo | 100M | Max POST request body size |
| `PHP_MAX_INPUT_TIME` | Chamilo | 600 | Max input parsing seconds |
| `PHP_MAX_EXECUTION_TIME` | Chamilo | 300 | Max script execution seconds |
| `PHP_UPLOAD_MAX_FILESIZE` | Chamilo | 100M | Max single file upload size |
| `MYSQL_USER` | MariaDB | (secret) | Application database user |
| `MYSQL_DATABASE` | MariaDB | chamilo | Default database name |
| `MYSQL_PASSWORD` | MariaDB | (secret) | Application database password |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) | MariaDB root password |

## Configuration

- **Start command:** `/bin/sh -c 'a2dismod mpm_event 2>/dev/null; a2enmod mpm_prefork 2>/dev/null; apache2-foreground'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/chamilo)
