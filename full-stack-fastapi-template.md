# Deploy Full Stack FastAPI Template on Railway

Full stack, modern web application template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/full-stack-fastapi-template)

## About

The full stack FastAPI template is a boilerplate project that combines FastAPI for the backend and React for the frontend. It provides a simple project setup for building modern web applications and allows you to rapidly develop and deploy your app.

Hosting the full stack FastAPI template involves deploying both the frontend and backend components to the cloud, and provisioning a Postgres database as well. The frontend must be built and deployed on a static host, while the FastAPI backend must be run alongside the Postgres database. This template does all of the above to simplify your developer experience and allow you to deploy your app in one click.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Backend | [6ixfalls/full-stack-fastapi-template](https://github.com/6ixfalls/full-stack-fastapi-template) (root: /backend) | Web service |
| Frontend | [6ixfalls/full-stack-fastapi-template](https://github.com/6ixfalls/full-stack-fastapi-template) (root: /frontend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Backend | 8000 | - |
| `SMTP_SSL` | Backend | False | - |
| `SMTP_TLS` | Backend | True | - |
| `SMTP_HOST` | Backend | - | Setup emails. |
| `SMTP_PORT` | Backend | 587 | - |
| `SMTP_USER` | Backend | (secret) | - |
| `SECRET_KEY` | Backend | (secret) | - |
| `SENTRY_DSN` | Backend | - | Sentry DSN if you have one. |
| `ENVIRONMENT` | Backend | production | local, staging, production |
| `PROJECT_NAME` | Backend | Full Stack FastAPI Project | The name of your project. |
| `POSTGRES_USER` | Backend | (secret) | - |
| `SMTP_PASSWORD` | Backend | (secret) | - |
| `FIRST_SUPERUSER` | Backend | railway@example.com | The superuser to create on first start. You should change this! |
| `EMAILS_FROM_EMAIL` | Backend | info@example.com | The email to send emails from. |
| `POSTGRES_PASSWORD` | Backend | (secret) | - |
| `FIRST_SUPERUSER_PASSWORD` | Backend | (secret) | The password for the automatically created superuser. |
| `PORT` | Frontend | 80 | - |
| `NODE_ENV` | Frontend | production | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/utils/health-check/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`

**Category:** Starters · **Languages:** TypeScript, Python, HTML, Shell, Dockerfile, Mako, Jinja

[View on Railway →](https://railway.com/template/full-stack-fastapi-template)
