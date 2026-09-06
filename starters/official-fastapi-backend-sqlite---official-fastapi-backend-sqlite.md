# Deploy official-fastapi-backend-sqlite on Railway

Backend-only FastAPI template with SQLite, one-click on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/official-fastapi-backend-sqlite)

## About

Deploy the FastAPI + SQLite backend template on Railway with the **Deploy on Railway** button above. One service is provisioned (the `backend` API container) together with a volume for the SQLite file, so the database survives redeploys. Migrations and superuser seeding run automatically at every container start — there is no separate migration step to babysit.

Hosting this template means running a single stateless API container plus one persistent volume:

- **Services provisioned:** one `backend` service (Dockerfile build) and one volume mounted at `/data` for the SQLite database file. No database server, cache, or reverse proxy services are needed.
- **Deploy-form variables** (the deploy form prompts for these; no secrets are pre-filled):
  - `PROJECT_NAME` — shown in the API docs and emails (any value).
  - `SECRET_KEY` — signs JWTs; generate with `openssl rand -hex 32`.
  - `FIRST_SUPERUSER` — email of the seeded admin (e.g. `admin@example.com`).
  - `FIRST_SUPERUSER_PASSWORD` — password of the seeded admin; use a strong generated value.
  - `DATABASE_URL` — enter `/data/app.db` to store the SQLite file on the attached volume; accepts `sqlite:///...` URLs or bare paths.
- **Post-deploy variables (optional, set from the dashboard):**
  - `FRONTEND_HOST` — CORS origin to allow, e.g. your generated Railway domain.
- Do **not** set `FASTAPI_ENV` in production — leaving it unset enables strict validation of default secrets at boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [lNamelessl/official_fastapi_backend_sqlite](https://github.com/lNamelessl/official_fastapi_backend_sqlite) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET_KEY` | (secret) |
| `FIRST_SUPERUSER_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** Python, HTML, Dockerfile, Mako, Shell

[View on Railway →](https://railway.com/deploy/official-fastapi-backend-sqlite)
