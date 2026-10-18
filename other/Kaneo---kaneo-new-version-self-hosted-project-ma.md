# Deploy Kaneo on Railway

Kaneo project management on Railway with persistent PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaneo-new-version-self-hosted-project-ma)

## About

Kaneo is an open-source, self-hosted project management app for organizing team projects and day-to-day work. This Railway template deploys Kaneo with a persistent PostgreSQL database in one project. The application combines its web interface and API in one service, so you can open a private Kaneo workspace without wiring separate web and API containers yourself.

Use this template to self-host Kaneo for project planning, Kanban boards, tasks, and team collaboration. Kaneo also offers list, calendar, and Gantt views, plus task descriptions, comments, labels, subtasks, dependencies, custom fields, and time tracking. The exact features available depend on the Kaneo version deployed.

The template contains two Railway services: the Kaneo application and Railway's PostgreSQL service. The Kaneo container serves the web app on port `5173` and routes API requests through `/api`. Railway supplies the public domain and private service networking. The PostgreSQL database uses a persistent volume mounted at `/var/lib/postgresql/data` and stores Kaneo accounts, workspaces, projects, tasks, and other database records.

Kaneo does not need a separate API service or Redis for this single application service. The application container itself does not need a persistent volume for normal database-backed project data. Optional S3-compatible object storage is required for file uploads; this template does not configure a bucket, so core project and task features work without uploads.

After deploying, open the generated Kaneo domain and create the first account. Keep `DISABLE_REGISTRATION=false` during initial setup. Once the workspace owner is registered, set it to `true` and redeploy the Kaneo service to prevent open account creation. Invite additional users through the workspace.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| kaneo | `ghcr.io/usekaneo/kaneo:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created at initialization |
| `DATABASE_URL` | Postgres | - | Private database URL for Railway services |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL administrator username |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Randomly generated database password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public database URL for external PostgreSQL clients |
| `PORT` | kaneo | 5173 | Internal port used by the Kaneo all-in-one web and API container |
| `AUTH_SECRET` | kaneo | (secret) | Random secret used to securely sign authentication sessions and tokens |
| `DATABASE_URL` | kaneo | - | Private PostgreSQL connection URL provided by the Postgres service |
| `KANEO_CLIENT_URL` | kaneo | - | Public URL automatically assigned to this Kaneo service by Railway |
| `DISABLE_GUEST_ACCESS` | kaneo | true | Prevent anonymous guest users from accessing the Kaneo instance |
| `DISABLE_REGISTRATION` | kaneo | false | Set to true after creating the first account to block public registrations |
| `DISABLE_PASSWORD_REGISTRATION` | kaneo | (secret) | Set to true to disable email and password sign-up while keeping OAuth registration |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/kaneo-new-version-self-hosted-project-ma)
