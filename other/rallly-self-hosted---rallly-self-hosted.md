# Deploy rallly-self-hosted on Railway

Deploy and Host rallly-self-hosted with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rallly-self-hosted)

## About

Rallly is an open-source scheduling and polling platform that eliminates the back-and-forth of finding meeting times. Create a poll, share a link, and let participants vote on their availability - no sign-up required. A self-hosted, privacy-first alternative to Doodle and Calendly.

Self-hosting Rallly gives you complete ownership of your scheduling data - participant names, email addresses, and availability responses stay on your own infrastructure. This Railway template deploys Rallly with a managed PostgreSQL database, auto-generated encryption keys, and a public HTTPS domain. Railway handles SSL, networking, and container orchestration so you can focus on scheduling. Unlike Doodle Pro ($6.95/user/month) or Calendly ($10/seat/month), self-hosting Rallly on Railway costs a flat ~$5/month with unlimited polls, unlimited participants, and no per-seat pricing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rallly | [shruti060701/rallly-railway](https://github.com/shruti060701/rallly-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rallly | 3000 | - |
| `SUPPORT_EMAIL` | rallly | noreply@rallly.co | - |
| `ALLOWED_EMAILS` | rallly | * | - |
| `SECRET_PASSWORD` | rallly | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/rallly-self-hosted)
