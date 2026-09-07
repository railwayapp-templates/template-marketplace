# Deploy fastapi-backend-mongo on Railway

Backend-only FastAPI + MongoDB starter, JWT auth, one-click Railway deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-backend-mongo)

## About

Deploy a production-ready FastAPI backend with MongoDB on Railway in one click. The template provisions two services — a Docker-built FastAPI application and a MongoDB database — wired together automatically, with JWT authentication, user management, and a demo CRUD resource (items) working out of the box.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-backend-mongo)

Hosting this template gives you:

- **backend** — the FastAPI app, built from the repo's `Dockerfile` (Python 3.14 + uv), binding to Railway's dynamic `$PORT`, with a healthcheck on `/health` and an automatic restart policy on failure. It is deployed from the GitHub repo, so it stays updatable.
- **MongoDB** — Railway's MongoDB database plugin with a persistent volume at `/data/db`. The backend reads its connection string from `MONGO_URL`, which is pre-wired to `${{MongoDB.MONGO_URL}}`.

**Zero variables required before deployment.** Everything is wired automatically:

- `MONGO_URL` — set to `${{MongoDB.MONGO_URL}}`; the MongoDB service constructs its own connection string from generated credentials.
- `SECRET_KEY` (JWT signing) and the MongoDB root username/password — generated fresh per deployment via `${{ secret(...) }}` references.
- `PROJECT_NAME` and `FIRST_SUPERUSER` — sensible defaults baked into the app (`FastAPI Backend Mongo`, `admin@example.com`).

MongoDB is schemaless, so there are no migrations to run: on every deploy the container start command creates the indexes (unique `email` on `users`, `owner_id`/`created_at` on `items`) and seeds the first superuser — this happens inside the container start (Dockerfile `CMD` and `railway.json` `startCommand` are identical), so it works on every Railway deploy path.

After the deploy:

1. Open the `backend` service's **Variables** tab and copy the value of `FIRST_SUPERUSER_PASSWORD` — that generated password (with `admin@example.com`) logs you into the API.
2. Optionally set `FRONTEND_HOST` on the `backend` service to your API's public domain (used for CORS origins and links in outgoing emails).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| backend | [lNamelessl/fastapi-backend-mongo](https://github.com/lNamelessl/fastapi-backend-mongo) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `SECRET_KEY` | backend | (secret) |
| `FIRST_SUPERUSER_PASSWORD` | backend | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/fastapi-backend-mongo)
