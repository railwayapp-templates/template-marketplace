# Deploy AdventureLog on Railway

Self-hostable travel tracker and trip planner.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/adventurelog)

## About

Hosting AdventureLog on Railway enables you to bring your application online quickly and effortlessly.
Railway provides an automatically configured deployment environment, removing the need for manual setup.
With just a few steps, you can run your database, server, and required services.
This approach is ideal for small teams or individual developers.
It ensures scalability while requiring minimal configuration and offers a smooth, streamlined deployment experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | `ghcr.io/seanmorley15/adventurelog-backend:latest` | Web service |
| frontend | `ghcr.io/seanmorley15/adventurelog-frontend:latest` | Web service |
| postgis | `postgis/postgis:16-master` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | backend | 8000 | - |
| `DEBUG` | backend | False | - |
| `SECRET_KEY` | backend | (secret) | - |
| `EMAIL_HOST_USER` | backend | (secret) | - |
| `EMAIL_HOST_PASSWORD` | backend | (secret) | - |
| `GOOGLE_MAPS_API_KEY` | backend | (secret) | Optional: use Google Maps integration. https://adventurelog.app/docs/configuration/google_maps_integration.html |
| `DISABLE_REGISTRATION` | backend | False | Optional: disable registration. https://adventurelog.app/docs/configuration/disable_registration.html |
| `STRAVA_CLIENT_SECRET` | backend | (secret) | - |
| `DJANGO_ADMIN_PASSWORD` | backend | (secret) | - |
| `DJANGO_ADMIN_USERNAME` | backend | (secret) | - |
| `PORT` | frontend | 8000 | - |
| `BODY_SIZE_LIMIT` | frontend | Infinity | - |
| `POSTGRES_DB` | postgis | adventure_log | - |
| `POSTGRES_USER` | postgis | (secret) | - |
| `POSTGRES_PASSWORD` | postgis | (secret) | - |
| `POSTGRES_INITDB_ARGS` | postgis | -c ssl=on -c ssl_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem -c ssl_key_file=/etc/ssl/private/ssl-cert-snakeoil.key | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/code/media/`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/adventurelog)
