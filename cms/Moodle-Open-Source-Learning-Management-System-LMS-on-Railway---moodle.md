# Deploy Moodle | Open-Source Learning Management System (LMS) on Railway on Railway

Self-host Moodle. Most Popular LMS with courses, grading, 2k+ plugins.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moodle)

## About

Deploy Moodle, the world's most popular open-source learning management system, on Railway with a single click. Self-host Moodle on Railway to run your own LMS with full control over data, customization, and privacy — no vendor lock-in, no per-user fees.

This Railway template pre-configures Moodle with a MariaDB database, persistent storage for uploaded files and course content, HTTPS via Railway's TLS proxy, and production-ready environment variables so you can start creating courses immediately after deployment.

![Moodle Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777300859/2791d866-2001-4f65-bc03-fcd35f7fb098.png)

Moodle (Modular Object-Oriented Dynamic Learning Environment) is a free, open-source LMS used by over 400 million users across 240+ countries. Built with PHP and backed by MariaDB or PostgreSQL, it powers e-learning for universities (MIT, Open University), corporations (Shell, Vodafone), and K-12 schools worldwide.

Key features of self-hosted Moodle include:

- **Course management** — create structured courses with modules, activities, quizzes, assignments, SCORM packages, and H5P interactive content
- **Grading and assessment** — rubrics, marking guides, competency frameworks, and a full gradebook with weighted categories
- **Plugin ecosystem** — 2,000+ plugins for video conferencing (BigBlueButton), plagiarism detection (Turnitin), analytics, and more
- **Multi-tenancy** — serve multiple departments or organizations from a single instance using category-based permissions
- **Mobile ready** — official Moodle mobile app connects to any self-hosted instance
- **SCORM and LTI compliance** — integrate with external tools and import standardized courseware

This template deploys two services: the Moodle application server (Bitnami legacy Docker image) and a MariaDB database for persistent storage of courses, users, grades, and configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Moodle | `bitnamilegacy/moodle:5.0.2-debian-12-r2` | Web service |
| MariaDB | `bitnami/mariadb:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Moodle | 8080 | HTTP listening port |
| `MOODLE_HOST` | Moodle | - | Public-facing site URL |
| `MOODLE_EMAIL` | Moodle | admin@example.com | Admin email address |
| `MOODLE_PASSWORD` | Moodle | (secret) | Admin account password |
| `MOODLE_SSLPROXY` | Moodle | yes | HTTPS behind Railway proxy |
| `MOODLE_USERNAME` | Moodle | (secret) | Admin account username |
| `MOODLE_SITE_NAME` | Moodle | Moodle LMS | Site display name |
| `MOODLE_REVERSEPROXY` | Moodle | no | Disable reverse proxy mode |
| `MOODLE_DATABASE_HOST` | Moodle | - | MariaDB internal hostname |
| `MOODLE_DATABASE_NAME` | Moodle | - | Target database name |
| `MOODLE_DATABASE_USER` | Moodle | (secret) | Database username |
| `MOODLE_SKIP_BOOTSTRAP` | Moodle | yes | Skip installer on restarts |
| `MOODLE_DATABASE_PASSWORD` | Moodle | (secret) | Database password |
| `MOODLE_DATABASE_PORT_NUMBER` | Moodle | 3306 | MariaDB port |
| `MARIADB_USER` | MariaDB | (secret) | Application database user |
| `MARIADB_COLLATE` | MariaDB | utf8mb4_unicode_ci | Database collation |
| `MARIADB_DATABASE` | MariaDB | bitnami_moodle | Default database name |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Application database password |
| `MARIADB_CHARACTER_SET` | MariaDB | utf8mb4 | Database character set |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Database root password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami/moodledata`
- **Volume:** `/bitnami/mariadb`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/moodle)
