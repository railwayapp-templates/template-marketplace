# Deploy raidguild-portal-template on Railway

Template for The Portal CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/raidguild-portal-template)

## About

A Payload 3 and Next.js community portal template for contributor networks, programs, and communities. It surfaces briefs, projects, threads, activity, events, and member profiles so people can understand what is happening, find context, and choose a useful next step.

  ## Why Deploy Community Portal Template on Railway

  Railway is a good fit for this template because the app needs a Node.js runtime, persistent PostgreSQL database, environment variables, health checks, and repeatable deploys from GitHub. The template provisions the app and database together, runs Payload migrations at startup, and exposes the portal through a Railway public domain.

  ## About Hosting Community Portal Template

  This template deploys a full-stack Payload CMS and Next.js app on Railway with a managed PostgreSQL database. Railway builds the app from GitHub, provisions Postgres, injects the required environment variables, and runs Payload migrations on startup. After deployment, configure your first admin user, update branding and seed content, and use Payload admin to manage community activity.

  ## Dependencies for Community Portal Template

  The app is built with Next.js, Payload CMS 3, PostgreSQL, and pnpm. Railway provides the Node.js build/runtime environment, managed Postgres service, generated secrets, private service networking, and public app domain.

  ### Deployment Dependencies

  - PostgreSQL database service
  - `DATABASE_URI` pointing to the Railway Postgres private URL
  - `PAYLOAD_SECRET` generated for each deployment
  - `NEXT_PUBLIC_SERVER_URL` set to the Railway public domain
  - Node.js and pnpm runtime provided by Railway
  - Payload migrations run during application startup

  ## Common Use Cases

  - Launch a community portal for a contributor network, DAO, fellowship, cohort, or builder program.
  - Publish searchable projects, threads, events, activity updates, and member profiles from Payload CMS.
  - Give members and operators a shared place to track real community activity without turning the portal into a chat or project management tool.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| portal-railway-template | [raid-guild/portal-railway-template](https://github.com/raid-guild/portal-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created by the Postgres image |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres user created by the Postgres image |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `DATABASE_URI` | portal-railway-template | - | Private Postgres connection URL for Payload |
| `PAYLOAD_SECRET` | portal-railway-template | (secret) | super secret api key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm railway:start`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, SCSS, Dockerfile

[View on Railway →](https://railway.com/deploy/raidguild-portal-template)
