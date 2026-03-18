# Deploy Fullstack FastAPI on Railway

Fullstack FastAPI template optimized for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fullstack-fast-api)

## About

A production-ready full-stack web application template featuring FastAPI backend with React frontend. Built with modern Python and TypeScript, including authentication, database ORM, and responsive UI components.

FastAPI full-stack applications combine high-performance Python backends with modern React frontends. This template provides JWT authentication, PostgreSQL integration, and TypeScript safety. The FastAPI backend delivers automatic API documentation and async capabilities, while the React frontend offers responsive design with Chakra UI. Perfect for developers building scalable web applications with secure authentication and database persistence.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [smolpaw/railway-fullstack-fast-api](https://github.com/smolpaw/railway-fullstack-fast-api) (root: /backend) | Web service |
| frontend | [smolpaw/railway-fullstack-fast-api](https://github.com/smolpaw/railway-fullstack-fast-api) (root: /frontend) | Web service |
| adminer | `adminer` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17.6` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | backend | 8000 | Port to connect to backend |
| `DOMAIN` | backend | - | Public domain of backend |
| `SMTP_TLS` | backend | - | Check your SMTP provider |
| `SMTP_HOST` | backend | - | Check your SMTP provider |
| `SMTP_PORT` | backend | - | Check your SMTP provider |
| `SMTP_USER` | backend | (secret) | Check your SMTP provider |
| `SECRET_KEY` | backend | (secret) | Secret key used by backend |
| `SENTRY_DSN` | backend | - | Sentry DSN key |
| `ENVIRONMENT` | backend | - | Project environment name |
| `POSTGRES_DB` | backend | - | Postgres DB name |
| `PROJECT_NAME` | backend | Railway Full Stack FastAPI | Project Name |
| `FRONTEND_HOST` | backend | - | Public domain of frontend |
| `POSTGRES_PORT` | backend | - | Postgres DB PORT |
| `POSTGRES_USER` | backend | (secret) | Postgres user/username |
| `SMTP_PASSWORD` | backend | (secret) | Check your SMTP provider |
| `FIRST_SUPERUSER` | backend | admin@example.com | Admin email address |
| `POSTGRES_SERVER` | backend | - | Private endpoint of Postgres server |
| `EMAILS_FROM_EMAIL` | backend | noreply@example.com | From Email for SMTP. Contact your provider |
| `POSTGRES_PASSWORD` | backend | (secret) | Password of your DB |
| `BACKEND_CORS_ORIGINS` | backend | - | CORS origins for your application |
| `FIRST_SUPERUSER_PASSWORD` | backend | (secret) | Admin account password |
| `PORT` | frontend | 80 | Port at which frontend will get served |
| `NODE_ENV` | frontend | - | Project environment name |
| `VITE_API_URL` | frontend | - | Backend public domain |
| `PORT` | adminer | 1080 | Port at which service will get served |
| `ADMINER_DESIGN` | adminer | pepa-linha-dark | - |
| `ADMINER_DEFAULT_SERVER` | adminer | - | Default server to be auto filled in the web app |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel |

## Configuration

- **Healthcheck:** `/api/v1/utils/health-check/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/fullstack-fast-api)
