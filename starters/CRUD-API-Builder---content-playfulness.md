# Deploy CRUD API Builder on Railway

FastAPI + SQLModel CRUD API with PostgreSQL — one-click deploy on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/content-playfulness)

## About

The app uses FastAPI with SQLModel (SQLAlchemy + Pydantic) for PostgreSQL ORM. On startup, it auto-creates database tables from your Python models. The API includes full CRUD operations with proper HTTP status codes (201 for create, 204 for delete, 404 for not found), pagination via skip/limit, and automatic schema generation at `/docs` and `/redoc`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fastapi-crud-api | [INAPP-Mobile/fastapi-crud-api](https://github.com/INAPP-Mobile/fastapi-crud-api) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/content-playfulness)
