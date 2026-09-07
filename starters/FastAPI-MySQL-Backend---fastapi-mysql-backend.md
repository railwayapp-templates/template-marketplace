# Deploy FastAPI MySQL Backend on Railway

FastAPI + MySQL backend API with JWT auth, migrations, and seeding.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-mysql-backend)

## About

Deploy a FastAPI REST API with a managed MySQL database on Railway in one click. The template provisions two services: a MySQL database and a Dockerized FastAPI backend that runs its own Alembic migrations and superuser seeding on every boot, then serves the API on Railway's dynamically assigned `PORT` with a `/health` healthcheck.

Hosting this template gives you a self-contained JSON/REST API: JWT auth with Argon2 password hashing, users and items CRUD backed by MySQL through SQLModel, Alembic schema migrations, and SMTP email with Jinja2 templates for password recovery. The backend listens on `$PORT`, is healthchecked at `/health`, and restarts on failure (`ON_FAILURE`, up to 10 retries). Migrations and the initial superuser seed (from the `FIRST_SUPERUSER` / `FIRST_SUPERUSER_PASSWORD` variables) run automatically inside the container start command, so every fresh deploy comes up ready to serve authenticated requests. After the first deploy, generate a public domain and set it as `FRONTEND_HOST` (the CORS origin) if you will call the API from a browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [lNamelessl/fastapi-mysql-backend](https://github.com/lNamelessl/fastapi-mysql-backend) | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SECRET_KEY` | backend | (secret) |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Starters · **Languages:** Python, HTML, Dockerfile, Shell, Mako

[View on Railway →](https://railway.com/deploy/fastapi-mysql-backend)
