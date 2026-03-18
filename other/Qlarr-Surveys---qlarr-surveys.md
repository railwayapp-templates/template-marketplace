# Deploy Qlarr Surveys on Railway

Deploy and Host Qlarr Surveys with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qlarr-surveys)

## About

Qlarr Surveys is an open-source surveys-as-code framework — define, version, and deploy scientific surveys using JSON for structure and JavaScript for logic, with full offline-first support across web and mobile platforms.

No click-and-pray survey builders. No black-box logic. Just code.

Qlarr Surveys is a Spring Boot monolith application consisting of a Kotlin Multiplatform Backend service, a client-side rendered React frontend and a Postgres database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [qlarr-surveys/backend](https://github.com/qlarr-surveys/backend) (branch: feat_public-ecr-images) | Web service |
| frontend | [qlarr-surveys/frontend](https://github.com/qlarr-surveys/frontend) (branch: feat_auto-https-docker) (root: /) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_USER` | backend | (secret) | - |
| `JWT_SECRET` | backend | (secret) | any secret of your choosing to be used for Sprint Boot JWT |
| `DB_PASSWORD` | backend | (secret) | - |
| `MAIL_PASSWORD` | backend | (secret) | - |
| `MAIL_USERNAME` | backend | (secret) | - |
| `SPRING_PROFILES_ACTIVE` | backend | docker | - |
| `FILE_SYSTEM_ROOT_FOLDER` | backend | /var/qlarr/resources | path for survey persistent storage |
| `CADDY_PORT` | frontend | 8080 | - |
| `VITE_PROTOCOL` | frontend | https | - |
| `POSTGRES_DB` | Postgres | qlarrdb | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Kotlin, PLpgSQL, Dockerfile, JavaScript, CSS, HTML, SCSS

[View on Railway →](https://railway.com/deploy/qlarr-surveys)
