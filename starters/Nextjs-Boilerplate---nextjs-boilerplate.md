# Deploy Next.js Boilerplate on Railway

Full-stack Next.js starter: Auth, PostgreSQL, TypeScript, production-ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-boilerplate)

## About

A production-ready starter template featuring Next.js 15, authentication with Clerk, PostgreSQL database with Drizzle ORM, TypeScript, and comprehensive testing setup. Get your web application running on Railway in minutes.

This [Next.js Boilerplate](https://nextjs-boilerplate.com) provides everything needed for modern web applications. Built on Next.js 15 with React 19, it includes Clerk authentication supporting email/password, social logins, and MFA. The template uses Drizzle ORM for type-safe database operations with PostgreSQL, includes comprehensive testing with Vitest and Playwright, and features production monitoring through Sentry. Deployment on Railway gives you automatic SSL, database provisioning, and seamless environment variable management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Next-js-Boilerplate | [ixartz/Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLERK_SECRET_KEY` | Next-js-Boilerplate | (secret) | Optional - Only required for setting up Clerk |
| `NEXT_PUBLIC_APP_URL` | Next-js-Boilerplate | - | The public service or customer domain. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Next-js-Boilerplate | pk_test_cmVsYXhlZC10dXJrZXktNjcuY2xlcmsuYWNjb3VudHMuZGV2JA | Optional - Only required for setting up Clerk |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/nextjs-boilerplate)
