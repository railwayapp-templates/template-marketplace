# Deploy fastapi-fullstack-railway on Railway

The official FastAPI fullstack template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-fullstack-railway)

## About

Deploying provisions two services and a fully automated release pipeline:

1. **Build** — Railway builds the root `Dockerfile`: Bun compiles the React app, then `uv` installs the locked Python environment (`uv.lock`) on Python 3.14.
2. **Release** — on container start, `alembic upgrade head` brings the schema current and `initial_data.py` seeds the superuser from `FIRST_SUPERUSER` / `FIRST_SUPERUSER_PASSWORD`. Both steps are idempotent, so restarts and redeploys never duplicate work.
3. **Verify** — Railway probes `/health` (up to 300 s for cold starts); a release only goes live once it passes, with automatic restart on failure (up to 10 retries).
4. **Serve** — the API answers at `/api/v1`, OpenAPI at `/docs`, and the compiled React app at `/`, all on one Railway domain. Traffic is routed to the `PORT` Railway injects.

Hosting FastAPI-Fullstack-Template on Railway runs a stateless `backend` container plus a Postgres database with persistent storage, connected over Railway's private network (`postgres.railway.internal`).

- **Scaling** — the API starts with 4 uvicorn workers; scale vertically (more vCPU/RAM) or horizontally (multiple instances) — safe because the app is stateless, sessions are JWTs, and Postgres is shared.
- **Deploys** — push to GitHub (or `railway up` from the CLI). Every release is health-gated, and failed health checks roll traffic back to the previous deployment.
- **Schema changes** — Alembic migrations run automatically on each deploy, so the database is always in sync with the image that just shipped.
- **No reverse proxy needed** — the frontend is served by FastAPI itself, so there's no second web service, no CDN config, and no CORS to wire up for same-origin use (`FRONTEND_HOST` is only needed if you call the API from external clients).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| frontend+backend | [lNamelessl/fastapi-fullstack-railway](https://github.com/lNamelessl/fastapi-fullstack-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | not required |
| `DATABASE_URL` | Postgres | - | db url |
| `POSTGRES_USER` | Postgres | (secret) | not required |
| `POSTGRES_PASSWORD` | Postgres | (secret) | pg password |
| `SECRET_KEY` | frontend+backend | (secret) | change to the desired secret key |
| `DATABASE_URL` | frontend+backend | - | db url |
| `PROJECT_NAME` | frontend+backend | full stack app | The optional project name |
| `FIRST_SUPERUSER` | frontend+backend | user@example.com | change to the desired first user email |
| `FIRST_SUPERUSER_PASSWORD` | frontend+backend | (secret) | change to the desired first user password (should be up to or more than 8 characters) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Python, HTML, CSS, Dockerfile, Shell, Mako

[View on Railway →](https://railway.com/deploy/fastapi-fullstack-railway)
