# Deploy OpenProject [Updated Jun'26] on Railway

Self-hosted Jira alternative — tasks, Gantt charts, time tracking & wikis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openproject-1)

## About

**OpenProject** is an open-source **project management platform** built for teams that need full control over their data. It provides **Gantt charts**, **agile scrum/kanban boards**, **time tracking**, wikis, budgeting, and team collaboration — a self-hosted alternative to **Jira**, **Asana**, or **MS Project**.

Hosting OpenProject requires a **PostgreSQL database** for all project data, tasks, and user records. The official Docker image bundles Apache (web server), Puma (Rails app server), background job workers, and cron jobs into a single container managed by supervisord. On first boot, the container automatically runs database migrations and seeds initial data — expect 3–5 minutes before the UI is accessible. Railway handles SSL termination and public DNS at the edge; the container serves HTTP internally through Apache on port 80. A generated secret key secures session tokens, and the public hostname must be set so OpenProject generates correct URLs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openproject-railway | [Amritasha/openproject-railway](https://github.com/Amritasha/openproject-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SECRET_KEY_BASE` | openproject-railway | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/openproject-1)
