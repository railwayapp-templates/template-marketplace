# Deploy Django x Next.js Boilerplate on Railway

Private Django API server with a public Next.js app. Example use case.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/LWkkqf)

## About

Django x Next.js / an open source boilerplate is here. 

Using:
- Django-Ninja
- API forwarded requests via Next.js
- JWT Auth
- ShadCN
- Tailwind

The modern generative ai tooling for frontend is so much designed around Next.js (especially v0). This is for good reason, Next.js is a powerful frontend React.js framework with routing, data fetching support, server-side rendering, and more. 

Django’s backend is here for whatever frontend changes AI might bring while giving you Python for backend logic, built-in user management, and a thriving third-party ecosystem. 

TailwindCSS and ShadCN are also excellent design libraries that I have baked in to this boilerplate.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| next.js ui | [jmitchel3/django-nextjs](https://github.com/jmitchel3/django-nextjs) (root: /frontend) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| django-api | [jmitchel3/django-nextjs](https://github.com/jmitchel3/django-nextjs) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DJANGO_API_URL` | next.js ui | - | This automatically sets the correct private backend url and port. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | django-api | 8080 | - |
| `DJANGO_DEBUG` | django-api | False | Turn to true to debug (not recommended in production) |
| `DJANGO_SECRET_KEY` | django-api | (secret) | - |
| `DJANGO_ALLOWED_HOSTS` | django-api | healthcheck.railway.app,.railway.internal,.up.railway.app | - |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | django-api | http://*.up.railway.app,http://healthcheck.railway.app,http://*.railway.internal | - |
| `DJANGO_RAILWAY_PRIVATE_DOMAIN` | django-api | - | Railway provided private DNS name of the service. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** JavaScript, Python, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/LWkkqf)
