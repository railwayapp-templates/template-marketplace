# Deploy Saas Start Kit on Railway

SaaS application using Next.js ,authentication, Stripe ,dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/saas-start-kit)

## About

SaaS Starter Kit is a production-ready Next.js 15 SaaS boilerplate designed for high-performance applications. It features multi-tenant workspaces, role-based access control (RBAC), Stripe subscription billing, developer API key management, security audit logging, and a command palette interface. It is built for developers and teams looking to launch scalable SaaS products quickly.

Deploying SaaS Starter Kit on Railway provides a fully managed, containerized environment using standard Docker infrastructure. Railway automatically builds the application directly from the repository's multi-stage Dockerfile and deploys it with automated HTTPS termination, edge routing, and built-in health checking via the `/api/health` endpoint.

Database capabilities are powered by a managed Railway PostgreSQL service, which connects seamlessly to the application using Drizzle ORM. Railway simplifies operational complexity by managing environment variables, reference cross-service URLs, automatic builds, and scale-on-demand resource management without requiring manual server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| saas-starter-kit | [iqbalexperience/saas-starter-kit](https://github.com/iqbalexperience/saas-starter-kit) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `HOST` | saas-starter-kit | 0.0.0.0 | - |
| `PORT` | saas-starter-kit | 3000 | - |
| `NODE_ENV` | saas-starter-kit | production | - |
| `AUTH_SECRET` | saas-starter-kit | (secret) | - |
| `STRIPE_SECRET_KEY` | saas-starter-kit | (secret) | Stripe API secret key for payment processing. |
| `STRIPE_WEBHOOK_SECRET` | saas-starter-kit | (secret) | Stripe webhook signing secret. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/saas-start-kit)
