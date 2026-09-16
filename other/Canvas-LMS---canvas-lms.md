# Deploy Canvas LMS on Railway

Open-source learning management system for courses and grading

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/canvas-lms)

## About

Canvas LMS is the learning management system Instructure built for universities, school districts and training teams — the same AGPL-licensed codebase that serves millions of students. Courses hold modules, assignments, quizzes, discussions and a gradebook; SpeedGrader marks a whole submission queue without leaving the page; REST and GraphQL APIs plus LTI 1.3 sit behind every screen. Self-host Canvas LMS to get that under your own domain, with your own data retention and no per-student bill.

This template runs Canvas the way its own `docker-compose.yml` does — a web tier and a separate job tier — across five Railway services. **canvas** serves the application over Puma and is the only one with a public URL. **canvas-jobs** runs Canvas' `delayed_job` pool: notifications, course exports and every scheduled task. **Postgres** holds all course and user data, **Redis** backs the cache and Canvas' short-lived state, and the **canvas-files** bucket holds uploads, so both tiers share the same attachments. On its first boot the web service runs Canvas' migrations and creates your site admin before accepting a request.

![Diagram of the Canvas LMS, worker, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789286460/canvas-lms-architecture.webp)

Canvas LMS is a full learning platform, not a course-file repository. It models enrollments, sections, terms, grading periods and outcomes, so it suits an institution that must answer who was enrolled in what and what grade they earned. Teams self-host it to keep student records in their own database, to integrate an existing SIS, or to avoid a per-seat bill.

Key features:

- Courses with modules, prerequisites, pages, files and a syllabus
- Assignments, peer review, group work and a rubric-driven gradebook, with SpeedGrader for marking
- Quizzes, discussions, announcements and a course calendar
- LTI 1.3 tools, REST and GraphQL APIs, and the official mobile apps

The Railway architecture splits Canvas along the seam upstream does. **canvas** is the Rails application: pages, compiled assets and API traffic. **canvas-jobs** is the same image started as the `delayed_job` pool — notification delivery, gradebook exports, SIS imports and course copies go onto that queue, and without a worker those features silently never run. Both tiers share **Postgres**, **Redis** and the **canvas-files** bucket, which is what lets them be separate services at all.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| canvas-jobs | [gridalpha/canvas-lms-railway](https://github.com/gridalpha/canvas-lms-railway) | Worker |
| canvas | [gridalpha/canvas-lms-railway](https://github.com/gridalpha/canvas-lms-railway) | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | canvas-jobs | 3000 | Port the delayed_job health server binds |
| `S3_BUCKET` | canvas-jobs | - | Same uploads as the web tier |
| `S3_REGION` | canvas-jobs | - | Bucket region |
| `CANVAS_ROLE` | canvas-jobs | jobs | Selects the delayed_job half of the image |
| `S3_ENDPOINT` | canvas-jobs | - | Bucket endpoint |
| `CANVAS_DOMAIN` | canvas-jobs | - | Hostname used in job-built links |
| `CANVAS_DB_HOST` | canvas-jobs | - | Private Postgres hostname |
| `CANVAS_DB_POOL` | canvas-jobs | 5 | ActiveRecord pool for the worker |
| `CANVAS_DB_PORT` | canvas-jobs | - | Postgres port |
| `CANVAS_LOG_LEVEL` | canvas-jobs | info | Rails log level |
| `CANVAS_REDIS_URL` | canvas-jobs | - | Same Redis as the web tier |
| `S3_ACCESS_KEY_ID` | canvas-jobs | - | Bucket access key |
| `CANVAS_DB_DATABASE` | canvas-jobs | - | Database name |
| `CANVAS_DB_PASSWORD` | canvas-jobs | (secret) | Database password |
| `CANVAS_DB_USERNAME` | canvas-jobs | (secret) | Database user |
| `CANVAS_JOB_WORKERS` | canvas-jobs | 1 | Standard-priority worker count |
| `S3_SECRET_ACCESS_KEY` | canvas-jobs | (secret) | Bucket secret key |
| `CANVAS_ENCRYPTION_KEY` | canvas-jobs | - | Must match the web tier |
| `CANVAS_JOB_WORKERS_HIGH` | canvas-jobs | 1 | High-priority worker count |
| `CANVAS_JWT_ENCRYPTION_KEY` | canvas-jobs | - | Must match the web tier |
| `CANVAS_JOB_WORKER_MAX_MEMORY` | canvas-jobs | 2147483648 | Recycle a worker above this RSS |
| `PORT` | canvas | 3000 | HTTP port Puma binds and Railway probes |
| `S3_BUCKET` | canvas | - | Uploaded file storage |
| `S3_REGION` | canvas | - | Bucket region |
| `CANVAS_ROLE` | canvas | web | Selects the web half of the image |
| `S3_ENDPOINT` | canvas | - | Bucket endpoint |
| `CANVAS_DOMAIN` | canvas | - | Public hostname Canvas builds links from |
| `CANVAS_DB_HOST` | canvas | - | Private Postgres hostname |
| `CANVAS_DB_POOL` | canvas | 5 | ActiveRecord pool per Puma worker |
| `CANVAS_DB_PORT` | canvas | - | Postgres port |
| `WEB_CONCURRENCY` | canvas | 2 | Puma worker processes |
| `CANVAS_LOG_LEVEL` | canvas | info | Rails log level |
| `CANVAS_REDIS_URL` | canvas | - | Cache and Canvas' own Redis data |
| `S3_ACCESS_KEY_ID` | canvas | - | Bucket access key |
| `CANVAS_DB_DATABASE` | canvas | - | Database name |
| `CANVAS_DB_PASSWORD` | canvas | (secret) | Database password |
| `CANVAS_DB_USERNAME` | canvas | (secret) | Database user |
| `S3_SECRET_ACCESS_KEY` | canvas | (secret) | Bucket secret key |
| `CANVAS_ENCRYPTION_KEY` | canvas | - | Encrypts data at rest; never change |
| `CANVAS_LMS_ADMIN_EMAIL` | canvas | admin@example.com | First site admin login |
| `CANVAS_LMS_ACCOUNT_NAME` | canvas | Canvas | Root account name, first boot only |
| `CANVAS_JWT_ENCRYPTION_KEY` | canvas | - | Signs Canvas-issued JWTs |
| `CANVAS_LMS_ADMIN_PASSWORD` | canvas | (secret) | First site admin password |
| `CANVAS_LMS_STATS_COLLECTION` | canvas | opt_out | opt_in, anonymized or opt_out |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Ruby, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/canvas-lms)
