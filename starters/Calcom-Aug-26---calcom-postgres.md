# Deploy Cal.com [Aug 26] on Railway

Calendly alternative: scheduling, bookings, appointments on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calcom-postgres)

## About

Railway provides a modern, streamlined platform for deploying web applications and databases. This template bundles **Cal.com** — the open-source Calendly alternative for scheduling, booking and appointments — running on the official Docker image with a managed Postgres database. One-click deploy, persistent data, zero lock-in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| calcom | [marco-quintella/calcom-postgres](https://github.com/marco-quintella/calcom-postgres) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `NEXTAUTH_SECRET` | calcom | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/calcom-postgres)
