# Deploy full-stack-fastapi-mongodb on Railway

One-Click Deploy official fullstack fastapi template with mongodb

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/full-stack-fastapi-1)

## About

Deploy this template and you get two services on Railway:

- **Backend** — a Dockerized FastAPI application that serves both the REST API (under `/api/v1`) and the built React frontend from a single port. On every deploy it runs `backend/scripts/prestart.sh`, which creates the email unique index and seeds the first superuser if it does not exist yet, then serves with `fastapi run` on the port Railway provides. Railway health-checks the redirect-free `GET /health` endpoint, so the deployment only goes live once the app is actually serving.
- **MongoDB** — a Railway MongoDB database. The backend connects to it through the `MONGODB_URI` variable, which references the database's own connection string (`${{Mongo.MONGO_URL}}`), so credentials stay in sync automatically.

Set these variables on the backend service when deploying: `PROJECT_NAME`, `SECRET_KEY`, `FIRST_SUPERUSER`, `FIRST_SUPERUSER_PASSWORD` (generate `SECRET_KEY` and the password — the app refuses to boot with the default `changethis` values outside development), and `FRONTEND_HOST` set to `https://${{RAILWAY_PUBLIC_DOMAIN}}` so CORS allows the generated domain automatically.

Hosting this stack on Railway means one web service plus one managed database. The frontend is built into the backend image, so there is nothing else to host: API and UI share one domain and one deployment. Deploys are atomic from Railway's point of view — the healthcheck on `/health` gates the switch to the new deployment, and database seeding is idempotent, so redeploys are safe against existing data. MongoDB runs as a Railway database service with automated backups available on Pro; the backend stores users (with hashed passwords) and items as documents and never needs schema migrations, which removes the Alembic migration step the original template requires on every deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend+backend | [lNamelessl/full-stack-fastapi-mongodb](https://github.com/lNamelessl/full-stack-fastapi-mongodb) | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET_KEY` | frontend+backend | (secret) | secret key(change the default) |
| `MONGODB_URI` | frontend+backend | - | mongo uri |
| `PROJECT_NAME` | frontend+backend | fullstack fastapi | The project name |
| `FRONTEND_HOST` | frontend+backend | - | It will automatically be filled upon deployment |
| `FIRST_SUPERUSER` | frontend+backend | user@example.com | change it before deployment |
| `FIRST_SUPERUSER_PASSWORD` | frontend+backend | (secret) | change it before deployment |
| `MONGOHOST` | MongoDB | - | mongo host |
| `MONGOPORT` | MongoDB | - | mongo port |
| `MONGOUSER` | MongoDB | - | mongo user |
| `MONGO_URL` | MongoDB | - | mongo url |
| `MONGOPASSWORD` | MongoDB | (secret) | mongo password |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | root password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | change before deployment mongo initial user name |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Starters · **Languages:** TypeScript, Python, HTML, CSS, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/full-stack-fastapi-1)
