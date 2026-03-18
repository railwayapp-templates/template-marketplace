# Deploy chalkboard.id on Railway

Modern open source billiard hall management software

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/chalkboardid)

## About

A modern, full-stack billiard hall management system that handles table sessions, F&B orders, payments, staff management, and analytics. Built with Next.js 15, React 19, and PostgreSQL for complete business operations management.

Developed by [Kugie](https://kugie.app) engineers, this project started as a solution to help a small billiard hall in Cirebon, Indonesia. We decided to open source it because why not—let's spread the love! 💚

Deploying [chalkboard.id](https://chalkboard.id) on Railway provides a production-ready cloud environment with automatic PostgreSQL provisioning. The platform handles your Next.js application with TypeScript, Drizzle ORM, and NextAuth.js authentication seamlessly. Railway's infrastructure manages database connections, environment variables, and scaling automatically, allowing you to focus on running your billiard hall business rather than managing servers. The deployment includes real-time table tracking, comprehensive F&B ordering, integrated payment processing, and detailed analytics dashboards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| chalkboard.id | [kugie-app/chalkboard.id](https://github.com/kugie-app/chalkboard.id) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NEXTAUTH_URL` | chalkboard.id | - | Fill with your domain |
| `DEFAULT_EMAIL` | chalkboard.id | - | Please fill with your email address to sign in to the platform |
| `NEXTAUTH_SECRET` | chalkboard.id | (secret) | NextAuth Secret (generated automatically) |
| `DEFAULT_PASSWORD` | chalkboard.id | (secret) | Please fill with your password to sign in to the platform |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node server.js`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/template/chalkboardid)
