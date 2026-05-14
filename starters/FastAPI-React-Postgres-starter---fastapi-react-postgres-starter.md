# Deploy FastAPI-React-Postgres-starter on Railway

Deploy and Host FastAPI-MongoDB with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastapi-react-postgres-starter)

## About

FastAPI-React-Postgres-starter is a full-stack "batteries-included" boilerplate designed for rapid application development. It combines the high performance of a **FastAPI** backend with the dynamic reactivity of **React** (Vite). Managed by **PostgreSQL**, it provides a production-ready architecture including pre-configured authentication, database migrations, and a Dockerized environment.

Hosting this stack involves orchestrating three distinct components that must communicate securely and efficiently. First, a **PostgreSQL** instance is provisioned to handle persistent data. Second, the **FastAPI** backend is deployed; this requires environment variable configuration to connect to the database and handle JWT authentication. Finally, the **React** frontend is built into static assets and served via a web server like **Nginx**. In a Railway environment, these are often deployed as separate services within a single project, allowing them to share a private network for secure, low-latency communication between the API and the database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | [lNamelessl/FastAPI-React-Postgres-Template](https://github.com/lNamelessl/FastAPI-React-Postgres-Template) (root: /backend) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Frontend | [lNamelessl/FastAPI-React-Postgres-Template](https://github.com/lNamelessl/FastAPI-React-Postgres-Template) (root: /frontend) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ALGORITHM` | Backend | HS256 |
| `API_V1_STR` | Backend | /api/v1 |
| `SECRET_KEY` | Backend | (secret) |
| `PROJECT_NAME` | Backend | Full Stack FastAPI + React |
| `POSTGRES_USER` | Backend | (secret) |
| `POSTGRES_PASSWORD` | Backend | (secret) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Backend | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, TypeScript, CSS, Makefile, Shell, Batchfile, Dockerfile, Mako, HTML

[View on Railway →](https://railway.com/deploy/fastapi-react-postgres-starter)
