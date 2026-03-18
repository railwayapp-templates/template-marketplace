# Deploy vibekit-deployment on Railway

A template for VibeKit - A production-ready Next.js boilerplate by datayolk

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vibekit-deployment)

## About

VibeKit is a production-ready Next.js boilerplate with Google OAuth authentication, role-based access control (RBAC), PostgreSQL via Prisma ORM, and cloud file storage (GCS/S3). It's AI-optimized for seamless development with comprehensive documentation and structured patterns that make AI assistants understand your codebase instantly.

https://vibekit.datayolk.net/

Deploying VibeKit on Railway involves connecting your GitHub repository, configuring environment variables for authentication and database connections, and leveraging Railway's PostgreSQL addon for seamless database provisioning. The project includes a pre-configured `railway.json` that handles build commands, Prisma migrations, and health checks automatically. 

Railway's Nixpacks builder detects the Next.js application and runs the necessary build steps including Prisma client generation. 

The deployment automatically runs database migrations and seeds initial data on first deploy, ensuring your application is ready to use immediately after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | DATABASE_URL |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | POSTGRES_PASSWORD |
| `DATABASE_PUBLIC_URL` | - | DATABASE_URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/template/vibekit-deployment)
