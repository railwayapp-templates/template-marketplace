# Deploy Django REST | API with Postgres and a Generated Secret Key on Railway

Django 6 and DRF on Railway, with a signing key generated per deployment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/django-rest-or-api-with-postgres-and-a-g)

## About

Django 6 and Django REST Framework on Postgres, with a signing key generated per deployment.

The Django REST template most people deploy was last touched in September 2023 - Django 4.2, DRF 3.14, psycopg2 - and none of its deployments report healthy. But the stale versions are not the worst part.

**Its SECRET_KEY is a literal, committed into the template.** Every project deployed from it shares the same Django signing key, and that template is public. Anyone who reads it can forge session cookies and password-reset tokens against every site created from it.

Here SECRET_KEY is generated per deployment. The settings module reads it with `os.environ["SECRET_KEY"]` rather than `os.environ.get(..., "fallback")`, so a missing key stops the app at startup instead of quietly falling back to a shared default - which is how a template ends up shipping one key to everybody in the first place.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| API | [ak40u/django-rest-railway-starter](https://github.com/ak40u/django-rest-railway-starter) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | django |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | API | 8080 |
| `DEBUG` | API | false |
| `SECRET_KEY` | API | (secret) |
| `WEB_CONCURRENCY` | API | 2 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/django-rest-or-api-with-postgres-and-a-g)
