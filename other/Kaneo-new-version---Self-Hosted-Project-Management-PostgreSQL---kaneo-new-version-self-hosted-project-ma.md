# Deploy Kaneo new version - Self-Hosted Project Management + PostgreSQL on Railway

Kaneo - PostgreSQL for private team projects. kaneo w/ 1 service - api & ui

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaneo-new-version-self-hosted-project-ma)

## About

Kaneo is a fast, open-source project management platform designed to keep teams focused on their work without unnecessary complexity. This template deploys the new all-in-one Kaneo container with a persistent PostgreSQL database, providing a private, self-hosted workspace for organizing projects, tasks, priorities, and team collaboration.

This Railway template deploys Kaneo using its new combined web and API image alongside a persistent PostgreSQL database. Railway automatically provides the public application domain, private service networking, database storage, and generated authentication secrets. Kaneo serves its interface on port `5173`, while API requests are routed internally through `/api`. PostgreSQL stores users, workspaces, projects, tasks, and other application data. No persistent volume is required for the Kaneo service itself. After deployment, create the first account and optionally disable public registration to keep the instance private.

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
