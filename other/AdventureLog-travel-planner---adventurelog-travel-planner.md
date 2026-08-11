# Deploy AdventureLog travel planner on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adventurelog-travel-planner)

## About

AdventureLog is a self-hosted travel tracker and collaborative trip planner for places, itineraries, maps, photos, activities, countries, and visited regions.

The template runs immutable AdventureLog 0.12.1 frontend and backend images with private PostGIS 16. Generated administrator credentials replace public registration, while two 5 GB volumes preserve spatial records and uploaded travel media.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AdventureLog Backend | `ghcr.io/seanmorley15/adventurelog-backend:v0.12.1@sha256:7c759efab1476841f7319776666e527bedd481cd71dbb08e51aaa5959f2a28eb` | Web service |
| AdventureLog Frontend | `ghcr.io/seanmorley15/adventurelog-frontend:v0.12.1@sha256:edd79220f0def1dbea5b5d56636621f6cfdb454db9c00a8ce436a8ab489c5e99` | Web service |
| AdventureLog PostGIS | `postgis/postgis:16-3.5-alpine@sha256:b193e996618e9e632e2c6e268462b350c28a9c871cb0352b32905fc01e0299bd` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | AdventureLog Backend | 80 | Public backend listener. |
| `DEBUG` | AdventureLog Backend | False | Disables Django debug mode. |
| `PUBLIC_URL` | AdventureLog Backend | - | Public backend origin for media URLs. |
| `SECRET_KEY` | AdventureLog Backend | (secret) | Generated Django signing secret. |
| `POSTGRES_DB` | AdventureLog Backend | adventurelog | Application database. |
| `FRONTEND_URL` | AdventureLog Backend | - | Public frontend origin used in generated links. |
| `POSTGRES_USER` | AdventureLog Backend | (secret) | Application database user. |
| `POSTGRES_PASSWORD` | AdventureLog Backend | (secret) | Reference to the generated database password. |
| `DJANGO_ADMIN_EMAIL` | AdventureLog Backend | admin@example.com | Initial administrator email. |
| `CSRF_TRUSTED_ORIGINS` | AdventureLog Backend | - | Trusted backend and frontend HTTPS origins. |
| `DISABLE_REGISTRATION` | AdventureLog Backend | True | Prevents public account creation. |
| `DJANGO_ADMIN_PASSWORD` | AdventureLog Backend | (secret) | Generated administrator password. |
| `DJANGO_ADMIN_USERNAME` | AdventureLog Backend | (secret) | Generated administrator username. |
| `ACCOUNT_EMAIL_VERIFICATION` | AdventureLog Backend | none | Avoids unusable email verification without SMTP. |
| `PORT` | AdventureLog Frontend | 3000 | Public frontend listener. |
| `ORIGIN` | AdventureLog Frontend | - | Canonical public frontend origin. |
| `BODY_SIZE_LIMIT` | AdventureLog Frontend | Infinity | Allows AdventureLog's configured upload sizes. |
| `PUBLIC_SERVER_URL` | AdventureLog Frontend | - | Private backend endpoint used by the frontend server. |
| `POSTGRES_DB` | AdventureLog PostGIS | adventurelog | AdventureLog database. |
| `POSTGRES_USER` | AdventureLog PostGIS | (secret) | AdventureLog database user. |
| `POSTGRES_PASSWORD` | AdventureLog PostGIS | (secret) | Generated database password. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/code/media`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/adventurelog-travel-planner)
