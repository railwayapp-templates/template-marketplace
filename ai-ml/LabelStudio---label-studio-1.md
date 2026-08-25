# Deploy LabelStudio on Railway

Tool for labeling data to train machine learning models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/label-studio-1)

## About

Label Studio is the most widely used open-source data labeling platform, built by HumanSignal to turn raw text, images, audio, video, time series and PDFs into structured training data. It solves the problem every ML project hits between "we have data" and "we can train a model": annotation has to be consistent, reviewable and exportable in a format your training code understands. Instead of spreadsheets and ad-hoc scripts you get a configurable labeling interface, a task queue, per-annotator tracking and export to JSON, CSV, CoNLL, COCO, YOLO and Pascal VOC.

Deploy Label Studio on Railway and you get the full Community edition running against a managed PostgreSQL database, with a persistent volume for uploaded media, in one click. The template runs the same two-process shape the project uses in production: NGINX serves the front end and a uWSGI worker pool runs the Django application behind it. Projects, users, tasks and annotations live in PostgreSQL; files uploaded through the browser go on the volume. Self-host Label Studio this way and your training data never leaves infrastructure you control.

![Diagram of the Label Studio and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787337114/label-studio-architecture.png)

Label Studio is a Django application that stores every project, task, annotation and user in PostgreSQL and keeps uploaded media on disk. Teams self-host it when their data cannot go to a third-party vendor — medical records, financial documents, proprietary imagery — or when they want unlimited annotators without a per-seat bill.

Key features:

- One interface covering text, images, audio, video, time series, PDFs and multi-modal tasks
- Labeling UIs defined in a small XML-like syntax, with dozens of ready-made templates
- Pre-annotation: import model predictions, or connect an ML backend serving live ones, and have annotators correct rather than label from scratch
- A REST API and Python SDK for scripting imports, exports and QA

The Railway architecture has two services. **Label Studio** wraps the official `heartexlabs/label-studio` image, running NGINX on the public port with uWSGI behind it and a volume at `/label-studio/data` for uploads and exports. **Postgres** holds all structured data. Migrations run at startup under an advisory lock, so redeploys are safe.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| label-studio | [gridalpha/label-studio-railway](https://github.com/gridalpha/label-studio-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | label-studio | 8085 | NGINX listening port, health-checked |
| `DJANGO_DB` | label-studio | default | Selects PostgreSQL over SQLite |
| `LOG_LEVEL` | label-studio | INFO | Application log verbosity |
| `SECRET_KEY` | label-studio | (secret) | Django signing key, keep stable |
| `SENTRY_DSN` | label-studio | - | Disable backend error reporting |
| `POSTGRE_HOST` | label-studio | - | Private database hostname |
| `POSTGRE_NAME` | label-studio | - | Database name |
| `POSTGRE_PORT` | label-studio | - | Database port |
| `POSTGRE_USER` | label-studio | (secret) | Database user |
| `POSTGRE_PASSWORD` | label-studio | (secret) | Database password |
| `COLLECT_ANALYTICS` | label-studio | false | Disable upstream usage reporting |
| `LABEL_STUDIO_HOST` | label-studio | - | Public app URL |
| `CSRF_COOKIE_SECURE` | label-studio | 1 | HTTPS-only CSRF cookie |
| `FRONTEND_SENTRY_DSN` | label-studio | - | Disable frontend error reporting |
| `CSRF_TRUSTED_ORIGINS` | label-studio | - | CSRF origin allow list |
| `LABEL_STUDIO_PASSWORD` | label-studio | (secret) | First admin password |
| `LABEL_STUDIO_USERNAME` | label-studio | (secret) | First admin email, change this |
| `SESSION_COOKIE_SECURE` | label-studio | 1 | HTTPS-only session cookie |
| `USE_NGINX_FOR_UPLOADS` | label-studio | false | Required with volume-backed media |
| `SECURE_PROXY_SSL_HEADER` | label-studio | HTTP_X_FORWARDED_PROTO,https | Trust Railway HTTPS termination |
| `SSRF_PROTECTION_ENABLED` | label-studio | true | Block imports from private addresses |
| `DISABLE_SIGNUP_WITHOUT_LINK` | label-studio | true | Invite-only registration |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/health/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/label-studio/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/label-studio-1)
