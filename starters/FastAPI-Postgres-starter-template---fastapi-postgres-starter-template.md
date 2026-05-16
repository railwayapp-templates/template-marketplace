# Deploy FastAPI-Postgres-starter template on Railway

Deploy and Host FastAPI-PGDB Railway with one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-postgres-starter-template)

## About

FastAPI-Postgres-starter is a production-ready backend starter template built with FastAPI and PostgreSQL. It includes JWT authentication, SQLModel ORM, Alembic migrations, Docker support, health checks, and Railway deployment configuration to help developers quickly launch scalable APIs and backend services.

Hosting FastAPI-Postgres-starter on Railway provides a streamlined deployment workflow for modern Python backend applications. Railway automatically manages infrastructure provisioning, deployments, networking, environment variables, and scaling, allowing developers to focus on building APIs instead of configuring servers.

The template includes PostgreSQL integration, automatic health checks, production-ready FastAPI configuration, and support for continuous deployment through GitHub integration. Railway also simplifies backend and database orchestration by allowing services to run together within the same project environment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FastAPI-Posgres-Template | [lNamelessl/FastAPI-Posgres-Template](https://github.com/lNamelessl/FastAPI-Posgres-Template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ALGORITHM` | FastAPI-Posgres-Template | HS256 |
| `API_V1_STR` | FastAPI-Posgres-Template | /api/v1 |
| `SECRET_KEY` | FastAPI-Posgres-Template | (secret) |
| `PROJECT_NAME` | FastAPI-Posgres-Template | Fastapi Server |
| `POSTGRES_USER` | FastAPI-Posgres-Template | (secret) |
| `POSTGRES_PASSWORD` | FastAPI-Posgres-Template | (secret) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | FastAPI-Posgres-Template | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, Mako, Dockerfile

[View on Railway →](https://railway.com/deploy/fastapi-postgres-starter-template)
