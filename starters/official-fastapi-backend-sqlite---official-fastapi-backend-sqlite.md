# Deploy official-fastapi-backend-sqlite on Railway

Zero-config FastAPI + SQLite backend, one-click on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/official-fastapi-backend-sqlite)

## About

Deploy the FastAPI + SQLite backend template on Railway with the **Deploy on Railway** button above. One service is provisioned (the `backend` API container) together with a volume for the SQLite file, and the deploy form prompts for **nothing** — hit deploy and the API comes up fully configured.

Hosting this template means running a single stateless API container plus one persistent volume:

- **Services provisioned:** one `backend` service (Dockerfile build) and one volume mounted at `/data` for the SQLite database file. No database server, cache, or reverse proxy services are needed.
- **Variables:** none required. On first boot the app generates a `SECRET_KEY` and an initial admin password, persists them in `.bootstrap_secrets.json` next to the database file on the volume, logs the generated admin password once in the deploy logs, and creates the superuser `admin@example.com`.
- **After deploying:** open the deploy logs (or read `.bootstrap_secrets.json` from the volume) to retrieve the initial admin password, sign in at `/docs` via the `login/access-token` endpoint, and change the password through the API. Optional overrides you may set later: `PROJECT_NAME`, `FIRST_SUPERUSER`, `FIRST_SUPERUSER_PASSWORD`, `DATABASE_URL` (e.g. a different volume path), `FRONTEND_HOST` (CORS origin), and SMTP settings for emails.
- Do **not** set `FASTAPI_ENV` in production — leaving it unset enables strict validation of default secrets at boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [lNamelessl/official_fastapi_backend_sqlite](https://github.com/lNamelessl/official_fastapi_backend_sqlite) | Database |

## Configuration

- **Volume:** `/data`

**Category:** Starters · **Languages:** Python, HTML, Dockerfile, Mako, Shell

[View on Railway →](https://railway.com/deploy/official-fastapi-backend-sqlite)
