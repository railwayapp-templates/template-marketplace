# Deploy Moodle 5.2 LMS — Open Source Learning Platform on Railway

Self-hosted Moodle LMS with Postgres — courses, quizzes, grading

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moodle-52-lms-postgres)

## About

Moodle is the world's most widely used open-source learning management system — the platform behind universities, schools, and corporate training programs worldwide. Create courses, build quizzes and assignments, track grades, run forums, and manage learners at any scale, with unlimited users and no per-seat licensing. This template deploys the current Moodle 5.2 release with a managed PostgreSQL database, pre-wired and persistent.

---

Moodle has a storage model that trips most container deployments. It needs **two separate persistent locations**: the application directory at `/bitnami/moodle`, and a working data directory (`moodledata`) at `/bitnami/moodledata` where uploaded files, course content, session data, and caches live. Miss the second one and uploads, course files, and user submissions vanish on redeploy while the site itself appears intact — a subtle, damaging failure. This template mounts both.

The database is the third piece. This template uses a managed PostgreSQL service — Moodle supports Postgres natively as a first-class database backend — rather than the SQLite that would never survive real use. All course and user data lives there.

Moodle is a substantial PHP application. Budget 2 GB of RAM minimum for a small deployment, more as concurrent users climb — an active class hitting a quiz at the same time is a real load spike. First boot takes a few minutes while Bitnami initialises the database and runs the Moodle installer.

Typical cost: **~$15–30/month** on Railway depending on RAM and storage. Commercial LMS platforms like Canvas, Blackboard, and TalentLMS charge per active user or per seat, so a cohort of any size makes self-hosting dramatically cheaper — and your learner data stays yours.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Moodle | `ellakcy/moodle:postgresql_apache_500_php8.4` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MOODLE_SSL` | Moodle | true | - |
| `MOODLE_ADMIN` | Moodle | admin | - |
| `MOODLE_DB_USER` | Moodle | (secret) | - |
| `MOODLE_EMAIL_HOST` | Moodle | - | Email Host |
| `MOODLE_REVERSE_LB` | Moodle | false | - |
| `MOODLE_ADMIN_EMAIL` | Moodle | example@moodle.railway.com | - |
| `MOODLE_DB_PASSWORD` | Moodle | (secret) | - |
| `MOODLE_ADMIN_PASSWORD` | Moodle | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/var/moodledata`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/moodle-52-lms-postgres)
