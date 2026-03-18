# Deploy minimalistic-fastapi on Railway

Simple but complete and scalable FastAPI & PostgreSQL API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wbTudS)

## About

## What's Included
- 🔄 Complete CRUD operations for heroes
- 📊 Async SQLAlchemy with PostgreSQL
- 🔄 Automatic Alembic migrations
- 🏗️ Clean architecture with repository pattern
- ⚠️ Custom exception handling
- 🔍 CI and testing pipeline
- 🧹 Linter setup with pre-commit hooks
- 🚂 One-click Railway deployment

## Project Structure 📁
```
api/
├── core/              # Core functionality
│   ├── config.py      # Environment and app configuration
│   ├── database.py    # Database connection and sessions
│   ├── exceptions.py  # Global exception handlers
│   ├── logging.py     # Logging configuration
│   └── security.py    # Authentication and security
├── src/
│   ├── heroes/        # Heroes module
│   │   ├── models.py      # Database models
│   │   ├── repository.py  # Data access layer
│   │   ├── routes.py      # API endpoints
│   │   └── schemas.py     # Pydantic models
│   └── users/         # Users module
│       ├── models.py      # User models
│       ├── repository.py  # User data access
│       ├── routes.py      # User endpoints
│       └── schemas.py     # User schemas
├── utils/            # Utility functions
└── main.py          # Application entry point
```


Note: Railway will automatically detect the Python requirements and set up the necessary infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minimalistic-fastapi-template | [luchog01/minimalistic-fastapi-template](https://github.com/luchog01/minimalistic-fastapi-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT_SECRET` | minimalistic-fastapi-template | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `uvicorn api.main:app --host 0.0.0.0 --port $PORT --forwarded-allow-ips '*'`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, Mako

[View on Railway →](https://railway.com/deploy/wbTudS)
