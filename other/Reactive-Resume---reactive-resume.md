# Deploy Reactive Resume on Railway

Open-source resume builder with templates, PDF export and public sharing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/reactive-resume)

## About

Reactive Resume is an open-source resume builder used by job seekers, career coaches and bootcamps who want a polished CV without handing their employment history to a subscription service. You write once, pick from fifteen templates, adjust colours, fonts, margins and section order, then export to PDF or publish the resume at a shareable link with an optional password. It is MIT-licensed, has no paid tier and no tracking, and self-host Reactive Resume is the usual answer for anyone who wants that data on infrastructure they control.

Deploy Reactive Resume on Railway and the whole stack arrives wired together: the Node application that renders the front end, serves the API and generates PDFs; a PostgreSQL database for accounts, resumes and job applications; Redis behind the AI agent workspace; an object storage bucket for photos and attachments; and a Caddy gateway that terminates public traffic and forwards it over the private network. Every connection string and secret is generated at deploy time, so the only thing left is to open the URL and create an account.

![Diagram of the Reactive Resume, gateway, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788221203/reactive-resume-architecture.png)

Commercial resume builders keep the document behind a paywall and the data on their servers. Reactive Resume inverts that: editor, templates and renderer are one MIT-licensed app you run yourself. Teams self-host it when they need a shared, branded CV tool — university career services, bootcamps, recruitment and staffing firms — or when applicant data cannot leave their own infrastructure.

Key features:

- Fifteen templates with adjustable colours, fonts, spacing, page format and column layout
- Drag-and-drop section ordering plus custom sections
- PDF, DOCX, Markdown and JSON export, and import from an existing resume
- Public link sharing with optional password and view and download counters
- An in-browser ATS checker reporting what applicant tracking software can read
- Passkeys, two-factor auth, API keys and OAuth with Google, GitHub, LinkedIn or any OIDC provider

Four supporting pieces sit behind the app. PostgreSQL is the system of record for users, resumes and applications, and migrates its own schema on every boot. Redis carries resumable streams for the optional AI agent workspace. Object storage holds pictures and attachments, keeping the app stateless and free of a disk volume. The Caddy gateway owns the public domain and normalises the client address before requests reach the app, so the sign-in throttle counts real callers rather than the platform's edge.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| gateway | [gridalpha/reactive-resume-railway](https://github.com/gridalpha/reactive-resume-railway) | Web service |
| reactive-resume | `ghcr.io/amruthpillai/reactive-resume:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `PORT` | gateway | 8080 | HTTP port the gateway listens on |
| `APP_UPSTREAM` | gateway | - | Private address of the app |
| `PORT` | reactive-resume | 3000 | HTTP port the app listens on |
| `APP_URL` | reactive-resume | - | Public URL for auth and share links |
| `REDIS_URL` | reactive-resume | - | Redis connection string |
| `S3_BUCKET` | reactive-resume | - | Bucket name for uploads |
| `S3_REGION` | reactive-resume | - | Bucket placement region |
| `AUTH_SECRET` | reactive-resume | (secret) | Session and token signing key |
| `S3_ENDPOINT` | reactive-resume | - | Bucket S3 endpoint |
| `DATABASE_URL` | reactive-resume | - | Postgres connection string |
| `S3_ACCESS_KEY_ID` | reactive-resume | - | Bucket access key |
| `ENCRYPTION_SECRET` | reactive-resume | (secret) | Encrypts saved AI provider keys |
| `S3_FORCE_PATH_STYLE` | reactive-resume | true | Required addressing style for Railway buckets |
| `FLAG_DISABLE_SIGNUPS` | reactive-resume | false | Set true to close registration |
| `S3_SECRET_ACCESS_KEY` | reactive-resume | (secret) | Bucket secret key |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/reactive-resume)
