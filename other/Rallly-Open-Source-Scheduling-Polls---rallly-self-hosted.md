# Deploy Rallly | Open-Source Scheduling Polls on Railway

Self-Host Rallly : Doodle & Calendly Alternative, No Per-Seat Fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rallly-self-hosted)

## About

Rallly is an open-source scheduling tool that kills the "when works for everyone?" email chain. Create a poll with date options, share a link, and participants vote on their availability - no account needed. It's a self-hosted alternative to Doodle and Calendly, built with Next.js and Prisma.

Doodle Pro costs $6.95/user/month. Calendly starts at $10/seat/month. For a 10-person team, that's $70-100/month just to schedule meetings. Self-hosting Rallly on Railway costs ~$5/month total - unlimited polls, unlimited participants, zero per-seat fees. This template deploys Rallly with a managed PostgreSQL database, auto-generated session encryption, and a public HTTPS domain. Railway handles SSL and container restarts automatically. Your participants' names, emails, and availability data stay on your infrastructure - which matters if you're scheduling under GDPR or working with sensitive client contacts. Deploy in under two minutes, create your first poll in three clicks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rallly | [shruti060701/rallly-railway](https://github.com/shruti060701/rallly-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rallly | 3000 | - |
| `SMTP_USER` | rallly | (secret) | - |
| `SMTP_SECURE` | rallly | true | - |
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
