# Deploy fastapi-backend-mongo on Railway

Backend-only FastAPI + MongoDB starter, JWT auth, one-click Railway deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-backend-mongo)

## About

Deploy a production-ready FastAPI backend with MongoDB on Railway in one click. The template provisions two services — a Docker-built FastAPI application and a MongoDB database — wired together automatically, with JWT authentication, user management, and a demo CRUD resource (items) working out of the box.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-backend-mongo)

Hosting this template gives you:

- **backend** — the FastAPI app, built from the repo's `Dockerfile` (Python 3.14 + uv), binding to Railway's dynamic `$PORT`, with a healthcheck on `/health` and an automatic restart policy on failure. It is deployed from the GitHub repo, so it stays updatable.
- **MongoDB** — Railway's MongoDB database plugin with a persistent volume at `/data/db`. The backend reads its connection string from `MONGO_URL`, which is pre-wired to `${{MongoDB.MONGO_URL}}`.

The deploy form prompts you for:

| Service | Variable | What to enter |
| --- | --- | --- |
| MongoDB | `MONGOPORT` | `27017` |
| MongoDB | `MONGO_INITDB_ROOT_USERNAME` | `mongo` |
| backend | `PROJECT_NAME` | your project name (shown in the OpenAPI docs) |
| backend | `SECRET_KEY` | a strong random secret (`openssl rand -hex 32`) |
| backend | `FIRST_SUPERUSER` | the admin email to seed |
| backend | `FIRST_SUPERUSER_PASSWORD` | a strong password for the admin |

The MongoDB root password is generated fresh per deployment. Everything else is wired automatically, and the backend gets a public Railway domain on deploy.

MongoDB is schemaless, so there are no migrations to run: on every deploy the container start command creates the indexes (unique `email` on `users`, `owner_id`/`created_at` on `items`) and seeds the first superuser from the environment variables — this happens inside the container start (Dockerfile `CMD` and `railway.json` `startCommand` are identical), so it works on every Railway deploy path.

After the first deploy, optionally set `FRONTEND_HOST` on the `backend` service to your API's public domain (used for CORS origins and links in outgoing emails).

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
