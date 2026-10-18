# Deploy OpenProject | Project Management & Jira Alternative (17.9) on Railway

Open-source project management: Gantt, boards, time tracking. Admin ready.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openproject-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openproject-production?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=openproject)

[OpenProject](https://www.openproject.org) is open-source project management software, often used instead of Jira, MS Project or Asana. It covers work packages (tasks, bugs, features), Gantt charts, agile boards, backlogs, time and cost tracking, meetings, wikis and roadmaps. It is GPLv3 and has been developed since 2012.

This template runs OpenProject 17.9.2 from the official slim image, split the way upstream's production setup splits it:

| Service | What it does |
|---|---|
| **OpenProject** | The web app and API. Before each deploy it runs OpenProject's seeder, which migrates the database and creates the admin account and demo projects on first boot. |
| **Worker** | Background jobs: notifications, emails, attachment processing, recurring tasks. |
| **Postgres** | PostgreSQL 17 on a volume. |
| **Files** | A Railway bucket for attachments. Web and worker both read it, which a single-service volume can't do. |

What's set up for you:

- **A real admin password.** Other OpenProject templates leave the default `admin` / `admin` login, so anyone who finds the URL first can take over. Here the `admin` account gets a generated password, and you aren't forced to change it on first sign-in.
- **A real secret key.** `SECRET_KEY_BASE` is generated. A common mistake is setting `OPENPROJECT_SECRET_KEY_BASE`, which OpenProject ignores, so it falls back to a placeholder.
- **Pinned version.** Both services run `openproject/openproject:17.9.2-slim`, so a redeploy never upgrades you by surprise.
- **No SMTP needed to start.** You can sign in, create projects and add users without email set up.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| OpenProject | `openproject/openproject:17.9.2-slim` | Web service |
| Worker | `openproject/openproject:17.9.2-slim` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | openproject | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `PORT` | OpenProject | 8080 | Port OpenProject listens on - leave as is |
| `DATABASE_URL` | OpenProject | - | PostgreSQL connection (pool of 20 for web threads and background jobs) |
| `SECRET_KEY_BASE` | OpenProject | (secret) | Signs sessions and tokens. Never change it after the first deploy. |
| `OPENPROJECT_HTTPS` | OpenProject | true | Railway serves your domain over HTTPS |
| `RAILS_MAX_THREADS` | OpenProject | 8 | Puma threads |
| `OPENPROJECT_HOST__NAME` | OpenProject | - | Public host name used in links and emails. Change it to your custom domain after adding one. |
| `OPENPROJECT_WEB_WORKERS` | OpenProject | 0 | Single puma process with threads - keeps memory low. Raise to 2+ on bigger plans. |
| `OPENPROJECT_FOG_DIRECTORY` | OpenProject | - | Bucket name |
| `OPENPROJECT_DIRECT__UPLOADS` | OpenProject | false | Upload through OpenProject instead of straight from the browser to the bucket (which would need bucket CORS) |
| `OPENPROJECT_DEFAULT__LANGUAGE` | OpenProject | en | Default language for new users and seeded data |
| `OPENPROJECT_ATTACHMENTS__STORAGE` | OpenProject | fog | Store attachments in the Railway bucket, so the web and worker services both see them |
| `OPENPROJECT_FOG_CREDENTIALS_REGION` | OpenProject | (secret) | Bucket region |
| `OPENPROJECT_SEED__ADMIN__USER__MAIL` | OpenProject | admin@example.com | Email address of the admin account (change it later under My account) |
| `OPENPROJECT_FOG_CREDENTIALS_ENDPOINT` | OpenProject | (secret) | Bucket endpoint |
| `OPENPROJECT_FOG_CREDENTIALS_PROVIDER` | OpenProject | (secret) | S3-compatible storage |
| `OPENPROJECT_SEED__ADMIN__USER__PASSWORD` | OpenProject | (secret) | Password of the 'admin' account created on first boot |
| `OPENPROJECT_SEED__ADMIN__USER__PASSWORD__RESET` | OpenProject | (secret) | Don't force a password change on first sign-in |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__ACCESS__KEY__ID` | OpenProject | (secret) | Bucket access key |
| `OPENPROJECT_COLLABORATIVE__EDITING__HOCUSPOCUS__URL` | OpenProject | - | Real-time collaborative editing server - not included, so left empty |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__SECRET__ACCESS__KEY` | OpenProject | (secret) | Bucket secret key |
| `DATABASE_URL` | Worker | - | PostgreSQL connection (pool of 20 for web threads and background jobs) |
| `SECRET_KEY_BASE` | Worker | (secret) | Must match the OpenProject service |
| `OPENPROJECT_HTTPS` | Worker | true | Railway serves your domain over HTTPS |
| `OPENPROJECT_HOST__NAME` | Worker | - | Same host name as the OpenProject service |
| `OPENPROJECT_FOG_DIRECTORY` | Worker | - | Bucket name |
| `OPENPROJECT_DIRECT__UPLOADS` | Worker | false | Upload through OpenProject instead of straight from the browser to the bucket (which would need bucket CORS) |
| `WAIT_FOR_DB_TIMEOUT_SECONDS` | Worker | 900 | How long the worker waits for the database on first boot |
| `OPENPROJECT_DEFAULT__LANGUAGE` | Worker | en | Default language for new users and seeded data |
| `OPENPROJECT_ATTACHMENTS__STORAGE` | Worker | fog | Store attachments in the Railway bucket, so the web and worker services both see them |
| `OPENPROJECT_FOG_CREDENTIALS_REGION` | Worker | (secret) | Bucket region |
| `OPENPROJECT_GOOD__JOB__MAX__THREADS` | Worker | 8 | Background job threads |
| `OPENPROJECT_FOG_CREDENTIALS_ENDPOINT` | Worker | (secret) | Bucket endpoint |
| `OPENPROJECT_FOG_CREDENTIALS_PROVIDER` | Worker | (secret) | S3-compatible storage |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__ACCESS__KEY__ID` | Worker | (secret) | Bucket access key |
| `OPENPROJECT_COLLABORATIVE__EDITING__HOCUSPOCUS__URL` | Worker | - | Real-time collaborative editing server - not included, so left empty |
| `OPENPROJECT_FOG_CREDENTIALS_AWS__SECRET__ACCESS__KEY` | Worker | (secret) | Bucket secret key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `./docker/prod/web`
- **Healthcheck:** `/health_checks/default`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/bash -c "./docker/prod/wait-for-db && exec ./docker/prod/worker"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/openproject-production)
